
var ajSettings = $.ajaxSettings;

ajSettings.url = "http://monadnock.or.gs:8080/lifeSaving/LAKE/Superior";

var ajResp;
var timer;

var clickSnd = Ti.Media.createSound('SOUND/click.wav');

var videoHTML;

videoHTML = "<object id='myId' classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' width='640' height='480'><param name='movie' value='LifeSaving_converted.swf' /><param name='wmode' value='transparent'><!--[if !IE]>--><object type='application/x-shockwave-flash' data='LifeSaving_converted.swf' width='640' height='480'><!--<![endif]--><p>Flash Not Installed</p><!--[if !IE]>--></object><!--<![endif]--></object>";


$.fx.interval = 1;