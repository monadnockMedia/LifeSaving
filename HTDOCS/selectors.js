

var currentScreen = 0;
var selectedOffset;
var selectedCenter;
var selectedHeight;
var selectedMiddle;
var adjustDistance;
var adjustDistanceString;
var $reportText;
var $summaryText;
var header = "<h2>Excerpt from U.S. Life-Saving Station Annual Report</h2>";


function checkPosition() { //gets called every update when slider is moving
	selectedOffset = $(".selected").offset();
	selectedHeight = $(".selected").innerHeight();
	selectedCenter = (selectedHeight/2);
	selectedMiddle = (selectedOffset.top + selectedCenter);
	//air.Introspector.Console.log(selectedMiddle);
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


function clearMap() {
	$(".nextBttn").removeClass("Superior Michigan Huron Erie Ontario");
}


/*-- - --*/


$(".mapBttn").click(function(e) {
	if (currentScreen == 0) {
		$(".mapTitle").fadeIn(400).animate({left: "+=1280", opacity:1}, 500, function() {});
		$(".mapBttn").fadeOut(500);
		$(".nextBttn").animate({opacity:1}, 500, function() {});
		$(".backBttn").animate({opacity:1}, 500, function() {});
		$(".excerptTitle").empty();
		
		currentScreen = 1;
		clearMap();
		
			if ($(this).hasClass("Superior")) {
				ajSettings.url = "http://server.local:8080/lifeSaving/LAKE/Superior";
				$( ".mapTitle" ).empty();
				$( ".mapTitle" ).append( "<h1>Lake Superior</h1>" );
				$(".nextBttn").addClass("Superior");
				$(".excerptTitle").append("The <i>Waldo</i>");
			} else if ($(this).hasClass("Michigan")) {
				ajSettings.url = "http://server.local:8080/lifeSaving/LAKE/Michigan";
				$( ".mapTitle" ).empty();
				$( ".mapTitle" ).append( "<h1>Lake Michigan</h1>" );
				$(".nextBttn").addClass("Michigan");
				$(".excerptTitle").append("The <i>Granada</i>");
			} else if ($(this).hasClass("Huron")) {
				ajSettings.url = "http://server.local:8080/lifeSaving/LAKE/Huron";
				$( ".mapTitle" ).empty();
				$( ".mapTitle" ).append( "<h1>Lake Huron</h1>" );
				$(".nextBttn").addClass("Huron");
				$(".excerptTitle").append("The <i>J.H. Magruder</i>");
			} else if ($(this).hasClass("Erie")) {
				ajSettings.url = "http://server.local:8080/lifeSaving/LAKE/Erie";
				$( ".mapTitle" ).empty();
				$( ".mapTitle" ).append( "<h1>Lake Erie</h1>" );
				$(".nextBttn").addClass("Erie");
				$(".excerptTitle").append("The <i>Sophia Minch</i>");
			} else if ($(this).hasClass("Ontario")) {
				ajSettings.url = "http://server.local:8080/lifeSaving/LAKE/Ontario";
				$( ".mapTitle" ).empty();
				$( ".mapTitle" ).append( "<h1>Lake Ontario</h1>");
				$(".nextBttn").addClass("Ontario");
				$(".excerptTitle").append("The <i>John R. Noyes</i>");
			}
		
		ajResp = $.get(ajSettings.url).success(function() {
			$summaryText = $(ajResp.responseText);
			$(".dates").empty();
			$( ".dates" ).append($summaryText.find(".summary"));
			$('.scroll-pane').sbscroller('refresh');
			$('.scroll-pane').sbscroller('reset');
			$( ".summary" ).first().addClass("selected");
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
	if (currentScreen == 1) {
		$(".mapTitle").fadeIn( 400 ).animate({left: "-=1280", opacity:1}, 500, function() {});
		$(".mapBttn").fadeIn(500);
		$(".nextBttn").animate({opacity:0}, 500, function() {});
		$(".reports").animate({opacity:0}, 0, function() {});
		$(".backBttn").animate({opacity:0}, 500, function() {});
		currentScreen = 0;
	} else if (currentScreen == 2) {
		$(".dateContainer").animate({left: "-=460", opacity:0}, 0, function() {});
		$(".gradientBG").animate({left: "-=460", opacity:0}, 0, function() {});
		$(".dates").animate({opacity:0}, 100, function() {});
		$(".excerptTitle").animate({opacity:0}, 0, function() {});
		$(".reports").animate({opacity:0}, 0, function() {});
		$(".backBttn").animate({opacity:0}, 100, function() {});
		$(".mapBttn").fadeIn(0);
		$( ".dates" ).empty();
		$("body").toggleClass("wholeMap");
		currentScreen = 0;
		$(".nextBttn").toggleClass("disableClick");
	}
});


$(".nextBttn").click(function(e) {
	if (currentScreen == 1) {
		//Go to Excerpt Screens
		$(".mapTitle").fadeIn( 400 ).animate({left: "-=1280", opacity:1}, 500, function() {
			$(".dateContainer").animate({left: "+=460", opacity:1}, 500, function() {});
			$(".gradientBG").animate({left: "+=460", opacity:1}, 500, function() {});
			$(".dates").animate({opacity:1}, 500, function() {});
			$(".reports").animate({opacity:1}, 500, function() {});
			
			$(".excerptTitle").animate({opacity:1}, 500, function() {});
		});
		currentScreen = 2;
		$(".nextBttn").animate({opacity:0}, 500, function() {});
		$(this).toggleClass("disableClick");
		$("body").toggleClass("wholeMap");
	}
});


$( ".scroll-pane" ).on( "slidestop", function( event, ui ) {
	checkPosition();
	
	//Calculate distance between middle of selection and middle of ribbon
	if (selectedMiddle > 310) {
		adjustDistance = selectedMiddle - 310;
		adjustDistanceString = "-=" + adjustDistance.toString();
	} else if (selectedMiddle < 310) {
		adjustDistance = 310 - selectedMiddle;
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
	    }
	});
});

$( ".scroll-pane" ).on( "slidestart", function( event, ui ) {
	timer = setInterval(checkPosition, 0);
});


$(".adaBttn").click(function(e) {
	//ada
});


$( ".summary" ).bind( "click", function() {
});

