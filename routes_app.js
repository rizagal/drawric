var express = require('express');
var app = express();

app.get('/',function(req,res) {
   // res.status(200).send("Hello World!");
  //con render trabajamos los archivos jade
  res.render('chat1',{m_title: 'Bienvenido a Nuestro Proyecto de Nodejs, Express y socket'});
});


app.get('/emitir',function(req,res){
res.render('emitir',{m_title: 'Emitir Video'});
});

//con __dirname se optiene el directorio actual y con sendFile nos permite ir al archivo
app.get('/visualizar',function(req,res){
res.render('visualizar',{m_title: 'Visualizar Video'});
});

app.get('/password',function(req,res){
res.sendFile(__dirname + '/views/showpassword.html');
}); 

app.get('/chat',function(req,res){
res.render('chat1',{m_title: 'Chat'});
})

app.get('/chat_directo',function(req,res){
res.render('chat_directo',{m_title: 'Salud  para Todos'});
})

app.get('/dibujo',function(req,res){
res.render('dibujo',{m_title: 'Dibujo en Tiempo Real'});
})

app.get('/loggin',function(req,res){
res.render('loggin',{m_title: 'Iniciar Sesion'});
})

app.get('/perfiles',function(req,res){
res.render('perfiles',{m_title: 'Perfiles de Profesionales'});
})

app.get('/reloj',function(req,res){
res.render('relojllamativo',{m_title: 'Reloj y BD'});
})

app.get('/list_event',function(req,res){
res.render('list_eventos',{m_title: 'Lista de Eventos'});
})

app.get('/subarchivo',function(req,res){
res.render('subir_archivo',{m_title: 'Subir Archivos', m_confirma: ''});
})


//Manejo para subir archivos
//pagina el scripts https://codeforgeek.com/2014/11/file-uploads-using-node-js/
var multer  =   require('multer');
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './static/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});
var upload = multer({ storage : storage}).single('userarchivo');

app.post('/upload',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error al Cargar el Archivo");
        }
       res.render('subir_archivo',{m_title: 'Subir Archivos', m_confirma: 'Se subio Satisfactoriamente el Archivo'});
    });
});
//fin de subir archivos

module.exports = app;
