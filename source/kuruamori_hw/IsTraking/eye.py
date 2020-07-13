import math
import numpy as np
import cv2
from .pupil import Pupil


class Eye(object):
    # 이 클래스는 눈을 분리할 수 있는 새로운 프레임을 만들고
    # 눈 감지를 시작한다

    #얼굴에 눈위치 좌표 //모델에 학습되어있는 것
    # LEFT_EYE_POINTS = [37, 38, 39, 40, 41, 42]
    # RIGHT_EYE_POINTS = [43, 44, 45, 46, 47, 48]
    #원래 코드
    LEFT_EYE_POINTS = [36, 37, 38, 39, 40, 41]
    RIGHT_EYE_POINTS = [42, 43, 44, 45, 46, 47]
    
    def __init__(self, original_frame, landmarks, side, calibration):
        self.frame = None
        self.origin = None
        self.center = None
        self.pupil = None

        self._analyze(original_frame, landmarks, side, calibration)

    @staticmethod
    def _middle_point(p1, p2):
        #두 점 사이의 중간점(x,y) 반환

        # 인수:
        # p1(dlib.point): 첫 번째 포인트
        # p2(dlib.point): 두 번째 포인트
        x = int((p1.x + p2.x) / 2)
        y = int((p1.y + p2.y) / 2)
        return (x, y)

    def _isolate(self, frame, landmarks, points):
        
        # 눈을 분리하여 얼굴의 다른 부분이 없는 프레임을 가지십시오.

        # 인수:
        # 프레임(numpy.ndarray): 얼굴이 포함된 프레임
        # 랜드마크(dlib).full_object_detection: 안면부위 표층
        # 점(목록): 눈의 점(68개의 다중 PIE 랜드마크에서)
        region = np.array([(landmarks.part(point).x, landmarks.part(point).y) for point in points])
        region = region.astype(np.int32)

        # 눈만 얻기 위해 마스크 적용
        height, width = frame.shape[:2]
        black_frame = np.zeros((height, width), np.uint8)
        mask = np.full((height, width), 255, np.uint8)
        cv2.fillPoly(mask, [region], (0, 0, 0))
        eye = cv2.bitwise_not(black_frame, frame.copy(), mask=mask)

        # 눈에 거슬리는 것
        margin = 5
        min_x = np.min(region[:, 0]) - margin
        max_x = np.max(region[:, 0]) + margin
        min_y = np.min(region[:, 1]) - margin
        max_y = np.max(region[:, 1]) + margin

        self.frame = eye[min_y:max_y, min_x:max_x]
        self.origin = (min_x, min_y)

        height, width = self.frame.shape[:2]
        self.center = (width / 2, height / 2)

    def _blinking_ratio(self, landmarks, points):
        # 눈이 감겼는지 안 닫혔는지를 나타낼 수 있는 비율을 계산한다.
        # 그것은 눈 너비의 높이를 나눈 것이다.

        # 인수:
        # 랜드마크(dlib).full_object_detection: 안면부위 표층
        # 점(목록): 눈의 점(68개의 다중 PIE 랜드마크에서)

        # 반환:
        # 계산된 비율
    
        left = (landmarks.part(points[0]).x, landmarks.part(points[0]).y)
        right = (landmarks.part(points[3]).x, landmarks.part(points[3]).y)
        top = self._middle_point(landmarks.part(points[1]), landmarks.part(points[2]))
        bottom = self._middle_point(landmarks.part(points[5]), landmarks.part(points[4]))

        eye_width = math.hypot((left[0] - right[0]), (left[1] - right[1]))
        eye_height = math.hypot((top[0] - bottom[0]), (top[1] - bottom[1]))

        try:
            ratio = eye_width / eye_height
        except ZeroDivisionError:
            ratio = None

        return ratio

    def _analyze(self, original_frame, landmarks, side, calibration):
        # 새 프레임에서 눈을 감지 및 격리하고, 보정 시 데이터 전송
        # 그리고 Pupil 객체를 초기화한다.

        # 인수:
        # original_framework(numpy.ndarray): 사용자가 통과한 프레임
        # 랜드마크(dlib).full_object_detection: 안면부위 표층
        # 측면: 왼쪽 눈(0)인지 오른쪽 눈(1)인지 표시
        # 교정(교정).보정: 이항화 임계값 관리
        
        if side == 0:
            points = self.LEFT_EYE_POINTS
        elif side == 1:
            points = self.RIGHT_EYE_POINTS
        else:
            return

        self.blinking = self._blinking_ratio(landmarks, points)
        self._isolate(original_frame, landmarks, points)

        if not calibration.is_complete():
            calibration.evaluate(self.frame, side)

        threshold = calibration.threshold(side)
        self.pupil = Pupil(self.frame, threshold)
