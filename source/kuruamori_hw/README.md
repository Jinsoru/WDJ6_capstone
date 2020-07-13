# pip install 목록 (pc)ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
- pip install tensorflow
- pip install opencv-python
- pip install imutils
- pip install keras
- conda install tensorflow     (pip install tensorflow로 하면 경로를 찾을 수 없다고 함)

# dlib 설치
- 자신에게 맞는 dlib설치:
https://pypi.org/simple/dlib/
- 아나콘다로 python 3.6으로 다운그레이드 : 
https://blog.naver.com/PostView.nhn?blogId=jihu02&logNo=221447248039&from=search&redirect=Log&widgetTypeCall=true&directAccess=false
- dataset 모델 : 
https://osdn.net/projects/sfnet_dclib/downloads/dlib/v18.10/shape_predictor_68_face_landmarks.dat.bz2/

#jetson nano 패키지 설치 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
#기본 설치
sudo apt install python3-pip
sudo apt-get install vim 

#tensorflow 설치 2.1.0+nv20.3.tf2
sudo apt-get update
sudo apt-get install libhdf5-serial-dev hdf5-tools libhdf5-dev zlib1g-dev zip libjpeg8-dev liblapack-dev libblas-dev gfortran

sudo apt-get install python3-pip
sudo pip3 install -U pip testresources setuptools

sudo pip3 install -U numpy==1.16.1 future==0.17.1 mock==3.0.5 h5py==2.9.0 keras_preprocessing==1.0.5 keras_applications==1.0.8 gast==0.2.2 futures protobuf pybind11

sudo pip3 install --pre --extra-index-url https://developer.download.nvidia.com/compute/redist/jp/v44 'tensorflow<2'

sudo pip3 install --extra-index-url https://developer.download.nvidia.com/compute/redist/jp/v43 tensorflow

#스왑메모리 증가
git clone https://github.com/JetsonHacksNano/resizeSwapMemory
cd resizeSwapMemory
./setSwapMemorySize.sh -g 8
#opencv 설치 4.1.1
git clone https://github.com/JetsonHacksNano/buildOpenCV
cd buildOpenCV
./buildOpenCV.sh |& tee openCV_build.log


#dlib 설치 19.20.0
#참고 사이트
https://www.pyimagesearch.com/2017/05/01/install-dlib-raspberry-pi/

sudo apt-get update
sudo apt-get install build-essential cmake
sudo apt-get install libgtk-3-dev
sudo apt-get install libboost-all-dev

sudo wget https://bootstrap.pypa.io/get-pip.py
sudo python3 get-pip.py

sudo pip3 install dlib

# keras 2.3.1
sudo pip3 install keras==2.3.1

#imutils 0.5.3
sudo pip3 install imutils

#serial
sudo pip3 install pyserial

#pybleno 0.11
sudo pip3 install pybleno



def gstreamer_pipeline(
    capture_width=1280,
    capture_height=720,
    display_width=1280,
    display_height=720,
    framerate=60,
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

cap = cv2.VideoCapture(gstreamer_pipeline(flip_method=0), cv2.CAP_GSTREAMER)

#camera restart
sudo service nvargus-daemon restart

#------------------------부팅시 파이썬 실행
/etc/systemd/system/mypy.service
------------------------------
[Unit]
Description=Execute this on boot

[Service]
Type=oneshot
ExecStart=/usr/bin/python /home/nano/Desktop/ddd/rast.py

[Install]
WantedBy=multi-user.target


-------------------------
sudo systemctl start mypy
sudo systemctl status mypy
sudo systemctl enable mypy