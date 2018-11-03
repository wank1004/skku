#include<Wire.h>
#include<LiquidCrystal_I2C.h>
#include<ESP8266WiFi.h>

#define Pump 2
LiquidCrystal_I2C lcd(0x27, 16,2); 
char *ssid = "";
char *password = "";

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);  
  pinMode(Pump, OUTPUT);
  digitalWrite(Pump, HIGH);
  
  WiFi.begin(ssid, password);
  Serial.println();
  While(WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.println("no"); 
  }
  Serial.println();
  
  Serial.println("WiFi connected");
  Serial.println(WiFi.localIP());
  
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
  
  if(per<30){
    while(per<=70){
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

