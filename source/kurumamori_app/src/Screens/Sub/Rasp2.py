#!/usr/bin/env python

import cv2, dlib
import numpy as np
from imutils import face_utils
from keras.models import load_model
import threading

from IsTraking import IsTraking

##################################################################
import time
import serial

from pybleno import *
import binascii
import os

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
  print(data)

  if notifyCharacteristic._updateValueCallback:
    notifyCharacteristic._updateValueCallback(data)

##################################################################
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

IMG_SIZE = (34, 26) 

detector = dlib.get_frontal_face_detector()
predictor = IS._predictor

model = load_model('models/2018_12_17_22_58_35.h5')
model.summary()

def crop_eye(img, eye_points):
  x1, y1 = np.amin(eye_points, axis=0)
  x2, y2 = np.amax(eye_points, axis=0)
  cx, cy = (x1 + x2) / 2, (y1 + y2) / 2
  w = (x2 - x1) * 1.2
  h = w * IMG_SIZE[1] / IMG_SIZE[0]
  margin_x, margin_y = w / 2, h / 2
  min_x, min_y = int(cx - margin_x), int(cy - margin_y)
  max_x, max_y = int(cx + margin_x), int(cy + margin_y)
  eye_rect = np.rint([min_x, min_y, max_x, max_y]).astype(np.int)
  eye_img = gray[eye_rect[1]:eye_rect[3], eye_rect[0]:eye_rect[2]]
  return eye_img, eye_rect

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

# cap = cv2.VideoCapture("test.mp4")
cap = cv2.VideoCapture(-1)
fps_check = 0

while True:
    if cap.isOpened() and _connect == 1:
        _, frame = cap.read()
        # frame = cv2.flip(frame, 0)
        frame = cv2.flip(frame,-1)
        print("fps_check >>> ", end="")
        print(fps_check)
        
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

        frame = cv2.resize(frame, dsize=(screen_x, screen_y))
        img = frame.copy()
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        faces = IS.faces

        if(faces):
            for face in faces:
                shapes1 = predictor(gray, face)
                shapes = face_utils.shape_to_np(shapes1)

                eye_img_l, eye_rect_l = crop_eye(gray, eye_points=shapes[36:42])
                eye_img_r, eye_rect_r = crop_eye(gray, eye_points=shapes[42:48])

                eye_img_l = cv2.resize(eye_img_l, dsize=IMG_SIZE)
                eye_img_r = cv2.resize(eye_img_r, dsize=IMG_SIZE)
                eye_img_r = cv2.flip(eye_img_r, flipCode=1)

                eye_input_l = eye_img_l.copy().reshape((1, IMG_SIZE[1], IMG_SIZE[0], 1)).astype(np.float32) / 255.
                eye_input_r = eye_img_r.copy().reshape((1, IMG_SIZE[1], IMG_SIZE[0], 1)).astype(np.float32) / 255.

                pred_l = model.predict(eye_input_l)
                pred_r = model.predict(eye_input_r)

                state_l = 1 if pred_l > 0.2 else 2
                state_r = 1 if pred_r > 0.2 else 2
                
                cv2.rectangle(img,pt1=tuple(eye_rect_l[0:2]),pt2=tuple(eye_rect_l[2:4]),color=(255,255,255),thickness=2)
                cv2.rectangle(img,pt1=tuple(eye_rect_r[0:2]),pt2=tuple(eye_rect_r[2:4]),color=(255,255,255),thickness=2)
        else:
            state_r = 0
            state_l = 0

        cv2.imshow('detecting',img)
    else:
        print('app scan ... >', end='')
        print(_connect)
        time.sleep(1)
        cv2.destroyAllWindows()