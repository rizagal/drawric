var socket = io.connect('http://192.168.1.57:3000', {'forceNew': true});  
var canvas = document.getElementById("preview");
      var context = canvas.getContext("2d");
      canvas.width = 800;
      canvas.height = 600;
      context.width = canvas.width;
      context.height = canvas.height;
      var video = document.querySelector("#video22");
  
      function logger(msg)
      {
      $("#logger").text(msg);
      }
      function loadcam(stream)
      {
      //convertirmos el stream en un objeto url - ruta
      video.src = window.URL.createObjectURL(stream);
      logger('camara cargada correctamente!');
      }
      function loadfail()
      {
      logger('camara no conecta');
      }
      function viewVideo(video,context)
      {
      context.drawImage(video,0,0,context.width,context.height);
      //se guarda la imagen del canvas en modo de ruta en base 64, en formato  webp parecido a png pero menos calidad
      socket.emit('stream',canvas.toDataURL('image/webp'));
      }
      $(function(){
      navigator.getUsermedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
      if(navigator.getUsermedia){
      navigator.getUsermedia({video: true}, loadcam, loadfail);
      }
      //1000 = 1seg
      //
      setInterval(function(){
      viewVideo(video,context);
      //hasta 70 se puede para cargar imagen de video a canvas
      },20);
      });