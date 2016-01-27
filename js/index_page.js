var svg_favorite_database,
		svg_joystick,
		svg_network_web,
		svg_radio,
		svg_sync_database;

$(function($){

	var mainSlider = $('.mainSlider');

	/*	mainSlider.find('.slide').each(function(ind){
	 var firedEl = $(this);

	 firedEl.css('background-image', 'url(' + firedEl.find('.main_slider_img').attr('src') + ')');
	 });*/

	/*	var swiper = new Swiper('.swiper-container', {
	 preventClicks           : false,
	 preventClicksPropagation: false,
	 setWrapperSize          : true,
	 slidesPerView           : 1,
	 paginationClickable     : true,
	 //DOMAnimation            : false,
	 nextButton              : '.swiper-button-next',
	 prevButton              : '.swiper-button-prev',
	 pagination              : '.swiper-pagination',
	 spaceBetween            : 0
	 });*/

	/*	jQuery(".mainSlider").slick({
	 slidesToShow  : 1,
	 slidesToScroll: 1,
	 useCSS        : !html_var.hasClass('ie_8'),
	 slide         : '.slide',
	 nextArrow     : '.swiper-button-next',
	 prevArrow     : '.swiper-button-prev',
	 appendDots    : '.swiper-pagination',
	 dots          : true,
	 arrows        : true
	 });*/

	var sliderW = $('.slider_wrapper');

	sliderW.each(function(ind){
		var sliderW = $(this), slider = sliderW.find('.slider');

		slider.bxSlider({
			slideSelector: sliderW.find('.slide'),
			slideWidth   : slider.data('slide-width'),
			slideMargin  : slider.data('slide-margin'),
			minSlides    : slider.data('slide-min'),
			maxSlides    : slider.data('slide-max'),
			pagerSelector: sliderW.find('.slider_pagination'),
			//autoControlsSelector: sliderW.find('.slider_controls'),
			nextSelector : sliderW.find('.slide_next'),
			prevSelector : sliderW.find('.slide_prev'),
			prevText     : '',
			nextText     : '',
			useCSS       : false,
			infiniteLoop : true,
			touchEnabled : false,
			responsive   : true,
			auto         : false,
			pause        : 5000,
			moveSlides   : 1,
			pager        : true,
			controls     : true,
			onSlideBefore: function($slideElement, oldIndex, newIndex){
			}
		});
	});

	if(html_var.hasClass('ie_8')){

	}
	else{
		svg_sync_database = new Vivus('sync_database', {
			type    : 'delayed',
			duration: 400,
			start   : 'autostart'
		});

		svg_favorite_database = new Vivus('favorite_database', {
			type    : 'delayed',
			duration: 400,
			start   : 'autostart'
		});

		svg_joystick = new Vivus('joystick', {
			type    : 'delayed',
			duration: 400,
			start   : 'autostart'
		});

		svg_network_web = new Vivus('network_web', {
			type    : 'delayed',
			duration: 400,
			start   : 'autostart'
		});

		svg_radio = new Vivus('radio', {
			type    : 'delayed',
			duration: 400,
			start   : 'autostart'
		});
	}

});
