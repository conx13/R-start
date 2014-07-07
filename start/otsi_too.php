<?php
	$path=$_SERVER['DOCUMENT_ROOT'];
	include ($path .'/conf.php');
	if (isset($_GET["tkood"])){
		$tkood=$_GET["tkood"];
		$query = "SELECT job.jid, '0' || job.jid AS rkood, job.lepnr, job.job, grupp.gnimi, grupp.ggrupp  ";
		$query .="FROM public.job, public.grupp ";
		$query .="WHERE job.gid = grupp.gid AND (('0'||job.jid)='" .$tkood. "')";
		$result=pg_query($dbconn,$query);
		if ($result=== false){
			$error=pg_last_error($dbconn);
			$data[0] = array('Error'=>'1', 'Text'=> $error);
		}else{
			if (pg_num_rows($result)>0){
				$text='OK!';
				$i=0;
				while($row=pg_fetch_array($result)) {
					$data[$i]=array('Error'=>'0','Lepnr'=>$row ['lepnr'], 'jid'=>$row['jid'], 'job'=>$row['job']);
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