//////////////////////////////////
//tekitame kella - serveri ajaga//
//////////////////////////////////
function kellaeg(){
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();
 	if(s<10){
		s = "0"+s;
 	}
	if(m<10){
		m = "0"+m;
 	}
	if(h<10){
		h = "0"+h;
 	}
	$("#kell").html("<strong>"+h+" : "+m+" : "+s+"</strong>");
 	setTimeout(function(){kellaeg()}, 1000);
}

////////////////////////////
//mmudame bari jqueri abil//
////////////////////////////
function progress2(jupp, kLaius){
	laius=$("#prog").width();
	if (laius<100){
		clearInterval(aeg);
		location.reload();
	}else{
		laius=laius-jupp;
		if (((laius/kLaius)>0.3)&&((laius/kLaius)<0.5)){
			$("#prog").removeClass("progress-bar-info").addClass("progress-bar-warning");
		};		
		if ((laius/kLaius)<0.3){
			$("#prog").removeClass("progress-bar-warning").addClass("progress-bar-danger");
		};
		$("#prog").width(laius);
	};	
}

////////////////////////////
//mmudame bari jqueri abil//
////////////////////////////
var aeg;
function progress() {
	clearInterval(aeg);//nullime aja
	$("#prog").width("100%");//teeme bari max laiuseks
	//mmudame bari värvi tavaliseks:
	if ($("#prog").hasClass("progress-bar-warning")){
		$("#prog").removeClass("progress-bar-warning").addClass("progress-bar-info");
	}else if ($("#prog").hasClass("progress-bar-danger")){
		$("#prog").removeClass("progress-bar-danger").addClass("progress-bar-info");
	};
	setTimeout(function(){ //ootame nats kuni bar on nullis
		kLaius=$("#prog").width();
		var jupp=($("#prog").width())/10;
		aeg=setInterval(function(){
			progress2(jupp, kLaius)	
		} ,1000);
	},500);
}

/////////////////////////
//muudame bari ccs abil//
/////////////////////////
var aegReload;
function progress3(){
	clearTimeout(aegReload);
	$("#prog1").attr("id","prog");
	$("#prog").width("100%");
	setTimeout(function(){
		$("#prog").attr("id","prog1");
		$("#prog1").width("0%");
		aegReload=setTimeout(function(){
			location.reload();
		},10000);
	},1000)
}

///////////////////////
//Error ei leia ikoodi//
///////////////////////
function ikoodiKontroll() {
	var kood=$("#ikood").val();
	//console.log("ikoodi kontroll:" + $("#ikood").val());
	//console.log(isikukood(kood));
	if (isikukood(kood)){
		$("#error").slideUp();
	}else{
		$("#error").slideDown()
	}
}
/////////////////////
//näitame veatäidet//
/////////////////////
function viga(veaText){
	$("#error").html("<h2>"+veaText+"</h2>");
	$("#error").slideDown();
	$("#nimiText").slideUp();
	$("#jobText").slideUp();
	
}


////////////////////////
//Kui vajutame Enterit//
////////////////////////
$(document).keypress(function(e) {
    if(e.which == 13) {
        var kood=$("#ikood").val();
		kellaeg();
		console.log("vajutasid enterit");
		$("#error").slideUp();
		$("#ikood").val('');
		progress3();//tekitame bari ccs abil
		//kontrollime, et kas on töö kood
		if (kood.substring(0,1)=='0'){
			//console.log("on kaks nulli");
			jobKontroll(kood);
		}else{
			//console.log("ei ole nulle");
			nimeKontroll(kood);
		};  
		
    }
});

////////////////////////////
//Otsime ikoodi järgi nime//
////////////////////////////
function nimeKontroll(kood) {
	//console.log("Kood on:" +kood);
	$.getJSON("otsi_nimi.php",{ikood:kood},function(data){
		//console.log(data);
		if (data[0].Error==1){
			viga(data[0].Text);
		}else{
			$("#jobText").slideUp();
			$("#nimiText").html("<h1>"+data[0].Nimi+"</h>");
			$("#nimiText").slideDown();
		}
	})
}

////////////////////////////
//Otsime tkoodi järgi tööd//
////////////////////////////
function jobKontroll(kood) {
	//console.log("Kood on:" +kood);
	$.getJSON("otsi_too.php",{tkood:kood},function(data){
		//console.log(data);
		if (data[0].Error==1){
			viga(data[0].Text);
		}else{
			$("#jobText").html("<h1>Lepingu nr: "+data[0].Lepnr+" - "+data[0].job +"</h>");
			$("#jobText").slideDown();
		}
	})
}
