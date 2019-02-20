var localStorage = window.localStorage;
var items_db = JSON.parse(localStorage.getItem("items"));

var cnt = -1;
for(var i=0; i<items_db.length; i++){
	if(items_db[i][8]){
		cnt=i;
		break;
	}
}

if(cnt==-1){
	window.location.replace("Main.html");
	alert("잘못된 조작입니다.");
}
var new_name = document.getElementById("product_name");
new_name.placeholder = items_db[cnt][0];


function save_change(){
	var new_date = document.getElementById("watering_date");
	var new_time = document.getElementById("watering_time");

	var set_date = new_date.value.split("-");
	var set_time = new_time.value.split(":");
	var set_name = new_name.value;
	if(set_name!=""){
		items_db[cnt][0] = set_name;
	}
	if(set_date[0]!=""){
		items_db[cnt][2] = set_date[0];
		items_db[cnt][3] = set_date[1];
		items_db[cnt][4] = set_date[2];
	}
	if(set_time[0]!=""){
		items_db[cnt][5] = set_time[0];
		items_db[cnt][6] = set_time[1];
	}
	
	items_db[cnt][8]=false;
	localStorage.setItem("items", JSON.stringify(items_db));
	window.location.replace("Main.html");
	alert("변경 성공!");
}
		
function cancel_change(){
	window.location.replace("Main.html");
	alert("변경을 취소하셨습니다.");
}