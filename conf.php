<?php
	$conn_string="host=localhost dbname=Ribakood user=postgres password=conx13";
	$dbconn=pg_connect($conn_string)
		or die("Kahjuks ei saa serveriga ühendust!");
?>