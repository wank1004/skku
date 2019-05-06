<?php
	$Name = $_POST["product_name"];
	$img_Name = $_FILES['product_image']['name'];
	$tmp_Name = $_FILES['product_image']['tmp_name'];
	$start = $_POST["start_moisture"];
	$end = $_POST["end_moisture"];
	$uploads_dir = "img/".$img_Name;
	move_uploaded_file($tmp_Name, $uploads_dir);
	
	$conn = mysqli_connect('localhost', 'root', '1234', 'userpod');
	$sql = "UPDATE main SET main.type = 1 WHERE main.onChange = 1;";
	mysqli_query($conn, $sql);
	
	if($Name != ""){
		$sql = "UPDATE main SET main.name = $Name WHERE main.onChange = 1;";
		mysqli_query($conn, $sql);
	}
	if($img_Name != ""){
		$sql = "UPDATE main SET main.img = $uploads_dir WHERE main.onChange = 1;";
		mysqli_query($conn, $sql);
	}
	if($start != ""){
		$sql = "UPDATE main, moi SET moi.startMoisture = $start WHERE main.onChange = 1 AND main.id = moi.parentID;";
		mysqli_query($conn, $sql);
	}
	if($end != ""){
		$sql = "UPDATE main, moi SET moi.endMoisture = $end WHERE main.onChange = 1 AND main.id = moi.parentID;";
		mysqli_query($conn, $sql);
	}
	
	mysqli_close($conn);
	echo '<script>window.parent.location.replace("main.php");alert("변경 성공!");</script>';
?>