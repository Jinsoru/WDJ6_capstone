from __future__ import division
import cv2
from .pupil import Pupil


class Calibration(object):
#    이 클래스는 동공 감지 알고리즘을 검출하여 보정한다.
#     사용자 및 웹캠에 대한 최상의 이항화 임계값.

    def __init__(self):
        self.nb_frames = 20
        self.thresholds_left = []
        self.thresholds_right = []

    #보정이 완료되면 true 반환
    def is_complete(self):
        return len(self.thresholds_left) >= self.nb_frames and len(self.thresholds_right) >= self.nb_frames

    def threshold(self, side):
        # 주어진 눈에 대한 임계값을 반환한다.
        # 인수:
        # 측면: 왼쪽 눈(0)인지 오른쪽 눈(1)인지 표시
        if side == 0:
            return int(sum(self.thresholds_left) / len(self.thresholds_left))
        elif side == 1:
            return int(sum(self.thresholds_right) / len(self.thresholds_right))

    @staticmethod
    def iris_size(frame):
    #    홍채가 차지하는 공간의 백분율 반환
    #     눈의 표면

    #     인수:
    #     프레임(numpy.ndarray): 이항 홍채 프레임
        frame = frame[5:-5, 5:-5]
        height, width = frame.shape[:2]
        nb_pixels = height * width
        nb_blacks = nb_pixels - cv2.countNonZero(frame)
        return nb_blacks / nb_pixels

    @staticmethod
    def find_best_threshold(eye_frame):
        # 이항화하기 위한 최적의 임계값을 계산한다.
        # 주어진 눈을 위해 틀에 끼우다

        # 인수:
        # eye_frame(numpy.ndarray): 분석할 눈의 뼈대
        
        average_iris_size = 0.48
        trials = {}

        for threshold in range(5, 100, 5):
            iris_frame = Pupil.image_processing(eye_frame, threshold)
            trials[threshold] = Calibration.iris_size(iris_frame)

        best_threshold, iris_size = min(trials.items(), key=(lambda p: abs(p[1] - average_iris_size)))
        return best_threshold

    def evaluate(self, eye_frame, side):
        #다음을 고려하여 보정 기능 향상
        #주어진 이미지

        #인수:
        #eye_frame(numpy.ndarray): 눈틀
        #측면: 왼쪽 눈(0)인지 오른쪽 눈(1)인지 표시
        threshold = self.find_best_threshold(eye_frame)

        if side == 0:
            self.thresholds_left.append(threshold)
        elif side == 1:
            self.thresholds_right.append(threshold)
