<?php
	$path=$_SERVER['DOCUMENT_ROOT'];
	include ($path .'/conf.php');
	if (isset($_GET["tkood"])){
		$tkood=$_GET["tkood"];
		$query = "SELECT 0 as error, job.jid, '0' || job.jid AS rkood, job.lepnr, job.job, grupp.gnimi, grupp.ggrupp  ";
		$query .="FROM public.job, public.grupp ";
		$query .="WHERE job.gid = grupp.gid AND (('0'||job.jid)='" .$tkood. "')";
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