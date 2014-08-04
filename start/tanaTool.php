<?php
	error_reporting(0);
	$path=$_SERVER['DOCUMENT_ROOT'];
	include ($path .'/conf.php');
	$query = "SELECT 0 as error, tanakokku FROM w_tana_tool";
	$result=pg_query($dbconn,$query);
	if ($result=== false){
		$error=pg_last_error($dbconn);
		$data = array('error'=>'1', 'Text'=> $error);
	}else{
		if (pg_num_rows($result)>0){
			while($row=pg_fetch_assoc($result)) {
				$data[]=$row;
			};
			pg_close($dbconn);
		}else{
			$data = array('error'=>'1', 'Text'=> 'Ei leidnud koodi!');
		}
	};
	echo json_encode($data);
	exit;
?>