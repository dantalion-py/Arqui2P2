#include <WiFi.h>
#include <HTTPClient.h>
#include <OneWire.h>
#include <DallasTemperature.h>

// Credenciales Wi-Fi
const char* ssid = "saitama123";
const char* password = "12345678";

// Dirección del servidor API
const char* serverNameTemp = "http://35.193.61.252:5000/registro-temperatura";  // Registro de temperatura
const char* serverNameLed1 = "http://35.193.61.252:5000/led/led1";  // Control de LED1
const char* serverNameLed2 = "http://35.193.61.252:5000/led/led2"; // Control de LED2

// Configuración de los pines para los LEDs
#define pinLed1 27
#define pinLed2 32

// Configuración del sensor DS18B20
#define ONE_WIRE_BUS 13 // Pin para el sensor DS18B20
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

void setup() {
  Serial.begin(115200);

  // Conexión a Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi conectado");

  // Configuración de los pines de los LEDs como salida
  pinMode(pinLed1, OUTPUT);
  pinMode(pinLed2, OUTPUT);

  // Inicializar el sensor de temperatura
  sensors.begin();
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    // Leer la temperatura
    sensors.requestTemperatures();
    float temperatura = sensors.getTempCByIndex(0); // Obtener la temperatura del primer sensor DS18B20

    // Enviar la temperatura al servidor
    sendTemperatureToServer(temperatura);

    // Comprobar el estado actual de los LEDs y actualizar si es necesario
    // Obtener el estado de los LEDs desde el servidor (solo si es necesario)
    getAndControlLED(serverNameLed1);
    getAndControlLED(serverNameLed2);

    delay(5000);  // Esperar 5 segundos antes de repetir
  } else {
    Serial.println("WiFi desconectado");
  }
}

// Función para enviar la temperatura al servidor
void sendTemperatureToServer(float temperatura) {
  HTTPClient http;
  http.begin(serverNameTemp);  // Iniciar la conexión HTTP con el servidor para registrar temperatura
  http.addHeader("Content-Type", "application/json");

  // Crear el JSON para enviar con la temperatura
  String jsonPayload = "{\"temperatura\": " + String(temperatura) + "}";

  int httpResponseCode = http.POST(jsonPayload);  // Enviar el JSON al servidor

  // Comprobar la respuesta del servidor
  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.println("Respuesta del servidor (temperatura): " + response);
  } else {
    Serial.print("Error en la solicitud HTTP: ");
    Serial.println(httpResponseCode);
  }
  http.end();  // Finalizar la conexión HTTP
}

// Función para controlar los LEDs según la respuesta del servidor
void getAndControlLED(const char* server) {
  HTTPClient http;
  http.begin(server);  // Iniciar la conexión HTTP con el servidor para controlar el LED
  http.addHeader("Content-Type", "application/json");

  // Realizar una solicitud GET para obtener el estado actual del LED
  int httpResponseCode = http.GET();  // Realizar la solicitud GET

  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.println("Respuesta del servidor (LED): " + response);

    // Si la respuesta indica que el LED debe estar encendido, encenderlo
    if (response.indexOf("on") >= 0) {
      digitalWrite(pinLed1, HIGH);  // Encender LED
    } else {
      digitalWrite(pinLed1, LOW);  // Apagar LED
    }
  } else {
    Serial.print("Error en la solicitud HTTP: ");
    Serial.println(httpResponseCode);
  }
  http.end();  // Finalizar la conexión HTTP
}
