var localStorage = window.localStorage;

var items = [];

items[0] = [];	
	items[0][0] = "화분 1";					//이름
	items[0][1] = "20";						//습도
	items[0][2] = "2018";					//년
	items[0][3] = "2";						//월
	items[0][4] = "19";						//일
	items[0][5] = "17";						//시
	items[0][6] = "22";						//분
	items[0][7] = "img/pot1.jpg";			//이미지
	items[0][8] = false;					//변경 확인용

items[1] = [];
	items[1][0] = "화분 2";
	items[1][1] = "42";							
	items[1][2] = "2018";					
	items[1][3] = "5";							
	items[1][4] = "30";							
	items[1][5] = "16";							
	items[1][6] = "59";							
	items[1][7] = "img/pot2.jpg";
	items[1][8] = false;

items[2] = [];
	items[2][0] = "화분 3";
	items[2][1] = "67";						
	items[2][2] = "2018";					
	items[2][3] = "4";						
	items[2][4] = "1";						
	items[2][5] = "6";						
	items[2][6] = "7";						
	items[2][7] = "img/pot3.jpg";
	items[2][8] = false;

items[3] = [];
	items[3][0] = "화분 4";
	items[3][1] = "82";						
	items[3][2] = "2018";					
	items[3][3] = "12";						
	items[3][4] = "4";						
	items[3][5] = "7";						
	items[3][6] = "22";						
	items[3][7] = "img/pot4.jpg";
	items[3][8] = false;

items[4] = [];
	items[4][0] = "화분 5";
	items[4][1] = "100";						
	items[4][2] = "2018";					
	items[4][3] = "10";						
	items[4][4] = "9";						
	items[4][5] = "20";						
	items[4][6] = "2";						
	items[4][7] = "img/pot5.jpg";
	items[4][8] = false;



localStorage.setItem("items", JSON.stringify(items));