$(function() {

	

	$(document).on('click', '.icon-menu', function(EO) {
		let menu = $('.toogle-btn').hasClass('icon-menu');
		if (menu) {
			$('.mobail-nav').css('background-color', 'rgba(141, 199, 5, .9)')
		}
		$('.open-menu').slideToggle();
		$('.toogle-btn').removeClass('icon-menu');
		$('.toogle-btn').addClass('icon-cancel');
	});

	$(document).on('click', '.icon-cancel', function(EO) {
		let menu = $('.toogle-btn').hasClass('icon-menu');
		if (!menu) {
			setTimeout(()=>{
				$('.mobail-nav').css('background-color', 'rgba(141, 199, 5, .7)')
			},300)
		}
		$('.open-menu').slideToggle();
		$('.toogle-btn').addClass('icon-menu');
		$('.toogle-btn').removeClass('icon-cancel');
	});

	
	
});
