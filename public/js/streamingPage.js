'use strict';
   /*
   var var1;
   var var2;
   function getid () {
		var url = location.href;
		var temp = url.split("?");
		console.log(temp);
		var index = temp[1].split("&");
		for (var i = 0; i < index.length; i++) {
			var value = index[i].split("=");
			if(i == 0)
				var1 = value[1];
			else
				var2 = value[1];
		}
	}
   
	getid();
	
	 videojs('videoPlayer', {}, function(){
		var player = this;
		resizeManager:false;
		player.src([
			{
				src: 'http://127.0.0.1:8080/dash/' + var1 + '/' + var2 + '.mpd',
				type: 'application/dash+xml'
			}
		]);
		player.play();
  });
  */
var player = videojs('videoPlayer');
player.controlBar.addChild('QualitySelector');

player.ready(function() {
    player.src([
        {
            src: '/big/big_1080/big.mpd',
            type: 'application/dash+xml',
            label: '1080P'
        },
        {
            src: '/big/big_720/big.mpd',
            type: 'application/dash+xml',
            label: '720P',
        },
        {
            src: '/big/big_480/big.mpd',
            type: 'application/dash+xml',
            label: '480P',
            selected: 'true'
        },
        {
            src: '/big/big_360/big.mpd',
            type: 'application/dash+xml',
            label: '360P'
        }
    ]);
    player.play();
});