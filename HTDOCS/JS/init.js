
var ajSettings = $.ajaxSettings;

ajSettings.url = "http://server.local:8080/lifeSaving/LAKE/Superior";

var ajResp;
var timer;

//Animation Framerate
$.fx.interval = 13;

/* Runs after page loaded */
$(document).ready(init);

function init(){
	
	air.Mouse.hide();

}

