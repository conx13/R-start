//Peale lehe laadimist tehtavad tegevused//
$(function(){
	tanaTool(); //loeme kokku aktiivsed tootajad
	kellaeg(); //näitame kellaega
	sessionStorage.clear();//tyhjendame kogu sessionStorage
	var lukus;
	lukus = window.setInterval(function(){ //et oleks ikka fookuses
    	$("#ikood").focus();}, 1000);
});

//Gloabaalsed muutujad mida saavad teise funktsioonid kasutada
var tootaja=new Object(); //tootaja object
var pToo=new Object(); //poolik töö object

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


////////////////////////
//Kui vajutame Enterit//
////////////////////////
$(document).keypress(function(e) {
    if(e.which == 13) {
        var kood=$("#ikood").val();
		//kellaeg();
		//console.log("vajutasid enterit");
		$("#error").hide();
		//$("#nimiText").hide();
		$("#ikood").val('');
		//progress3();//tekitame bari ccs abil
		//kontrollime, et kas on töö kood

		if (tootaja.nimi) {//kui on isik üleval
				if (kood.substring(0,1)=='0'){
					jobKontrollOnIsik(kood);
				}else{
					nimeKontrollOnIsik(kood);
				};  
			}else{ //kui ei ole isikut üleval
				if (kood.substring(0,1)=='0'){
					jobKontrollEiIsik(kood);
				}else{
					nimeKontroll(kood);
				}; 		
			}; 
    }
});


//////////////////////////////////////////////
//Otsime tkoodi järgi tööd kui ei ole isikut//
//////////////////////////////////////////////
function jobKontrollEiIsik(kood) {
	console.log('jobKontroll ei ole iskut');
	$.getJSON("otsi_too.php",{tkood:kood},function(data){
		if (data.error==1){
			viga(data.Text);
		}else{
			$("#jobText").html("<h1>Leping: "+data[0].lepnr+" - "+data[0].job +"</h>");
			$("#jobText").slideDown();
		}
	})
}



/////////////////////////////////////////////////////
//Otsime ikoodi järgi nime kui isik on kirjas//
/////////////////////////////////////////////////////
function nimeKontrollOnIsik(kood) {
	var tulem;
	console.log(tootaja.ikood==kood);
	if (!(tootaja.ikood==kood)) { //kui ei ole sama kood
		nimeKontroll(kood);
	}else{ //kui on sama kood
		if (pToo.rid){
			//kui on poolik töös, siis vaja lõetada
			console.log('On sama isik ja poolik töö üleval: ' + pToo.rid);
		};
	}
}

//////////////////////////////////////////////
//Otsime tkoodi järgi tööd kui ei ole isikut//
//////////////////////////////////////////////
function jobKontrollOnIsik(kood) {
	console.log('jobKontroll');
	$.getJSON("otsi_too.php",{tkood:kood},function(data){
		if (data.error==1){
			viga(data.Text);
		}else{
			$("#jobText").html("<h1>Leping: "+data[0].lepnr+" - "+data[0].job +"</h>");
			$("#jobText").slideDown();
			if (pToo.rid) {
				console.log('On isik ja on poolik töö:' + pToo.rid);
				//vaja poolik töö lõpetada ja alustada uuega
			}else{
				console.log('On isik, aga poolikut tööd ei ole');
				//vaja uus töö isikule
			};

		}
	})
}

/////////////////////
//näitame veateadet//
/////////////////////
function viga(veaText,tyyp){
	$("#error").html("<h2>"+veaText+"</h2>");
	if (tyyp=='yld'){
		$("#nimiText").slideUp();
		$("#jobText").slideUp();
		$("#navAegKokku").html('');		
	}else{
		$("#jobText").slideUp();			
	}	
	$("#error").slideDown();
}

/////////////////////////////////////////////////////////
///Nime kontroll - mitte nulliga algava koodi kontroll///
/////////////////////////////////////////////////////////
function  nimeKontroll(kood){
	$.getJSON("otsi_nimi.php",{ikood:kood},function(data){
		if (data.error==1){
			if (!tootaja.nimi) { //kui on isik kirjas, siis ei kustuta ekraanilt
				tootaja.nimi=false;
				viga(data.Text, 'yld');
			}else{
				viga(data.Text);
			};		
		}else{
			tootaja.nimi=data[0].nimi;
			tootaja.ikood=data[0].ikood;
			tootaja.tid=data[0].tid;
			tootaja.louna_algus=aeg_minutiks(data[0].lalgus);
			tootaja.louna_lopp=aeg_minutiks(data[0].llopp);
			tootaja.too_algus=aeg_minutiks(data[0].tooalgus);
			tootaja.too_lopp=aeg_minutiks(data[0].toolopp);
			tootaja.aja_algus=aeg_minutiks(data[0].ajaalgus);
			console.log(data[0].ajaalgus);
			tootaja.aja_lopp=aeg_minutiks(data[0].ajalopp);
			console.log(tootaja);
			selleKuuTunnid(kood); //leiame selle kuu tundide summa
			poolikToo(tootaja.tid);
			//$("#jobText").slideUp();
			$("#nimiText").html("<h1>"+tootaja.nimi+"</h>");
			$("#nimiText").slideDown();
		}
	})
}

///////////////////////////
//Leiame selle kuu tunnid//
///////////////////////////
function selleKuuTunnid(kood){
	$.getJSON("selleKuuTunnid.php",{ikood:kood},function(data){
		if (data.error==1){
			viga(data.Text, 'yld');
		}else{
			if (data[0].aeg_kokku==null){
				$("#navAegKokku").html('');
			}else{
				$("#navAegKokku").html("Kokku aeg: " +data[0].aeg_kokku);
			}
		}
	})
}

/////////////////////////////////
//Loendame hetkel reg tootajaid//
/////////////////////////////////
function tanaTool(){
	$.getJSON("tanaTool.php",function(data){
		if (data.error==1){
			viga(data.Text, 'yld');
		}else{
            $("#tooLoendur").html(data[0].tanakokku);
            $('#tooLoendur').html(data[0].tanaKokku);
			$("#tooLoendur").html(data[0].tanakokku);
		};
	});
};

//////////////////////
//leiame pooliku töö//
//////////////////////
function poolikToo(tid) {
	console.log('poolik_too start');
	$.getJSON("poolik_too.php",{tid:tid} ,function(data){
		if (data.error==1){
			viga(data.Text);
			//$("#jobText").html("<h1>Ei ole aktiivset tööd.</h>");
			pToo.rid=false;
			//$("#jobText").slideDown();
		}else{
			//$('#jobText').slideUp();
			console.log('on poolik töö olemas');
			$("#jobText").html("<h1>["+data[0].lepnr+"] - "+data[0].job +"</h>");
			pToo.rid=data[0].rid;
			pToo.start=aeg_minutiks(data[0].start);
			$("#jobText").slideDown()
		};
	});
}
////////////////////////////////////
//texti aja teisendamine minutiteks//
//////////////////////////////////// 
function aeg_minutiks (aeg_text){
	return parseInt(aeg_text.slice(0,2))*60 + parseInt(aeg_text.slice(3,5));
}

//////////////////////////////////////////////////////////
//Arvutame töö aja, vastavalt tööajale ja lõunale. /////
//Lahutame töö alguse maha ja saame aja mis läheb kirja.//
//////////////////////////////////////////////////////////
function tooAegKokku(hetk) {
	var hetk= new Date();
	hetk=hetk.getHours()*60 + hetk.getMinutes();
	var louna_algus=tootaja.louna_algus;
	var louna_lopp=tootaja.louna_lopp;
	var aja_algus=tootaja.aja_algus;
	var aja_lopp=tootaja.aja_lopp;
	var too_algus=tootaja.too_algus;
	var too_lopp=tootaja.too_lopp;
	var jooksva_too_algus=pToo.start;

	if (hetk<aja_algus) { //kui on liiga vara
		hetk=too_algus;
	};
	if (hetk>aja_lopp) { //kui on peale tööpäeva lõppu
		hetk=too_lopp;
	};
	if (hetk>louna_algus && hetk<louna_lopp) { //kui jääb lõuna sisse
		hetk=louna_algus;
	};
	if ((jooksva_too_algus<louna_lopp) && (hetk > louna_lopp)) {
		hetk=hetk - jooksva_too_algus-30;
	}else{
		hetk=hetk - jooksva_too_algus;
	} ;
	return hetk;
}

//////////////////////////////////////////////////////////
//Arvutame hetke aja, võtame arvesse registreeritud aja //
//////////////////////////////////////////////////////////

function hetkeAeg() {
	var aeg =new Date();
	aeg=aeg.getHours()*60 + aeg.getMinutes();
}


