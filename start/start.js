///////////////////////////////////////////
//Peale lehe laadimist tehtavad tegevused//
///////////////////////////////////////////
$(function(){
	tanaTool(); //loeme kokku aktiivsed tootajad
	kellaeg(); //näitame kellaega
	sessionStorage.clear();//tyhjendame kogu sessionStorage
})

var tootaja=new Object(); //tootaja object
var pToo=new Object(); //pooli töö object

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
	$("#kell").html(h+" : "+m+" : "+s);
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
	if (isikukood(kood)){
		$("#error").slideUp();
	}else{
		$("#error").slideDown();
	}
}
/////////////////////
//näitame veateadet//
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
		//kellaeg();
		//console.log("vajutasid enterit");
		$("#error").hide('fast');
		$("#nimiText").hide('fast');
		$("#ikood").val('');
		//progress3();//tekitame bari ccs abil
		//kontrollime, et kas on töö kood
		if (kood.substring(0,1)=='0'){
			//console.log("kood algab nulliga");
			jobKontroll(kood);
		}else{
			nimeKontroll(kood);
			//console.log(tootaja.nimi);

		};  		
    }
});

////////////////////////////
//Otsime ikoodi järgi nime//
////////////////////////////
function nimeKontroll(kood) {
	var tulem;
	$.getJSON("otsi_nimi.php",{ikood:kood},function(data){
		//console.log(data);
		if (data[0].Error==1){
			viga(data[0].Text);
			tootaja.nimi=false;			
			tulem=0;
		}else{
			tootaja.nimi=data[0].Nimi;
			tootaja.ikood=data[0].ikood;
			tootaja.tid=data[0].tid;
			tootaja.louna_algus=data[0].lalgus;
			tootaja.louna_lopp=data[0].llopp;
			selleKuuTunnid(kood); //leiame selle kuu tundide summa
			poolikToo(tootaja.tid);
			$("#jobText").slideUp();
			$("#nimiText").html("<h1>"+tootaja.nimi+"</h>");
			$("#nimiText").slideDown('fast');
			tulem=1;
		}
	})
	//console.log('2');
}



///////////////////////////
//Leiame selle kuu tunnid//
///////////////////////////
function selleKuuTunnid(kood){
	$.getJSON("selleKuuTunnid.php",{ikood:kood},function(data){
		if (data.error==1){
			viga(data.Text);
		}else{
			//console.log(data[0].aeg_kokku);
			$("#navAegKokku").html("Kokku aeg: " +data[0].aeg_kokku);
		}
	})
}



////////////////////////////
//Otsime tkoodi järgi tööd//
////////////////////////////
function jobKontroll(kood) {
	$.getJSON("otsi_too.php",{tkood:kood},function(data){
		if (data.error==1){
			viga(data.Text);
		}else{
			$("#jobText").html("<h1>Leping: "+data[0].lepnr+" - "+data[0].job +"</h>");
			$("#jobText").slideDown();
		}
	})
}

/////////////////////////////////
//Loendame hetkel reg tootajaid//
/////////////////////////////////
function tanaTool(){
	$.getJSON("tanaTool.php",function(data){
		if (data.error==1){
			viga(data.Text);
		}else{
			$("#tooLoendur").html(data[0].tanakokku);
		};
	});
};

//////////////////////
//leiame pooliku töö//
//////////////////////
function poolikToo(tid) {
	$.getJSON("poolik_too.php",{tid:tid} ,function(data){
		//console.log(data);
		if (data.error==1){
			$("#jobText").html("<h1>Ei ole aktiivset tööd.</h>");
			$("#jobText").slideDown();
		}else{
			$("#jobText").html("<h1>Leping: "+data[0].lepnr+" - "+data[0].job +"</h>");
			$("#jobText").slideDown()
		};
	});
}

