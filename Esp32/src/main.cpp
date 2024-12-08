#include <Arduino.h>
#include <WiFi.h>
#include <SocketIoClient.h>

const char *ssid = "AiLoan02";
const char *password = "mancityvodich";
const char *host = "192.168.1.9"; // Địa chỉ IP hoặc tên miền của server
const int port = 3000;

SocketIoClient socket;

void setup()
{

  Serial.begin(115200);
  delay(1000);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }

  Serial.println(WiFi.localIP());

  socket.begin(host, port);
}

void loop()
{
  socket.loop();
}