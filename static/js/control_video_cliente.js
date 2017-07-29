 var socket = io.connect('http://192.168.1.57:3000', {'forceNew': true}); 
  var video = document.getElementById("video");
    var logger = document.getElementById('logger');
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.width = 120;
    context.height = 120;


    function log(message) {
       logger.innerHTML = logger.innerHTML + message + "<br/>";
    };

   
   navigator.getUsermedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msgGetUserMedia);
    if(navigator.getUserMedia) {
        navigator.getUserMedia('video', successCallback, errorCallback);

        function successCallback( stream ) {
        	log('Broadcasting...');
            video.src = stream;
        };

        function errorCallback( error ) {
            log('Error broadcasting: ' + error.code );
        };
    } 

    /* SOCKET.IO */

    var socket = io.connect(window.document.location.host);


    socket.on('connect', function () {
    	log('connected');
    });

    socket.on('disconnect', function () {
    	log('disconnected');
    });

    function emit(message) {
    	socket.emit('data', message);
    }

    /* END SOCKET.IO */

    function sendFrame(video, context) {
        context.drawImage(video, 0, 0, context.width, context.height);
        emit(canvas.toDataURL('image/webp'));
    }

    setInterval(function() { sendFrame(video, context); }, 1000);