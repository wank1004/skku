#include<Wire.h>
#include<LiquidCrystal_I2C.h>
#include<SoftwareSerial.h>

#define Pump 2
LiquidCrystal_I2C lcd(0x27, 16,2); 
int start_point = 30;
int end_point = 70;

void controlPump(int mdata, int start_point, int end_point){
  if(mdata<=start_point){
    while(mdata<end_point){
      digitalWrite(Pump, HIGH);
    }
    delay(1000);
  }
  else{
    digitalWrite(Pump, LOW);
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
void offlineControl(int start_point, int end_point){
  int Moisture = analogRead(A3);
  int per = map(Moisture, 1023, 0, 0, 100);
  displayLCD(per);
  controlPump(per, start_point, end_point);
}
/*For online periodical water supply */
void PeriodicPumpControl(unsigned long sec){
  sec = sec*1000;
  unsigned long start = millis();
  while(millis()-start<sec){
   digitalWrite(Pump, HIGH); //Turn on Pump
  }
  digitalWrite(Pump, LOW); //Turn off Pump
}
void turn_off_pump(){
 digitalWrite(Pump, LOW); 
}
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);  
  pinMode(Pump, OUTPUT);
  digitalWrite(Pump, LOW);
  lcd.init();
  lcd.backlight();
}

void loop() {
  // put your main code here, to run repeatedly:
  offlineControl(start_point, end_point);
  //PeriodicPumpControl(5);
  /*char hum = Serial.read();
  Serial.println(hum);*/
}

