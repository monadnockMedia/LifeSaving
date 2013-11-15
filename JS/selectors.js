
var currentScreen = 0;
var selectedOffset;
var selectedCenter;
var selectedHeight;
var selectedMiddle;
var adjustDistance;
var adjustDistanceString;
var $reportText;
var $summaryText;

//timer = setInterval(checkPosition, 1);



function checkPosition() { //gets called every update when slider is moving
	selectedOffset = $(".selected").offset();
	selectedHeight = $(".selected").innerHeight();
	selectedCenter = (selectedHeight/2);
	selectedMiddle = (selectedOffset.top + selectedCenter);
	
	if (selectedMiddle < 240) {
		$(".selected").animate({opacity:0.01}, 150, function() {});
		$(".selected + .summary").addClass("selected");
		$(".selected").first().removeClass("selected");
		loadExcerpt();
	} else if (selectedMiddle > 430) {
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
		$(".excerptTitle").empty();
		
		currentScreen = 1;
		clearMap();
		
			if ($(this).hasClass("Superior")) {
				ajSettings.url = "http://server.local:8080/lifeSaving/LAKE/Superior";
				$( ".mapTitle" ).empty();
				$( ".mapTitle" ).append( "<h1>Lake Superior</h1>" );
				$(".nextBttn").addClass("Superior");
				$(".excerptTitle").append("The Waldo");
			} else if ($(this).hasClass("Michigan")) {
				ajSettings.url = "http://server.local:8080/lifeSaving/LAKE/Michigan";
				$( ".mapTitle" ).empty();
				$( ".mapTitle" ).append( "<h1>Lake Michigan</h1>" );
				$(".nextBttn").addClass("Michigan");
				$(".excerptTitle").append("The Granada");
			} else if ($(this).hasClass("Huron")) {
				ajSettings.url = "http://server.local:8080/lifeSaving/LAKE/Huron";
				$( ".mapTitle" ).empty();
				$( ".mapTitle" ).append( "<h1>Lake Huron</h1>" );
				$(".nextBttn").addClass("Huron");
				$(".excerptTitle").append("The J.H. Magruder");
			} else if ($(this).hasClass("Erie")) {
				ajSettings.url = "http://server.local:8080/lifeSaving/LAKE/Erie";
				$( ".mapTitle" ).empty();
				$( ".mapTitle" ).append( "<h1>Lake Erie</h1>" );
				$(".nextBttn").addClass("Erie");
				$(".excerptTitle").append("The Sophia Minch");
			} else if ($(this).hasClass("Ontario")) {
				ajSettings.url = "http://server.local:8080/lifeSaving/LAKE/Ontario";
				$( ".mapTitle" ).empty();
				$( ".mapTitle" ).append( "<h1>Lake Ontario</h1>");
				$(".nextBttn").addClass("Ontario");
				$(".excerptTitle").append("The John R. Noyes");
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
		$( ".reports" ).append($reportText.find(".report[reportid='"+ ID + "']"));
		$(".reports").fadeIn(200);
	});
}

$(".backBttn").click(function(e) {
	if (currentScreen == 1) {
		$(".mapTitle").fadeIn( 400 ).animate({left: "-=1280", opacity:1}, 500, function() {});
		$(".mapBttn").fadeIn(500);
		$(".nextBttn").animate({opacity:0}, 500, function() {});
		$(".report").animate({opacity:0}, 0, function() {});
		currentScreen = 0;
	} else if (currentScreen == 2) {
		$(".dateContainer").animate({left: "-=460", opacity:0}, 0, function() {});
		$(".dates").animate({opacity:0}, 100, function() {});
		$(".excerptTitle").animate({opacity:0}, 0, function() {});
		$(".report").animate({opacity:0}, 0, function() {});
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
			$(".dates").animate({opacity:1}, 500, function() {});
			$(".report").animate({opacity:1}, 500, function() {});
			$(".excerptTitle").animate({opacity:1}, 500, function() {});
		});
		currentScreen = 2;
		$(".nextBttn").animate({opacity:0}, 500, function() {});
		$(this).toggleClass("disableClick");
		$("body").toggleClass("wholeMap");
	}
});

$( ".scroll-pane" ).on( "slidestop", function( event, ui ) {
	
	
	//Calculate distance between middle of selection and middle of ribbon
	if (selectedMiddle > 335) {
		adjustDistance = selectedMiddle - 335;
		adjustDistanceString = "-=" + adjustDistance.toString();
	} else if (selectedMiddle < 335) {
		adjustDistance = 335 - selectedMiddle;
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
} );

$(".adaBttn").click(function(e) {
	//ada
});

$( ".summary" ).bind( "click", function() {
  console.log( "clicked report" );
});
