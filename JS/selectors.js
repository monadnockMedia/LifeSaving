
var currentScreen = 0;
var selectedOffset;
var timer = setInterval(checkPosition, 25);



function loadExcerpt () {
	ajSettings.url = "http://0.0.0.0:8080/lifeSaving/ID/" + $( ".selected" ).attr("reportID");
	$( ".excerpt" ).empty();
	$(".excerpt").fadeOut(1);
	ajResp = $.ajax(ajSettings).done(function( html ) {
		$( ".excerpt" ).append( html );
		$(".excerpt").fadeIn();
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
		loadExcerpt();
	} else if (selectedOffset.top > 390) {
		$(".selected").prev().addClass("selected");
		$(".selected").animate({opacity:1}, 150, function() {});
		$(".selected").last().removeClass("selected");
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
				ajSettings.url = "http://0.0.0.0:8080/lifeSaving/LAKE/Superior";
				$( ".mapTitle" ).empty();
				$( ".mapTitle" ).append( "<h1>Lake Superior</h1>" );
				$(".nextBttn").addClass("Superior");
				$(".excerptTitle").append("The Waldo");
			} else if ($(this).hasClass("Michigan")) {
				ajSettings.url = "http://0.0.0.0:8080/lifeSaving/LAKE/Michigan";
				$( ".mapTitle" ).empty();
				$( ".mapTitle" ).append( "<h1>Lake Michigan</h1>" );
				$(".nextBttn").addClass("Michigan");
				$(".excerptTitle").append("The Granada");
			} else if ($(this).hasClass("Huron")) {
				ajSettings.url = "http://0.0.0.0:8080/lifeSaving/LAKE/Huron";
				$( ".mapTitle" ).empty();
				$( ".mapTitle" ).append( "<h1>Lake Huron</h1>" );
				$(".nextBttn").addClass("Huron");
				$(".excerptTitle").append("The J.H. Magruder");
			} else if ($(this).hasClass("Erie")) {
				ajSettings.url = "http://0.0.0.0:8080/lifeSaving/LAKE/Erie";
				$( ".mapTitle" ).empty();
				$( ".mapTitle" ).append( "<h1>Lake Erie</h1>" );
				$(".nextBttn").addClass("Erie");
				$(".excerptTitle").append("The Sophia Minch");
			} else if ($(this).hasClass("Ontario")) {
				ajSettings.url = "http://0.0.0.0:8080/lifeSaving/LAKE/Ontario";
				$( ".mapTitle" ).empty();
				$( ".mapTitle" ).append( "<h1>Lake Ontario</h1>" );
				$(".nextBttn").addClass("Ontario");
				$(".excerptTitle").append("The John R. Noyes");
			}

		$( ".dates" ).empty();

		ajResp = $.ajax(ajSettings).done(function( html ) {
			$( ".dates" ).append( html );
			$('.scroll-pane').sbscroller('refresh');
			$('.scroll-pane').sbscroller('reset');

			$( ".report" ).first().addClass("selected");
			loadExcerpt();
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
		$(".excerptTitle").animate({opacity:0}, 500, function() {});
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
			$(".excerptTitle").animate({opacity:1}, 500, function() {});
		});
		currentScreen = 2;
		$(".nextBttn").animate({opacity:0}, 500, function() {});
		$(this).toggleClass("disableClick");
		$("body").toggleClass("wholeMap");
		
	}
});

$( ".scroll-pane" ).on( "slidestop", function( event, ui ) {
	
});

$(".adaBttn").click(function(e) {
	//alert("ada");
	$('.scroll-pane').sbscroller('value');
});





