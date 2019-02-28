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
	
	
	
	if(set_name!=""){
		items_db[cnt][0] = set_name;
	}
	if(set_date[0]!=""){
		/*items_db[cnt][2] = set_date[0];
		items_db[cnt][3] = set_date[1];
		items_db[cnt][4] = set_date[2];*/
		var day = parseInt(set_date[2]);
		var month = parseInt(set_date[1]);
		var year = parseInt(set_date[0]);
		var term = parseInt(new_term.value);
		var type = term_type.options[term_type.selectedIndex].value;
		var check = check_month(month);
		
		calculate_date(cnt);
		
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
function check_month(month){
	
	var new_month = month%12;
	
	if(new_month==2)
		return 2;
	else if(new_month==4 || new_month==6 || new_month==9 || new_month == 11)
		return 1;
	else
		return 0;
}
function calculate_date(cnt){
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
	items_db[cnt][2] = year;
	items_db[cnt][3] = month;
	items_db[cnt][4] = day;
	localStorage.setItem("items", JSON.stringify(items_db));
	
}	
function cancel_change(){
	items_db[cnt][8] = false;
	window.parent.location.replace("Main.html");
	alert("변경을 취소하셨습니다.");
}