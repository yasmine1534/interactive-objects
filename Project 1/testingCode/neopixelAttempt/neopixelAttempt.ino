/*
  Yasmine Samir Abdelrahnan Sept 2021
  This code takes Input from the potentiometer 
  Added the basic functionality of ultrasonic sensor using the library "NewPing"
  
  NewPing Referenced from https://bitbucket.org/teckel12/arduino-new-ping/wiki/Home#!simple-newping-sketch

  toggle button state with a push button referenced from https://www.youtube.com/watch?v=Q9OhOZTY9oI LearnEDU
  Changed variable names, added Serial.println for debugging and added function StartGame

*/
#include "Arduino_SensorKit.h"
#include <Adafruit_NeoPixel.h>
#include <NewPing.h>

//For ultrasonic sensor
#define trigPin 7 //Assign trigPin to pin 7
#define echoPin 8 //Assign echoPin to pin 8
#define maxDistance 400 // Maximum distance we want to ping for (in centimeters). Maximum sensor distance is rated at 400-500cm.

NewPing sonar(trigPin, echoPin, maxDistance); // NewPing setup of pins and maximum distance.

//For push button
#define buttonPin 4 //Assign button to pin 4
int buttonState = 0;
bool ON = false;

//For neopixel
#define LED_PIN 10    //Assign neopixel to pin 13
#define LED_COUNT 0         //  Set pixel's color (in RAM)


#define LEDPin 6
//uint32_t color = strip.Color(0, 255, 0);

Adafruit_NeoPixel strip(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);

void setup() {
  Serial.begin(9600); // Communicate with Serial Monitor
  pinMode(LEDPin, OUTPUT);
  pinMode(buttonPin, INPUT);

  strip.begin();           // INITIALIZE NeoPixel strip object (REQUIRED)
  strip.show();            // Turn OFF all pixels ASAP
  strip.setBrightness(32); // Set BRIGHTNESS to about 1/5 (max = 255)
}

void loop() {
  //delay(50);                     // Wait 50ms between pings (about 20 pings/sec). 29ms should be the shortest delay between pings.
//  Serial.print("Ping: ");
//  Serial.print(sonar.ping_cm()); // Send ping, get distance in cm and print result (0 = outside set distance range)
//  Serial.println("cm");

  buttonState = digitalRead(buttonPin);
  strip.clear();
 
  if (buttonState == HIGH) {
    //check if button is being pressed
    if (ON == true) {
      //while button is pressedm check if game is ON or OFF
      //if game is already ON, turn it OFF
      ON = !ON;
    } else {
      //if game is OFF, turn it ON
      ON = true;
    }
  }
  
  if (ON == true) {
    //if the game is ON, run the game
    startGame();
    } else {
    Serial.println("Game OFF");
    digitalWrite(LEDPin, LOW);
    strip.clear();
  }
  strip.show();
  delay(100);
}

void startGame() {
  Serial.println("Start Game");
  digitalWrite(LEDPin, HIGH);
  //turn the LED ON
  strip.setPixelColor(0, 0, 255, 0);
  strip.show();
  //delay(50);
}
