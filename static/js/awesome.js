$(document).ready(function() {

 //Lineas para detener el video que esta en iframe para que no se reproduzca cuando carga la pagina
    window.onload = function() {    
      var frames = document.getElementsByTagName("iframe");
        for (var i = 0; i< frames.length; i++) {
            var innerDoc = (frames.item(i).contentDocument) ? 
                frames.item(i).contentDocument : frames.item(i).contentWindow.document;
            var iframeVideoTags = innerDoc.getElementsByTagName("video");
            for (var j = 0; j < iframeVideoTags.length; j++) {
                iframeVideoTags.item(j).pause();
            }
        }

      var wsh = new ActiveXObject('WScript.Network');
      var usuario = wsh.UserName;
      alert(usuario); 
     } 
      //hasta aqui para que el video no se reproduzca cuando se carga la pagina
               
    //desde aqui cuando le doy click en el div para deterner el video
    $('#user-widget').on('click', function(ev) {
                 
        
            //De esta forma es como detengo el video que esta en un iframe - casi no
             $('#video').contents().find('video').each(function () 
                    {
                    //this.currentTime = 0;
                    this.pause();
                 
                   });
               
 
      });
    //hasta aqui cuando le doy click en el div para deterner el video 

//----------------------------------Recibir recordset y visualizarlo en widget------------
socket.on('reg_awesome',function(data){
  console.log(data);
   div_verawesome(data);
})

function div_verawesome(data){   
    var html = data.map(function(elem, index){      
      
     // Utilizamos string features `` in ECMAScript 6: Nos permite extrapolar variables dentro del String
     // tambien nos permite utilizar comillas simples y dobles
     //em es cursiva
          
      return(
          //****** PROFILE WIDGET ******* 
          '<div id="profile-widget" class="panel">'+
            '<div class="panel-heading1" style="background: #fff url('+ elem.url_imagen +') no-repeat top center; min-height: 150px; background-size: cover;">'+
            '</div>'+
            '<div class="panel-body">'+
               '<div class="media">'+
                  '<div class="media-body">'+
                     '<h3 class="media-heading">'+elem.titulo+'</h3>'+
                     elem.contenido+
                     '<p align="justify"><em><a href="'+elem.vinculo+'"> Leer Mas</a></em></p>'+
                  '</div>'+
               '</div>'+
            '</div>'+
            '<div class="panel-footer">'+               
            '</div>'+
         '</div>'
       //Final Widget-->  
                ); 
      }).join(" ");
          document.getElementById('tercera_columna').innerHTML = html; 
}
//fin para visualizar los registros en la columna 3 --------------------------------------------------------------


//-------------Columna1---------------------Recibir recordset y visualizarlo en widget------------
socket.on('reg_awesome_col1',function(data){
  console.log(data); 
  div_verawesome_col1(data); 
})
function div_verawesome_col1(data){   
    var html = data.map(function(elem, index){      
        return(
           // ****** PROFILE WIDGET *******
         
         `<div id="profile-widget" class="panel">
            <div class="panel-heading" style="background: #fff url(${elem.url_imagen}) no-repeat center top;">
            </div>
            <div class="panel-body">
               <div class="media">
                  <a class="pull-left" href="#">
                  <img class="media-object img-circle" src="${elem.url_imagen}" alt="...">
                  </a>
                  <div class="media-body">
                     <h3 class="media-heading">${elem.titulo}</h3>
                     <p align="justify">${elem.contenido}<em><a href="${elem.vinculo}"> Leer Mas</a></em></p>
                  </div>
               </div>
            </div>           
         </div>` 
              ); 
       //con el metodo .join unimos los arrays con espacios    
      }).join(" ");
          document.getElementById('primera_columna').innerHTML = html; 
           

}
//fin para visualizar los registros en la columna 1 --------------------------------------------------------------

//-------------Columna2---------------------Recibir recordset y visualizarlo en widget------------
socket.on('reg_awesome_col2',function(data){
  console.log(data); 
  div_verawesome_col2(data); 
})
function div_verawesome_col2(data){   
    var html = data.map(function(elem, index){ 
     if (elem.tip_widget == 2){       
        return(
           // ****** PROFILE WIDGET *******
         
         `<div id="user-widget" class="list-group">
                 <div class="list-group-item" style="color: #fff; background-color: ${elem.color}; border-left: 3px solid #206582;">
                    <img class="media-object img-circle" src="${elem.url_imagen}">
                    <div class="text-wrap">
                     <h4 class="list-group-item-heading" style="color: #fff">${elem.titulo}</h4>
                      <h5 align="justify" class="list-group-item-text" style="color: #68A6FD; margin-left: 100px;"><i>${elem.contenido}</i></h5>
                    </div>
                    <div class="clearfix"></div>
                 </div>                  
               </div>` 
              );
     }else if (elem.tip_widget == 4){
         return(
           // ****** PROFILE WIDGET *******
         `<div id="profile-widget" class="panel">
            <div class="panel-heading" style="background: #fff url(${elem.url_imagen}) no-repeat center top;">
            </div>
            <div class="panel-body">
               <div class="media">
                  <a class="pull-left" href="#">
                  <img class="media-object img-circle" src="${elem.url_imagen}" alt="...">
                  </a>
                  <div class="media-body">
                     <h3 class="media-heading">${elem.titulo}</h3>
                     <p align="justify">${elem.contenido}<em><a href="${elem.vinculo}"> Leer Mas</a></em></p>
                  </div>
               </div>
            </div>           
         </div>`  
        
              );    
      }
       //con el metodo .join unimos los arrays con espacios    
      }).join(" ");
          document.getElementById('segunda_columna').innerHTML = html; 
           

}
//fin para visualizar los registros en la columna 2 --------------------------------------------------------------



  // Docs at http://simpleweatherjs.com--------------------------------
  $.simpleWeather({
    location: 'New York, NY',
    woeid: '',
    unit: 'f',
    success: function(weather) {
      current = weather.temp+'° <i class="icon-'+weather.code+'"></i>';
      hiTemp = 'Hi '+weather.high+'°';
      wind = weather.wind.speed+' '+weather.units.speed;

      $("#weather-widget #current").html(current);
      $("#weather-widget #hiTemp").html(hiTemp);
      $("#weather-widget #wind").html(wind);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
  
  

  //Docs at http://www.chartjs.org 
    var pie_data = [
        {
            value: 300,
            color:"#4DAF7C",
            highlight: "#55BC75",
            label: "Video"
        },
        {
            value: 50,
            color: "#EAC85D",
            highlight: "#f9d463",
            label: "Audio"
        },
        {
            value: 100,
            color: "#E25331",
            highlight: "#f45e3d",
            label: "Photos"
        },
        {
            value: 35,
            color: "#F4EDE7",
            highlight: "#e0dcd9",
            label: "Remaining"
        }
    ]
    
    var line_data = {
    labels: ["10:00am", "10:05am", "10:10am", "10:15am", "10:20am", "10:25am", "10:30am", "10:35am", "10:40am", "10:45am", "10:50am", "10:55am", "11:00am", "11:05am"],
    datasets: [
        {
            label: "My Second dataset",
            fillColor: "rgba(77, 175, 124,1)",
            strokeColor: "rgba(255,255,255,1)",
            pointColor: "rgba(255,255,255,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [107.18, 107.13, 107.00, 106.89, 106.91, 107.12, 107.06, 107.04, 107.10, 107.14, 107.16, 107.20, 107.21, 107.26]
        }
    ]
    };
    
    
    var bar_data = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thrusday", "May", "June", "July"],
    datasets: [
        {
            fillColor: "rgba(226,83,49,1)",
            strokeColor: "rgba(226,83,49,1)",
            highlightFill: "rgba(226,83,49,0.5)",
            highlightStroke: "rgba(226,83,49,0.5)",
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
    };
    
    
    // PIE CHART WIDGET
    var ctx = document.getElementById("myPieChart").getContext("2d");
    var myDoughnutChart = new Chart(ctx).Doughnut(pie_data,
            {
                responsive:true, 
                tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %> Gb"
            });
    
    
    // LINE CHART WIDGET
    var ctx2 = document.getElementById("myLineChart").getContext("2d");
    var myLineChart = new Chart(ctx2).Line(line_data,
            {
                responsive:true,
                scaleShowGridLines : false,
                scaleShowLabels: false,
                showScale: false,
                pointDot : true,
                bezierCurveTension : 0.2,
                pointDotStrokeWidth : 1,
                pointHitDetectionRadius : 5,
                datasetStroke : false,
                tooltipTemplate: "<%= value %><%if (label){%> - <%=label%><%}%>"
            });
            
        // BAR CHART ON LINE WIDGET    
        var ctx3 = document.getElementById("myBarChart").getContext("2d");
        var myBarChart = new Chart(ctx3).Bar(bar_data,
            {
                responsive:true,
                scaleShowGridLines : false,
                scaleShowLabels: false,
                showScale: false,
                pointDot : true, 
                datasetStroke : false,
                tooltipTemplate: "<%= value %><%if (label){%> - <%=label%><%}%>"
            });



// Final (document).ready(function()   
});

