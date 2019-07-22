window.onload = function() {
    $('.loader').addClass('loader_close');
    new WOW().init();
    // navigation 
    $('.nav__toggle').on('click', function() {
        $(this).toggleClass('on');
        $('.resize').toggleClass('resize_active');
    });

    $('.resize__link').on('click', function() {
        $(this).toggleClass('on');
        $('.resize').toggleClass('resize_active');
    });

    $('.close-btn').on('click', function() {
        $(this).toggleClass('on');
        $('.resize').toggleClass('resize_active');
    });

    TweenMax.from('.brand', 1, {
        delay: 0.4,
        y: 10,
        opacity: 0,
        ease: Expo.easeInOut
    });

    TweenMax.to('.menu__link', 1, {
        delay: 0.4,
        opacity: 1,
        ease: Expo.easeInOut
    }, 0.2);

    // TweenMax.staggerFrom('.menu__link', 1, {
    //     delay: 0.4,
    //     opacity: 0,
    //     ease: Expo.easeInOut
    // }, 0.1);

    let docWidth = $('body').width();
    let $wrap = $('.wrap');
    let $images = $('.wrap .block');
    let slidesWidth = $wrap.width();

    $(window).on('resize', function() {
        docWidth = $('body').width();
        slidesWidth = $wrap.width();
    });

    $('.wines').mousemove(function(e) {
        if (docWidth <= 991) {
            return
        }
        let mouseX = e.pageX;
        let offset = mouseX / docWidth * slidesWidth - mouseX / 2;

        $images.css({
            'transform': `translate3d(${-offset}px, 0,0)`
        })
    });
}