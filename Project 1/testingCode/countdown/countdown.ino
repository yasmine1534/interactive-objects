
#include "Arduino_SensorKit.h"

unsigned long currentTime, previousTime = 0;
int randNumber, i;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  Oled.begin();
  Oled.setFlipMode(true);
  randNumber = random(5, 10);
  i = randNumber;
}

void loop() {
  // put your main code here, to run repeatedly:
  Oled.setFont(u8x8_font_chroma48medium8_r);
  currentTime = millis();

  if (currentTime - previousTime >= 1000) {
    previousTime = currentTime;
    Serial.print("integer: ");
    Serial.println(i);  //display number in serial monitor
    Oled.setCursor(0, 5);
    Oled.println("GREEN");
    Oled.println(i);
    
    //if number reaches 0, then end countdown
    if (i == 0) {
      Serial.println("Time's Up");
      Oled.println("RED");
      
      randNumber = random(5, 10);
      i = randNumber;
      Oled.clear();
    }
    i--;
  }
}
