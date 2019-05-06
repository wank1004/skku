<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8"/>
<title>설정 변경</title>
<link rel="stylesheet" type="text/css" href="css/Change_item.css">
</head>
<body>
    <form enctype = "multipart/form-data" action = "change.php" method = "post">    
      	<fieldset>
				<legend>화분 정보</legend>
				
				<div id="left">
				<p>화분명&nbsp;</p>
				<p>사진 변경&nbsp;</p>
				<p>시작 습도 변경&nbsp;</p>
				<p>종료 습도 변경&nbsp;</p>
				</div>
				
				<div id="right">				
				<p><strong><input type = "text" id = "product_name" name = "product_name"placeholder="" /></strong></p>
				<p><strong><input type = "file" name = "product_image"/></strong></p>
				<p><strong><input type = "number" name = "start_moisture" placeholder = "" min = "0" max = "100"/></strong></p>
				<p><strong><input type = "number" name = "end_moisture" placeholder = "" min = "0" max = "100"/></strong></p>
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
