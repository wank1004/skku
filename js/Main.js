﻿		var localStorage = window.localStorage;
		var items_db = JSON.parse(localStorage.getItem("items"));

		function loadInfo() {
			for (var i =0; i < items_db.length; i++){
				
				var moisture = items_db[i][1];
				moisture = parseInt(moisture/20);
				
				var item = document.createElement("table");
				item.id = "item_"+i;
				document.getElementById("section_list").appendChild(item);

				var tr01 = document.createElement("tr");
				document.getElementById("item_"+i).appendChild(tr01);
				

				var td01 = document.createElement("td");
				tr01.appendChild(td01);

				td01.innerHTML = '<img id="product_image" src = "' + items_db[i][7] +'" width="150px" height="150px">';
					
				var td01_2 = document.createElement("td");				
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

				var td02 = document.createElement("td");
				td02.setAttribute("colspan", "2");
				tr02.appendChild(td02);

				td02.innerHTML = '<p id="product_name">' + items_db[i][0] +'</p>';
						
				var tr03 = document.createElement("tr");
				document.getElementById("item_"+i).appendChild(tr03);

				var td03 = document.createElement("td");
				td03.setAttribute("colspan", "2");
				tr03.appendChild(td03);

				td03.innerHTML = '<p id="product_time">' + items_db[i][2] +'년 '+ items_db[i][3]+'월 ' + items_db[i][4] +'일 ' + items_db[i][5] + '시 ' + items_db[i][6] +'분 </p>';

				var tr04 = document.createElement("tr");
				document.getElementById("item_"+i).appendChild(tr04);
				
				var td04 = document.createElement("td");
				tr04.appendChild(td04);
				
				td04.innerHTML = '<a href = ""><img src = "img/change.png"/ width = "40px"></a>';
				
				var td04_2 = document.createElement("td");
				tr04.appendChild(td04_2);
				
				td04_2.innerHTML = '<button onclick = "delete_product('+i+')">삭제</button>';
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