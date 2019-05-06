<?php
	$Name = $_POST["product_name"];
	$water_date = $_POST["watering_date"];
	$water_time = $_POST["watering_time"];
	$water_days = $_POST["watering_days"];
	$day_type = $_POST["day_type"];
	$watering_amount = $_POST["watering_amount"];
	
	$img_Name = $_FILES['product_image']['name'];
	$tmp_Name = $_FILES['product_image']['tmp_name'];
	$uploads_dir = "img/".$img_Name;
	move_uploaded_file($tmp_Name, $uploads_dir);
	
	function check_month($month){
		$new_month = $month % 12;
		
		if($new_month == 2)
			return 2;
		else if($new_month ==4 || $new_month == 6 || $new_month == 9 || $new_month == 11)
			return 1;
		else
			return 0;
	}

	function calculate_date(){
		$water_date = $_POST["watering_date"];
		$water_time = $_POST["watering_time"];
		$water_days = (int)$_POST["watering_days"];
		$day_type = $_POST["day_type"];
		$date = explode('-', $water_date);
		$year = (int)$date[0];
		$month = (int)$date[1];
		$day = (int)$date[2];
		
		if($day_type == "day")
			$day = $day + $water_days;
		else if($day_type == "week")
			$day = $day + 7 * $water_days;
		else if($day_type == "month")
			$month = $month + $water_days;
		else if($day_type == "year")
			$year = $year + $water_days;
		
		$check = check_month($month);
		
		if($day>30){
			while($day>30){
				if($check == 1){
					$day = $day - 30;
					$month = $month + 1;
				}
				else if($check==0 && $day>31){
					$day = $day-31;
					$month = $month+1;
				}
				else if($check==2 && $year%4==0){
					$day = $day-29;
					$month = $month+1;
				}
				else if($check==2 && $year%4!=0){
					$day = $day-28;
					$month = $month+1;
				}
				else
					break;
				$check = check_month($month);
			}
		}
		if($month>12){
			while($month>12){
				$month = $month-12;
				$year = $year+1;
			}
		}
		$new_water_date = $year."-".$month."-".$day;
		return $new_water_date;
	}
		
	$conn = mysqli_connect('localhost', 'root', '1234', 'userpod');
	$sql = "UPDATE main SET main.type = 0 WHERE main.onChange = 1;";
	mysqli_query($conn, $sql);
	
	if($Name != ""){
		$sql = "UPDATE main SET main.name = $Name WHERE main.onChange = 1;";
		mysqli_query($conn, $sql);
	}
	if($water_date != "" && $day_type != ""&& $water_days != ""){
		$new_date = calculate_date();
		$sql = "UPDATE main, per SET per.date = $new_date WHERE main.onChange = 1 AND main.id = per.parentID;";
		mysqli_query($conn, $sql);
	}
	if($water_time != ""){
		$sql = "UPDATE main, per SET per.time = $water_time WHERE main.onChange = 1 AND main.id = per.parentID;";
		mysqli_query($conn, $sql);
	}
	if($watering_amount != ""){
		$sql = "UPDATE main, per SET per.amount = $watering_amount WHERE main.onChange = 1 AND main.id = per.parentID;";
		mysqli_query($conn, $sql);
	}
	if($img_Name != ""){
		$sql = "UPDATE main SET main.img = $uploads_dir WHERE main.onChange = 1;";
		mysqli_query($conn, $sql);
	}
	mysqli_close($conn);
		
	
	echo '<script>window.parent.location.replace("main.php");alert("변경 성공!");</script>';
?>