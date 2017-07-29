var express = require('express');
var app = express();
var http = require('http').Server(app);
//requerimos y relacionamos el arhivo de rutas
var rutas = require("./routes_app.js");
//socket io - aqui donde manejamos el realtime de paginas simultaneo
var io = require('socket.io')(http);
var streamingService = require('./lib/service/streamingService');

//cargar archivo de cofiguracion en variable global
global.config = require('./config');
//enviar variables a nuestros templates
//Por ahora tengo el ejemplo en perfiles.ejs
app.locals = global.config;


//llamamos el metodo log
var log = require('log');
   log = new log('debug');

//configurar nuestros archivos estaticos , html,css,js,img.
app.use('/static',express.static(__dirname+ '/static'));

//setear variables views express - Configurar nuestro directorio raiz de las vistas dinamicas como jade
app.set('views',__dirname + '/views');
app.set('view engine','ejs');

//Cargamos el archivo de rutas
app.use("/",rutas);

http.listen(8080,function(){
   console.log('Nuestro servidor esta escuchando el puerto: 3000');

});



//-------------------------------------- Hasta aqui lo de Express

  //Array de Mensajes por ahora donde no se guarda en una base de datos
   var messages = [{
       id:1,
       image_usua: "/static/imagenes/usuario.png",
       text: "Hola Soy un Mensaje",
       author: "Ricardo Zuñiga"
      }];


  //Array de Mensajes chat directo
   var messages_directo = [{
       id:1,  
       usuario: "administrador",   
       text: "Bienvenido Chat Educativo",
       habilita: 1
      }];


   //Array guardar movimientos
  var movimientos_directo = new Array();



  var registrocompleto;
//--------------------------------------socket io-------------------------

var contador = 0;
io.on('connection',function(socket) {
  contador++; 
  //se hace una llamada a todos los que estan conectados a nuestro socket
  io.sockets.emit('welcome',contador);

    //manejo de canvas para pintar
  socket.on('draw',function(_movimientos) {
    movimientos_directo.push(_movimientos);
    console.log(movimientos_directo);
    io.sockets.emit('update',movimientos_directo);
  });

    //manejo de mensaje - alerta
    //Como se ve con la Funcion socket.on: recibo ordenes del cliente, que desde el archivo javascript envia las ordenes con socket.emit
    //y con el funcion io.socket.emit: envio las ordenes al cliente, que las recibe con socket.on
  socket.on('envimensaje',function(_message) {
     io.sockets.emit('vermensaje',_message);
    var server = require("./sql_usuarios");
      server.iniciar(_message);
   
  });

  //Video Streaming
   socket.on('stream',function(image){
    socket.broadcast.emit('stream',image);
   });


    //ver registro
   socket.on('veregistro',function(dat_registros){
    getEmp(dat_registros);   
   });  

     //ver lista de eventos en base de datos
   socket.on('list_eventos',function(){
    func_lista_eve_bd();   
   });  
  

   //manejo de chat - enviar un arreglo
   socket.emit('messages',messages); 

  socket.on('new-message',function(data){
         //con la funcion push ayadimos el nuevo data (payload) que llega, y lo vamos guardando en array messages
     messages.push(data);

       //con io.sockets.emit: lo enviamos a todos que estan conectados;  con socket.emit se envia uno a uno
     io.sockets.emit('messages',messages);
     
  });

   //manejo de chat - enviar un arreglo
   socket.emit('messages_directo',messages_directo); 


  //Manejo de Chat directo
  socket.on('new-message_directo',function(data){
         //con la funcion push ayadimos el nuevo data (payload) que llega, y lo vamos guardando en array messages
     messages_directo.push(data);

       //con io.sockets.emit: lo enviamos a todos que estan conectados;  con socket.emit se envia uno a uno
     io.sockets.emit('messages_directo',messages_directo);
  });

//Llamo la funcion desde aqui para que se ejecute apenas se cargue la pagina y luego dentro el intervalo que esta
envia_reg_awesome();

});

//--------------

//manejo para conectarse a SQLSERVER

//variable para instanciar modulo de sqlserver
// El servicio: SQL Server Browser, debe estar corriendo para poder que funcione
var sql = require("mssql");

var dbConfig = {
server: "PORTA_ACTIVOS",
database: "SISALUD",
user: "sa",
password: "sa2014",
port: 1433
}

function getEmp(dat_registros){

var resultado='';
sql.connect(dbConfig, function(err) {    
     // Stored Procedure  
    var request = new sql.Request();    
    request.input('codigo', sql.NVarChar(8), dat_registros.codigo);
    request.input('nombre', sql.NVarChar(100), dat_registros.nombre_c);
    request.input('tipo', sql.Int, dat_registros.tipo);
    request.execute('nodejs_envia_reg', function(err, recordset, returnValue) { 
        
    });
    //Hasta aqui el stored Procedure----------------

    // Query 
    var request = new sql.Request();
    //toca nombrar los campos, no sirve traer todos con el asterisco
    request.query('select codigo, nombre, tipo from gen_p_centro_costo order by id_proceso asc', function(err, recordset) {
            
           io.sockets.emit('recibireg',recordset);
    });
    // Hasta aqui el Query ---------------------------
 
  
});
 
sql.on('error', function(err) {
  // ... error handler 
});


}

//getEmp();

function envia_reg_awesome()
{
  sql.connect(dbConfig, function(err) {  
     // Stored Procedure  
    var request = new sql.Request();  
    request.query('select titulo, contenido, url_imagen, vinculo from awesom_widget where tip_widget = 3 order by id_awesome asc', function(err, recordset) {
            
           io.sockets.emit('reg_awesome',recordset);
           console.log(recordset);
    });
    // Hasta aqui el Query ---------------------------
    request.query('select titulo, contenido, url_imagen, vinculo from awesom_widget where tip_widget = 1 order by id_awesome asc', function(err, recordset) {
            
           io.sockets.emit('reg_awesome_col1',recordset);
           console.log(recordset);
    });
    // Hasta aqui el Query ---------------------------
    request.query('select titulo, contenido, url_imagen, tip_widget, vinculo, color from awesom_widget where tip_widget in (2,4) order by id_awesome asc', function(err, recordset) {
            
           io.sockets.emit('reg_awesome_col2',recordset);
           console.log(recordset);
    });


  });
}
setInterval(envia_reg_awesome,12000);

function func_lista_eve_bd()
{ 
   sql.connect(dbConfig, function(err) { 
    var request = new sql.Request(); 
          request.query('select dia, mes, url_imagen, titulo, contenido, vinculo, dia_semana, tipo_evento from awe_lista_eventos where tipo_evento in (4,5) order by id_lista_event asc', function(err, recordset) {
            
           io.sockets.emit('rec_list_bd',recordset);
           console.log(recordset);
    });
    // Hasta aqui el Query ---------------------------
   }); 

  console.log('prueba22');
  }