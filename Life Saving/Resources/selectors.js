
var adaEnabled = false;
var currentScreen = 1;
var selectedOffset;
var selectedCenter;
var selectedHeight;
var selectedMiddle;
var adjustDistance;
var adjustDistanceString;
var $reportText;
var $summaryText;
var header = "<h2>Excerpt from U.S. Life-Saving Station Annual Report</h2>";
var idleTimer;

$(document.body).click(function(e) {
	userStarted();
})

function restart() {
	document.location.href='';
}


attractLoop();
function attractLoop(){
		
	$("#attractBook").animate({left: "-=1280px"}, 15000, "linear", function() {
		$("#attractBook").css({left: 1280});
		
		$("#attractBook").animate({left: "-=1280px"}, 15000, "linear", function() {
			attractLoop();
		});
		
	});
	
	$("#attractFilm").animate({left: "-=2560px"}, 30000, "linear", function() {
		$("#attractFilm").css({left: 1280});
	});
}

$("#attractBook").click(function(e) {
	$("#attractBook").animate({opacity:0}, 250, function() {});
	$("#attractFilm").animate({opacity:0}, 250, function() {});
	$("#attractLoopBG").animate({opacity:0}, 250, function() {
		$("#attractLoopBG").css({left: 8000});
	});
	currentScreen = 1;
});


function promptIdleUser() {   
    clearInterval(idleTimer);
  	idleTimer = setInterval(restart, 10000);

	$( "#dialog" ).dialog({
		height:250,
		width: 500,
		modal: true,
		resizable: false,
		show: {
			effect: "blind", duration: 250
		},
		hide: {
			effect: "blind", duration: 250
		},
		buttons: {
		  	"Yes": function()
			{
		    	$( this ).dialog( "close" );
				userStarted();
		  	}
		}
	}); // Shows the idle alert box.
}


function userStarted() {
	clearInterval(idleTimer);
	console.log("Clear Interval");
	idleTimer = setInterval(promptIdleUser, 120000); // 30000
}


function checkPosition() { //gets called every update when slider is moving
	userStarted();
	
	selectedOffset = $(".selected").offset();
	selectedHeight = $(".selected").innerHeight();
	selectedCenter = (selectedHeight/2);
	selectedMiddle = (selectedOffset.top + selectedCenter);

	if (selectedMiddle < 185) {
		$(".selected").animate({opacity:0.01}, 150, function() {});
		$(".selected + .summary").addClass("selected");
		$(".selected").first().removeClass("selected");
		loadExcerpt();
	} else if (selectedMiddle > 420) {
		$(".selected").prev().addClass("selected");
		$(".selected").last().removeClass("selected");
		$(".selected").animate({opacity:1}, 150, function() {});
		loadExcerpt();
	}
}


/*-- - --*/


$(".mapBttn").click(function(e) {
	if (currentScreen == 1) {

		$(".mapBttn").fadeOut(500);
		$(".backBttn").animate({opacity:1}, 500, function() {});
		$(".excerptTitle").empty();
		$(".excerptTitle").animate({opacity:1}, 250, function() {});
		
		//Go to Excerpt Screens
		$(".mapTitle").fadeIn( 250 ).animate({left: "-=1280", opacity:1}, 250, function() {
			$(".dateContainer").animate({left: "+=460", opacity:1}, 250, function() {});
			$(".gradientBG").animate({left: "+=460", opacity:1}, 250, function() {});
			$(".summaryHeader").animate({left: "+=460", opacity:1}, 250, function() {});
			$(".dates").animate({opacity:1}, 250, function() {});
			$(".reports").animate({opacity:1}, 250, function() {});
			
			
		});
		currentScreen = 3;
		$(this).toggleClass("disableClick");
		$("body").toggleClass("wholeMap");
		
		
			if ($(this).hasClass("Superior")) {
				ajSettings.url = "http://monadnock.or.gs:8080/lifeSaving/LAKE/Superior";
				header = "<h2><u>Excerpt from Annual Report of the U.S. Life-Saving Service<u/></h2>";
				$( ".mapTitle" ).empty();
				$( ".mapTitle" ).append( "<h1>Lake Superior</h1>" );
				$(".excerptTitle").append("The <i>Waldo</i>, 1913");
			} else if ($(this).hasClass("Michigan")) {
				ajSettings.url = "http://monadnock.or.gs:8080/lifeSaving/LAKE/Michigan";
				header = "<h2><u>Excerpt from Annual Report of the U.S. Life-Saving Service<u/></h2>";
				$( ".mapTitle" ).empty();
				$( ".mapTitle" ).append( "<h1>Lake Michigan</h1>" );
				$(".excerptTitle").append("The <i>Granada</i>, 1880");
			} else if ($(this).hasClass("Huron")) {
				ajSettings.url = "http://monadnock.or.gs:8080/lifeSaving/LAKE/Huron";
				header = "<h2><u>Excerpt from the Report of District Superintendent Joseph Sawyer<u/></h2>";
				$( ".mapTitle" ).empty();
				$( ".mapTitle" ).append( "<h1>Lake Huron</h1>" );
				$(".excerptTitle").append("The <i>J.H. Magruder</i>, 1880");
			} else if ($(this).hasClass("Erie")) {
				ajSettings.url = "http://monadnock.or.gs:8080/lifeSaving/LAKE/Erie";
				header = "<h2><u>Excerpt from Annual Report of the U.S. Life-Saving Service<u/></h2>";
				$( ".mapTitle" ).empty();
				$( ".mapTitle" ).append( "<h1>Lake Erie</h1>" );
				$(".excerptTitle").append("The <i>Sophia Minch</i>, 1884");
			} else if ($(this).hasClass("Ontario")) {
				ajSettings.url = "http://monadnock.or.gs:8080/lifeSaving/LAKE/Ontario";
				header = "<h2><u>Excerpt from Commendation Letter to Keeper Gray and Crew<u/></h2>";
				$( ".mapTitle" ).empty();
				$( ".mapTitle" ).append( "<h1>Lake Ontario</h1>");
				$(".excerptTitle").append("The <i>John R. Noyes</i>, 1902");
			}
		
		ajResp = $.get(ajSettings.url).success(function() {
			$summaryText = $(ajResp.responseText);
			$(".dates").empty();
			$( ".dates" ).append($summaryText.find(".summary"));
			$('.scroll-pane').sbscroller('refresh');
			$('.scroll-pane').sbscroller('reset');
			console.log("SBSCroller Refresh&Reset");
			$( ".summary" ).first().addClass("selected");
			
			if (adaEnabled) {
				$(".summary").addClass("adaEnabled");
			}
			fakeClick();
			loadExcerpt();
		});
	}
});


function loadExcerpt () {
	$(".reports").fadeOut(200, function() {
		$(".reports").empty();
		$reportText = $(ajResp.responseText);
		var ID = $(".selected").attr("summaryid");
		$( ".reports" ).append(header);
		$( ".reports" ).append($reportText.find(".report[reportid='"+ ID + "']"));
		$(".reports").fadeIn(200);
	});
}


$(".backBttn").click(function(e) {
	if (currentScreen == 2) {
		$(".mapTitle").fadeIn( 400 ).animate({left: "-=1280", opacity:1}, 500, function() {});
		$(".mapBttn").fadeIn(500);
		$(".reports").animate({opacity:0}, 0, function() {});
		$(".backBttn").animate({opacity:0}, 500, function() {});
		currentScreen = 1;
	} else if (currentScreen == 3) {
		$(".dateContainer").animate({left: "-=460", opacity:0}, 0, function() {});
		$(".gradientBG").animate({left: "-=460", opacity:0}, 0, function() {});
		$(".summaryHeader").animate({left: "-=460", opacity:0}, 0, function() {});
		$(".dates").animate({opacity:0}, 100, function() {});
		$(".excerptTitle").animate({opacity:0}, 0, function() {});
		$(".reports").animate({opacity:0}, 0, function() {});
		$(".backBttn").animate({opacity:0}, 100, function() {});
		$(".mapBttn").fadeIn(0);
		$( ".dates" ).empty();
		$("body").toggleClass("wholeMap");
		currentScreen = 1;
		$(".mapBttn").fadeIn(500);
		$(".mapBttn").removeClass("disableClick");
	}
});



$( ".scroll-pane" ).on( "slidestop", function( event, ui ) {
	
	checkPosition();
	
	//Calculate distance between middle of selection and middle of ribbon
	if (selectedMiddle > 320) {
		adjustDistance = selectedMiddle - 320;
		adjustDistanceString = "-=" + adjustDistance.toString();
	} else if (selectedMiddle < 320) {
		adjustDistance = 320 - selectedMiddle;
		adjustDistanceString = "+=" + adjustDistance.toString();
	}
	
	//Move report to center
	$(".scroll-content").animate({
	    top: adjustDistanceString
	  }, {
	    duration: 200,
	    complete: function(){
	      $('.scroll-pane').sbscroller('refresh');
		  clearInterval(timer);
		  console.log("let go of slide");
	    }
	});
});

function fakeClick() {
	checkPosition();
	
	//Calculate distance between middle of selection and middle of ribbon 310
	if (selectedMiddle > 320) {
		adjustDistance = selectedMiddle - 320;
		adjustDistanceString = "-=" + adjustDistance.toString();
	} else if (selectedMiddle < 320) {
		adjustDistance = 320 - selectedMiddle;
		adjustDistanceString = "+=" + adjustDistance.toString();
	}
	
	//Move report to center
	$(".scroll-content").animate({
	    top: adjustDistanceString
	  }, {
	    duration: 200,
	    complete: function(){
	      $('.scroll-pane').sbscroller('refresh');
		  clearInterval(timer);
		  console.log("ONE TIME PRE-CLICK");
	    }
	});
}

$( ".scroll-pane" ).on( "slidestart", function( event, ui ) {
	timer = setInterval(checkPosition, 0);
});


$(".adaBttn").click(function(e) {
	
	if (adaEnabled) {
		adaEnabled = false;
		$(".dates").removeClass("adaEnabled");
		$(".reports").removeClass("adaEnabled");
		$(".summary").removeClass("adaEnabled");
	} else {
		adaEnabled = true;
		$(".dates").addClass("adaEnabled");
		$(".reports").addClass("adaEnabled");
		$(".summary").addClass("adaEnabled");
	}
});


$( ".summary" ).bind( "click", function() {
});

