var body_var,
		html_var,
		doc_var,
		global_window_Height,
		popupOrderItem,
		controlPanelBtn,
		popupBtn,
		browserWindow,
		favSwitcherHolder,
		unregBanner,
		floatingSearchBlock,
		baseM = 0.0714286666666667,
		baseWindowWidth = 1000,
		baseFZ = 1.4,
		maxFZ = 1.5,
		scrollBars,
		chznBubbling = false,
		windowScrollTimeout = 100,
		windowScrollHendler = 0,
		windowResizeTimeout = 100,
		windowResizeHendler = 0,
		$add_to_playlist,
		volumeSlider,
		glMouseEvent = {
			shiftKey: false
		},
		devPopups = [],
		$send_confirmation,
		$send_to_client,
		$cart_orders_form,
		$postpone_orders_form,
		$contacts_form;

$(function($){

	doc_var = $(document),
			html_var = $('html'),
			body_var = $('body'),
			scrollBars = $('.scrollBar'),
			favSwitcherHolder = $('.favSwitcherHolder'),
			unregBanner = $('.unregBanner'),
			floatingSearchBlock = $('.floatingSearchBlock'),
			volumeSlider = $('.volumeControl'),
			global_window_Height = $(window).height(),
			popupOrderItem = $('.popup_order_item'),
			controlPanelBtn = $('.controlPanelBtn'),
			popupBtn = $('.popupBtn');

	var myNav = navigator.userAgent.toLowerCase();

	html_var.toggleClass('ie_gt8', ((myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : 0) > 8).toggleClass('ie_8', ((myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : 0) === 8);

	var header = $('.header'), doc = $(document);

	browserWindow = $(window);

	/*	browserWindow.on('scroll', function(){
	 var scrollLeft = doc.scrollLeft();
	 header.css('marginLeft', (scrollLeft > 0 ? -scrollLeft : 0));
	 });*/

	volumeSlider.find('.volumeSlider').slider({
		orientation: "vertical",
		range      : "min",
		min        : 0,
		max        : 100,
		value      : 60,
		slide      : function(event, ui){

			var volLevel = ui.value;

			volumeSlider.toggleClass('vol_low', !volLevel);
			volumeSlider.toggleClass('vol_high', volLevel > 80);

		}
	}).on('mousedown', function(){
		$(this).closest('.hoverHolder').addClass('control_active');
	});

	$('.closeUnregBanner').on('click', function(){
		unregBanner.animate({
			'margin-top': -unregBanner.height()
		}, 200, function(){
			html_var.addClass('unreg_banner_closed');
			floatingSearchBlock.addClass('fixed_mod');
		});

		return false;
	});

	doc_var.on('mouseup', function(){
		setTimeout(function(){
			$('.hoverHolder').removeClass('control_active');
		}, 80000);
	});

	$('.hoverControl').on('mouseenter', function(){
		$(this).closest('.hoverHolder').addClass('btn_hovered');
	}).on('mouseleave', function(){
		var firedEl = $(this);
		setTimeout(function(){
			firedEl.closest('.hoverHolder').removeClass('btn_hovered');
		}, 80000);
	});

	$('.hoverHolder').on('mouseenter', function(){
		$(this).addClass('hovered mouseenter');
	}).on('mouseleave', function(){
		var firedEl = $(this);
		firedEl.removeClass('mouseenter');
		setTimeout(function(){
			if(!firedEl.hasClass('mouseenter')) firedEl.removeClass('hovered');
		}, 80000);

	});

	if($('.chosen-select').length){
		$('.chosen-select').chosen({
			width       : "100%",
			addScrollBar: true,
			className   : ""
		});
	}

	/*	$('body').delegate('.chzn_item  a', 'click', function(){
	 var firedEl = $(this).parent();

	 console.log(firedEl.attr('class'));

	 firedEl.addClass('bubbling');

	 firedEl.toggleClass('parent-selected');
	 if(firedEl.hasClass('result-selected')){

	 } else{
	 //firedEl.click();
	 console.log('click');

	 }

	 return false;
	 });*/

	if($('.chosen-select-multi').length){
		$('.chosen-select-multi').chosen({
			width    : "100%",
			className: "",
			noClose  : true
		});
	}

	$('.devPopupBtn').each(function(ind){
		var firedEl = $(this), formId = firedEl.attr('href');

		if($(formId).length){

			var form_el = $(formId), dlg = new dialog(formId, form_el.data('dialog-class') || 'dialog_global dialog_g_size_2 dialog_close_butt_mod_2', 'popupForm',
					false, (form_el.data('popup-width') || 320) * baseM + 'em', false, true);

			devPopups.push(dlg);

			firedEl.on('click', function(){
				devPopups[$(this).parent().index()].openDialog();
				return false;
			});
		}
	});

	$add_to_playlist = $("#add_to_playlist").dialog({
		autoOpen     : false,
		modal        : true,
		closeOnEscape: true,
		closeText    : '',
		show         : "fade",
		position     : {my: "left center", at: "center center", of: this},
		draggable    : true,
		dialogClass  : 'dialog_global dialog_g_size_1 dialog_close_butt_mod_1',
		width        : 278 * baseM + 'em',
		open         : function(event, ui){
		},
		close        : function(event, ui){
			$('.btn_active_dialog').removeClass('btn_active_dialog');
		}
	});

	$('.plBtn').on('click', function(){

		var firedEl = $(this).addClass('btn_active_dialog');

		$add_to_playlist.dialog("option", "position", {
			my: 'right center',
			at: "left-10 center",
			of: firedEl
		}).dialog("open");

		return false;
	});

	$('.playerCollapseBtn').on('click', function(){

		body_var.toggleClass('player_close');

		return false;
	});

	popupBtn.on('click', function(){

		$add_to_playlist.openDialog();
		return false;
	});

	$('.globalCheck').on('change', function(){
		var firedEl = $(this);
		firedEl.parents('.shiftBlock').data('last-checked', '-1').find('.shiftCheck').prop('checked', this.checked);
	});

	$('.shiftCheck').on('click', function(evt){
		var firedEl = $(this),
				$boxHolder = firedEl.closest('.shiftBlock'),
				$boxRange = $boxHolder.find('.shiftCheck').closest('.shiftUnit'),
				$boxes = $boxRange.find('.shiftCheck'),
				lastChecked = $boxHolder.data('last-checked') || 0;

		if(!lastChecked){
			$boxHolder.data('last-checked', firedEl.closest('.shiftUnit').index());
		}

		if(evt.shiftKey){

			var start = firedEl.closest('.shiftUnit').index(),
					end = lastChecked;

			$boxRange.slice(Math.min(start, end), Math.max(start, end)).find('.shiftCheck')
					.prop('checked', this.checked);
		}

		$boxHolder.data('last-checked', firedEl.closest('.shiftUnit').index());

	}).parent().on('mouseenter', function(){
		body_var.addClass('no_select');
	}).on('mouseleave', function(){
		body_var.removeClass('no_select');
	});

	$('body').delegate('.time_btn', 'mouseenter', function(){
		var firedEl = $(this);
	});

	//$(".sortBlock .dragUnit").sortable();
	//$(".sortBlock .shiftUnit").disableSelection();

	var c = {};

	function initPlaylistDragDrop(){

		$(".dragUnit").draggable({
			//cursor: "crosshair",
			cursorAt        : {
				top: 80
			},
			refreshPositions: true,
			revert          : "invalid",
			//axis            : "y",
			cursor          : "move",
			//helper: "clone",
			helper          : function(){
				return $('<table></table>').append($(this).clone());
				//return $('<tr></tr>');
			},
			start           : function(event, ui){
				c.tr = this;
				c.helper = ui.helper;

				body_var.addClass('noselect');

				//$(this).data("startingScrollTop", $(this).parent().scrollTop());

				//ui.helper = ui.helper.wrap('<table></table>');
				//c.helper = $('<table></table>').append(ui.helper);

				//console.log(c, event, ui);

			},
			stop            : function(event, ui){
				body_var.removeClass('noselect');
			},
			drag            : function(event, ui){
				//var st = parseInt($(this).data("startingScrollTop"));
				//ui.position.top -= $(this).parent().scrollTop() - st;
			}
		});

		$('.dropUnit').droppable({
			drop: function(event, ui){

				var row = $(this), newRow = $(c.tr);

				if(newRow.hasClass('playerDropUnit')){

					//console.log(newRow);

					newRow = $('<tr data-collapse="1" data-drop-author="'
							+ newRow.find('.player_q_artist').text() +
							'" data-drop-album="' + newRow.find('.player_q_cover img').attr('src') +
							'" class="collapseRowSlave dragUnit dropUnit shiftUnit ui-draggable ui-draggable-handle ui-droppable"></tr>')
							.append('<td class="col_pre_1" />')
							.append('<td class="col_1">xx</td>')
							.append($('<td class="col_2"></td>')
									.append($('<span class="check_emul check_emul_v2"></span>')
											.append('<input type="checkbox" class="hidden_check shiftCheck">')
											.append('<span class="check_text"></span>')))
							.append($('<td class="col_3 player_btn_blue"></td>')
									.append('<a href="#" class="player_btn icon-player_play player_btn_shadow"></a>'))
							.append('<td class="col_4">' + newRow.find('.player_q_composition').text() + '</td>')
							.append('<td class="col_5">' + newRow.data('drop-bitrate') + '</td>')
							.append('<td class="col_6 text_right">' + newRow.data('drop-duration') + '</td>')
							.append($('<td class="col_7"></td>')
									.append('<a href="#" class="playlist_btn icon-heart"></a>')
									.append('<a href="#" class="icon-download playlist_btn"></a>')
									.append('<a href="#" class="playlist_btn icon-content_copy"></a>')
									.append('<a href="#" class="playlist_btn icon-delete"></a>'));

				}

				newRow.insertAfter(row);

				newRow.toggle(newRow.next().is(':visible'));

				body_var.removeClass('noselect');

				//$(c.helper).remove();

				$('.over_state').removeClass('over_state');

				initPlayerDragDrop();

			},
			over: function(event, ui){
				var hlpr = $(c.helper), row = $(this);

				row.addClass('over_state');

				//console.log(row.offset().top, row.offset().left, hlpr.css('top'), hlpr.css('left'));

				//hlpr.css({top: row.offset().top - 20, left: row.offset().left - 40});

				//console.log(hlpr.css('top'), hlpr.css('left'));

			}
			,
			out : function(event, elem){
				$('.over_state').removeClass('over_state');
			}
		});

	}

	function initPlayerDragDrop(){

		$(".playerDropUnit").draggable({
			//cursor: "crosshair",
			cursorAt        : {
				top: 10
			},
			refreshPositions: true,
			revert          : "invalid",
			//axis            : "y",
			cursor          : "move",
			helper          : "clone",
			//helper          : function(){
			//	return $('<table></table>').append($(this).clone());
			//	//return $('<tr></tr>');
			//},
			start           : function(event, ui){
				c.tr = this;
				c.helper = ui.helper;

				body_var.addClass('noselect');

				//$(this).data("startingScrollTop", $(this).parent().scrollTop());

				//ui.helper = ui.helper.wrap('<table></table>');
				//c.helper = $('<table></table>').append(ui.helper);

				//console.log(c, event, ui);

			},
			stop            : function(event, ui){
				body_var.removeClass('noselect');
			},
			drag            : function(event, ui){
				//var st = parseInt($(this).data("startingScrollTop"));
				//ui.position.top -= $(this).parent().scrollTop() - st;
			}
		});

		$(".playerDropUnit").droppable({
			//accept: ".dragUnit",
			drop: function(event, ui){
				console.log("drop", event, ui);

				var row = $(this), dropRow = $(ui.draggable), newRow = $(c.tr);

				if(newRow.hasClass('dropUnit')){
					newRow = $('<li class="player_q_item shiftUnit playerDropUnit ui-droppable"></li>');

					newRow
							.append($('<div class="fl" />')
									.append($('<div class="middle_block" />')
											.append($('<span class="check_emul check_emul_v2"></span>')
													.append('<input type="checkbox" class="hidden_check shiftCheck"/>')
													.append('<span class="check_text"></span>'))
											.append("&nbsp;"))
									.append($('<div class="middle_block" />')
											.append($('<a href="#" class="player_q_cover"></a>')
													.append('<img src="' + dropRow.data('drop-album') + '"/>')))
									.append($('<div class="middle_block" />')
											.append('<div class="player_q_composition">' + dropRow.find('.col_4').text() +
											'</div>')
											.append('<div class="player_q_artist">' + dropRow.data('drop-author') + '</div>')))
							.append($('<div class="fr" />')
									.append($('<div class="middle_block" />')
											.append('<a href="#" class="playlist_btn icon-heart"></a>'))
									.append($('<div class="middle_block" />')
											.append('<a href="#" class="playlist_btn icon-download"></a>')));
				}

				newRow.insertAfter(row);

				$('.over_state').removeClass('over_state');

				body_var.removeClass('noselect');

				initPlaylistDragDrop();

			},
			over: function(event, elem){
				//$(this).addClass("over");
				//console.log("over", this, event, elem);
				$(this).addClass('over_state');

			},
			out : function(event, elem){
				$('.over_state').removeClass('over_state');
			}
		});
	}

	//initPlaylistDragDrop();

	//initPlayerDragDrop();

	function initSortable(){

		var allSortTables = $('.sortBlock');

		allSortTables.each(function(ind){

			Sortable.create($(this).find('tbody')[0], {
				group      : "playlist",
				sort       : true,
				ghostClass : 'drop_placer',
				chosenClass: "drag_row",
				filter     : ".noDrag",
				//chosenClass: ".dragUnit", // Specifies which items inside the element should be sortable
				draggable  : ".dragUnit", // Specifies which items inside the element should be sortable

				setData: function(dataTransfer, dragEl){

					console.log(dataTransfer, dragEl);

					//dataTransfer.setData('Text', dragEl.textContent);

				},

				// dragging started
				onStart: function(/**Event*/evt){
					evt.oldIndex;  // element index within parent

					body_var.addClass('catch_drop_scroll');
					//console.log(evt);
				},

				// dragging ended
				onEnd: function(/**Event*/evt){
					evt.oldIndex;  // element's old index within parent
					evt.newIndex;  // element's new index within parent
					//console.log(evt);

					body_var.removeClass('catch_drop_scroll');

				},

				// Element is dropped into the list from another list
				onAdd: function(/**Event*/evt){
					var itemEl = $(evt.item), itemVis = (itemEl.siblings() !== void 0) ? itemEl.siblings().is(':visible') : true;  // dragged HTMLElement
					evt.from;  // previous list
					// + indexes from onEnd

					//itemEl.addClass('drop_chosen');

					//console.log(newRow);

					var newRow = $('<tr data-collapse="1" data-drop-author="'
							+ itemEl.find('.player_q_artist').text() +
							'" data-drop-album="' + itemEl.find('.player_q_cover img').attr('src') +
							'" class="collapseRowSlave dragUnit dropUnit shiftUnit"></tr>')
							.append('<td class="col_pre_1" />')
							.append('<td class="col_1">X</td>')
							.append($('<td class="col_2"></td>')
									.append($('<span class="check_emul check_emul_v2"></span>')
											.append('<input type="checkbox" class="hidden_check shiftCheck">')
											.append('<span class="check_text"></span>')))
							.append($('<td class="col_3 player_btn_blue"></td>')
									.append('<a href="#" class="player_btn icon-player_play player_btn_shadow"></a>'))
							.append('<td class="col_4">' + itemEl.find('.player_q_composition').text() + '</td>')
							.append('<td class="col_5">' + itemEl.data('drop-bitrate') + '</td>')
							.append('<td class="col_6 text_right">' + itemEl.data('drop-duration') + '</td>')
							.append($('<td class="col_7 playlist_btn_green"></td>')
									.append('<a href="#" class="playlist_btn icon-heart"></a>')
									.append('<a href="#" class="icon-download playlist_btn"></a>')
									.append('<a href="#" class="playlist_btn icon-content_copy"></a>')
									.append('<a href="#" class="playlist_btn icon-delete"></a>'));

					newRow.insertBefore(itemEl);

					newRow.toggle(itemVis);

					itemEl.remove();

					//console.log(evt);

					body_var.removeClass('catch_drop_scroll');

				},

				// Changed sorting within list
				onUpdate: function(/**Event*/evt){
					var itemEl = evt.item;  // dragged HTMLElement
					// + indexes from onEnd
					//console.log(evt);

					body_var.removeClass('catch_drop_scroll');

				},

				// Called by any change to the list (add / update / remove)
				onSort: function(/**Event*/evt){
					// same properties as onUpdate

					//console.log(evt);

				},

				// Element is removed from the list into another list
				onRemove: function(/**Event*/evt){
					// same properties as onUpdate
					//console.log(evt);

				},

				// Attempt to drag a filtered element
				onFilter: function(/**Event*/evt){
					var itemEl = evt.item;  // HTMLElement receiving the `mousedown|tapstart` event.

					//console.log(evt);

				},

				// Event when you move an item in the list or between lists
				onMove: function(/**Event*/evt){
					// Example: http://jsbin.com/tuyafe/1/edit?js,output
					evt.dragged; // dragged HTMLElement
					evt.draggedRect; // TextRectangle {left, top, right и bottom}
					evt.related; // HTMLElement on which have guided
					evt.relatedRect; // TextRectangle
					// return false; — for cancel

					//console.log(evt);

				}
			});
		});

		Sortable.create($('#playerList')[0], {
			group      : "playlist",
			sort       : true,
			ghostClass : 'drop_placer',
			chosenClass: "drag_row",
			filter     : ".noDrag",

			//chosenClass: "drop_chosen", // Specifies which items inside the element should be sortable
			draggable: ".playerDropUnit", // Specifies which items inside the element should be sortable

			setData: function(dataTransfer, dragEl){

				console.log(dataTransfer, dragEl);

				//dataTransfer.setData('Text', dragEl.textContent);

			},
			// dragging started
			onStart: function(/**Event*/evt){
				evt.oldIndex;  // element index within parent

				//console.log('start', evt);
			},

			// dragging ended
			onEnd: function(/**Event*/evt){
				evt.oldIndex;  // element's old index within parent
				evt.newIndex;  // element's new index within parent

				//console.log('end', evt);

			},

			// Element is dropped into the list from another list
			onAdd: function(/**Event*/evt){
				var itemEl = $(evt.item);  // dragged HTMLElement
				evt.from;  // previous list
				// + indexes from onEnd

				//itemEl.addClass('drop_chosen');

				var newRow = $('<li class="player_q_item shiftUnit playerDropUnit ui-droppable"></li>');

				newRow
						.append($('<div class="fl" />')
								.append($('<div class="middle_block" />')
										.append($('<span class="check_emul check_emul_v2"></span>')
												.append('<input type="checkbox" class="hidden_check shiftCheck"/>')
												.append('<span class="check_text"></span>'))
										.append("&nbsp;"))
								.append($('<div class="middle_block" />')
										.append($('<a href="#" class="player_q_cover"></a>')
												.append('<img src="' + itemEl.data('drop-album') + '"/>')))
								.append($('<div class="middle_block" />')
										.append('<div class="player_q_composition">' + itemEl.find('.col_4').text() +
										'</div>')
										.append('<div class="player_q_artist">' + itemEl.data('drop-author') + '</div>')))
						.append($('<div class="fr" />')
								.append($('<div class="middle_block" />')
										.append('<a href="#" class="playlist_btn icon-heart"></a>'))
								.append($('<div class="middle_block" />')
										.append('<a href="#" class="playlist_btn icon-download"></a>')));

				//console.log('add', evt);

				newRow.insertBefore(itemEl);

				itemEl.remove();

			},

			// Changed sorting within list
			onUpdate: function(/**Event*/evt){
				var itemEl = evt.item;  // dragged HTMLElement
				// + indexes from onEnd

				//console.log('update', evt);

			},

			// Called by any change to the list (add / update / remove)
			onSort: function(/**Event*/evt){
				// same properties as onUpdate

				//console.log(evt);

			},

			// Element is removed from the list into another list
			onRemove: function(/**Event*/evt){
				// same properties as onUpdate
				//console.log(evt);

			},

			// Attempt to drag a filtered element
			onFilter: function(/**Event*/evt){
				var itemEl = evt.item;  // HTMLElement receiving the `mousedown|tapstart` event.

				//console.log(evt);

			},

			// Event when you move an item in the list or between lists
			onMove: function(/**Event*/evt){
				// Example: http://jsbin.com/tuyafe/1/edit?js,output
				evt.dragged; // dragged HTMLElement
				evt.draggedRect; // TextRectangle {left, top, right и bottom}
				evt.related; // HTMLElement on which have guided
				evt.relatedRect; // TextRectangle
				// return false; — for cancel

				//console.log('move', evt);

			}
		});

		Sortable.create($('#scrollUp')[0], {
			group      : "playlist",
			sort       : true,
			ghostClass : 'drop_placer',
			chosenClass: "drag_row",

			filter: ".noDrag",

			//chosenClass: "drop_chosen", // Specifies which items inside the element should be sortable
			draggable: ".playerDropUnit", // Specifies which items inside the element should be sortable

			setData: function(dataTransfer, dragEl){

				console.log(dataTransfer, dragEl);

				//dataTransfer.setData('Text', dragEl.textContent);

			},
			// dragging started
			onStart: function(/**Event*/evt){
				evt.oldIndex;  // element index within parent

				console.log('start', evt);
			},

			// dragging ended
			onEnd: function(/**Event*/evt){
				evt.oldIndex;  // element's old index within parent
				evt.newIndex;  // element's new index within parent

				console.log('end', evt);

			},

			// Element is dropped into the list from another list
			onAdd: function(/**Event*/evt){
				var itemEl = $(evt.item);  // dragged HTMLElement
				evt.from;  // previous list
				// + indexes from onEnd

				//itemEl.toggle((itemEl.next() !== void 0) ? itemEl.next().is(':visible') : true);

				console.log('add', evt);

			},

			// Changed sorting within list
			onUpdate: function(/**Event*/evt){
				var itemEl = evt.item;  // dragged HTMLElement
				// + indexes from onEnd

				console.log('update', evt);

			},

			// Called by any change to the list (add / update / remove)
			onSort: function(/**Event*/evt){
				// same properties as onUpdate

				console.log('sort', evt);

			},

			// Element is removed from the list into another list
			onRemove: function(/**Event*/evt){
				// same properties as onUpdate
				//console.log(evt);

			},

			// Attempt to drag a filtered element
			onFilter: function(/**Event*/evt){
				var itemEl = evt.item;  // HTMLElement receiving the `mousedown|tapstart` event.

				console.log('onFilter', evt);

			},

			// Event when you move an item in the list or between lists
			onMove: function(/**Event*/evt){
				// Example: http://jsbin.com/tuyafe/1/edit?js,output
				evt.dragged; // dragged HTMLElement
				evt.draggedRect; // TextRectangle {left, top, right и bottom}
				evt.related; // HTMLElement on which have guided
				evt.relatedRect; // TextRectangle
				// return false; — for cancel

				console.log('move', evt);

				return false;
			}
		});

		Sortable.create($('#scrollDown')[0], {
			group      : "playlist",
			sort       : true,
			ghostClass : 'drop_placer',
			chosenClass: "drag_row",

			filter: ".noDrag",

			//chosenClass: "drop_chosen", // Specifies which items inside the element should be sortable
			draggable: ".playerDropUnit", // Specifies which items inside the element should be sortable

			setData: function(dataTransfer, dragEl){

				//dataTransfer.setData('Text', dragEl.textContent);

				console.log(dataTransfer, dragEl);

			},
			// dragging started
			onStart: function(/**Event*/evt){
				evt.oldIndex;  // element index within parent

				console.log('start', evt);
			},

			// dragging ended
			onEnd: function(/**Event*/evt){
				evt.oldIndex;  // element's old index within parent
				evt.newIndex;  // element's new index within parent

				console.log('end', evt);

			},

			// Element is dropped into the list from another list
			onAdd: function(/**Event*/evt){
				var itemEl = $(evt.item);  // dragged HTMLElement
				evt.from;  // previous list
				// + indexes from onEnd

				//itemEl.toggle((itemEl.next() !== void 0) ? itemEl.next().is(':visible') : true);

				//console.log('add', evt);

			},

			// Changed sorting within list
			onUpdate: function(/**Event*/evt){
				var itemEl = evt.item;  // dragged HTMLElement
				// + indexes from onEnd

				console.log('update', evt);

			},

			// Called by any change to the list (add / update / remove)
			onSort: function(/**Event*/evt){
				// same properties as onUpdate

				console.log('sort', evt);

			},

			// Element is removed from the list into another list
			onRemove: function(/**Event*/evt){
				// same properties as onUpdate
				//console.log(evt);

			},

			// Attempt to drag a filtered element
			onFilter: function(/**Event*/evt){
				var itemEl = evt.item;  // HTMLElement receiving the `mousedown|tapstart` event.

				//console.log(evt);

			},

			// Event when you move an item in the list or between lists
			onMove: function(/**Event*/evt){
				// Example: http://jsbin.com/tuyafe/1/edit?js,output
				evt.dragged; // dragged HTMLElement
				evt.draggedRect; // TextRectangle {left, top, right и bottom}
				evt.related; // HTMLElement on which have guided
				evt.relatedRect; // TextRectangle
				// return false; — for cancel

				console.log('move', evt);

				return false;
			}
		});

	}

	initSortable();

	var dropScrollTimer;

	function dropScroller(step){

		clearInterval(dropScrollTimer);

		dropScrollTimer = setInterval(function(){

			console.log(doc.scrollTop());

			doc.scrollTop(doc.scrollTop() + step);
		}, 100);

	}

/*	$('#scrollUp').on('mouseenter', function(){
		dropScroller(-50);

		console.log('scrollUp');

		return false;
	}).on('mouseleave', function(){
		clearInterval(dropScrollTimer);

		return false;
	});

	$('#scrollDown').on('mouseenter', function(){
		dropScroller(50);

		console.log('scrollDown');

		return false;
	}).on('mouseleave', function(){
		clearInterval(dropScrollTimer);

		return false;
	});*/

	body_var.delegate('#scrollUp', 'mouseenter', function(){
		dropScroller(-50);
		console.log('scrollUp');
	}).delegate('#scrollUp', 'mouseleave', function(){
		clearInterval(dropScrollTimer);
	}).delegate('#scrollDown', 'mouseenter', function(){
		dropScroller(50);
		console.log('scrollDown');
	}).delegate('#scrollDown', 'mouseleave', function(){
		clearInterval(dropScrollTimer);
	});

	initSearchAutoComplite();

	initScrollBars();

	all_dialog_close();

	$(window).on('resize', function(){

		clearTimeout(windowResizeHendler);

		windowResizeHendler = setTimeout(function(){
			windowRisize();
		}, windowResizeTimeout);

	}).on('scroll', function(){

		if(floatingSearchBlock.length && !html_var.hasClass('unreg_banner_closed')){
			unregBanner.css('margin-top', -(doc_var.scrollTop() > unregBanner.height() ?
					unregBanner.height() : doc_var.scrollTop()));

			if(doc_var.scrollTop() > unregBanner.offset().top + unregBanner.height()){
				floatingSearchBlock.addClass('fixed_mod');
			} else{
				floatingSearchBlock.removeClass('fixed_mod');
			}
		}

		windowScrollHendler = setTimeout(function(){
			windowScroll();
		}, windowScrollTimeout);

	}).on('load', function(){

	});

	windowRisize();

});

function dragElUnderMouse(x, y){

}

if(document.addEventListener){
	document.addEventListener('click', docClickEvent, true);
}
else{
	document.attachEvent("onclick", docClickEvent);
}

function docClickEvent(e){
	glMouseEvent = e;

	//console.log(glMouseEvent.shiftKey);

}

function initScrollBars(){

	if(isMobile.any){
		body_var.addClass('mobile_mode');

		scrollBars.each(function(){
			var firedEl = $(this);
			firedEl.addClass(firedEl.data('scroller-class'));
		});

	} else{
		scrollBars.each(function(ind){
			var ns = $(this);

			ns.scrollbar({
				disableBodyScroll: true,
				onInit           : function(){
				}
			});
		});

		$('.chzn-results').each(function(ind){
			var ns = $(this);
			if(!!ns.closest('.chzn-container').prev().data('scrollbar')){
				ns.scrollbar({
					disableBodyScroll: true,
					onInit           : function(){
					}
				});
			}
		});
	}
}

function initSearchAutoComplite(){

	var searchInput = $('#search_input'),
			linesForAutocomplete = [
				'Mickey',
				'Mickey Graham',
				'Mick Mill I Be On That',
				'Mickey Alavon Stroke Me',
				'Micklemore White Walls',
				'mick instinctuary',
				'mick'
			];

	searchInput.autocomplete({
		source  : linesForAutocomplete,
		appendTo: $('.autocomplete_holder'),
		open    : function(e, i){
			//console.log('autocomplete open ');
		},
		close   : function(){
			//console.log('autocomplete close ');
		},
		select  : function(data, value){
			//console.log('autocomplete select ');
		},
		search  : function(data, value){
			//console.log('autocomplete search ');
		}

	});

}

function windowRisize(){

	windowScroll();

	var newFZ = browserWindow.width() / baseWindowWidth * baseFZ;

	body_var.css('font-size', (newFZ > maxFZ ? maxFZ : newFZ) + 'em');

	//$('.h_380').css('maxHeight', browserWindow.height() / 2);

	$('.scrollBar').each(function(){
		var firedEl = $(this), maxHeight = firedEl.data('max_screen_height');

		if(maxHeight.length){

			if(firedEl.hasClass('scroll-content')) firedEl = firedEl.closest('.scroll-wrapper');

			var newHeight = (/%/.test(maxHeight) ? browserWindow.height() * maxHeight.replace('%', '') / 100 : maxHeight ), curHeight = firedEl.css('height').replace('px', '') * 1;

			firedEl.css('max-height', newHeight + 'px');
		}

	});
}

function windowScroll(){

	body_var.toggleClass('footer_float_up',
			browserWindow.scrollTop() >=
			doc_var.height() - browserWindow.height() - 5 - (html_var.hasClass('ie_8') ? 5 : 0));

}

function all_dialog_close(){
	body_var.on('click', '.ui-widget-overlay', all_dialog_close_gl);
}

function all_dialog_close_gl(){
	$(".ui-dialog-content").each(function(){
		var $this = $(this);
		if(!$this.parent().hasClass('always_open')){
			$this.dialog("close");
		}
	});
}

function shiftSelectable(checkboxes){
	var lastChecked,
			$boxRange = $(checkboxes).parent(),
			$boxes = $(checkboxes);

	$boxes.find('.shiftCheck').on('change', function(evt){

		if(!lastChecked){
			lastChecked = this;
		}

		if(evt.shiftKey){
			var start = $boxes.index($(this).closest(checkboxes)),
					end = $boxes.index(lastChecked);
			$boxes.slice(Math.min(start, end), Math.max(start, end) + 1).find('.shiftCheck')
					.prop('checked', lastChecked.checked);
		}

		lastChecked = this;
	});
}