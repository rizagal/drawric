$(document).ready(function(){
    $(".dropdown").hover(            
        function() {
            $('.dropdown-menu', this).stop( true, true ).slideDown("fast");
            $(this).toggleClass('open');        
        },
        function() {
            $('.dropdown-menu', this).stop( true, true ).slideUp("fast");
            $(this).toggleClass('open');       
        }
    );

});

     window.onload = function() {              
          
             var seconds = 5;
             setTimeout(function () {
                 document.getElementById('label_noti').innerHTML  = "";
              }, seconds * 1000);
          }