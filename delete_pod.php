<?php
	$i = (int)$_POST["deleteData"];
	$conn = mysqli_connect('localhost', 'root', '1234', 'userpod');
	mysqli_query($conn, "DELETE FROM main where main.id = $i;");
	mysqli_close($conn);
	echo "<script>window.location.replace('main.php');</script>";
?>