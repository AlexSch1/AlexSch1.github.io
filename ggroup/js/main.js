$('.gallery__slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    cssEase: 'ease-in'
});

if (document.getElementById("default-select")) {
    $('select').niceSelect();
};

let tab = () => {
    $('.tabs-navigation__item').on('click', function () {
        let tabName = $(this).attr('data-show-tab')
        let tabsBody = $(this).closest('.tabs').find('.tabs__body')[0]
        let tab = $(tabsBody).find(`.${tabName}`)
        $(this).addClass('tabs-navigation__item--active').siblings().removeClass('tabs-navigation__item--active')
        $(tab).addClass('tab--active').siblings().removeClass('tab--active')
    })
}

tab();


$('.overlay').on('click', function(e) {
    if ($(e.target).hasClass('overlay')) {
        $('.modal').removeClass('modal--is-open');
        $('.modal-1').removeClass('modal-1--is-open');
    }
});

$('.form, .tab__form-1').on('submit', function(e) {
    e.preventDefault();
    $('.modal').addClass('modal--is-open');
    $('.modal-1').addClass('modal-1--is-open');
    setTimeout(()=>{
        $('.modal').removeClass('modal--is-open');
        $('.modal-1').removeClass('modal-1--is-open');
    }, 5000);
});