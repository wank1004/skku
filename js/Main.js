var localStorage = window.localStorage;
var items_db = JSON.parse(localStorage.getItem("items"));

function loadInfo() {
	for (var i =0; i < items_db.length; i++){
			
		var moisture = items_db[i][1];
		moisture = parseInt(moisture/20);
				
		var item = document.createElement("table");
		item.id = "item_"+i;
		document.getElementById("section_list").appendChild(item);

		var tr01 = document.createElement("tr");
		tr01.id = "top_side";
		document.getElementById("item_"+i).appendChild(tr01);
				

		var td01 = document.createElement("td");			//사진
		td01.id = "top_1";
		tr01.appendChild(td01);

		td01.innerHTML = '<img id="product_image" src = "' + items_db[i][7] +'" width="150px" height="150px">';
					
		var td01_2 = document.createElement("td");			//습도	
		td01_2.id = "top_2";
		switch(moisture){
			case 0: tr01.appendChild(td01_2);
					td01_2.innerHTML = '<p id ="product_moisture0">'+ items_db[i][1] + '%</p>';
				break;
						
			case 1: tr01.appendChild(td01_2);
					td01_2.innerHTML = '<p id ="product_moisture1">'+ items_db[i][1] + '%</p>';
				break;
						
			case 2: tr01.appendChild(td01_2);
					td01_2.innerHTML = '<p id ="product_moisture2">'+ items_db[i][1] + '%</p>';
				break;
						
			case 3: tr01.appendChild(td01_2);
					td01_2.innerHTML = '<p id ="product_moisture3">'+ items_db[i][1] + '%</p>';
				break;
						
			case 4: tr01.appendChild(td01_2);
					td01_2.innerHTML = '<p id ="product_moisture4">'+ items_db[i][1] + '%</p>';
				break;
						
			case 5: tr01.appendChild(td01_2);
					td01_2.innerHTML = '<p id ="product_moisture5">'+ items_db[i][1] + '%</p>';
				break;
					
			default:tr01.appendChild(td01_2);
					td01_2.innerHTML = '<p id ="product_moisture">'+ items_db[i][1] + '%</p>';
				break;
		}
					
					
		var tr02 = document.createElement("tr");
		document.getElementById("item_"+i).appendChild(tr02);

		var td02 = document.createElement("td");			//이름
		td02.setAttribute("colspan", "2");
		tr02.appendChild(td02);

		td02.innerHTML = '<p id="product_name">' + items_db[i][0] +'</p>';
				
		var tr03 = document.createElement("tr");
		document.getElementById("item_"+i).appendChild(tr03);

		var td03 = document.createElement("td");			//시간
		td03.setAttribute("colspan", "2");
		tr03.appendChild(td03);
		
		if(items_db[i][9])
			td03.innerHTML = '<p id ="product_time">' + '급수 시작 습도: ' + items_db[i][10] + '% </p>'+'<p id = "product_time"> 급수 종료 습도: ' + items_db[i][11] + '% </p>';
		else
			td03.innerHTML = '<p id="product_time">' + items_db[i][2] +'년 '+ items_db[i][3]+'월 ' + items_db[i][4] +'일 ' + items_db[i][5] + '시 ' + items_db[i][6] +'분 </p>'+'<p id = "product_time"> 급수량: ' + items_db[i][12] + 'ml </p>';
		
		var tr04 = document.createElement("tr");				
		document.getElementById("item_"+i).appendChild(tr04);
			
		var td04 = document.createElement("td");			//변경
		tr04.appendChild(td04);
				
		td04.innerHTML ='<button id = "change_button" onclick = "set_change('+i+')">정보 변경</button>';
				
		var td04_2 = document.createElement("td");			//제거
		tr04.appendChild(td04_2);
				
		td04_2.innerHTML = '<button id = "delete_button" onclick = "delete_product('+i+')">삭제</button>';
	}
}

function delete_product(i){
	var localStorage = window.localStorage;
	var items_db = JSON.parse(localStorage.getItem("items"));
	items_db.splice(i,1);
	localStorage.setItem("items", JSON.stringify(items_db));
	alert("삭제 되었습니다.");
	window.location.reload();
}

function set_change(i){
	var localStorage = window.localStorage;
	var itmes_db = JSON.parse(localStorage.getItem("items"));
	items_db[i][8] = true;
	localStorage.setItem("items", JSON.stringify(items_db));
	window.location.href = "frame_change.html";
}