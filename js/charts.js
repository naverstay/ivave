$(function($){

	$('.chartCollapseBtn').on('click', function(){

		var firedEl = $(this);

		firedEl.closest('.chartUnit').toggleClass('open_row').find('.chartsList').toggle();
	
		return false;
	});

});
