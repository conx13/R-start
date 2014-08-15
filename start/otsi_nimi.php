<?php
	$path=$_SERVER['DOCUMENT_ROOT'];
	include ($path .'/conf.php');
	if (isset($_GET["ikood"])){
		$ikood=$_GET["ikood"];
		$query = "SELECT 0 as error, nimi, tid, ikood, lalgus, llopp ";
		$query .="FROM w_tootajad ";
		$query .="WHERE ikood = '" . $ikood . "'";
		$result=pg_query($dbconn,$query);
		if ($result=== false){
			$error=pg_last_error($dbconn);
			$data[0] = array('error'=>'1', 'Text'=> $error);
		}else{
			if (pg_num_rows($result)>0){
				//$text='OK!';
				$i=0;
				while($row=pg_fetch_assoc($result)) {
					$data[]=$row;
				};
				pg_close($dbconn);
			}else{
				$data = array('error'=>'1', 'Text'=> 'Tundmatu või vigane kood!');
			}
		};
	}else{
		$data[0] = array('error'=>'1', 'Text'=> 'Ei ole muutujat!');
	};
	echo json_encode($data);
	exit;
?>