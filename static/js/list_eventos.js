var socket = io.connect('http://192.168.1.57:3000', {'forceNew': true});  
$(document).ready(function() {

 socket.emit('list_eventos');

 // Final (document).ready(function() 
});

socket.on('rec_list_bd',function(data){
  div_lista_eventos(data);
})


function div_lista_eventos(data){   
    var html = data.map(function(elem, index){      
      
     // Utilizamos string features `` in ECMAScript 6: Nos permite extrapolar variables dentro del String
     // tambien nos permite utilizar comillas simples y dobles
     //em es cursiva
        if (elem.tipo_evento == 4){      
          return(`<li>
						<time datetime="2014-07-20">
							<span class="day">${elem.dia}</span>
							<span class="month">${elem.mes}</span>
							<span class="year">2014</span>
							<span class="time">ALL DAY</span>
						</time>
						<img alt="Independence Day" src="${elem.url_imagen}" />
						<div class="info">
							<h2 class="title">${elem.titulo}</h2>
							<p class="desc">${elem.contenido}</p>
							<ul>
								<li style="width:50%;"><span class="fa fa-check-square "></span> Dia Semana: <b>${elem.dia_semana}</b></li>
							</ul>
						</div>
						<div class="social">
							<ul>
								<li class="facebook" style="width:33%;"><a href="#facebook"><span class="fa fa-facebook"></span></a></li>
								<li class="twitter" style="width:34%;"><a href="#twitter"><span class="fa fa-twitter"></span></a></li>								
							</ul>
						</div>
					</li>`); 
        }else if (elem.tipo_evento == 5){
           return(
          	    `<li>
						<time datetime="2014-07-20 0000">
							<span class="day">${elem.dia}</span>
							<span class="month">${elem.mes}</span>
							<span class="year">2014</span>
							<span class="time">12:00 AM</span>
						</time>
						<div class="info">
							<h2 class="title">${elem.titulo}</h2>
							<p class="desc">${elem.contenido}</p>
							<ul>
								<li style="width:50%;"><a href="${elem.vinculo}"><span class="fa fa-globe"></span> Vinculo Personal</a></li>
								<li style="width:50%;"><span class="fa fa-check-square "></span> Dia Semana: <b>${elem.dia_semana}</b></li>
							</ul>
						</div>
						<div class="social">
							<ul>
								<li class="facebook" style="width:33%;"><a href="#facebook"><span class="fa fa-facebook"></span></a></li>
								<li class="twitter" style="width:34%;"><a href="#twitter"><span class="fa fa-twitter"></span></a></li>								
							</ul>
						</div>
					</li>`);
		}		 
      }).join(" ");
          document.getElementById('listados_de_eventos').innerHTML = html; 
}
//fin para visualizar los registros en la columna 3 --------------------------------------------------------------
