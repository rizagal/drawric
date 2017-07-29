var socket = io();
socket.on('welcome',function(_contador){
  $(".contador").text(_contador);
});


var pulsado;
var context;

//creamos dinamicamente el canvas desde javascript
var crearLienzo=function() {
	  var canvasDiv = document.getElementById('pizarra');
    canvas = document.createElement('canvas');
    canvas.setAttribute('width',500);
    canvas.setAttribute('height',500);

    canvasDiv.appendChild(canvas);
    context = canvas.getContext("2d");

    $("canvas").mousedown(function(e){
    	pulsado=true;
    	//quitamos los espacios, solamente dejamos el contenedor: canvas
    	socket.emit('draw',[ e.pageX - this.offsetLeft,e.pageY - this.offsetTop,false]);
    });

    
      $("canvas").mousemove(function(e){
    	if(pulsado){
    	//quitamos los espacios, solamente dejamos el contenedor: canvas
    	socket.emit('draw',[e.pageX - this.offsetLeft, e.pageY - this.offsetTop,true]);
                   }
    });


       $("canvas").mouseup(function(e){
            pulsado = false;
    });

        $("canvas").mouseleave(function(e){
            pulsado = false;
    });  

   
};  

var drawing= function(movimientos){  
  context.lineJoin="round";
  context.lineWidth = 6;
  context.strokeStyle = "blue";
  for(var i=0; i<movimientos.length;i++){
      context.beginPath();
       if(movimientos[i][2] && i){
           context.moveTo(movimientos[i-1][0],movimientos[i-1][1]);
       }else{
           context.moveTo(movimientos[i][0],movimientos[i][1]);
       }
       context.lineTo(movimientos[i][0],movimientos[i][1]);
       context.closePath();
       context.stroke();
    }  

}

socket.on('update',function(_movimientos){
   drawing(_movimientos);

})
//Hasta aqui lo de Canvas----------------


//De aqui para abajo son scripts para la pagina relojllamativo -------------------------------------------------

//Manejo de Socket ya echo por mi - para enviar mensajes :-)
function actimensaje(){
           socket.emit('envimensaje',$('#Text1').val());   
  }

socket.on('vermensaje',function(_message){
     alert(_message);
   
})
//Por ahora hasta aqui lo de mensajes----------------



//Manejo de Socket para visualizar registro---------------------------------------------------------------
//enviamos los registros captados


function ver_registro(){   
             //El array debe estar dentro de la funcion, para que funcione y tambien los datos entre {}
              var dat_registros = {
               codigo: document.getElementById('codigo').value,
               nombre_c: document.getElementById('nombre_c').value,
               tipo: document.getElementById('tipo').value
             };     
           socket.emit('veregistro',dat_registros);  
  }


//Se recibe el arreglo que se envia desde el Servidor y Visualizamos alerta y listado
socket.on('recibireg',function(recordset){ 

  //ver Alert de registro ingresado
  var numero_registros = recordset.length
   resultado = recordset[numero_registros-1].codigo + " " + recordset[numero_registros-1].nombre;
   alert("Se Guardo Correcta: " + resultado);
   //hasta aqui alerta

   //visualizar listado de centros de costos
                      //Con el metodo map se recorre el Arreglo
   var html =recordset.map(function(elem, index){
   
  //Escribimos los datos mediante jquery en la tabla tbl-clientes que crearemos en la pagina web
   var codigo = elem.codigo;
   var nombre = elem.nombre;
   var tipo = elem.tipo;
   $("#tbl-clientes tbody").append("<tr><td>" + codigo + "</td>" +
                                                              "<td>" + nombre + "</td>" +
                                                              "<td>" + tipo + "</td>");   
       
  });
   //fin del ciclo, manejado con map
         
          // visualizar la tabla para mostrar registros
            document.getElementById("tbl-clientes").style.display = "block";        
       
      //se llama la funcion de Click del tbl-clientes aqui para que pueda identificar los tags despues de haber cargado los datos
      //Obtener datos de una fila
      $("#tbl-clientes").click(function(e) {
          // obtenemos el elemento sobre el que se ha hecho click
         if(!e)e=window.event; 
         if(!e.target) e.target=e.srcElement; 
          // e.target ahora simboliza la celda en la que hemos hecho click
          // subimos de nivel hasta encontrar un tr
          var TR=e.target;
          while( TR.nodeType==1 && TR.tagName.toUpperCase()!="TR" )
          TR=TR.parentNode;
          var celdas=TR.getElementsByTagName("TD");
          // cogemos la primera celda TD del tr (si existe)
          if( celdas.length!=0 ){
           //Desde aqui se cambia segun los datos junto con la creacion de las variables------------------------------------
          var codigo1 = document.getElementById('codigo');
          var nombre1 = document.getElementById('nombre_c');
          var tipo = document.getElementById('tipo');
                           //tiene que ir entre parentisis para que funcione
          codigo1.value = (celdas[0].innerHTML);
          nombre1.value = (celdas[1].innerHTML);
          tipo.value = (celdas[2].innerHTML);
          }
        //var celda = $(this);
        //alert(celda.html());
      });

})
//Por ahora hasta aqui lo de registro
