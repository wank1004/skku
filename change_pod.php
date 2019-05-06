<?php
	$i = (int)$_POST["changeData"];
	$conn = mysqli_connect('localhost', 'root', '1234', 'userpod');
	mysqli_query($conn, "UPDATE main set onChange = 1 where main.id = $i;");
	mysqli_close($conn);
	echo "<script>window.location.replace('frame_change.html');</script>";
?>