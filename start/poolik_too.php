<?php
	$path=$_SERVER['DOCUMENT_ROOT'];
	include ($path .'/conf.php');
	if (isset($_GET["tid"])){
		$tid=$_GET["tid"];
		$query = "SELECT 0 AS error, lepnr, job, jid, start, rid ";
		$query .="FROM v_tana_poolik_too_test ";
		$query .="WHERE tid='" .$tid. "'";
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
				$data = array('error'=>'1', 'Text'=> 'Tundmatu või vigane kood!');
			}
		};
	}else{
		$data = array('error'=>'1', 'Text'=> 'Ei ole muutujat!');
	};
	echo json_encode($data);
	exit;
?>