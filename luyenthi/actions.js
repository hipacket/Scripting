var msg_non_vip_sb = 'Bạn phải là <a href="#" target="_blank" title="Quyền lợi thành viên VIP"  style="color:#0d6af7; text-decoration:underline">thành viên VIP </a> của Luyenthi123.Com mới được xem <strong>kết quả</strong>, <strong>đáp án</strong> và <strong>lời giải thích</strong>.';
var vip_msg = 'Tài khoản của bạn đã bị thoát ra khỏi hệ thống. Bạn hãy đăng nhập lại.';
var d_start = new Date();
var n_start = d_start.getTime();
$(document).keyup(function(e) {
    var code = e.keyCode ? e.keyCode : e.which;
    var flag = true;
    if ($("#content_report").is(":focus")) {
        flag = false;
    } else {
        flag = true;
    }

    if (code == 13 && flag == true) {
        if ($('.basic_nopbai').is(':visible')) {
            $('.basic_nopbai').click();
        } else if ($('.basic_guibai').is(':visible')) {
            $('.basic_guibai').click();
        } else if ($('.basic_next').is(':visible')) {
            $('.basic_next').click();
        }
    }
});
var random_audio = 0;
function checkQuestion(cmd){  
    if(lesson.hasAudio == 1){
        $('#lesson_content').ubaPlayer('triggerPause');
    }
    var check_ques = false;
    var funct = listExecuteResult[lesson.tpl];
    check_ques = funct($('#segment_'+lesson.inx), data_lesson.segment[lesson.inx],lesson.checked);
	if(check_ques!= 'again'){
		$(cmd).removeClass('elm_show');	
		$('#segment_'+lesson.inx).find('.animated').removeClass('animated');
        returnCheckQuestion(check_ques,lesson.checked);
        lesson.checked = false;
	}else{
		audio_clickbtn.play();
		$('#popup_no_answer').css('display','flex');
    }
   
}
function show_hint(e){
    if($(e).hasClass('show_ht')){
        $(e).find('span:last').text('Xem gợi ý');
        if($('.segment.active').find('.pause').length>0)  $('.segment.active').find('.audio_gy').click();
    }else{
        $(e).find('span:last').text('Ẩn gợi ý');
        if($('.segment.active').find('.audio_gy').length>0)  $('.segment.active').find('.audio_gy').click();
    }
    $(e).toggleClass('show_ht');
    $(e).next().slideToggle("slow");
    if($('#box_keyboard').is('visible') && typeof is_mobile =='undefined'){
        $('#box_keyboard').css('top',$('#basic_main').height());
    }

}

function _getResult(data) {
    // call QTransform
    QTransform();
    //XXX: count up
    $.fn.countup = function(options) {
            var $this = $(this);
            var _max = options.max;
            var _value = options.min || 0;
            $this.text(_value);
            var _count = setInterval(function() {
                _value++;
                if (_value <= _max) {
                    $this.text(_value);
                } else {
                    clearInterval(_count);
                    if (options.callback) {
                        options.callback();
                    }
                }
            }, options.duration);
        }
        //XXX: eachAniamte
    $.fn.chestnutShow = function(options) {
            var _class = $(this);
            var _timeout = 0;
            var _delay = 1000;
            _class.each(function(index, ele) {
                if ($(ele).hasClass('chestnut_i_dif') && !_class.hasClass('chestnut_i_dif_fisrt')) {
                    $(ele).addClass('chestnut_i_dif_fisrt');
                    _timeout += _delay;
                } else if ($(ele).hasClass('chestnut_i_hight') && !_class.hasClass('chestnut_i_hight_fisrt')) {
                    $(ele).addClass('chestnut_i_hight_fisrt');
                    _timeout += _delay;
                } else if ($(ele).hasClass('chestnut_i_bonus') && !_class.hasClass('chestnut_i_bonus_fisrt')) {
                    $(ele).addClass('chestnut_i_bonus_fisrt');
                    _timeout += _delay;
                }
                setTimeout(function() {
                    if ($(ele).hasClass('chestnut_i_dif_fisrt')) {
                        $('#f_point_dif').css({
                            opacity: 1
                        });
                        if (!$(ele).hasClass('chestnut_i_miss')) {
                            $('#number_chestnuts').animate({
                                scale: '1.5'
                            }, 275, function() {});
                        }
                        $('#number_chestnuts').countup({
                            duration: 100,
                            max: $param.point_dif
                        });
                    } else if ($(ele).hasClass('chestnut_i_hight_fisrt')) {
                        $('#f_point_hight').css({
                            opacity: 1
                        });
                        if (!$(ele).hasClass('chestnut_i_miss')) {
                            $('#number_chestnuts').animate({
                                scale: '1.5'
                            }, 275, function() {});
                        }
                        $('#number_chestnuts').countup({
                            duration: 100,
                            min: $param.point_dif,
                            max: (parseInt($param.point_dif) + parseInt($param.point_hight))
                        });
                    } else if ($(ele).hasClass('chestnut_i_bonus_fisrt')) {
                        $('#f_point_bonus').css({
                            opacity: 1
                        });
                        if (!$(ele).hasClass('chestnut_i_miss')) {
                            $('#number_chestnuts').animate({
                                scale: '1.5'
                            }, 275, function() {});
                        }                       
                        $('#number_chestnuts').countup({
                            duration: 100,
                            min: (parseInt($param.point_dif) + parseInt($param.point_hight)),
                            max: (parseInt($param.point_dif) + parseInt($param.point_hight) + parseInt($param.point_bonus)),
                            callback: function() {
                                if (options.callback) {
                                    options.callback();
                                };
                            }
                        });
                    }
                    $('#number_chestnuts').animate({
                        scale: '1'
                    }, 275, function() {});
                    if (!$(ele).hasClass('chestnut_i_miss')) {
                        $(ele).removeClass('chestnut_i_static').animate({
                            scale: 1.3,
                            opacity: 1
                        }, {
                            duration: 150,
                            easing: 'linear',
                            complete: function() {
                                $(ele).animate({
                                    scale: 1
                                }, {
                                    duration: 400,
                                    easing: 'linear',
                                    complete: function() {

                                    }
                                });
                            }
                        });
                    }
                }, _timeout);
                _timeout += 100;
            });
        }
        //XXX: eachAniamte
    $.fn.eachShow = function(options) {
            var _class = $(this);
            var _timeout = 0;
            _class.each(function(index, ele) {
                setTimeout(function() {
                    $(ele).animate({
                        opacity: 1
                    }, {
                        duration: options.duration,
                        easing: 'linear',
                        complete: function() {
                            if (index == _class.length - 1) {
                                if (options.callback) {
                                    options.callback();
                                }
                            };
                        }
                    });
                }, _timeout);
                _timeout += options.timeout;
            });
        }
        //XXX: eachButton
    $.fn.buttonShow = function(options) {
            var _class = $(this);
            var _timeout = 0;
            _class.each(function(index, ele) {
                setTimeout(function() {
                    $(ele).animate({
                        top: options.top
                    }, {
                        duration: options.duration,
                        easing: 'easeOutBack',
                        complete: function() {
                            if (index == _class.length - 1) {
                                if (options.callback) {
                                    options.callback();
                                }
                            };
                        }
                    });
                }, _timeout);
                _timeout += options.timeout;
            });
        }
        //----------------------------------------------
    var $param = {
        total_score: data.score * 10,
        point_dif: data.dif,
        point_hight: data.hight,
        point_bonus: data.bonus,
        rsp_old_total:data.m_hatde,
        rsp_total: 0,
        rsp_old_achie: data.m_tt,
        rsp_achie: data.p_tt
    };
    $(function() {
        $('#frame_finish').animate({
            opacity: 1
        }, {
            duration: 300,
            complete: function() {
                $('#total_score').countup({
                    duration: 20,
                    max: $param.total_score,
                    callback: function() {
                        $('#total_score').delay(300).animate({
                            scale: '1.5'
                        }, 300).animate({
                            scale: '1'
                        }, 300, function() {
                            $('.chestnut_i').chestnutShow({
                                callback: function() {
                                    $('#point_total').delay(800).animate({
                                        opacity: 1
                                    }, {
                                        duration: 300,
                                        complete: function() {
                                            $('#_rsp_f_total').delay(300).animate({
                                                opacity: 0
                                            }, {
                                                duration: 300,
                                                complete: function() {
                                                    $('#_rsp_old_total').animate({
                                                        scale: '1.5'
                                                    }, 500).animate({
                                                        scale: '1'
                                                    }, 500, function() {});
                                                    $('#_rsp_old_total').countup({
                                                        duration: 50,
                                                        min: $param.rsp_old_total,
                                                        max: ($param.rsp_old_total + $param.rsp_total),
                                                        callback: function() {
                                                            $('#_rsp_f_total').delay(300).animate({
                                                                opacity: 0
                                                            }, {
                                                                duration: 300,
                                                                complete: function() {
                                                                    $('#point_achievement').animate({
                                                                        opacity: 1
                                                                    }, {
                                                                        duration: 300,
                                                                        complete: function() {
                                                                            $('#_rsp_f_achie').delay(300).animate({
                                                                                opacity: 0
                                                                            }, {
                                                                                duration: 300,
                                                                                complete: function() {
                                                                                    $('#_rsp_old_achie').animate({
                                                                                        scale: '1.5'
                                                                                    }, 500).animate({
                                                                                        scale: '1'
                                                                                    }, 500, function() {});
                                                                                    $('#_rsp_old_achie').countup({
                                                                                        duration: 50,
                                                                                        min: $param.rsp_old_achie,
                                                                                        max: ($param.rsp_old_achie + $param.rsp_achie),
                                                                                        callback: function() {
                                                                                            $('#_rsp_f_achie').delay(300).animate({
                                                                                                opacity: 0
                                                                                            }, {
                                                                                                duration: 300,
                                                                                                complete: function() {
                                                                                                    $('.rsbutton').buttonShow({
                                                                                                        top: 20,
                                                                                                        duration: 1000,
                                                                                                        timeout: 200,
                                                                                                        callback: function() {
                                                                                                            if ($('#point_10_total').attr('value') || $('#point_10_achie').attr('value')) {
                                                                                                                $('.box_show_huyhieu, .bg_black').css('display', 'block');
                                                                                                                if ($('#point_10_total').attr('value')) {
                                                                                                                    $('.title_rieng').html($('#point_10_total').attr('msg'));
                                                                                                                    $('#point_10_total').fadeIn(300, function() {
                                                                                                                        if ($('#point_10_achie').attr('value')) {
                                                                                                                            $('.title_rieng').html($('#point_10_achie').attr('msg'));
                                                                                                                            $('#point_10_total').delay(800).fadeOut(300, function() {
                                                                                                                                $('#point_10_achie').fadeIn(300, function() {
                                                                                                                                    $('.box_show_huyhieu, .bg_black').delay(5000).fadeOut(300);
                                                                                                                                });
                                                                                                                            });
                                                                                                                        } else {
                                                                                                                            $('.box_show_huyhieu, .bg_black').delay(5000).fadeOut(300);
                                                                                                                        }
                                                                                                                    });
                                                                                                                } else if ($('#point_10_achie').attr('value')) {
                                                                                                                    $('.title_rieng').html($('#point_10_achie').attr('msg'));
                                                                                                                    $('#point_10_achie').fadeIn(300, function() {
                                                                                                                        $('.box_show_huyhieu, .bg_black').delay(5000).fadeOut(300);
                                                                                                                    });
                                                                                                                } else {
                                                                                                                    //finish animation
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    });
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                    });
                                                                                }
                                                                            });
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        });
                    }
                });
            }
        });
    });

}
function _getResult1(data) {
  $('#point_other').css({'text-align': 'center','margin-top': '65px','font-size': '1.2rem'}).html('Làm lại bạn sẽ <strong>KHÔNG</strong> được cộng hạt dẻ và điểm thành tích');
    // call QTransform
    QTransform();
    //XXX: count up
    $.fn.countup = function(options) {
            var $this = $(this);
            var _max = options.max;
            var _value = options.min || 0;
            $this.text(_value);
            var _count = setInterval(function() {
                _value++;
                if (_value <= _max) {
                    $this.text(_value);
                } else {
                    clearInterval(_count);
                    if (options.callback) {
                        options.callback();
                    }
                }
            }, options.duration);
        }
        //XXX: eachAniamte
    $.fn.chestnutShow = function(options) {
            var _class = $(this);
            var _timeout = 0;
            var _delay = 1000;
        }       
        //XXX: eachAniamte
    $.fn.eachShow = function(options) {
            var _class = $(this);
            var _timeout = 0;
            _class.each(function(index, ele) {
                setTimeout(function() {
                    $(ele).animate({
                        opacity: 1
                    }, {
                        duration: options.duration,
                        easing: 'linear',
                        complete: function() {
                            if (index == _class.length - 1) {
                                if (options.callback) {
                                    options.callback();
                                }
                            };
                        }
                    });
                }, _timeout);
                _timeout += options.timeout;
            });
        }
        //XXX: eachButton
    $.fn.buttonShow = function(options) {
            var _class = $(this);
            var _timeout = 0;
            _class.each(function(index, ele) {
                setTimeout(function() {
                    $(ele).animate({
                        top: options.top
                    }, {
                        duration: options.duration,
                        easing: 'easeOutBack',
                        complete: function() {
                            if (index == _class.length - 1) {
                                if (options.callback) {
                                    options.callback();
                                }
                            };
                        }
                    });
                }, _timeout);
                _timeout += options.timeout;
            });
        }
        //----------------------------------------------
    var $param = {
        total_score: data.score * 10,
        point_dif: data.dif,
        point_hight: data.hight,
        point_bonus: data.bonus,
        rsp_old_total:data.m_hatde,
        rsp_total: 0,
        rsp_old_achie: data.m_tt,
        rsp_achie: data.p_tt
    };
    $(function() {
        $('#frame_finish').animate({
            opacity: 1
        }, {
            duration: 300,
            complete: function() {
                $('#total_score').countup({
                    duration: 20,
                    max: $param.total_score,
                    callback: function() {
                        $('#total_score').delay(300).animate({
                            scale: '1.5'
                        }, 300).animate({
                            scale: '1'
                        }, 300, function() {
                           $('#point_other').fadeIn(300);
                            $('.rsbutton').buttonShow({
                                top: 20,
                                duration: 1000,
                                timeout: 200,
                                callback: function() {
                                    if ($('#point_10_total').attr('value') || $('#point_10_achie').attr('value')) {
                                        $('.box_show_huyhieu, .bg_black').css('display', 'block');
                                        if ($('#point_10_total').attr('value')) {
                                            $('.title_rieng').html($('#point_10_total').attr('msg'));
                                            $('#point_10_total').fadeIn(300, function() {
                                                if ($('#point_10_achie').attr('value')) {
                                                    $('.title_rieng').html($('#point_10_achie').attr('msg'));
                                                    $('#point_10_total').delay(800).fadeOut(300, function() {
                                                        $('#point_10_achie').fadeIn(300, function() {
                                                            $('.box_show_huyhieu, .bg_black').delay(5000).fadeOut(300);
                                                        });
                                                    });
                                                } else {
                                                    $('.box_show_huyhieu, .bg_black').delay(5000).fadeOut(300);
                                                }
                                            });
                                        } else if ($('#point_10_achie').attr('value')) {
                                            $('.title_rieng').html($('#point_10_achie').attr('msg'));
                                            $('#point_10_achie').fadeIn(300, function() {
                                                $('.box_show_huyhieu, .bg_black').delay(5000).fadeOut(300);
                                            });
                                        } else {
                                            //finish animation
                                        }
                                    }
                                }
                            });
                        });
                    }
                });
            }
        });
    });

}
function render_htmhd(level, dif, hight, bonus) {
    var htm = '';
    if (level == 1 || level == 0) {
        if (dif == 1) {
            htm += '<div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_dif"></div></div>';
            if (hight == 1) {
                htm += '<div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_hight"></div></div>';
                if (bonus == 1) {
                    htm += '<div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_bonus"></div></div>';
                } else {
                    htm += '<div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_bonus chestnut_i_miss"></div></div>';
                }
            } else {
                htm += '<div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_hight chestnut_i_miss"></div></div><div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_bonus chestnut_i_miss"></div></div>';
            }
        } else {
            htm += '<div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_dif chestnut_i_miss"></div></div><div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_hight chestnut_i_miss"></div></div><div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_bonus chestnut_i_miss"></div></div>';
        }
    } else if (level == 2) {
        if (dif == 2) {
            htm += '<div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_dif"></div></div><div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_dif"></div></div>';
            if (hight == 2) {
                htm += '<div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_hight"></div></div><div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_hight"></div></div>';
                if (bonus == 1) {
                    htm += '<div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_bonus"></div></div>';
                } else {
                    htm += '<div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_bonus chestnut_i_miss"></div></div>';
                }
            } else {
                htm += '<div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_hight chestnut_i_miss"></div></div><div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_hight chestnut_i_miss"></div></div><div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_bonus chestnut_i_miss"></div></div>';
            }
        } else {
            htm += '<div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_dif chestnut_i_miss"></div></div><div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_dif chestnut_i_miss"></div></div><div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_hight chestnut_i_miss"></div></div><div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_hight chestnut_i_miss"></div></div><div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_bonus chestnut_i_miss"></div></div>';
        }
    } else if (level == 3) {
        if (dif == 3) {
            htm += '<div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_dif"></div></div><div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_dif"></div></div><div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_dif"></div></div>';
            if (hight == 2) {
                htm += '<div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_hight"></div></div><div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_hight"></div></div>';
                if (bonus == 2) {
                    htm += '<div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_bonus"></div></div><div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_bonus"></div></div>';
                } else {
                    htm += '<div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_bonus chestnut_i_miss"></div></div><div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_bonus chestnut_i_miss"></div></div>';
                }
            } else {
                htm += '<div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_hight chestnut_i_miss"></div></div><div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_hight chestnut_i_miss"></div></div><div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_bonus chestnut_i_miss"></div></div><div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_bonus chestnut_i_miss"></div></div>';
            }
        } else {
            htm += '<div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_dif chestnut_i_miss"></div></div><div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_dif chestnut_i_miss"></div></div><div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_dif chestnut_i_miss"></div></div><div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_hight chestnut_i_miss"></div></div><div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_hight chestnut_i_miss"></div></div><div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_bonus chestnut_i_miss"></div></div><div class="chestnut"><div class="chestnut_i chestnut_i_static chestnut_i_bonus chestnut_i_miss"></div></div>';
        }
    }
    return htm;
}
var timeoutResult = null;
function returnCheckQuestion(answer,allow){
    var cls ='ques_done false', html_result_ques =''; 
    if(!answer){
        if(allow){
            html_result_ques = '<img style="margin: 0 auto;display:block;" src=" ' +  obj_var.loc_img + 'img_false/false_4.png" /><img style="margin: 0 auto;padding-top: 30px;display:block;" src=" ' + obj_var.loc_img + 'img_false/6.png" />';
        }else{
            img_result = obj_var.img_false[0][Math.floor(Math.random() * obj_var.img_false[0].length)];
            text_result = obj_var.img_false[1][Math.floor(Math.random() * obj_var.img_false[1].length)];
            html_result_ques = '<img style="margin: 0 auto;padding-top: 30px;display:block;" src=" ' + obj_var.loc_img + 'img_false/' + text_result + '" /><img style="margin: 0 auto;display:block;" src=" ' +  obj_var.loc_img + 'img_false/'+img_result + '" />';
        }
        if(turnAudio) audio_incorrect.play();
    }else{
        if(turnAudio) audio_correct.play();
		obj_var.number_true += 1;
		 if( obj_var.number_true == data_lesson.common.total){
			data_lesson.common.point += obj_var.score_extra;
		}
        cls= 'ques_done true';
        jQuery({
            Counter: obj_var.yourScore
        }).animate({
            Counter: (obj_var.yourScore + data_lesson.common.point)
        }, {
            duration: 800,
            easing: 'swing',
            step: function() {
                $('#score_curr').text(Math.ceil(this.Counter));
            }
        });
        obj_var.yourScore += data_lesson.common.point;
        img_result = obj_var.img_true[0][Math.floor(Math.random() * obj_var.img_true[0].length)];
        text_result = obj_var.img_true[1][Math.floor(Math.random() * obj_var.img_true[1].length)];
        html_result_ques = '<img style="margin: 0 auto;padding-top: 30px;display:block;" src=" ' +  obj_var.loc_img + 'true/' + text_result + '" /><img style="margin: 0 auto;display:block;" src=" ' +  obj_var.loc_img + 'true/'+img_result + '" />';
    }
	 $('#box_result_index').find('.active_ques').addClass(cls).attr('title','Bấm xem lại');
    $('#question_status_tf').html(html_result_ques).show();
    timeoutResult = setTimeout(function(){
		$('#question_status_tf').hide(); 
        if($('#segment_'+lesson.inx).find('.basic_explain').length==1) $('#btn_hd').addClass('elm_show');             
        if (lesson.inx + 1 == data_lesson.common.total){
            if(data_lesson.common.total == 3){
                nextQuestion();
            }else{
                obj_var.time_end = new Date().getTime();
                $('#btn_save_score').addClass('elm_show');
                if(answer){
					$('#btn_save_score').click();
				}else{
					$('#segment_'+lesson.inx).find('.bt_tit_true_answer').show(); $('#btn_save_score').addClass('elm_show');
				}
            }
        }else{  
            if(!answer){ 
                $('#segment_'+lesson.inx).find('.bt_tit_true_answer').show();$('#btn_next').addClass('elm_show');      
            }else  nextQuestion();
        }
    },1500);
	if(lesson.inx == 1){
        if($('#audio_point_high').length ==0){
		    $('#list_audio_control').append('<audio id="audio_point_high" src="https://www.luyenthi123.com/data/audio/finish_point_high.mp3" class="audio_control"></audio><audio id="audio_point_low" src="https://www.luyenthi123.com/data/audio/finish_point_low.mp3" class="audio_control"></audio>');
            audio_point_high = document.getElementById('audio_point_high');
            audio_point_low = document.getElementById('audio_point_low');	
        }
		$('#result').html(obj_var.html_res);
		$('#bt_lesson_other').click(function(){
			window.location.href =link_parent; 
		});
		$('#bt_lesson_menu').click(function(){
			window.location.href =link_parent_0; 
		});
		$('#bt_review').click(function(){    
            $('#popup_question').hide().next().show();   
            $('#popup_no_answer').css('display','flex');		
            toPos($('#popup_no_answer'),0);
		});
	}
}
function redoLesson(){
    window.location.reload();
}
function saveScore(cmd){
    if(!obj_var.time_end){
        obj_var.time_end = new Date().getTime();
    }
    $('.segment.active').removeClass('active');
	$('#box_result_index .active_ques').removeClass('active_ques').addClass('old');
    $(cmd).removeClass('elm_show');	
    var count_time = (obj_var.time_end - obj_var.time_start)/1000;
    var score_post = obj_var.yourScore/10;
    return_hdScore(obj_var.yourScore);           
    var m_hatde = obj_var.hd_score + obj_var.hd_100 + obj_var.hd_level;
    var p_tt = 0;
    if(score_post>=5){
        p_tt = 1; audio_point_high.play();
    }else{
		if(audio_point_low) audio_point_low.play();
    }
    data_result = {score:score_post,max_hd:obj_var.max_hd,level:data_lesson.common.level,hight: obj_var.hd_score,dif:obj_var.hd_level,bonus:obj_var.hd_100,p_tt:p_tt,m_hatde: m_hatde,m_tt: 0,point_10_total:0};
	if(score_post == 10){
        data_result.point_10_total = 1;
        $('#point_10_total').addClass('point_10_total_' + data_result.point_10_total).attr('value',1).attr('msg','Đạt 1 điểm 100');
    }
    var html_result = render_htmhd(data_result.level, data_result.dif, data_result.hight, data_result.bonus);
    $('#chestnuts').html(html_result);
    $('#point_dif').html("+ " + data_result.dif + " hạt dẻ");
    $('#point_hight').html("+ " + data_result.hight + " hạt dẻ");
    $('#point_bonus').html("+ " + data_result.bonus + " hạt dẻ");
    $('#point_old').html('<span>+ ' + data_result.hd_old + '</span><span><img src="/file/luyenthi123/common/baitap/image/chestnut_small.png"/></span>');
    $('#_rsp_old_total').html(data_result.m_hatde);
    $('#_rsp_old_achie').html(data_result.p_tt);     
    $('#bt_review').html('<div class="button_name">Làm lại bài này</div>');
    $('#bt_lesson_other').html('<div class="button_name">Chọn độ khó khác</div>');
    $('#result').show();
    var isPost = true;
    if(typeof scoreLevel!='undefined' && scoreLevel >= 0){       
        $('#number_chestnuts,#point_total_achie,#point_other').hide();
        _getResult1(data_result);
        if(score_post <= scoreLevel) isPost = false;        
    }else{
        _getResult(data_result);
    }
    if(isPost){
        $.post(basic_url+'act/save_score', {
            time: count_time,
            t_scr: score_post,
            level: data_lesson.common.level
        }, function(data) {});
    }
	lesson.saved_score = true;
}

function nextQuestion(){
    if(lesson.hasAudio == 1){
        $('#lesson_content').ubaPlayer('unbindClick');    
        lesson.hasAudio = 0;   
    }    
    lesson.inx++;   
    $('.segment.active').removeClass('active').next().addClass('active');	 
    if($('#segment_'+lesson.inx).find('.audio_ques_'+lesson.inx).length>0){  
        $('#lesson_content').ubaPlayer({		
            audioButtonClass:'audio_ques_'+lesson.inx,             
            codecs: [{name:"MP3", codec: 'audio/mpeg;'}]		     
        }); 
        lesson.hasAudio = 1;        
       if($('#segment_'+lesson.inx).find('.basic_q_title .icon-audio'))$('#segment_'+lesson.inx).find('.basic_q_title .icon-audio').click();
    }
    showKeyoard();
    if(true){
        $('#number_ques .index').text((lesson.inx +1));	
        $('#box_result_index .active_ques').removeClass('active_ques').addClass('old').next().addClass('active_ques');			
        if(typeof hasMath!='undefined' && typeof MathJax !='undefined') MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById('basic_segment_'+lesson.inx)]);
        $('#btn_check').addClass('elm_show').siblings().removeClass('elm_show');
        lesson.tpl = data_lesson.segment[lesson.inx].type;			
    }else{
		if($('#segment_1').find('#avip').length ==0) $('#segment_1').append('<center>Bạn phải là <a title="Quyền lợi của thành viên VIP" id="avip"  target="_blank" style="cursor: pointer;color: #0898da;text-decoration: underline;"  href="/dang-ky-mua-the.html">thành viên VIP</a> mới được làm tiếp bài này !</center>');
		$('#box_btn_ctrl').find('.elm_show').removeClass('elm_show');
    }	
}
function showAnswer(cmd){
    $(cmd).removeClass('elm_show');
    $('.segment.active').find('.basic_explain').slideDown(400);
    if($('.segment.active').find('.audio_hd').length>0) $('.segment.active').find('.audio_hd').click();
}
var tm_no_answer = null;
function closePopup(){
	tm_no_answer = null;
	clearTimeout(tm_no_answer);
	$('#popup_no_answer').addClass('rotateOut');	
	tm_no_answer = setTimeout(function(){
		$('#popup_no_answer').css('display','none').removeClass('rotateOut');
		tm_no_answer = null;
		clearTimeout(tm_no_answer);
	},520);
}
function continueCheck(){
    lesson.checked = true;
    closePopup();
   $('#btn_check').click();
}
