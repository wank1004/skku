<!Doctype html>
<head>
<?php
	$conn = mysqli_connect('localhost', 'root', '1234', 'userpod');
	$pod = [];
	$sql_per = "SELECT main.id, main.name, main.moisture, main.img, main.onChange, main.type, per.date, per.time , per.amount
				from main, per 
				where main.id=per.parentID;";
	$result_per = mysqli_query($conn, $sql_per);
	
	$i=0;
	while($row_per = mysqli_fetch_array($result_per)){
		$pod[$i][0] = $row_per['id'];
		$pod[$i][1] = $row_per['name'];
		$pod[$i][2] = $row_per['moisture'];
		$pod[$i][3] = $row_per['img'];
		$pod[$i][4] = $row_per['onChange'];
		$pod[$i][5] = $row_per['type'];
		$pod[$i][6] = $row_per['date'];
		$pod[$i][7] = $row_per['time'];
		$pod[$i][8] = $row_per['amount'];
		if($pod[$i][4] == 1){
			mysqli_query($conn, "UPDATE main SET onChange = 0 where main.id = $i+1;");
		}
		$i++;
	}
	
	$sql_moi = "SELECT main.id, main.name, main.moisture, main.img, main.onChange, main.type, moi.startMoisture, moi.endMoisture
				from main, moi
				where main.id=moi.parentID;";
	$result_moi = mysqli_query($conn, $sql_moi);
	while($row_moi = mysqli_fetch_array($result_moi)){
		$pod[$i][0] = $row_moi['id'];
		$pod[$i][1] = $row_moi['name'];
		$pod[$i][2] = $row_moi['moisture'];
		$pod[$i][3] = $row_moi['img'];
		$pod[$i][4] = $row_moi['onChange'];
		$pod[$i][5] = $row_moi['type'];
		$pod[$i][6] = $row_moi['startMoisture'];
		$pod[$i][7] = $row_moi['endMoisture'];
		$pod[$i][8] = -1;
		if($pod[$i][4] == 1){
			mysqli_query($conn, "UPDATE main SET onChange = 0 where main.id = $i+1;");
		}
		$i++;
	}
	
	function compare($x, $y){
		if($x[0] == $y[0])
			return 0;
		else if($x[0] < $y[0])
			return -1;
		else
			return 1;
	}

	usort($pod, 'compare');
	$cnt = $i;
	$i=0;
?>

<title>스마트 워터링</title>
<meta charset="utf-8"/>
<link rel="stylesheet" type="text/css" href="css/Main.css">
</head>
							
<div id = "header">
</div>

<body onload='loadInfo();'>

<div id="section_products">

	<div id="section_list" class="product list">
	<script>
		var temp = new Array(<?php echo json_encode($pod, JSON_UNESCAPED_UNICODE);?>);
		var temp2 = temp.toString().split(",");
		var pod = [];
		for (var cnt = 0; cnt<temp2.length; cnt++){
			var pod_sub = [];
			pod_sub.push(temp2[cnt]);
			pod_sub.push(temp2[++cnt]);
			pod_sub.push(temp2[++cnt]);
			pod_sub.push(temp2[++cnt]);
			pod_sub.push(temp2[++cnt]);
			pod_sub.push(temp2[++cnt]);
			pod_sub.push(temp2[++cnt]);
			pod_sub.push(temp2[++cnt]);
			pod_sub.push(temp2[++cnt]);
			pod.push(pod_sub);
		}
		function loadInfo() {
			for (var i =0; i < pod.length; i++){
				var moisture = pod[i][2];
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

				td01.innerHTML = '<img id="product_image" src = "'+pod[i][3]+'" width="150px" height="150px">';
					
				var td01_2 = document.createElement("td");			//습도	
				td01_2.id = "top_2";
				switch(moisture){
					case 0: tr01.appendChild(td01_2);
							td01_2.innerHTML = '<p id ="product_moisture0">'+ pod[i][2] +'%</p>';
						break;
						
					case 1: tr01.appendChild(td01_2);
							td01_2.innerHTML = '<p id ="product_moisture1">'+ pod[i][2] + '%</p>';
						break;
						
					case 2: tr01.appendChild(td01_2);
							td01_2.innerHTML = '<p id ="product_moisture2">'+ pod[i][2] + '%</p>';
						break;
						
					case 3: tr01.appendChild(td01_2);
							td01_2.innerHTML = '<p id ="product_moisture3">'+ pod[i][2] + '%</p>';
						break;
						
					case 4: tr01.appendChild(td01_2);
							td01_2.innerHTML = '<p id ="product_moisture4">'+ pod[i][2] + '%</p>';
						break;
						
					case 5: tr01.appendChild(td01_2);
							td01_2.innerHTML = '<p id ="product_moisture5">'+ pod[i][2] + '%</p>';
						break;
					
					default:tr01.appendChild(td01_2);
							td01_2.innerHTML = '<p id ="product_moisture">'+ pod[i][2] + '%</p>';
						break;
				}
					
					
				var tr02 = document.createElement("tr");
				document.getElementById("item_"+i).appendChild(tr02);

				var td02 = document.createElement("td");			//이름
				td02.setAttribute("colspan", "2");
				tr02.appendChild(td02);

				td02.innerHTML = '<p id="product_name">' + pod[i][1] +'</p>';
				
				var tr03 = document.createElement("tr");
				document.getElementById("item_"+i).appendChild(tr03);

				var td03 = document.createElement("td");			//시간
				td03.setAttribute("colspan", "2");
				tr03.appendChild(td03);
		
				if(pod[i][5]=="1")
					td03.innerHTML = '<p id ="product_time">' + '급수 시작 습도: ' + pod[i][6] + '% </p>'+'<p id = "product_time"> 급수 종료 습도: ' + pod[i][7] + '% </p>';
				else
					td03.innerHTML = '<p id="product_time">' + pod[i][6] + " " + pod[i][7]  + '</p>'+'<p id = "product_time"> 급수량: ' + pod[i][8] + 'ml </p>';
		
				var tr04 = document.createElement("tr");				
				document.getElementById("item_"+i).appendChild(tr04);
			
				var td04 = document.createElement("td");			//변경
				tr04.appendChild(td04);
				
				td04.innerHTML ='<button id = "change_button" onclick = "set_change('+i+')">정보 변경</button>';
				
				var td04_2 = document.createElement("td");			//제거
				tr04.appendChild(td04_2);
				
				td04_2.innerHTML = '<button id = "delete_button" onclick = "delete_product('+i+')">삭제</button>';
			}
			<?php mysqli_close($conn);?>
		}

		function delete_product(i){
			var form = document.createElement("form");
			form.setAttribute("method", "post");
			form.setAttribute("target", "name");
			form.setAttribute("action", "delete_pod.php");
			
			var data = document.createElement("input");
			data.setAttribute("type", "hidden");
			data.setAttribute("name", "deleteData");
			data.setAttribute("value", pod[i][0]);
			form.appendChild(data);
			document.body.appendChild(form);
			form.submit();
		}

		function set_change(i){
			var form = document.createElement("form");
			form.setAttribute("method", "post");
			form.setAttribute("target", "name");
			form.setAttribute("action", "change_pod.php");
			
			var data = document.createElement("input");
			data.setAttribute("type", "hidden");
			data.setAttribute("name", "changeData");
			data.setAttribute("value", pod[i][0]);
			form.appendChild(data);
			document.body.appendChild(form);
			form.submit();
		}
	</script>
	</div>
</div>

<div id="section_addItem">
	<a href = "frame_add.html"><img id = "add_icon" title = "화분 추가" src = "img/icon2.png"/></a>
	<form>
	</form>
</div>


</body>
<footer>
	<div id = "footer">
	Copyright (c) All rights reserved.
	</div>
</footer>
</html>