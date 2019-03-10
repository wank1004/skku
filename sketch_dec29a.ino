#include<Wire.h>
#include<LiquidCrystal_I2C.h>
#include<SoftwareSerial.h>

#define Pump 2
LiquidCrystal_I2C lcd(0x27, 16,2); 
int start_point = 0;
int end_point = 5;
int mCheck = 0;

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
  int Moisture = analogRead(A3);
  int per = map(Moisture, 1023, 0, 0, 100);
  String percentage = String(per);
  percentage.concat("%");
  
  if(per<=start_point){
    mCheck = 1;
  }
  else if(per>=end_point){
    mCheck = 2; 
  }
  else{
    mCheck = 0; 
  }
  
  lcd.setCursor(0,0);
  lcd.print("Humidity = ");
  lcd.print(percentage);
  
  if(mCheck == 1){
    digitalWrite(Pump, HIGH); 
  }
  else if(mCheck == 2){
    digitalWrite(Pump, LOW); 
  }
  else{
    digitalWrite(Pump, LOW); 
  }
  Serial.println(per);
  delay(2000);
  lcd.clear();
}

