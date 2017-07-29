//De esta otra forma tambien se conecta a un servidor de socket que es el que estamos utilizando
         //evento   //funcion callbacks - funcion de conversacion
socket.on('messages',function(data){
	console.log(data);
	render(data);
})

     //creamos la plantilla para imprimir los mensajes
function render(data){
	          //data va ser recorrido con la funcion: map, donde solamente utilizamos el elem
	var html = data.map(function(elem, index){
		 // Utilizamos string features `` in ECMAScript 6: Nos permite extrapolar variables dentro del String
		 // tambien nos permite utilizar comillas simples y dobles
     //em es cursiva
     return(`<div>
              <img src="${elem.image_usua}" style="height: 15px; width: 15px" />
              <strong>${elem.author}</strong>:              
              <em>${elem.text}</em>
	       </div>`);
       //con el metodo .join unimos los arrays con espacios
	}).join(" ");
	       document.getElementById('messages').innerHTML = html;
}

var text_contenido = document.getElementById('texto');
function addMessage(e){
  var payload = {
    image_usua: document.getElementById('ruta_imagen').value,
  	author: document.getElementById('username').value,
  	text: document.getElementById('texto').value
  };

    
  text_contenido.value = "";  
  text_contenido.focus();

  socket.emit('new-message',payload)
   return false;

 
}

var image_usua1, image_hom, image_mujer;
image_hom = document.getElementById('usu_hom');
image_mujer = document.getElementById('usu_muj');
image_usua1 = document.getElementById('ruta_imagen');

function asig_avatar_hom(){

  image_usua1.value = "/static/imagenes/usuario.png";  
  image_hom.style.width = "30px";
  image_hom.style.height = "30px";

  image_mujer.style.width = "20px";
  image_mujer.style.height = "20px";
   text_contenido.focus();
}

function asig_avatar_mujer(){
  image_usua1.value = "/static/imagenes/mujer.png";
  image_hom.style.width = "20px";
  image_hom.style.height = "20px";

  image_mujer.style.width = "30px";
  image_mujer.style.height = "30px";
   text_contenido.focus();
  
}