#include <Arduino.h>
#include <ESP8266WiFi.h>

void setup() {
    Serial.begin(115200);
    int numberOfNetwork = WiFi.scanNetworks();
    for (int i = 0; i < numberOfNetwork; i++) {
        Serial.print("networkName: ");
        Serial.println(WiFi.SSID(i));
        Serial.print("signalStrength: ");
        Serial.println(WiFi.RSSI(i));
    }
}

void loop() {

}