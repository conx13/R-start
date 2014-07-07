<?php
	$path=$_SERVER['DOCUMENT_ROOT'];
	include ($path .'/conf.php');
	if (isset($_GET["ikood"])){
		$ikood=$_GET["ikood"];
		$query = "SELECT enimi ||' '|| pnimi as nimi, tid ";
		$query .="FROM tootajad ";
		$query .="WHERE ikood = '" . $ikood . "'";
		$result=pg_query($dbconn,$query);
		if ($result=== false){
			$error=pg_last_error($dbconn);
			$data[0] = array('Error'=>'1', 'Text'=> $error);
		}else{
			if (pg_num_rows($result)>0){
				$text='OK!';
				$i=0;
				while($row=pg_fetch_array($result)) {
					$data[$i]=array('Error'=>'0','Nimi'=>$row ['nimi'], 'tid'=>$row['tid']);
					$i=$i+1;
				};
				pg_close($dbconn);
			}else{
				$data[0] = array('Error'=>'1', 'Text'=> 'Ei leidnud koodi!');
			}
		};
	}else{
		$data[0] = array('Error'=>'1', 'Text'=> 'Ei ole muutujat!');
	};
	echo json_encode($data);
	exit;
?>