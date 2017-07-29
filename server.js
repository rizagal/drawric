var express = require('express');
var app = express();
var http = require('http').Server(app);
//requerimos y relacionamos el arhivo de rutas
var rutas = require("./routes_app.js");
//socket io - aqui donde manejamos el realtime de paginas simultaneo
var io = require('socket.io')(http);

const port = process.env.PORT || 3000 

//configurar nuestros archivos estaticos , html,css,js,img.
app.use('/static',express.static(__dirname+ '/static'));

//setear variables views express - Configurar nuestro directorio raiz de las vistas dinamicas como jade
app.set('views',__dirname + '/views');


//Cargamos el archivo de rutas
app.use("/",rutas);


http.listen(port,function(){
   console.log('Nuestro servidor esta escuchando el puerto: 8080');

});



