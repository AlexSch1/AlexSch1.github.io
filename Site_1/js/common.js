$(function(){
   $("#my-menu").mmenu({
       "extensions": [
            "position-back",
            "position-lift"
         ]
   });
    
    var api = $('#my-menu').data('mmenu');
    api.bind('open:finish', function($panel){
        $('.hamburger').addClass('is-active');
    });
    api.bind('close:before', function($panel){
        $('.hamburger').removeClass('is-active');
    });

    $('.carousel-services').owlCarousel({
        loop: true,
        nav: true,
        responsiveClass: true,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            600:{
            items:1,
            nav:false
            },
            1000:{
                items:1,
                nav:true,
                loop:false
            }
        }
    });
    
    $(window).scroll(function(){
        if($(this).scrollTop() > $(this).height()){
            $('.top').addClass('active');
        }else
             $('.top').removeClass('active');
        
    });
    
    $('.top').click(function(){
        $('html, body').animate({scrollTop: 0}, 'slow', 'swing');
    });
    
    new WOW().init();

    
    
    
    
    /*прокрутка шапки*/
    
  //  $(document).scroll (function(){
  //      if($(document).scrollTop() > $('top-line').height() + 10)
//            $('logo').addClass('nav-fixed'); 
//        else
//            $('logo').removeClass('nav-fixed');
//    });
    
    
});

