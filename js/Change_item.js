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
/*if(!items_db[cnt][9]){
	window.parent.location.replace("Main.html");
	alert("비정상적인 접속입니다.");
}*/
var new_name = document.getElementById("product_name");
var start = document.getElementById("start_moisture");
var end = document.getElementById("end_moisture");
new_name.placeholder = items_db[cnt][0];
start.placeholder = itmes_db[cnt][10];
end.placceholder = items_db[cnt][11];


function save_change(){
	if(new_name.value != "")
		items_db[cnt][0] = new_name.value;
	if(start.value != "")
		items_db[cnt][10] = start.value;
	if(end.value != "")
		items_db[cnt][11] = end.value;
	items_db[cnt][8]=false;
	items_db[cnt][9]=true;
	localStorage.setItem("items", JSON.stringify(items_db));
	window.parent.location.replace("Main.html");
	alert("변경 성공!");
}
		
function cancel_change(){
	items_db[cnt][8] = false;
	window.parent.location.replace("Main.html");
	alert("변경을 취소하셨습니다.");
}