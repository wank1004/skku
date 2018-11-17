#include<Wire.h>
#include<LiquidCrystal_I2C.h>
#include<SoftwareSerial.h>

#define Pump 2
LiquidCrystal_I2C lcd(0x27, 16,2); 

void offlineControl(){
  int Moisture = analogRead(A3);
  int per = map(Moisture, 1023, 0, 0, 100);
  displayLCD(per);
  controlPump(per);
}
void controlPump(int mdata){
  if(mdata<30){
    while(mdata<=70){
      digitalWrite(Pump, LOW);
      delay(1000);
      digitalWrite(Pump, HIGH);
    }
    delay(1000);
  }
  else{
    digitalWrite(Pump, HIGH);
  }
  delay(1000);
}
void displayLCD(int mdata){
  lcd.setCursor(0,0);
  lcd.print("Humidity =");
  lcd.setCursor(11,0);
  lcd.print(mdata);
  if(mdata==100){
    lcd.setCursor(14,0);
    lcd.print("%");
  }
  else if(mdata>=10){
   lcd.setCursor(13,0);
  lcd.print("%"); 
  }
  else{
   lcd.setCursor(12,0);
  lcd.print("%"); 
  }
}

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);  
  pinMode(Pump, OUTPUT);
  digitalWrite(Pump, HIGH); 
  lcd.init();
  lcd.backlight();
}

void loop() {
  // put your main code here, to run repeatedly:
  offlineControl();
  
  char hum = Serial.read();
  Serial.println(hum);
}

