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
	window.parent.location.replace("Main.html");
	alert("잘못된 조작입니다.");
}
var new_name = document.getElementById("product_name");
var new_date = document.getElementById("watering_date");
var new_time = document.getElementById("watering_time");
var new_term = document.getElementById("watering_days");
var term_type = document.getElementById("day_type");
var new_amount = document.getElementById("watering_amount");

new_name.placeholder = items_db[cnt][0];
new_term.placeholder = items_db[cnt][10];
term_type.seleted = items_db[cnt][11];
new_amount.placeholder = items_db[cnt][12];

function save_change(){
	var set_date = new_date.value.split("-");
	var set_time = new_time.value.split(":");
	var set_name = new_name.value;
	
	if(term_type.value = "day")
		set_date[2] = set_date[2] + new_term;
	else if(term_type.value = "week")
		set_date[2] = set_date[2] + (new_term * 7);
	else if(term_type.value = "month")
		set_date[1] = set_date[1] + new_term;
	else if(term_type.value = "year")
		set_date[0] = set_date[0] + new_term;
	
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
	if(new_term.value!="")
		items_db[cnt][10] = new_term.value;
	if(term_type.value!="")
		items_db[cnt][11] = term_type.value;
	if(new_amount.value!="")
		items_db[cnt][12] = new_amount.value;
	
	items_db[cnt][8]=false;
	items_db[cnt][9]=false;
	localStorage.setItem("items", JSON.stringify(items_db));
	window.parent.location.replace("Main.html");
	alert("변경 성공!");
}
		
function cancel_change(){
	items_db[cnt][8] = false;
	window.parent.location.replace("Main.html");
	alert("변경을 취소하셨습니다.");
}