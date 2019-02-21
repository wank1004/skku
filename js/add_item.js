var localStorage = window.localStorage;
var items_db = JSON.parse(localStorage.getItem("items"));

var new_name = document.getElementById("product_name");
var new_date = document.getElementById("watering_date");
var new_time = document.getElementById("watering_time");


function save_change(){
	var len = items_db.length;
	var set_date = new_date.value.split("-");
	var set_time = new_time.value.split(":");

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
	localStorage.setItem("items", JSON.stringify(items_db));
	window.location.replace("Main.html");
	alert("변경 성공!");
}
		
function cancel_change(){
	window.location.replace("Main.html");
	alert("변경을 취소하셨습니다.");
}