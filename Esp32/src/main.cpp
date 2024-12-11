#include <Arduino.h>
#include <WiFi.h>
#include <SocketIoClient.h>
#include <SPI.h>
#include <MFRC522.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <ESP32Servo.h>

// define pin and initialize
#define SS_PIN 4
#define RST_PIN 15
#define SERVO_IN_PIN 33
#define SERVO_OUT_PIN 32
#define BUTTON_IN 13
#define BUTTON_OUT 12

#define IR_IN_PIN 34
#define IR_OUT_PIN 35
#define IR_SLOT_1_PIN 14
#define IR_SLOT_2_PIN 25
#define IR_SLOT_3_PIN 26
#define IR_SLOT_4_PIN 27

String lastScanUidIn = "";
String lastScanUidOut = "";
MFRC522 mfrc522(SS_PIN, RST_PIN);
LiquidCrystal_I2C lcd(0x27, 20, 4);
Servo servoIn;
Servo servoOut;

const char *ssid = "AiLoan02";
const char *password = "mancityvodich";
const char *host = "192.168.1.8"; // Địa chỉ IP hoặc tên miền của server
const int port = 3000;

SocketIoClient socket;

// servo
void handleServoButton(int buttonPin, Servo &servo)
{
  if (digitalRead(buttonPin) == HIGH)
  {
    Serial.println("BUTTON_CLICKED");
    delay(25);
    servo.write(90);
    while (digitalRead(buttonPin) == HIGH)
    {
      delay(25);
    }
    delay(1000);
    servo.write(0);
  }
}

// Read RFID card and handle
String getCardUID()
{
  String id = "";
  for (byte i = 0; i < mfrc522.uid.size; i++)
  {
    id += String(mfrc522.uid.uidByte[i], HEX);
  }
  return id;
}

void readCard()
{
  if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial())
  {
    String cardUID = getCardUID();
    if (digitalRead(IR_IN_PIN) == LOW)
    {
      if (cardUID != lastScanUidIn)
      {
        lastScanUidIn = cardUID;
      }
      Serial.println(cardUID);
    }
  }
  mfrc522.PICC_HaltA();
}

void setup()
{
  Serial.begin(9600);
  delay(1000);

  // pinMode(BUTTON_IN, INPUT_PULLUP);
  // pinMode(BUTTON_OUT, INPUT_PULLUP);
  pinMode(IR_IN_PIN, INPUT);
  pinMode(IR_OUT_PIN, INPUT);
  pinMode(IR_SLOT_1_PIN, INPUT);
  pinMode(IR_SLOT_2_PIN, INPUT);
  pinMode(IR_SLOT_3_PIN, INPUT);
  pinMode(IR_SLOT_4_PIN, INPUT);

  WiFi.begin(ssid, password);

  SPI.begin(18, 19, 23);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }

  Serial.println(WiFi.localIP());

  // Initialize RFID
  SPI.begin();
  mfrc522.PCD_Init();

  // Initialize LCD

  lcd.init();
  lcd.clear();

  servoIn.attach(SERVO_IN_PIN);
  servoOut.attach(SERVO_OUT_PIN);
  servoOut.write(0);
  servoIn.write(0);

  // socket.begin(host, port);
}

void loop()
{
  // socket.loop();

  // handleServoButton(BUTTON_IN, servoIn);
  // handleServoButton(BUTTON_OUT, servoOut);
  readCard();
}