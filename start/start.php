<!DOCTYPE html>
<html lang="et">
	<head>
		<meta charset="utf-8">
		<title>Start</title>
		<link rel="stylesheet" href="../bootstrap/bootstrap.min.css">
		<link rel="stylesheet" href="start.css">
		<script src="../jquery/jquery-2.1.1.min.js"></script>
		<script src="../bootstrap/bootstrap.min.js"></script>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<script src="start.js"></script>
		<script src="isikukood.js"></script>
	</head>
	<body>
		<nav class="navbar navbar-inverse">
			<div class="container">
				<div style="position:absolute; left:50%">
      				<div style="position:relative; left:-50%">        
          				<p class="navbar-text h1" id="navAegKokku"></p>
      				</div>
    			</div>
			<p class="navbar-text pull-left visible-lg visible-md"><span id="tooLoendur">0</span></p>
			<p class="navbar-text pull-right h2 visible-lg visible-md" id="kell"></p>
		  </div>
		</nav>
		<div class="container">
			<div class="row">
				<div class="progress">
					<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;" id="prog">
					</div>
				</div>
			</div>
			<div class="row text-center col-lg-8 col-lg-offset-2">
				<div class="alert alert-danger" id="error" role="alert">
					<h2>Vale kood!</h2>
				</div>
			</div>
			<div class="row text-center col-lg-8 col-lg-offset-2">
				<div class="alert alert-info" id="nimiText" role="alert">
				</div>
			</div>
			<div class="row text-center col-lg-8 col-lg-offset-2">
				<div class="alert alert-info" id="jobText" role="alert">
				</div>
			</div>			
			<div class="row text-center col-lg-12">
				<h1 id="palunKood">Palun kood:</h1>
			</div>
			<div class="row text-center col-lg-12">
				<div id="koodi_div">
					<input type="text" class="text-center" id="ikood" autofocus autocomplete="off">
				</div>
			</div>
		
		</div>
	</body>
</html>