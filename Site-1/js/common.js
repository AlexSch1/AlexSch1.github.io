$(function() {

	let nav = $('.navbar');
	$(window).on('scroll', function(EO) {
		if ( $(window).scrollTop() > 140 ) {
			if (!nav.hasClass('open')) {
				nav.addClass('open')			
			}
		} else {
			if (nav.hasClass('open')) {
				nav.removeClass('open')
				$('.nav-mobile').hide()
			}
		}
	});

	$(document).on('click', '.icon-menu', function(EO) {
		$('.nav-mobile').slideToggle()
	});



});
