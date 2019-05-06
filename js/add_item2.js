var localStorage = window.localStorage;
var items_db = JSON.parse(localStorage.getItem("items"));

var new_name = document.getElementById("product_name");
var new_date = document.getElementById("watering_date");
var new_time = document.getElementById("watering_time");
var new_term = document.getElementById("watering_days");
var term_type = document.getElementById("day_type");
var new_amount = document.getElementById("watering_amount");

function save_change(){
	var check = check_blank();

	if(check)
		return;
	
	var len = items_db.length;
	var set_time = new_time.value.split(":");
	
	items_db[len] = [];
	
	calculate_date(len);
	
	items_db[len][0] = new_name.value;
	items_db[len][1] = ""; 				//습도
	items_db[len][5] = set_time[0];
	items_db[len][6] = set_time[1];
	items_db[len][7] = "";				//이미지
	items_db[len][8] = false;
	items_db[len][9] = false;
	items_db[len][10] = new_term.value;
	items_db[len][11] = term_type.value;
	items_db[len][12] = new_amount.value;
	localStorage.setItem("items", JSON.stringify(items_db));
	window.parent.location.replace("Main.html");
	alert("추가 성공!");
}
function check_blank(){
	var cnt = 0;
	
	if(new_name.value==""){
		alert("화분 이름을 입력해주세요.");
		cnt = cnt-1;
	}
	if(new_date.value == ""){
		alert("급수 기준 날짜를 입력해주세요.");
		cnt = cnt-1;
	}
	if(new_time.value == ""){
		alert("급수 시간을 입력해주세요.");
		cnt = cnt-1;
	}
	if(new_term.value == ""){
		alert("급수 주기를 입력해주세요.");
		cnt = cnt-1;
	}
	if(new_amount.value == ""){
		alert("급수량을 입력해주세요.");
		cnt = cnt-1;
	}
	if(cnt<0)
		return 1;
	else
		return 0;
}
function calculate_date(len){
	var set_date = new_date.value.split("-");
	
	var day = parseInt(set_date[2]);
	var month = parseInt(set_date[1]);
	var year = parseInt(set_date[0]);
	var term = parseInt(new_term.value);
	var type = term_type.options[term_type.selectedIndex].value;
	
	if(type == "day")
		day = day + term;
	else if(type == "week")
		day = term * 7 + day;
	else if(type == "month")
		month = month + term;
	else if(type == "year")
		year = year + term;

	var check = check_month(month);

	if(day>30){
		while(day>=30){
			if(check==1){
				day = day-30;
				month = month+1;
			}
			else if(check==0 && day>31){
				day = day-31;
				month = month+1;
			}
			else if(check==2 && year%4==0){
				day = day-29;
				month = month+1;
			}
			else if(check==2 && year%4!=0){
				day = day-28;
				month = month+1;
			}
			else
				break;
			check = check_month(month);
		}
	}
	if(month>12){
		while(month>12){
			month = month-12;
			year = year+1;
		}
	}
	items_db[len][2] = year;
	items_db[len][3] = month;
	items_db[len][4] = day;
	localStorage.setItem("items", JSON.stringify(items_db));
	
}
function check_month(month){
	
	var new_month = month%12;
	
	if(new_month==2)
		return 2;
	else if(new_month==4 || new_month==6 || new_month==9 || new_month == 11)
		return 1;
	else
		return 0;
}

function cancel_change(){
	window.parent.location.replace("Main.html");
	alert("변경을 취소하셨습니다.");
}