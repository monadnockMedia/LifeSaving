
var currentScreen = 0;
var selectedOffset;
var timer = setInterval(checkPosition, 25);
// clearInterval(timer);


function loadFirstExcerpt () {
	ajSettings.url = "http://0.0.0.0:8080/lifeSaving/ID/" + $( ".selected" ).attr("reportID");
	$( ".excerpt" ).empty();
	ajResp = $.ajax(ajSettings).done(function( html ) {
		$( ".excerpt" ).append( html );
	});
}

function checkPosition() {
	//console.log($(".selected").offset());
	//	console.log($(".selected + .report").offset());
	
	selectedOffset = $(".selected").offset();
	
	if (selectedOffset.top < 165) {
		$(".selected").animate({opacity:0.01}, 150, function() {});
		$(".selected + .report").addClass("selected");
		$(".selected").first().removeClass("selected");
		loadFirstExcerpt();
	} else if (selectedOffset.top > 390) {
		$(".selected").prev().addClass("selected");
		$(".selected").animate({opacity:1}, 150, function() {});
		$(".selected").last().removeClass("selected");
		loadFirstExcerpt();
	}
}

function clearMap() {
	$(".nextBttn").removeClass("Superior Michigan Huron Erie Ontario");
}

function setMap() {

}

/*-- - --*/

/*$("body").on( "click", ".report", function() {
	$(".report").removeClass("selected");
	$(this).addClass("selected");
	
	ajSettings.url = "http://0.0.0.0:8080/lifeSaving/ID/" + $(this).attr("reportID");
	$( ".excerpt" ).empty();
	ajResp = $.ajax(ajSettings).done(function( html ) {
		$( ".excerpt" ).append( html );
	});
	
	console.log($(".selected").offset());
})*/

$(".mapBttn").click(function(e) {
	if (currentScreen == 0) {
		$(".mapTitle").fadeIn( 400 ).animate({left: "+=1280", opacity:1}, 500, function() {});
		$(".mapBttn").fadeOut(500);
		$(".nextBttn").animate({opacity:1}, 500, function() {});
		currentScreen = 1;
		clearMap();
		
			if ($(this).hasClass("Superior")) {
				ajSettings.url = "http://0.0.0.0:8080/lifeSaving/LAKE/Superior";
				$( ".mapTitle" ).empty();
				$( ".mapTitle" ).append( "<h1>Lake Superior</h1>" );
				$(".nextBttn").addClass("Superior");
			} else if ($(this).hasClass("Michigan")) {
				ajSettings.url = "http://0.0.0.0:8080/lifeSaving/LAKE/Michigan";
				$( ".mapTitle" ).empty();
				$( ".mapTitle" ).append( "<h1>Lake Michigan</h1>" );
				$(".nextBttn").addClass("Michigan");
			} else if ($(this).hasClass("Huron")) {
				ajSettings.url = "http://0.0.0.0:8080/lifeSaving/LAKE/Huron";
				$( ".mapTitle" ).empty();
				$( ".mapTitle" ).append( "<h1>Lake Huron</h1>" );
				$(".nextBttn").addClass("Huron");
			} else if ($(this).hasClass("Erie")) {
				ajSettings.url = "http://0.0.0.0:8080/lifeSaving/LAKE/Erie";
				$( ".mapTitle" ).empty();
				$( ".mapTitle" ).append( "<h1>Lake Erie</h1>" );
				$(".nextBttn").addClass("Erie");
			} else if ($(this).hasClass("Ontario")) {
				ajSettings.url = "http://0.0.0.0:8080/lifeSaving/LAKE/Ontario";
				$( ".mapTitle" ).empty();
				$( ".mapTitle" ).append( "<h1>Lake Ontario</h1>" );
				$(".nextBttn").addClass("Ontario");
			}

		$( ".dates" ).empty();

		ajResp = $.ajax(ajSettings).done(function( html ) {
			$( ".dates" ).append( html );
			$('.scroll-pane').sbscroller('refresh');
			$('.scroll-pane').sbscroller('reset');
			$( ".report" ).first().addClass("selected");
			loadFirstExcerpt();
		});
	}
});

$(".backBttn").click(function(e) {
	if (currentScreen == 1) {
		$(".mapTitle").fadeIn( 400 ).animate({left: "-=1280", opacity:1}, 500, function() {});
		$(".mapBttn").fadeIn(500);
		$(".nextBttn").animate({opacity:0}, 500, function() {});
		currentScreen = 0;
	} else if (currentScreen == 2) {
		$(".dateContainer").animate({left: "-=460", opacity:0}, 500, function() {});
		$(".dates").animate({opacity:0}, 500, function() {});
		$(".excerpt").animate({opacity:0}, 500, function() {
			$(".mapBttn").fadeIn(500);
			$( ".dates" ).empty();
			$("body").toggleClass("wholeMap");
			
		});
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
			$(".excerpt").animate({opacity:1}, 500, function() {});
		});
		currentScreen = 2;
		$(".nextBttn").animate({opacity:0}, 500, function() {});
		$(this).toggleClass("disableClick");
		$("body").toggleClass("wholeMap");
	}
});