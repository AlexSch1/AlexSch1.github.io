window.onload = function() {
    new WOW().init();
    // navigation 
    $('.toggle').on('click', function() {
        $(this).toggleClass('on');
        $('.resize').toggleClass('active');
        $('body').toggleClass('modal');
    });

    $('.resize ul li a').on('click', function() {
        $(this).toggleClass('on');
        $('.resize').toggleClass('active');
        $('body').toggleClass('modal');
    });

    $('.close-btn').on('click', function() {
        $(this).toggleClass('on');
        $('.resize').toggleClass('active');
        $('body').toggleClass('modal');
    });

    TweenMax.from('.brand', 1, {
        delay: 0.4,
        y: 10,
        opacity: 0,
        ease: Expo.easeInOut
    });

    TweenMax.staggerFrom('.menu li a', 1, {
        delay: 0.4,
        opacity: 0,
        ease: Expo.easeInOut
    }, 0.1);

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