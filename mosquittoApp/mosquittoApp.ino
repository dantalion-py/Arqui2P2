#include <WiFi.h>
#include <PubSubClient.h>
#include <OneWire.h>
#include <DallasTemperature.h>

// Configuración de red Wi-Fi
const char* ssid = "saitama123";
const char* password = "12345678";

// Configuración del broker MQTT (dirección IP de Google Cloud y puerto)
const char* mqtt_server = "35.193.61.252";  // Cambia a la IP pública de tu instancia en Google Cloud
const int mqtt_port = 1883;               // Puerto predeterminado MQTT

WiFiClient espClient;
PubSubClient client(espClient);

// Pines de datos de los sensores DS18B20
#define ONE_WIRE_BUS1 13
#define ONE_WIRE_BUS2 26

OneWire oneWire1(ONE_WIRE_BUS1);
OneWire oneWire2(ONE_WIRE_BUS2);
DallasTemperature sensor1(&oneWire1);
DallasTemperature sensor2(&oneWire2);

void setup() {
  Serial.begin(115200);

  // Conectar a la red Wi-Fi
  Serial.print("Conectando a WiFi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi conectado");

  // Configurar el broker MQTT y el callback para recibir mensajes
  client.setServer(mqtt_server, mqtt_port);

  // Iniciar los sensores DS18B20
  sensor1.begin();
  sensor2.begin();
}

void reconnect() {
  // Reintentar la conexión al broker MQTT si no está conectado
  while (!client.connected()) {
    Serial.print("Intentando conectar al broker MQTT...");
    if (client.connect("ESP32Client")) {
      Serial.println("Conectado al broker MQTT");
    } else {
      Serial.print("Fallo, rc=");
      Serial.print(client.state());
      Serial.println("; intentando de nuevo en 5 segundos");
      delay(5000);
    }
  }
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  // Obtener las temperaturas de los sensores
  sensor1.requestTemperatures();
  sensor2.requestTemperatures();

  float temp1 = sensor1.getTempCByIndex(0);
  float temp2 = sensor2.getTempCByIndex(0);

  // Formatear los mensajes con texto
  String mensaje1 = "Temperatura sensor 1: " + String(temp1) + " °C";
  String mensaje2 = "Temperatura sensor 2: " + String(temp2) + " °C";
  
  Serial.print("Publicando: ");
  Serial.println(mensaje1);
  client.publish("sensores/temperatura1", mensaje1.c_str());

  Serial.print("Publicando: ");
  Serial.println(mensaje2);
  client.publish("sensores/temperatura2", mensaje2.c_str());

  // Esperar 5 segundos antes de la siguiente lectura
  delay(5000);
}
