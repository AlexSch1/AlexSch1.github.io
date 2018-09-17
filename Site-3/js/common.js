$(function() {

	

	$(document).on('click', '.icon-menu', function(EO) {
		$('.open-menu').slideToggle();
		$('.toogle-btn').removeClass('icon-menu');
		$('.toogle-btn').addClass('icon-cancel');
	});

	$(document).on('click', '.icon-cancel', function(EO) {
		$('.open-menu').slideToggle();
		$('.toogle-btn').addClass('icon-menu');
		$('.toogle-btn').removeClass('icon-cancel');
	});

});
