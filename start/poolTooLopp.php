<?php
	$path=$_SERVER['DOCUMENT_ROOT'];
	include ($path .'/conf.php'); //votame sealt sql andmed
	if (isset($_POST["rid"], $_POST["aegKokku"], $_POST["aegTime"])) {
		$params=array();
		$params[]=$_POST["aegTime"];
		$params[]=$_POST["aegKokku"];
		$params[]=$_POST["rid"];
		print_r ($params);
		$query="UPDATE result SET result=$2, stop=$1 WHERE rid=$3";
		$result= pg_query_params($dbconn, $query, $params);
		if ($result===false) {
			$error=pg_last_error($dbconn);
			$data = array('error'=>'1', 'Text'=> $error);
		}else{
			$ridaMuutunud = pg_affected_rows($result);
			if ($ridaMuutunud==false){
				$data = array('error'=>'1', 'Text'=>'Andmeid ei lisatud!');  
			}else{
				$data = array('error'=>'0', 'Text'=>'Andmed on muudetud!');  
			}
		}
		pg_close($dbconn);
	}else{
		$data = array('error'=>'0', 'Text'=>'Muutujad puuduvad');  
	};
	echo json_encode($data);
	exit;
?>