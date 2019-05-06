<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8"/>
<title>설정 변경</title>
<link rel="stylesheet" type="text/css" href="css/Change_item2.css">
</head>
<body>
    <form enctype = "multipart/form-data" action = "change2.php" method = "post">    
      	<fieldset>
				<legend>화분 정보</legend>
				
				<div id="left">
				<p>화분명&nbsp;</p>
				<p>사진 변경&nbsp;</p>
				<p>급수 날짜 변경&nbsp;</p>
				<p>급수 시간 변경&nbsp;</p>
				<p>급수 주기 변경&nbsp;</p>
				<p>급수량 변경 (단위: ml)&nbsp;</p>
				</div>
				
				<div id="right">				
				<p><strong><input type = "text" id = "product_name" name = "product_name" placeholder="" /></strong></p>
				<p><strong><input type = "file" name = "product_image"/></strong></p>
				<p><strong><input type = "date" name = "watering_date" min = "2019-01-01"/></strong></p>
				<p><strong><input type = "time" name = "watering_time"/></strong></p>
				<p><strong><input type = "number" name = "watering_days">
				<select name = "day_type" size = "1">
					<option value = "day" selected>일</option>
					<option value = "week">주</option>
					<option value = "month">달</option>
					<option value = "year">년</option>
				</select></strong></p>
				<p><strong><input type = "number" name = "watering_amount" placeholder = "" min = "0"/></strong></p>
				</div>
		</fieldset>
		
		<div id="center">
		<input class="button save" type = "submit" value = "저장"/>
		<input class="button cancel" type = "button" value = "취소" onclick = "cancel_change()"/>
		</div>
    </form>
	<?php
		$conn = mysqli_connect('localhost', 'root', '1234', 'userpod');
		$sql_main = "SELECT name
					FROM main
					WHERE main.onChange = 1";
		$query = mysqli_query($conn, $sql_main);
		$row = mysqli_fetch_array($query);
		$result = $row[0];
	?>
	<script language = "javascript">
		var name = "<?php echo $result;?>";
		var new_name = document.getElementById("product_name");
		new_name.placeholder = name;
		
		function cancel_change(){
			alert("변경을 취소하셨습니다.");
			window.parent.close();
		}
	</script>
</body>
</html>
