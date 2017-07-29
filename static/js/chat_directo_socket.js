var socket = io.connect('http://192.168.1.57:3000', {'forceNew': true});  
//Inicio Chat Directo
 var text_contenido = document.getElementById('texto');
var posicion;
function addMessage_directo(e){

   var payload = {
    usuario: document.getElementById('usuario').value,
    text: document.getElementById('texto').value
  };

    
   text_contenido.value = "";    
   text_contenido.focus();

  socket.emit('new-message_directo',payload)
   return false;
 
}

socket.on('messages_directo',function(data){
  console.log(data);
  render_directo(data);
})


     //creamos la plantilla para imprimir los mensajes
function render_directo(data){
                 //data va ser recorrido con la funcion: map, donde solamente utilizamos el elem
  var html = data.map(function(elem, index){
     // Utilizamos string features `` in ECMAScript 6: Nos permite extrapolar variables dentro del String
     // tambien nos permite utilizar comillas simples y dobles
     //em es cursiva
   

var usuario_local = document.getElementById('usuario').value;
     if (elem.usuario == usuario_local){
            return(`<div   class="row msg_container base_sent">
                <div class="col-md-10 col-xs-10">
                            <div class="messages msg_send">
                                 <strong>${elem.usuario}</strong>: 
                                 <em>${elem.text}</em>
                            </div>
                        </div>
                        <div class="col-md-2 col-xs-2 avatar">
                            <img src="/static/imagenes/mujer.png" class=" img-responsive ">
                        </div></div>`);
      }else{
                  return(`<div class="row msg_container base_receive">
                        <div class="col-md-2 col-xs-2 avatar">
                            <img src="/static/imagenes/usuario.png" class=" img-responsive ">
                        </div>
                        <div class="col-md-10 col-xs-10">
                            <div class="messages msg_receive">
                                 <strong>${elem.usuario}</strong>: 
                                 <em>${elem.text}</em>
                            </div>
                        </div>
                    </div>`);
     }

   
       //con el metodo .join unimos los arrays con espacios
  }).join(" ");
         document.getElementById('messages_directo').innerHTML = html;

//De la siguiente forma muevo la barra vertical para que se pueda visualizar el ultimo mensaje en el div
//Debe quedar aqui, para poder que se ajuste despues que llega el mensaje
 var contenido_msg = document.getElementById('messages_directo');
 contenido_msg.scrollTop = contenido_msg.scrollHeight;


}
//Fin de manejo de chat directo


