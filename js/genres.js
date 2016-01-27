var tabs;

$(function($){

	var tabBlock = $('.tabBlock');

	tabs = tabBlock.tabs({
		active    : 0,
		tabContext: tabBlock.data('tab-context'),
		activate  : function(e, u){
			windowScroll();
		}
	});

	$('.filterCollapseBtn').on('click', function(){

		var firedEl = $(this);

		firedEl.closest('.filterBlock').toggleClass('open_row').find('.filterContainer').toggle();

		return false;
	});
	
});
