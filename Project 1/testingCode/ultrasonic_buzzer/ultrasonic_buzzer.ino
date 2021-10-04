/*
  Yasmine Samir Abdelrahnan Sept 2021
  When the toggle button turns ON, the game starts and the lights turn green (written in OLED screen)
  Using a random number countdown, when the integer reaches 0, the lights turn red (OLED screen)
  When lights are red, buzzer beeps
  Lights turn back to green once user presses the button

  Ultrasonic distance sensor code is referenced from https://randomnerdtutorials.com/complete-guide-for-ultrasonic-sensor-hc-sr04/
*/

#include "Arduino_SensorKit.h"

// defines pins numbers
#define trigPin 8
#define echoPin 9

#define buzzer 7

// defines variables
long duration;
int distance;
int safetyDistance;

void setup() {
  Serial.begin(9600);

  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT); // Sets the echoPin as an Input
  pinMode(buzzer, OUTPUT);
}

void loop() {
  trackDistance();

  tone(buzzer, 523);
}

void trackDistance() {
  // Clears the trigPin
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  // Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin, HIGH);

  // Calculating the distance
  distance = duration * 0.034 / 2;

  // Prints the distance on the Serial Monitor
  Serial.print("Distance: ");
  Serial.println(distance);
}
