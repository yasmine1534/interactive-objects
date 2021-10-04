/*
  Yasmine Samir Abdelrahnan Sept 2021

  When the toggle button turns the device ON
  the game starts and the lights turn green
  Countdown using a random number from 3 to 5
  When the integer/countdown reaches 0, the lights will turn yellow then red
  When lights are red and the player moves, the buzzer beeps
  The player has to start from the beginning and press the button to reset the game
  The LED lights blink to let the player know that game was reset
  If the player does not make any movements during the red light, the game automatically moves back to green light
  This sequence repeats until the player reaches the finish line/goal
  Once the player reaches the game, the lights blink and the game ends

  RGB LED void setColor() referenced from https://www.youtube.com/watch?v=IPOHARgRLE0
  How To Mechatronics. (2015). Arduino RGB LED Tutorial [Video]. YouTube. https://www.youtube.com/watch?v=IPOHARgRLE0

  Ultrasonic distance sensor code is referenced from https://randomnerdtutorials.com/complete-guide-for-ultrasonic-sensor-hc-sr04/
  Complete Guide for Ultrasonic Sensor HC-SR04 with Arduino. (2021, July 21). Random Nerd Tutorials. https://randomnerdtutorials.com/complete-guide-for-ultrasonic-sensor-hc-sr04/
  
*/

#include "Arduino_SensorKit.h"

//Defining pins of buttons + buzzer
#define togglePin 10  //togglePin -> ON/OFF button
#define buttonPin 4  //Button to reset game once it turns into red light and movement is sensed

//Buzzer in the Arduino Sensorkit
#define buzzer 5      //buzzer for alerting the user when it is red light and movement is sensed

//For ultrasonic sensor
#define trigPin 8 //attach pin 8 to Trig 
#define echoPin 9 // attach pin 9 to Echo

//RGB LED pins
#define redLEDPin 11
#define greenLEDPin 12
#define blueLEDPin 13

//define button variables
int toggleState, previousToggleState, button = 0;
bool resetRed, movement = false;

// defines ultrasonic variables
long duration;
int distance, previousDistance, safetyDistance;
int range = 7;

int randNumber, i;

unsigned long currentTime, previousTime, previousTime2, previousTime3;

//Idetify which phase the game is at: OFF, GREEN, RED
String currentMove = "GREEN";

void setup() {
  Serial.begin(9600);

  //buttons
  pinMode(togglePin, INPUT);
  pinMode(buttonPin, INPUT);
  //ultrasonic sensor
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  //buzzer
  pinMode(buzzer, OUTPUT);
  //RGB LED
  pinMode(redLEDPin, OUTPUT);
  pinMode(greenLEDPin, OUTPUT);
  pinMode(blueLEDPin, OUTPUT);


  Oled.begin();
  Oled.setFlipMode(true);

  //generate a random number from 5 to 10 once
  randNumber = random(2, 6);
  i = randNumber;
}

void loop() {
  //Set Oled screen
  Oled.setFont(u8x8_font_chroma48medium8_r);
  //check the current time
  currentTime = millis();

  toggleState = digitalRead(togglePin);
  button = digitalRead(buttonPin);

  if (toggleState == HIGH) {
    //if toggle buttons is currently ON
    if (toggleState != previousToggleState) {
      //toggle button turns from OFF to ON
      Oled.setCursor(0, 3);
      Oled.println("ON");
      delay(1000);
      Oled.clear();
      currentMove = "GREEN";
    } else {
      if (currentMove == "GREEN") {
        greenLight();
      } else if (currentMove == "RED") {
        redLight();
      } else if (currentMove == "CLEAR GAME") {
        clearGame();
      }
      else {
        noTone(buzzer);
      }
    }
    trackDistance();
  } else {
    //turn OFF game if toggle button is OFF
    currentMove = "OFF";
    setColor(0, 0, 0);
    noTone(buzzer);
  }
  previousToggleState = toggleState;
  Oled.setCursor(0, 3);
  Oled.println(currentMove);
  //Serial.println(currentMove); //Display currentMove in serial monitor
}

//Start of reference for ultrasonic distance sensor code
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
  //End of reference for ultrasonic distance sensor code

  if (currentTime - previousTime2 >= 1500) {
    //records down previous distance every 5 seconds
    previousTime2 = currentTime;
    previousDistance = distance;
  }
}

//Start of reference to set RGB LED color
void setColor(int redValue, int greenValue, int blueValue) {
  analogWrite(redLEDPin, redValue);
  analogWrite(greenLEDPin, greenValue);
  analogWrite(blueLEDPin, blueValue);
}
//End of reference to set RGB LED color

void blinkLED() {
  setColor(0, 155, 0);
  delay(100);
  setColor(0, 0, 0);
  delay(100);
  setColor(0, 155, 0);
  delay(100);
  setColor(0, 0, 0);
  delay(100);
}

void greenLight() {
  noTone(buzzer);
  setColor(0, 155, 0);

  //Countdown using a random number for every 1000 seconds
  if (currentTime - previousTime >= 1000) {
    previousTime = currentTime;
    Serial.print("integer: ");
    Serial.println(i);  //display number in serial monitor
    Oled.println(i);

    //if number reaches 0, then end countdown
    if (i == 0) {
      Serial.println("Time's Up");
      setColor(255, 155, 0);
      delay(2500);

      currentMove = "RED";

      randNumber = random(2, 6);
      i = randNumber;
      Oled.clear();
    }
    i--;
  }
  if (distance <= 2) {
    //if distance is less than 2, aka the player reaches the goal, then clear game


    currentMove = "CLEAR GAME";
  }
}

void redLight() {
  //Check if movement has been made since the last time the arduino checks the distance
  unsigned long currentTime2 = millis();

  setColor(155, 0, 0);
  int movedDistance = distance - previousDistance;
  Serial.print("movedDistance: ");
  Serial.println(movedDistance);

  //if movement bigger or smaller than range has been detected, sound the buzzer
  if ((movedDistance > range) || (movedDistance < -range)) {
    movement = true;
  }

  if (movement == true) {
    Serial.println("Movement detected!");
    tone(buzzer, 523);  //Once it is red start buzzer, plays note C5
    //If button to reset buzzer is pressed, change boolean
    if (button == HIGH) {
      resetRed = true;
      movement = false;
    }
  } else if (currentTime2 - previousTime3 >= 15000) {
    previousTime3 = currentTime2;
    currentMove = "GREEN";
  }

  //Actions to stop buzzer and reset back to green light
  if (resetRed == true) {
    //blink green LED twice
    blinkLED();
    currentMove = "GREEN";  //return back to greenlight() by changing currentMove
    resetRed = false;  //reset button
  }
}

void clearGame() {
  blinkLED();
  setColor(0, 0, 0);
  Serial.println("Congrats, you cleared the game!");
}
