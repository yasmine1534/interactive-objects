/*
  Yasmine Samir Abdelrahnan Sept 2021
  When the toggle button turns ON, the game starts and the lights turn green (written in OLED screen)
  Using a random number countdown, when the integer reaches 0, the lights turn red (OLED screen)
  When lights are red, buzzer beeps
  Lights turn back to green once user presses the button

  Ultrasonic distance sensor code is referenced from https://randomnerdtutorials.com/complete-guide-for-ultrasonic-sensor-hc-sr04/
*/

#include "Arduino_SensorKit.h"
#include <NewPing.h>

//For ultrasonic sensor
#define triggerPin 8 //attach pin 8 to Trig 
#define echoPin 9 // attach pin 9 to Echo
#define maxDistance 400

#define togglePin 10  //togglePin -> ON/OFF button

//define button variables
int toggleState = 0;

NewPing sonar(triggerPin, echoPin, maxDistance);

void setup() {
  Serial.begin(9600);

  Oled.begin();
  Oled.setFlipMode(true);
}

void loop() {
  //Set Oled screen
  Oled.setCursor(0, 3);
  Oled.setFont(u8x8_font_chroma48medium8_r);

  toggleState = digitalRead(togglePin);
  
  if (toggleState == HIGH) {
    trackDistance();
  } else {
    //turn OFF game if toggle button is OFF
    Serial.println("OFF");
    Oled.print("OFF");
  }
}

void trackDistance() {
  delay(50);
  unsigned int distance = sonar.ping_cm();
  Serial.print(distance);
  Serial.println("cm");

  Oled.print(distance);
  Oled.println(" cm");
}
