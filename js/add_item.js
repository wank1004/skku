var localStorage = window.localStorage;
var items_db = JSON.parse(localStorage.getItem("items"));

var new_name = document.getElementById("product_name");
var start = document.getElementById("start_moisture");
var end = document.getElementById("end_moisture");


function save_change(){
	var cnt = 0;
	if(new_name.value==""){
		alert("화분 이름을 입력해주세요.");
		cnt = cnt-1;
	}
	if(start.value == ""){
		alert("급수 시작 습도를 입력해주세요.");
		cnt = cnt-1;
	}
	if(end.value == ""){
		alert("급수 종료 습도를 입력해주세요.");
		cnt = cnt-1;
	}
	if(cnt<0)
		return;
	
	var len = items_db.length;

	items_db[len] = [];
	items_db[len][0] = new_name.value;
	items_db[len][1] = ""; 				//습도
	items_db[len][2] = "";
	items_db[len][3] = "";
	items_db[len][4] = "";
	items_db[len][5] = "";
	items_db[len][6] = "";
	items_db[len][7] = "";				//이미지
	items_db[len][8] = false;
	items_db[len][9] = true;
	items_db[len][10] = start.value;
	items_db[len][11] = end.value;
	items_db[len][12] = "";
	localStorage.setItem("items", JSON.stringify(items_db));
	
}
		
function cancel_change(){
	window.parent.location.replace("Main.html");
	alert("변경을 취소하셨습니다.");
}