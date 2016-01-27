var dataSource = [
			'{"1980": 0, "1985": 50, "1990": 8, "1995": 80, "2000": 1, "2005": 15, "2005": 31, "2010": 15, "2015": 0}',
			'{"1980": 0, "1985": 50, "1990": 8, "1995": 80, "2000": 1, "2005": 15}',
			'{"1980": 0, "1985": 50, "1990": 8, "1995": 80, "2000": 1, "2005": 15, "2005": 31, "2010": 15, "2015": 0}',
			'{"1980": 0, "1985": 50, "1990": 8, "1995": 80, "2000": 1, "2005": 15}',
			'{"1980": 0, "1985": 50, "1990": 8, "1995": 80, "2000": 1, "2005": 15, "2005": 31, "2010": 15, "2015": 0}',
			'{ "1995": 100, "2000": 1, "2005": 15, "2005": 131, "2010": 15, "2015": 20}',
			'{ "2005": 10, "2010": 15, "2015": 100}'
		],
		tabIndex = 0,
		artistwindowResizeTimeout = 5,
		artistWindowResizeHendler = 0,
		diagramParams = {
			offsetX: 0
		},
		papers = [],
		tabBlock,
		tabs;

$(function($){

	tabBlock = $('.tabBlock');

	tabs = tabBlock.tabs({
		active    : tabIndex,
		tabContext: tabBlock.data('tab-context'),
		activate  : function(e, u){
			windowScroll();
			var activeTab = $(u.newPanel[0]);

			tabIndex = activeTab.index();

			var graphHolder = activeTab.find('.graph_block'), graph = graphHolder.find('svg');

			console.log(graphHolder.width(), graph.width());
			
			if(graphHolder.width() !== graph.width()){
				graphHolder.empty();
				raphaelDiagram(graphHolder.attr('id'), JSON.parse(dataSource[tabIndex]));
			}
		}
	});

	artistWindowResizeHendler = setTimeout(function(){
		artistWindowResize();
	}, windowResizeTimeout);

});

/**     raphael    ***/


function initDiagrams(){

	for(var i = 0; i < dataSource.length; i++){
		var obj = dataSource[i], discography = JSON.parse(obj);
		raphaelDiagram('line-graph_' + (i + 1), discography);
	}
}

function raphaelDiagram(holder_id, data){

	setTimeout(function(){

		var dElement = $("#" + holder_id),
				W = $("#" + holder_id).width(),
				H = $("#" + holder_id).height(),
				r = Raphael(holder_id, W, H),
				keys = [],
				values = [],
				len = 7;

		papers.push(r);

		for(var key in data){
			if(data.hasOwnProperty(key)){
				//console.log(key + " -> " + data[key]);
				keys.push(key);
				values.push(data[key]);
			}
		}

		function translate(x, y){
			return [
				diagramParams.offsetX + (W - diagramParams.offsetX) / (values.length - 1) * x,
				H - (H - 20) / 100 * y
			];
		}

		function drawPath(){
			var p = [];
			for(var j = 1, jj = X.length; j < jj; j++){
				p.push(X[j], Y[j]);
			}
			p = ["M", X[0], Y[0], "R"].concat(p);
			var subaddon = "L" + (W) + "," + (H) + "," + diagramParams.offsetX + "," + (H) + "z";
			path.attr({path: p});
			sub.attr({path: p + subaddon});
		}

		var p = [["M"].concat(translate(0, values[0]))],
				color = "#f4cd3a",
				X = [],
				Y = [],
				blankets = r.set(),
				buttons = r.set(),
				w = (W - diagramParams.offsetX) / values.length,
				isDrag = -1,
				start = null,
				sub = r.path().attr({stroke: "none", fill: "#f4cd3a"}),
				path = r.path().attr({stroke: color, "stroke-width": 0}),
				unhighlight = function(){
				};
		var ii;
		for(i = 0, ii = values.length - 1; i < ii; i++){
			var xy = translate(i, values[i]),
					xy1 = translate(i + 1, values[i + 1]),
					f;
			X[i] = xy[0];
			Y[i] = xy[1];

			(f = function(i, xy){
				buttons.push(r.circle(xy[0], xy[1], 9).attr({fill: color, stroke: "none"}));
				blankets.push(r.circle(xy[0], xy[1], w / 2).attr({
					stroke : "none",
					fill   : "#fff",
					opacity: 0
				}).mouseover(function(){
					if(isDrag + 1){
						unhighlight = function(){
						};
					} else{
						//buttons.items[i].animate({r: 20}, 200);
					}
				}).mouseout(function(){
					if(isDrag + 1){
						unhighlight = function(){
							//buttons.items[i].animate({r: 10}, 200);
						};
					} else{
						//buttons.items[i].animate({r: 10}, 200);
					}
				}).drag(function(dx, dy){
					var start = this.start;
					start && update(start.i, start.p + dx);
				}, function(x, y){
					this.start = {i: i, m: x, p: X[i]};
				}));
				blankets.items[blankets.items.length - 1].node.style.cursor = "move";
			});

			if(i == 0){
				//f(i, xy);
			}

			if(i == ii - 1){
				//f(i + 1, xy1);
			}
		}
		xy = translate(ii, values[ii]);
		X.push(xy[0]);
		Y.push(xy[1]);

		drawPath();
		var update = function(i, d){

			//(d > W - 10) && (d = W - 10);
			//(d < 10) && (d = 10);
			//Y[i] = d;
			//drawPath();
			//buttons.items[i].attr({cx: d});
			//blankets.items[i].attr({cx: d});
			r.safari();
		};

		var toddler, toddlerEl = dElement.next('.Toddler'), min = keys[0] * 1, max = keys[keys.length - 1] * 1,
				steps = keys.length, pips = toddlerEl.data('pips') || false;

		if(!toddlerEl.hasClass('ui-slider')){
			if(pips){
				toddler = toddlerEl.slider({
					range    : true,
					min      : min,
					max      : max,
					//step  : steps,
					value_box: '<span class="fz_12 toddler_value"></span>',
					values   : [min, max],
					change   : function(event, ui){
						ui_slider_change(event, ui);
					},
					slide    : function(event, ui){
						ui_slider_change(event, ui);
					}
				}).slider('pips');
			} else{
				toddler = toddlerEl.slider({
					range    : true,
					min      : min,
					max      : max,
					value_box: '<span class="toddler_value"></span>',
					//step  : steps,
					values   : [min, max],
					change   : function(event, ui){
						ui_slider_change(event, ui);
					},
					slide    : function(event, ui){
						ui_slider_change(event, ui);
					}
				});
			}

			var handlers = toddler.find('.ui-slider-handle');

			$(handlers[0]).find('.toddler_value').text(min);
			$(handlers[1]).find('.toddler_value').text(max);
		}

	}, windowResizeTimeout);
}

function artistWindowResize(){
	var graphHolder = tabBlock.find('.graph_block').eq(tabIndex), graph = graphHolder.find('svg');
	if(graphHolder.width() !== graph.width()){
		graphHolder.empty();

		raphaelDiagram(graphHolder.attr('id'), JSON.parse(dataSource[tabIndex]));
	}
}

window.onresize = function(){

	clearTimeout(artistWindowResizeHendler);

	artistWindowResizeHendler = setTimeout(function(){
		artistWindowResize();
	}, windowResizeTimeout);

}

function ui_slider_change(event, ui){

	var handlers = $(ui.handle).closest('.Toddler').find('.ui-slider-handle');

	$(handlers[0]).find('.toddler_value').text(ui.values[0]);
	$(handlers[1]).find('.toddler_value').text(ui.values[1]);

	//console.log(ui.values);
}
