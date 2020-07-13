from imutils import face_utils
from scipy.spatial import distance as dist
import numpy as np
import datetime
import argparse
import imutils
import time
import dlib
import cv2
import threading
from IsTraking import IsTraking
#############
import time
import serial

from pybleno import *
import binascii
import os

def gstreamer_pipeline(
    capture_width=1280,
    capture_height=720,
    display_width=1280,
    display_height=720,
    framerate=21,
    flip_method=0,
):
    return (
        "nvarguscamerasrc ! "
        "video/x-raw(memory:NVMM), "
        "width=(int)%d, height=(int)%d, "
        "format=(string)NV12, framerate=(fraction)%d/1 ! "
        "nvvidconv flip-method=%d ! "
        "video/x-raw, width=(int)%d, height=(int)%d, format=(string)BGRx ! "
        "videoconvert ! "
        "video/x-raw, format=(string)BGR ! appsink"
        % (
            capture_width,
            capture_height,
            framerate,
            flip_method,
            display_width,
            display_height,
        )
    )

GSTREAMER_PIPELINE2 = 'nvarguscamerasrc ! video/x-raw(memory:NVMM), width=600, height=400, format=(string)NV12, framerate=30/1 ! nvvidconv ! video/x-raw, width=600, height=400, format=(string)BGRx ! videoconvert ! video/x-raw, format=(string)BGR ! appsink'


    
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor('shape_predictor_68_face_landmarks.dat')

IS = IsTraking()

screen_x= 600
screen_y= 400

state_l = 0
state_r = 0
see = 0

y = 0
p = 0
r = 0
s = 0
#############################################
os.system("sh sh6.sh")

port = '/dev/ttyACM0'
brate = 9600

seri = serial.Serial(port, baudrate = brate, timeout = None)
seri.flushInput()

bleno = Bleno()

MY_SERVICE_UUID = '13333333-3333-3333-3333-000000000000'
NOTIFY_CHARACTERISTIC_UUID = '13333333-3333-3333-3333-000000000001'
READ_CHARACTERISTIC_UUID = '13333333-3333-3333-3333-000000000002'
WRITE_CHARACTERISTIC_UUID = '13333333-3333-3333-3333-000000000003'
DEVICE_NAME = 'KURUMAMORI'

########## DATA ##########
_counter = 0
_data = array.array('B', [0]*10)
_connect = 0
########## DATA ##########

########## ########## ########## ########## ##########

class NotifyCharacteristic(Characteristic):
  def __init__(self):
    Characteristic.__init__(self, {
      'uuid': NOTIFY_CHARACTERISTIC_UUID,
      'properties': ['notify'],
      'value': None
    })
    self._value = 0
    self._isSubscribed = False
    self._updateValueCallback = None

  def onSubscribe(self, maxValueSize, updateValueCallback):
    print('Characteristic - Notify - onSubscribe > ')
    global _connect
    _connect = 1
    self.isSubscribed = True
    self._updateValueCallback = updateValueCallback
  def onUnsubscribe(self):
    print('Characteristic - Notify - onUnsubscribe > ')
    global _connect
    _connect = 2
    self._isSubscribed = False
    self._updateValueCallback = None

class ReadCharacteristic(Characteristic):
  def __init__(self):
    Characteristic.__init__(self, {
      'uuid': READ_CHARACTERISTIC_UUID,
      'properties': ['read'],
      'value': None
    })
    self._value = 0
    self._updateValueCallback = None

  def onReadRequest(self, offset, callback):
    data = array.array('B', [10]*10) # or data = buffer
    writeUInt8(data, 100, 1)
    writeUInt8(data, 150, 3)
    writeUInt8(data, 200, 5)
    print('onReadRequest -> ', end='')
    print(data)
    callback(Characteristic.RESULT_SUCCESS, data)

class WriteCharacteristic(Characteristic):
  def __init__(self):
    Characteristic.__init__(self, {
      'uuid': WRITE_CHARACTERISTIC_UUID,
      'properties': ['write'],
      'value': None
    })
    self._value = 0
    self._updateValueCallback = None

  def onWriteRequest(self, data, offset, withoutResponse, callback):
    print('onWriteRequest -> ', end='')
    print(data)
    callback(Characteristic.RESULT_SUCCESS)

########## ########## ########## ########## ##########

def onStateChange(state):
  print('on -> stateChange: ' + state)
  if (state == 'poweredOn'):
    bleno.startAdvertising(DEVICE_NAME, [MY_SERVICE_UUID])
  else:
    bleno.stopAdvertising()

bleno.on('stateChange', onStateChange)

notifyCharacteristic = NotifyCharacteristic()
readCharacteristic = ReadCharacteristic()
writeCharacteristic = WriteCharacteristic()

def onAdvertisingStart(error):
  print('on -> advertisingStart: ' + ('error ' + error if error else 'success'))
  if not error:
    bleno.setServices([
      BlenoPrimaryService({
        'uuid': MY_SERVICE_UUID,
        'characteristics': [
          notifyCharacteristic,
          readCharacteristic,
          writeCharacteristic,
        ]
      })
    ])

bleno.on('advertisingStart', onAdvertisingStart)
bleno.start()

########## ########## ########## ########## ##########

def appNotify():
  global _counter, _data
  _counter += 1
  if _counter > 59:
    _counter = 1

  counter = _counter
  data = _data
  writeUInt8(data, counter, 9) # _counter
  #print(data)

  if notifyCharacteristic._updateValueCallback:
    notifyCharacteristic._updateValueCallback(data)

############################################3

EYE_AR_THRESH = 0.27

def eye_aspect_ratio(eye):
	A = dist.euclidean(eye[1], eye[5])
	B = dist.euclidean(eye[2], eye[4])
	C = dist.euclidean(eye[0], eye[3])
	ear = (A + B) / (2.0 * C)
	return ear

def printLog():
  global y, p, r, s

  seri.flushInput()
  arduReadData = seri.readline()
  try:
    print("--------------------------------------")
    if type(arduReadData) is bytes:
      dec = arduReadData.decode()
      spl = dec.split(":")
      if type(int(spl[1])) is int and type(int(spl[2])) is int and type(int(spl[3])) is int:
        y = round (int(spl[1]) / 10) +100
        p = int(spl[2]) + 100
        r = int(spl[3]) + 100
        s = int(spl[5])
  except:
    print("############### err ####################")
  print(s, y, p, r, end="") # index 0, 1, 2, 3 indexing
  print(" /", see, end="") # index 4
  print(" /", state_l, " /", state_r, end="") # index 5, index 6
  print(" /time ", _counter) # index 13

  data = _data
  writeUInt8(data, s, 0)
  writeUInt8(data, y, 1)
  writeUInt8(data, p, 2)
  writeUInt8(data, r, 3)
  writeUInt8(data, see, 4)
  writeUInt8(data, state_l, 5)
  writeUInt8(data, state_r, 6)
  appNotify()
  
  threading.Timer(0.5,printLog).start()

printLog()

cap = cv2.VideoCapture(gstreamer_pipeline(flip_method=0), cv2.CAP_GSTREAMER)

while True:
    if cap.isOpened() and _connect == 1:
        _, frame = cap.read()
        # frame = cv2.flip(frame, 0)
        #frame = cv2.flip(frame,-1)
        
        #roi = frame[100:800, 350:1000]
        #cv2.imshow('roi',roi)

        frame = frame[100:800, 350:1000]
        IS.refresh(frame)

        if IS.is_right():
            see = 30
        elif IS.is_left():
            see = 20
        elif IS.is_center():
            see = 10
        else:
            see = 0

        # frame = IS.annotated_frame()
        if cv2.waitKey(1) == 27:
            break

        #frame = cv2.resize(frame, dsize=(screen_x, screen_y))
        img = frame.copy()
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        faces = IS.faces
        #faces = False
        if(faces):
          for face in faces:
            shape1 = predictor(gray, face)
            shape = face_utils.shape_to_np(shape1)

            rightEye = shape[36:42]
            leftEye = shape[42:48]

            leftEAR = eye_aspect_ratio(leftEye)
            rightEAR = eye_aspect_ratio(rightEye)
            ear = (leftEAR + rightEAR) / 2.0
            #print(ear)

            leftEyeHull = cv2.convexHull(leftEye)
            rightEyeHull = cv2.convexHull(rightEye)
            cv2.drawContours(img, [leftEyeHull], -1, (0, 255, 0), 1)
            cv2.drawContours(img, [rightEyeHull], -1, (0, 255, 0), 1)

            if ear > EYE_AR_THRESH: 
                state_l = 1
                state_r = 1
            if ear < EYE_AR_THRESH:
                state_l = 2
                state_r = 2
        else: 
          state_r = 0
          state_l = 0
        cv2.imshow('detecting',img)
        print(">>>>>>>>>>>>>>> see : ",see," left_eye:", state_l,"right_eye:",state_r)
    else:
        print('app scan ... >', end='')
        print(_connect)
        time.sleep(1)
        cv2.destroyAllWindows()
