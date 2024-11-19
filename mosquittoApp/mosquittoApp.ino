#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "saitama123";
const char* password = "12345678";

#define pinLed1 27
#define pinLed2 32

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  pinMode(pinLed1, OUTPUT);
  pinMode(pinLed2, OUTPUT);
  digitalWrite(pinLed1, LOW);
  digitalWrite(pinLed2, LOW);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi conectado");
}

void loop() {
  HTTPClient http;
  http.begin("http://35.193.61.252:5000/led_states");

  int httpCode = http.GET();
  if (httpCode > 0) {
    String response = http.getString();
    if (response.indexOf("\"led1\":true") != -1) {
      digitalWrite(pinLed1, HIGH);
    } else {
      digitalWrite(pinLed1, LOW);
    }
    if (response.indexOf("\"led2\":true") != -1) {
      digitalWrite(pinLed2, HIGH);
    } else {
      digitalWrite(pinLed2, LOW);
    }
  }
  http.end();
  delay(5000);
}
