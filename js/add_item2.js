var localStorage = window.localStorage;
var items_db = JSON.parse(localStorage.getItem("items"));

var new_name = document.getElementById("product_name");
var new_date = document.getElementById("watering_date");
var new_time = document.getElementById("watering_time");
var new_term = document.getElementById("watering_days");
var term_type = document.getElementById("day_type");
var new_amount = document.getElementById("watering_amount");


function save_change(){
	var cnt = 0;
	
	if(new_name.value==""){
		alert("화분 이름을 입력해주세요.");
		cnt = cnt-1;
	}
	if(new_date.value = ""){
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
		return;
	
	var len = items_db.length;
	var set_date = new_date.value.split("-");
	var set_time = new_time.value.split(":");

	if(term_type.value = "day")
		set_date[2] = set_date[2] + new_term;
	else if(term_type.value = "week")
		set_date[2] = set_date[2] + (new_term * 7);
	else if(term_type.value = "month")
		set_date[1] = set_date[1] + new_term;
	else if(term_type.value = "year")
		set_date[0] = set_date[0] + new_term;
	
	items_db[len] = [];
	items_db[len][0] = new_name.value;
	items_db[len][1] = ""; 				//습도
	items_db[len][2] = set_date[0];
	items_db[len][3] = set_date[1];
	items_db[len][4] = set_date[2];
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
	alert("변경 성공!");
}
		
function cancel_change(){
	window.parent.location.replace("Main.html");
	alert("변경을 취소하셨습니다.");
}