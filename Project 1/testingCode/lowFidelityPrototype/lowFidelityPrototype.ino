/*
  Yasmine Samir Abdelrahnan Sept 2021 
  When the toggle button turns ON, the game starts and the lights turn green (written in OLED screen)
  Using a random number countdown, when the integer reaches 0, the lights turn red (OLED screen)
  When lights are red, buzzer beeps
  Lights turn back to green once user presses the button

  Ultrasonic distance sensor code is referenced from https://randomnerdtutorials.com/complete-guide-for-ultrasonic-sensor-hc-sr04/
*/

#include "Arduino_SensorKit.h"

//Defining pins of buttons + buzzer
#define togglePin 10  //togglePin -> ON/OFF button
#define buttonPin 13  //Button to reset game once it turns into red light and movement is sensed
#define buzzer 5      //buzzer for alerting the user when it is red light and movement is sensed

//For ultrasonic sensor
#define trigPin 8 //attach pin 8 to Trig 
#define echoPin 9 // attach pin 9 to Echo
long duration, cm, inches;

//define button variables
int toggle = 0;
int button = 0;

bool resetRed = false;

//Idetify which phase the game is at: OFF, GREEN, RED
String currentMove = "GREEN";
 
void setup(){  
  pinMode(togglePin, INPUT);
  pinMode(buttonPin, INPUT);
  pinMode(buzzer, OUTPUT);

  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  
  Serial.begin(9600);
  
  Oled.begin();
  Oled.setFlipMode(true);
}
 
void loop(){
  //Set Oled screen
  Oled.setFont(u8x8_font_chroma48medium8_r);
  Oled.setCursor(0, 3);
  
  toggle = digitalRead(togglePin);
  button = digitalRead(buttonPin);
  
  if(toggle == HIGH) {
    //Start game only if toggle button is ON
    //Serial.println("Button is ON");
    if (currentMove == "GREEN") {
        greenLight();
    } else if (currentMove == "RED  ") {
        redLight();      
    } 
    
    //guage distance between the user's hand and end goal
    trackDistance();

  } else if (toggle == LOW){
    //turn OFF game if toggle button is OFF
    currentMove = "OFF  ";
    Oled.print(currentMove);
    noTone(buzzer);
  }
  Serial.println(currentMove); //Display currentMove in serial monitor
}

void trackDistance() {
  //  Ultrasonic distance tracker code referenced from https://randomnerdtutorials.com/complete-guide-for-ultrasonic-sensor-hc-sr04/
  // The sensor is triggered by a HIGH pulse of 10 or more microseconds.
  // Give a short LOW pulse beforehand to ensure a clean HIGH pulse:
  digitalWrite(trigPin, LOW);
  delayMicroseconds(5);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
 
  // Read the signal from the sensor: a HIGH pulse whose
  // duration is the time (in microseconds) from the sending
  // of the ping to the reception of its echo off of an object.
  pinMode(echoPin, INPUT);
  duration = pulseIn(echoPin, HIGH);
 
  // Convert the time into a distance
  cm = (duration/2) / 29.1;     // Divide by 29.1 or multiply by 0.0343
  inches = (duration/2) / 74;   // Divide by 74 or multiply by 0.0135

  Serial.print("Distance: ");
//  Serial.print(inches);
//  Serial.print("in, ");
  Serial.print(cm);
  Serial.print("cm");
  Serial.println();
  //End of reference
}

void greenLight() {
 noTone(buzzer);
 //Display GREEN on Oled
 Oled.print(currentMove);

  //generate a random number from 5 to 10
  int randNumber = random(5, 10);
  Serial.print("randNumber: ");
  Serial.println(randNumber);

  //Countdown from random number using a for loop
  for (int i = randNumber; i > 0; i--) {
  Serial.println(i);  //display number in serial monitor
  Oled.setCursor(0, 5);
  Oled.print(i);
  delay(1000);

  //if number reaches 0, then end countdown 
  if (i == 1) {
      Serial.println("Time's Up");
      currentMove = "RED  ";  //move to function redLight() by changing currentMove
      delay(500);
      return;
      }
    }
  Oled.print(" ");
}

void redLight() {
  currentMove = "RED  ";
  Oled.print(currentMove);   //Display RED on Oled

  tone(buzzer, 523);        //Once it is red start buzzer, plays note C5

  //If button to reset buzzer is pressed, change boolean
  if (button == HIGH) {
    resetRed = true;
  } 

  //Actions to stop buzzer 
  if (resetRed == true) {
    noTone(buzzer);         //stop buzzer from ringing
    currentMove = "GREEN";  //return back to greenlight() by changing currentMove
    Serial.println(resetRed);
    resetRed = false;       //reset button
  }
}
