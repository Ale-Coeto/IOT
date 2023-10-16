#include <SocketIoClient.h>
#include <WebSocketsClient.h>
#include <SocketIoClient.h>
#include <ArduinoJson.h>

#include <Arduino.h>
#include <ESP8266WiFi.h>

 
const char* ssid = "Decored20";
const char* pass = "_";
const char* host = "192.168.68.121";
int port = 3001;

SocketIoClient webSocket;


void setup() {
    Serial.begin(115200);

    connectWifi();
    
    webSocket.on("receive_message", handleMessage);
    webSocket.begin(host, port);
    
}

void loop() {
    webSocket.loop();
//    sendMessage();
}




void connectWifi() {
    WiFi.begin(ssid, pass);
    while(WiFi.status() != WL_CONNECTED) {
      Serial.print('.');
      delay(1000);
    }

    Serial.println("Wifi connected");
    Serial.print("IP adress: ");
    Serial.println(WiFi.localIP());
}


void findNetwork() {
  int numberOfNetwork = WiFi.scanNetworks();
    Serial.println("______________");
    
    for (int i = 0; i < numberOfNetwork; i++) {
        Serial.print("networkName: ");
        Serial.println(WiFi.SSID(i));
        Serial.print("signalStrength: ");
        Serial.println(WiFi.RSSI(i));
    }
}

void handleMessage(const char* message, size_t length) {
  DynamicJsonDocument doc(1024);
  deserializeJson(doc, message);
  
  String msg = doc["receive_message"];
  Serial.print(msg);
}

void sendMessage() {
  StaticJsonDocument<70> doc;
  String json;
  doc["message"] = "hellowrld";
  serializeJson(doc,json);
  
  const char* jsonC = json.c_str();
  webSocket.emit("send_message",jsonC); 
  
}
