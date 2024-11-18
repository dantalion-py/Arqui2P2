#include <WiFi.h>
#include <HTTPClient.h>
#include <OneWire.h>
#include <DallasTemperature.h>

const char* ssid = "saitama123";
const char* password = "12345678";

// Dirección del servidor de la API (IP de tu instancia de Google Cloud y puerto)
const char* serverName = "http://35.193.61.252:5000/registro-temperatura";

#define ONE_WIRE_BUS1 13
#define ONE_WIRE_BUS2 26


#define pinLed1 27
#define pinLed1 32

OneWire oneWire1(ONE_WIRE_BUS1);
OneWire oneWire2(ONE_WIRE_BUS2);
DallasTemperature sensors1(&oneWire1);
DallasTemperature sensors2(&oneWire2);

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi conectado");

  sensors1.begin();
  sensors2.begin();
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    sensors1.requestTemperatures();
    sensors2.requestTemperatures();

    float temp1 = sensors1.getTempCByIndex(0);
    float temp2 = sensors2.getTempCByIndex(0);

    if (temp1 != DEVICE_DISCONNECTED_C && temp2 != DEVICE_DISCONNECTED_C) {
      HTTPClient http;
      http.begin(serverName);
      http.addHeader("Content-Type", "application/json");

      // Construir el JSON con las temperaturas
      String jsonPayload = "{\"temperatura\": " + String(temp1) + ", \"temperatura2\": " + String(temp2) + "}";
      int httpResponseCode = http.POST(jsonPayload);

      if (httpResponseCode > 0) {
        String response = http.getString();
        Serial.println("Respuesta del servidor: " + response);
      } else {
        Serial.print("Error en la solicitud HTTP: ");
        Serial.println(httpResponseCode);
      }
      http.end();
    } else {
      Serial.println("No se pudo leer la temperatura del sensor");
    }

    delay(5000);  
  } else {
    Serial.println("WiFi desconectado");
  }
}