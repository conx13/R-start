<?php
	//error_reporting(0);
	$path=$_SERVER['DOCUMENT_ROOT'];
	include ($path .'/conf.php');
	if (isset($_GET["ikood"])){
		$ikood=$_GET["ikood"];
		$query = "SELECT 0 as error, cast(sum(result.result)/60 as integer) ||'h:'|| to_char(cast(sum(result.result)%60 as integer),'FM00') ||'min.' as aeg_kokku ";
		$query .="FROM  public.result, public.tootajad ";
		$query .="WHERE result.tid = tootajad.tid AND (tootajad.ikood='".$ikood."') AND (date_part('month',result.start)=date_part('month',now())) AND (date_part('year',result.start)=date_part('year',now()))";
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
				$data= array('error'=>'1', 'Text'=> 'Ei leidnud koodi!');
			}
		};
	}else{
		$data = array('error'=>'1', 'Text'=> 'Ei ole muutujat!');
	};
	echo json_encode($data);
	exit;
?>