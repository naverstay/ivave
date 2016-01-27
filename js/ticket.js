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

	$('.newTicketBtn').on('click', function(){

		$(this).toggleClass('fav_toggle_add fav_toggle_rm');
		$('.oldTickets').toggle();
		$('.newTicket').toggle();

		return false;
	});

});
