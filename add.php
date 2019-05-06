<?php
	$Name = $_POST["product_name"];
	$img_Name = $_FILES['product_image']['name'];
	$tmp_Name = $_FILES['product_image']['tmp_name'];
	$start = $_POST["start_moisture"];
	$end = $_POST["end_moisture"];
	$uploads_dir = "img/".$img_Name;
	move_uploaded_file($tmp_Name, $uploads_dir);
	
	$conn = mysqli_connect('localhost', 'root', '1234', 'userpod');
	$sql_main = "INSERT INTO main
				(name, moisture, img, onChange, type)
				VALUES
				('$Name', 20, '$uploads_dir', 0, 1);";
	mysqli_query($conn, $sql_main);
	
	$sql_moi = "INSERT INTO moi
				(parentID, startMoisture, endMoisture)
				VALUES
				(LAST_INSERT_ID(), '$start', '$end');";
	mysqli_query($conn, $sql_moi);
	mysqli_close($conn);
	echo '<script>window.parent.location.replace("main.php");alert("추가 성공!");</script>';
?>