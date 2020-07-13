#include "I2Cdev.h"
#include "MPU6050_6Axis_MotionApps20.h"
#include "Wire.h"
MPU6050 mpu;
#define OUTPUT_READABLE_YAWPITCHROLL
#define INTERRUPT_PIN 2  // use pin 2 on Arduino Uno & most boards
// #define LED_PIN 13 // (Arduino is 13, Teensy is 11, Teensy++ is 6) 삭제
bool blinkState = false;
bool dmpReady = false;  // set true if DMP init was successful
uint8_t mpuIntStatus;   // holds actual interrupt status byte from MPU
uint8_t devStatus;      // return status after each device operation (0 = success, !0 = error)
uint16_t packetSize;    // expected DMP packet size (default is 42 bytes)
uint16_t fifoCount;     // count of all bytes currently in FIFO
uint8_t fifoBuffer[64]; // FIFO storage buffer
Quaternion q;           // [w, x, y, z]         quaternion container
VectorInt16 aa;         // [x, y, z]            accel sensor measurements
VectorInt16 aaReal;     // [x, y, z]            gravity-free accel sensor measurements
VectorInt16 aaWorld;    // [x, y, z]            world-frame accel sensor measurements
VectorFloat gravity;    // [x, y, z]            gravity vector
float euler[3];         // [psi, theta, phi]    Euler angle container
float ypr[3];           // [yaw, pitch, roll]   yaw/pitch/roll container and gravity vector
uint8_t teapotPacket[14] = { '$', 0x02, 0,0, 0,0, 0,0, 0,0, 0x00, 0x00, '\r', '\n' };
volatile bool mpuInterrupt = false;     // indicates whether MPU interrupt pin has gone high
void dmpDataReady() {
  mpuInterrupt = true;
}

  // 추가 부분
    
  int report = 50;
  int cnt = 0;
  int read7 = 0;
  int read6 = 0;
  int reportPushState = 0;

  // ## 추가한다
  int read_check = 0;
  // ## 추가한다
  
  // 추가 부분

void setup() {
  Wire.begin();
  Wire.setClock(400000); // 400kHz I2C clock. Comment this line if having compilation difficulties
  Serial.begin(9600);
  while (!Serial); // wait for Leonardo enumeration, others continue immediately
  Serial.println(F("Initializing I2C devices..."));
  mpu.initialize();
  pinMode(INTERRUPT_PIN, INPUT);
  Serial.println(F("Testing device connections..."));
  Serial.println(mpu.testConnection() ? F("MPU6050 connection successful") : F("MPU6050 connection failed"));
  Serial.println(F("\nSend any character to begin DMP programming and demo: "));
  Serial.println(F("Initializing DMP..."));
  devStatus = mpu.dmpInitialize();
  mpu.setXGyroOffset(220);
  mpu.setYGyroOffset(76);
  mpu.setZGyroOffset(-85);
  mpu.setZAccelOffset(1788); // 1688 factory default for my test chip
  if (devStatus == 0) {
    Serial.println(F("Enabling DMP..."));
    mpu.setDMPEnabled(true);
    Serial.println(F("Enabling interrupt detection (Arduino external interrupt 0)..."));
    // Serial.available() 지우고 인터럽트 발생시킴
    attachInterrupt(digitalPinToInterrupt(INTERRUPT_PIN), dmpDataReady, RISING);
    mpuIntStatus = mpu.getIntStatus();
    Serial.println(F("DMP ready! Waiting for first interrupt..."));
    dmpReady = true;
    packetSize = mpu.dmpGetFIFOPacketSize();
  } else {
    Serial.print(F("DMP Initialization failed (code "));
    Serial.print(devStatus);
    Serial.println(F(")"));
  }
  // pinMode(LED_PIN, OUTPUT); 삭제

  // 추가 부분
  
  pinMode(7, INPUT); // red button Pin
  pinMode(6, INPUT); // black button Pin
  pinMode(5, OUTPUT); // Buzzer Pin

  // 추가 부분

}

void loop() {

  // 추가 부분

    cnt++; // 위에서 선언
    if(cnt>10000){
      cnt = 0;
      report = 50;
      reportPushState = 50;
    }

    ////////// button //////////
    read7 = digitalRead(7); // 위에서 선언
    read6 = digitalRead(6); // 위에서 선언
    if(read7 == HIGH) {
      report = 119; // 위에서 선언
      reportPushState = 119;
      cnt = 1;
    }
    if(read6 == HIGH) {
      report = 77;
      reportPushState = 77;
    }
    ////////// button //////////
    ////////// buzzer //////////
    if(reportPushState == 119){
      if(cnt % 700 == 0){
        if((cnt/700)%2 == 1){
          tone(5 , 622, 500);
        } else {
          tone(5 , 523, 500);
        }
      }
      digitalWrite(9, HIGH); // LED
    } else {
      digitalWrite(9, LOW);
      noTone(5);
    }
    ////////// buzzer //////////

  // 추가 부분

  if (!dmpReady) return;
  while (!mpuInterrupt && fifoCount < packetSize) {}
  mpuInterrupt = false;
  mpuIntStatus = mpu.getIntStatus();
  fifoCount = mpu.getFIFOCount();
  if ((mpuIntStatus & 0x10) || fifoCount == 1024) {
    mpu.resetFIFO();
    Serial.println(F("FIFO overflow!"));
  } else if (mpuIntStatus & 0x02) {
    while (fifoCount < packetSize) fifoCount = mpu.getFIFOCount();
    mpu.getFIFOBytes(fifoBuffer, packetSize);
    fifoCount -= packetSize;

    #ifdef OUTPUT_READABLE_YAWPITCHROLL
      // display Euler angles in degrees
      mpu.dmpGetQuaternion(&q, fifoBuffer);
      mpu.dmpGetGravity(&gravity, &q);
      mpu.dmpGetYawPitchRoll(ypr, &q, &gravity);
      Serial.print("ypr:");
      Serial.print(int(ypr[0] * 180/M_PI));
      Serial.print(":");
      Serial.print(int(ypr[1] * 180/M_PI));
      Serial.print(":");
      Serial.print(int(ypr[2] * 180/M_PI));
      Serial.print(": >> on / off << :");
      Serial.print(report);
      Serial.println(": 끝");

    #endif

    blinkState = !blinkState;
    // digitalWrite(LED_PIN, blinkState); 삭제
  }
  
}