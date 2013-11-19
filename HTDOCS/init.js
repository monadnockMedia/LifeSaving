
var ajSettings = $.ajaxSettings;

ajSettings.url = "http://server.local:8080/lifeSaving/LAKE/Superior";

var ajResp;
var timer;

//Animation Framerate
$.fx.interval = 60;