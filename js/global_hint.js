var body_var,
    master_object = [],
    $gl_hint_obj_block = [],
    all_blocks = 0,
    gl_hint_obj_show = 0,
    gl_hint_obj_shown_state = false,
    gl_hint_obj_program_scroll = false,
    gl_hint_obj_flag = false;

(function ($) {
    var options = {
        'positionFixed': false,
        'hline': 'Заполните заголовок подсказки',
        'text': 'Заполните текст подсказки',
        'backButtText': 'Назад',
        'moreButtText': 'Далее',
        'exampleHline': 'Например:',
        'exampleText': false,
        //			position_vert - bottom or top
        'positionVert': 'bottom',
        //			position_hor - left or right
        'positionHor': 'left',
        'widthShift': 0,
        'heightShift': 0,
        'top': 0,
        'left': 0
    };


    var methods = {
        init: function (params) {
            var settings = $.extend({}, options, params);
            var indexing_flag = false;

            if (this.length && !gl_hint_obj_flag) {
                var $wrapper = $('.wrapper'),
                    gl_hint_obj_block;
                $wrapper.append('<gl_hint_obj_block class="gl_hint_obj_block hide"></gl_hint_obj_block>');
                $('gl_hint_obj_block').append('<gl_hint_obj_element class="gl_hint_obj_element gl_hint_obj_active">' +
                    '<gl_hint_obj_sub_element class="gl_hint_obj_sub_element">' +
                    '<gl_hint_obj_element_close class="gl_hint_obj_element_close"></gl_hint_obj_element_close>' +
                    '<gl_hint_obj_element_hline class="gl_hint_obj_element_hline"></gl_hint_obj_element_hline>' +
                    '<gl_hint_obj_element_text class="gl_hint_obj_element_text"></gl_hint_obj_element_text>' +
                    '<gl_hint_obj_element_example class="gl_hint_obj_element_example">' +
                    '<gl_hint_obj_element_example_hline class="gl_hint_obj_element_example_hline"></gl_hint_obj_element_example_hline>' +
                    '<gl_hint_obj_element_example_text class="gl_hint_obj_element_example_text"></gl_hint_obj_element_example_text>' +
                    '</gl_hint_obj_element_example>' +
                    '<gl_hint_obj_element_footer class="gl_hint_obj_element_footer">' +
                    '<gl_hint_obj_element_count class="gl_hint_obj_element_count"></gl_hint_obj_element_count>' +
                    '<gl_hint_obj_element_back class="gl_hint_obj_element_back"></gl_hint_obj_element_back>' +
                    '<gl_hint_obj_element_more_hints class="gl_hint_obj_element_more_hints"></gl_hint_obj_element_more_hints>' +
                    '</gl_hint_obj_element_footer>' +
                    '</gl_hint_obj_sub_element>' +
                    '<gl_hint_obj_overlap class="gl_hint_obj_overlap gl_hint_obj_overlap_top_left_mod"></gl_hint_obj_overlap>' +
                    '<gl_hint_obj_overlap class="gl_hint_obj_overlap gl_hint_obj_overlap_bott_right_mod"></gl_hint_obj_overlap>' +
                    '</gl_hint_obj_element>');

                $gl_hint_obj_block = {
                    'gl_hint_obj_block': $('gl_hint_obj_block.gl_hint_obj_block'),
                    'gl_hint_obj_element': $('gl_hint_obj_element.gl_hint_obj_element'),
                    'gl_hint_obj_sub_element': $('gl_hint_obj_sub_element.gl_hint_obj_sub_element'),
                    'gl_hint_obj_element_close': $('gl_hint_obj_element_close.gl_hint_obj_element_close'),
                    'gl_hint_obj_element_hline': $('gl_hint_obj_element_hline.gl_hint_obj_element_hline'),
                    'gl_hint_obj_element_text': $('gl_hint_obj_element_text.gl_hint_obj_element_text'),
                    'gl_hint_obj_element_example': $('gl_hint_obj_element_example.gl_hint_obj_element_example'),
                    'gl_hint_obj_element_example_hline': $('gl_hint_obj_element_example_hline.gl_hint_obj_element_example_hline'),
                    'gl_hint_obj_element_example_text': $('gl_hint_obj_element_example_text.gl_hint_obj_element_example_text'),
                    'gl_hint_obj_element_count': $('gl_hint_obj_element_count.gl_hint_obj_element_count'),
                    'gl_hint_obj_element_back': $('gl_hint_obj_element_back.gl_hint_obj_element_back'),
                    'gl_hint_obj_element_more_hints': $('gl_hint_obj_element_more_hints.gl_hint_obj_element_more_hints')
                };

                $gl_hint_obj_block.gl_hint_obj_element_back.on('click', function () {
                    methods.prev();
                });

                $gl_hint_obj_block.gl_hint_obj_element_more_hints.on('click', function () {
                    methods.next();
                });

                $gl_hint_obj_block.gl_hint_obj_element_close.on('click', function () {
                    methods.hide();
                });

                $(window).on('mousewheel', function (event) {
                    if (gl_hint_obj_shown_state) {
                        return false;
                    }
                });

//				$(window).on('scroll',function(){
//					if (gl_hint_obj_shown_state && !gl_hint_obj_program_scroll && !$('body:animated').length) {
//						methods.hide();
//					}
//				});

                gl_hint_obj_flag = true
            }
            if (gl_hint_obj_flag && all_blocks > 0) {
                for (var i = 0; i <= master_object.length - 1; i++) {
                    if (this == master_object[i].object) {
                        indexing_flag = true;
                        console.log('1', this, master_object[i].object, indexing_flag, master_object.length);
                    }
                }
            }
            if (!indexing_flag) {
                methods.indexing(this, settings);
                all_blocks = master_object.length;
                console.log('2', indexing_flag);
            }
        },

        indexing: function ($this, params) {
            var settings = params;
            return $this.each(function () {
                var $this = $(this),
                    data = this.dataset;

                if (data.glHintObjPositionVert != undefined) {
                    settings.positionVert = data.glHintObjPositionVert;
                }
                if (data.glHintObjPositionHor != undefined) {
                    settings.positionHor = data.glHintObjPositionHor;
                }
                if (data.glHintObjShiftVert != undefined) {
                    settings.top = data.glHintObjShiftVert;
                }
                if (data.glHintObjShiftHor != undefined) {
                    settings.left = data.glHintObjShiftHor;
                }
                if (data.glHintObjHline != undefined) {
                    settings.hline = data.glHintObjHline;
                }
                if (data.glHintObjText != undefined) {
                    settings.text = data.glHintObjText;
                }
                if (data.glHintObjExample != undefined) {
                    settings.exampleText = data.glHintObjExample;
                }

                var top = $this.offset().top - settings.heightShift / 2 + settings.top;
                var left = $this.offset().left - settings.widthShift / 2 + settings.left;
                var width = parseInt(this.offsetWidth) + parseInt(settings.widthShift);
                var height = parseInt(this.offsetHeight) + parseInt(settings.heightShift);
                //var height = parseInt(this.offsetHeight);

                var object_info = {
                    'object': $this,
                    'positionFixed': settings.positionFixed,
                    'hline': settings.hline,
                    'text': settings.text,
                    'backButtText': settings.backButtText,
                    'moreButtText': settings.moreButtText,
                    'exampleHline': settings.exampleHline,
                    'exampleText': settings.exampleText,
                    'positionVert': settings.positionVert,
                    'positionHor': settings.positionHor,
                    'widthShift': settings.widthShift,
                    'heightShift': settings.heightShift,
                    'settingsTop': settings.top,
                    'settingsLeft': settings.left,
                    'top': top,
                    'left': left,
                    'width': width,
                    'height': height
                };

                master_object.push(object_info);
                console.log('3', 'width ' + width, 'height ' + height, 'top ' + top, 'left ' + left);
            });
        },
        fill: function (elements_array, array, index, settings, animation) {
            if (animation == undefined) {
                animation = true;
            }
            var position_class = 'gl_hint_obj_state_top gl_hint_obj_state_bottom gl_hint_obj_state_left gl_hint_obj_state_right';

            var $gl_hint_obj_scrollTop = array[index].top - 200;
            if ($gl_hint_obj_scrollTop < 0) {
                $gl_hint_obj_scrollTop = 0;
            }

            if (animation) {
                elements_array.gl_hint_obj_element.removeClass('gl_hint_obj_element_no_animation');
            }
            else {
                elements_array.gl_hint_obj_element.addClass('gl_hint_obj_element_no_animation');
            }

            if (!array[index].positionFixed) {
                methods.scroll($gl_hint_obj_scrollTop, animation);
                elements_array.gl_hint_obj_element.css({
                    'width': array[index].width + 'px',
                    'height': array[index].height + 'px',
                    'top': array[index].top + 'px',
                    'left': array[index].left + 'px'
                }).removeClass('gl_hint_obj_element_fixed');
            } else {
                elements_array.gl_hint_obj_element.css({
                    'width': array[index].width + 'px',
                    'height': array[index].height + 'px',
                    'top': array[index].top + 'px',
                    'left': array[index].left + 'px'
                }).addClass('gl_hint_obj_element_fixed');
            }

            elements_array.gl_hint_obj_sub_element.removeClass(position_class).addClass(' gl_hint_obj_state_' + array[index].positionVert + ' gl_hint_obj_state_' + array[index].positionHor);

            elements_array.gl_hint_obj_element_hline.text(array[index].hline);

            elements_array.gl_hint_obj_element_text.text(array[index].text);

            if (array[index].exampleText != false) {
                elements_array.gl_hint_obj_element_example.show();
                elements_array.gl_hint_obj_element_example_hline.text(array[index].exampleHline);
                elements_array.gl_hint_obj_element_example_text.text(array[index].exampleText);
            } else {
                elements_array.gl_hint_obj_element_example.hide();
            }

            elements_array.gl_hint_obj_element_count.text((index + 1) + ' / ' + array.length);

            elements_array.gl_hint_obj_element_back.text(array[index].backButtText);

            elements_array.gl_hint_obj_element_more_hints.text(array[index].moreButtText);


            if (settings) {
                gl_hint_obj_show = index;
            }
            if (gl_hint_obj_show == 0) {
                elements_array.gl_hint_obj_element_back.addClass('gl_hint_obj_element_back_disable');
            } else {
                elements_array.gl_hint_obj_element_back.removeClass('gl_hint_obj_element_back_disable');
            }

            if (gl_hint_obj_show == all_blocks - 1) {
                elements_array.gl_hint_obj_element_more_hints.addClass('gl_hint_obj_element_more_hints_disable');
            } else {
                elements_array.gl_hint_obj_element_more_hints.removeClass('gl_hint_obj_element_more_hints_disable');
            }
            console.log('4', gl_hint_obj_show, index, $gl_hint_obj_scrollTop, settings, 'width ' + array[index].width, 'height ' + array[index].height, 'top ' + array[index].top, 'left ' + array[index].left, 'animation ' + animation);
        },

        scroll: function (coords, animation) {
            gl_hint_obj_program_scroll = true;
            if (animation) {
                $('body').animate(
                    {scrollTop: coords}, '333', 'linear', function () {
                        gl_hint_obj_program_scroll = false;
                        console.log('5', 'gl_hint_obj_program_scroll ' + gl_hint_obj_program_scroll, animation);
                    }
                );
            }
            else {
                $('body, html').scrollTop(coords);
                gl_hint_obj_program_scroll = false;
                console.log('6', 'gl_hint_obj_program_scroll ' + gl_hint_obj_program_scroll, animation);
            }

        },

        next: function (animation) {
            if (gl_hint_obj_show < all_blocks - 1) {
                methods.fill($gl_hint_obj_block, master_object, gl_hint_obj_show + 1, true, animation);
            }
        },
        prev: function (animation) {
            if (gl_hint_obj_show > 0) {
                methods.fill($gl_hint_obj_block, master_object, gl_hint_obj_show - 1, true, animation);
            }
        },

        show: function (animation) {
            if (animation == undefined) {
                animation = true;
            }
            methods.fill($gl_hint_obj_block, master_object, gl_hint_obj_show, true, animation);
            $gl_hint_obj_block.gl_hint_obj_block.removeClass('hide');
            gl_hint_obj_shown_state = true;

            body_var.addClass('gl_hint_obj_show');
            $('.confirm_block').addClass('active_mod');
        },
        hide: function () {
            $gl_hint_obj_block.gl_hint_obj_block.addClass('hide');
            gl_hint_obj_shown_state = false;
            body_var.removeClass('gl_hint_obj_show');
            $('.confirm_block').removeClass('active_mod');
        },
        destroy: function () {
            $gl_hint_obj_block.gl_hint_obj_element_back.off();
            $gl_hint_obj_block.gl_hint_obj_element_more_hints.off();
            $gl_hint_obj_block.gl_hint_obj_element_close.off();
            $gl_hint_obj_block.gl_hint_obj_block.remove();
            master_object = [];
            $gl_hint_obj_block = [];
            all_blocks = 0;
            gl_hint_obj_show = 0;
            gl_hint_obj_shown_state = false;
            gl_hint_obj_program_scroll = false;
            gl_hint_obj_flag = false;
            body_var.removeClass('gl_hint_obj_show');
        },
        update: function (animation, current) {
            if (animation == undefined) {
                animation = true;
            }

            if (current == undefined) {
                current = false;
            }

            for (var i = 0; i <= all_blocks - 1; i++) {
                var $this = master_object[i].object;

                var top = $this.offset().top - master_object[i].heightShift / 2 + master_object[i].settingsTop;
                var left = $this.offset().left - master_object[i].widthShift / 2 + master_object[i].settingsLeft;
                var width = $this.get(0).scrollWidth + parseInt(master_object[i].widthShift);
                var height = $this.get(0).scrollHeight + parseInt(master_object[i].heightShift);

                if (current && this == master_object[i].object) {

                    master_object[i].top = top;
                    master_object[i].left = left;
                    master_object[i].width = width;
                    master_object[i].height = height;

                    console.log('7', 'width ' + width, 'height ' + height, 'top ' + top, 'left ' + left, 'animation ' + animation, 'current ' + current);


                }
                else {

                    master_object[i].top = top;
                    master_object[i].left = left;
                    master_object[i].width = width;
                    master_object[i].height = height;

                    console.log('8', 'width ' + width, 'height ' + height, 'top ' + top, 'left ' + left, 'animation ' + animation, 'current ' + current);
                }

                if (current
                    && gl_hint_obj_shown_state
                    && gl_hint_obj_show == i) {
                    methods.fill($gl_hint_obj_block, master_object, gl_hint_obj_show, true, animation);
                }
                else if (gl_hint_obj_shown_state) {
                    methods.fill($gl_hint_obj_block, master_object, gl_hint_obj_show, true, animation);
                }
            }
        },

        options_update: function () {
            console.log('9', this);

//			if (data.glHintObjPositionVert != undefined) {
//				settings.positionVert = data.glHintObjPositionVert;
//			}
//			if (data.glHintObjPositionHor != undefined) {
//				settings.positionHor = data.glHintObjPositionHor;
//			}
//			if (data.glHintObjShiftVert != undefined) {
//				settings.top = data.glHintObjShiftVert;
//			}
//			if (data.glHintObjShiftHor != undefined) {
//				settings.left = data.glHintObjShiftHor;
//			}
//			if (data.glHintObjHline != undefined) {
//				settings.hline = data.glHintObjHline;
//			}
//			if (data.glHintObjText != undefined) {
//				settings.text = data.glHintObjText;
//			}
//			if (data.glHintObjExample != undefined) {
//				settings.exampleText = data.glHintObjExample;
//			}
        }
    };


    $.fn.gl_hint = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' + method + ' не существует для jQuery.gl_hint');
        }

    };
})(jQuery);
