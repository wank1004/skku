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
  int per = map(Moisture, 1023, 0, 0, 100);
  lcd.setCursor(0,0);
  lcd.print("Humidity =");
  lcd.setCursor(11,0);
  lcd.print(per);
  if(per==100){
    lcd.setCursor(14,0);
    lcd.print("%");
  }
  else if(per>=10){
   lcd.setCursor(13,0);
  lcd.print("%"); 
  }
  else{
   lcd.setCursor(12,0);
  lcd.print("%"); 
  }
  
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
