import numpy as np
import csv

def read_csv(path):
  width = 34
  height = 26
  dims = 1

  with open(path,'r') as f:
    #dictionary format 으로 csv 읽음
    reader = csv.DictReader(f)
    rows = list(reader)

  #imgs는 모든 이미지를 포함하는 numpy 배열.
  imgs = np.empty((len(list(rows)),height,width, dims),dtype=np.uint8)
  #tgs는 영상의 태그가 있는 numpy 배열.
  tgs = np.empty((len(list(rows)),1))

  #목록을 이미지 형식으로 다시 변환
  for row,i in zip(rows,range(len(rows))):
    img = row['image']
    img = img.strip('[').strip(']').split(', ')
    im = np.array(img,dtype=np.uint8)
    im = im.reshape((height, width))
    im = np.expand_dims(im, axis=2)
    imgs[i] = im

    #태그가 open이면 1 아니면 0 return
    tag = row['state']
    if tag == 'open':
      tgs[i] = 1
    else:
      tgs[i] = 0

  #데이터 셋을 섞음
  index = np.random.permutation(imgs.shape[0])
  imgs = imgs[index]
  tgs = tgs[index]

  #영상 및 해당 태그를 반환
  return imgs, tgs