#include<Wire.h>
#include<LiquidCrystal_I2C.h>
#define Pump 2

LiquidCrystal_I2C lcd(0x27, 16,2); 

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(Pump, OUTPUT);
  digitalWrite(Pump, HIGH);
  lcd.init();
  lcd.backlight();
}

void loop() {
  // put your main code here, to run repeatedly:
  int Moisture = analogRead(A3);
  lcd.setCursor(0,0);
  lcd.print("Moisture= ");
  lcd.setCursor(0,1);
  lcd.print(Moisture);
  
  if(Moisture>700){
    Serial.println("Pump on");
    while(Moisture<=700){
      digitalWrite(Pump, LOW);
      delay(1000);
      digitalWrite(Pump, HIGH);
    }
    delay(1000);
  }
  else{
    Serial.println("Pump off");
    digitalWrite(Pump, HIGH);
  }
  delay(1000);
}
