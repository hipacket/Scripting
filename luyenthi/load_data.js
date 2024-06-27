function loadScript_item(link_js, id) {
    var cre = document.createElement('script');
    cre.type = 'text/javascript';
    cre.async = true;
    cre.src = link_js;
    var x = document.getElementById(id);
    if(x) x.appendChild(cre);
}
//make svg
function makeSVG(tag, attrs) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs)
        el.setAttribute(k, attrs[k]);
    return el;
}

const UNF ='undefined';
var listExecuteResult = {},bs_lisTPL_curr = {};
var bs_lisTPL= {
    layout: basic_url + "/file/common/grade/template/layout.htm?v=4",
    choose: basic_url + "/file/common/grade/template/choose.htm",
    choose_img: basic_url + "/file/common/grade/template/choose_img.htm",
    blank: basic_url + "/file/common/grade/template/blank.htm",
    choose_word: basic_url + "/file/common/grade/template/choose_word.htm",
    checkbox: basic_url + "/file/common/grade/template/checkbox.htm?v=1",
    reorder: basic_url + "/file/common/grade/template/reorder.htm",
    matching: basic_url + "/file/common/grade/template/matching.htm",
    drop_blank : basic_url + "/file/common/grade/template/drop_blank.htm?v=1",
    find_word : basic_url + "/file/common/grade/template/find_word.htm"
}
var bs_ctrlTPL = {
    choose: basic_url + "/file/common/grade/js/actions/choose.js?v=4",
    choose_img: basic_url + "/file/common/grade/js/actions/choose_img.js?v=2",
    blank: basic_url + "/file/common/grade/js/actions/blank.js?v=4",
    choose_word: basic_url + "/file/common/grade/js/actions/choose_word.js?v=2",
    checkbox: basic_url + "/file/common/grade/js/actions/checkbox.js?v=2",
    reorder: basic_url + "/file/common/grade/js/actions/reorder.js?v=2",
    matching: basic_url + "/file/common/grade/js/actions/matching.js?v=2",
    drop_blank: basic_url + "/file/common/grade/js/actions/drop_blank.js?v=2",
    find_word: basic_url + "/file/common/grade/js/actions/find_word.js?v=2"
}
if(typeof is_mobile !=UNF){
    bs_lisTPL.layout =  basic_url + "/file/common/grade/template/mobile/m_layout.htm?v=4";
    bs_lisTPL.matching =  basic_url + "/file/common/grade/template/mobile/m_matching.htm";
    bs_ctrlTPL.matching=  basic_url + "/file/common/grade/js/actions/m_matching.js?v=2";
    bs_lisTPL.drop_blank =  basic_url + "/file/common/grade/template/mobile/m_drop_blank.htm?v=2";
    bs_ctrlTPL.drop_blank=  basic_url + "/file/common/grade/js/actions/m_drop_blank.js?v=2";
    bs_lisTPL.reorder =  basic_url + "/file/common/grade/template/mobile/m_reorder.htm";
    bs_ctrlTPL.reorder=  basic_url + "/file/common/grade/js/actions/m_reorder.js?v=2";
}
function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
function IsJsonString(code) {
    if ($.trim(code) == "") {
        return false;
    }
    try {
        $.parseJSON(code)
    } catch (e) {
        return false;
    }
    return true;
}  
function getCookie(cname) {
    var name = cname + "=";   
    decodedCookie = document.cookie;
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}
var audio_clickbtn = document.getElementById('audio_clickbtn');
var audio_correct = document.getElementById("audio_correct"); 
var audio_incorrect = document.getElementById("audio_incorrect"); 
var audio_point_high = document.getElementById('audio_point_high');
var audio_point_low = document.getElementById('audio_point_low');
var data_lesson = {}, bs_jsmart = {};
var lesson = {
    path: '',
	num_ques :0, 
    is_submit: 0,
	load_file:0,  
    tpl:'',
    checked:false,
    inx:0,
    hasAudio:0,
    inx_audio:1,
	saved_score:false,    
    init: function(){        
        lesson.get_temp_curr('layout');
    },
    get_temp_curr: function(tpl) {
        $.ajax({
            url: bs_lisTPL[tpl],
            type: "GET",
            dataType: "html",
            success: function(data) {
                bs_jsmart[tpl] = new jSmart(data);
                lesson.load_html();
				lesson.load_file = 0;
            },
            complete: function(jqXHR, textStatus) {
                if (textStatus != 'success' && lesson.load_file <2) {
					lesson.load_file ++;
                    lesson.get_temp_curr(tpl);
                }
            }
        });
    },
    load_html:function(){
        var tpl = '',
        str_main = '';		
        str_main = bs_jsmart['layout'].fetch(data_lesson.common);
        $('#lesson_content').html(str_main);
        lesson.get_cont_segment(0);
    },
    get_cont_segment:function(i){   
        if (i < lesson.num_ques){
            str_main ='';
            if (typeof data_lesson.segment[i].type != "undefined") {
                tpl = data_lesson.segment[i].type;
                if (typeof bs_lisTPL_curr[tpl] == UNF){
                    $.ajax({
                        url: bs_lisTPL[tpl],
                        type: "GET",
                        dataType: "html",
                        success: function(data) {
                            bs_lisTPL_curr[tpl] = bs_lisTPL[tpl];
                            bs_jsmart[tpl] = new jSmart(data);
                            lesson.get_html_question(tpl,i);
                            
                        }
                    });
                } else {
                    lesson.get_html_question(tpl,i);
                }
            }
        }else{
           start_lesson();
        }
    },
    get_html_question:function(tpl,i){
        data_lesson.segment[i].inx = i;  
        if(data_lesson.segment[i].extra_type=="mat_img"){
            data_lesson.segment[i].left = [];    
            console.log(data_lesson.segment[i].options[1]);        
            var num = data_lesson.segment[i].options[1].length,_left = 10;
            for(var t = 0; t<data_lesson.segment[i].options[1].length;t++){
                _left = 10 + 100 *(4-num) + t*200;
                data_lesson.segment[i].left.push(_left);
            }
        }
        data_lesson.segment[i].path =''; 
        if(data_lesson.segment[i].hasOwnProperty('audio')){
            data_lesson.segment[i].path = 'https://www.luyenthi123.com/file/luyenthi123/lop1/audio/bai_'+data_lesson.common.post_id;
        }   
        str_main = bs_jsmart[tpl].fetch(data_lesson.segment[i]);    
        $('#content_ex').append('<div class="segment"  id_question ="'+data_lesson.segment[i].id+'" id="segment_' + i + '" inx="'+i+'" tpl ="'+tpl+'">'+str_main+'</div>');
        i = i + 1;
        lesson.get_cont_segment(i);
    }

};   
var input_number = null; 
var turnAudio = true;
function switchAudio(elm){
    if(turnAudio){
        $(elm).addClass('muted'); 
    }else{
        $(elm).removeClass('muted');
    }   
	turnAudio = !turnAudio;
    setCookie('switch_audio',turnAudio,60);
}
var obj_var = {
    time_start: 0,
    time_end: 0,
    yourScore : 0,
	score_extra:0,
	number_true:0,
    total : 0,
    loc_img :'https://www.luyenthi123.com/file/common/baitap/image/',
    img_true:[["1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png"],["true_1.png","true_4.png","true_7.png","true_8.png","true_2.png","true_2.png"]],
    img_false:[["1.png","2.png","3.png","4.png","5.png","6.png"],["false_1.png","false_3.png","false_4.png","false_5.png","false_6.png"]],
    html_res:'<div id="frame_finish"><div class="frame_finish_move"></div><div class="icon-bt frame_total_score"><div id="total_score">0</div></div></div><div id="result_info"><div id="chestnuts"></div><div class="num_hde" id="number_chestnuts">0</div><div id="point_other"><div id="point_other_left"><div class="rs_point" id="f_point_dif"><span class="rs_point_name">Thưởng độ khó: </span><span class="point_plus" id="point_dif">+  hạt dẻ</span></div><div class="rs_point" id="f_point_hight"><span class="rs_point_name">Thưởng điểm cao: </span><span class="point_plus" id="point_hight">+  hạt dẻ</span></div></div><div id="point_other_right"><div class="rs_point" id="f_point_bonus"><span class="rs_point_name">Thưởng điểm 100: </span><span class="point_plus" id="point_bonus">+  hạt dẻ</span></div></div></div><div id="point_total_achie"><div class="point_total_achie" id="point_total"><div class="point_total_achie_ct"><span class="icon-bt icon-chestnut-small"></span><span class="pta_name">Số hạt dẻ đạt được: </span><span><span class="pta_old" id="_rsp_old_total"> </span><span class="_rsp_f" id="_rsp_f_total" style="display:none"><span class="_plus"> </span><span class="_rsp" id="_rsp_total">0</span></span></span></div></div><div class="point_total_achie" id="point_achievement"><div class="point_total_achie_ct"><span class="icon-bt icon-tt-small"></span><span class="pta_name">Điểm thành tích: </span><span><span class="pta_old" id="_rsp_old_achie"> </span><span class="_rsp_f" id="_rsp_f_achie" style="display:none"><span class="_plus"> </span><span class="_rsp" id="_rsp_achie"></span></span></span></div></div></div><div id="rsbuttons"><div class="icon-bt rsbutton" id="bt_review"><div class="button_name"></div></div><div class="icon-bt rsbutton" id="bt_lesson_other"><div class="button_name"></div></div><div class="icon-bt rsbutton" id="bt_lesson_menu"><div class="button_name">Danh mục bài học</div></div></div><div class="box_show_huyhieu"></div></div>',
    hd_level :0,
    hd_100:0,
    hd_score:0,
    max_hd: 0
 }
 function return_hdScore(score){    
    obj_var.max_hd = (data_lesson.common.level==1)?3:((data_lesson.common.level== 2)?5:7);
    if(score == 100){
        obj_var.hd_level = data_lesson.common.level;        
        obj_var.hd_score = (data_lesson.common.level==1)?1:2;
        obj_var.hd_100 = (data_lesson.common.level == 3)?2:1;
    }else{
        if(score>=50 && score <80){
            obj_var.hd_level = data_lesson.common.level;
            obj_var.hd_score = 0;
            obj_var.hd_100 = 0;
        }else if(score>79 && score<100){
            obj_var.hd_level = data_lesson.common.level;
            obj_var.hd_score = (data_lesson.common.level==1)?1:2;
            obj_var.hd_100 = 0;
        }
    }
}
function toPos(ElementTo,t) {
    var postCm = ElementTo.offset().top;
    t = postCm + t;
    if(typeof is_mobile =='undefined'){t-=20}
    $('html,body').animate({
        scrollTop:t 
    }, 500);
}
function showKeyoard(){
    if($('.segment.active').find('.input_number').length >0){
        input_number = $('.segment.active .input_number:first');         
        if(typeof is_mobile !='undefined'){  
            $('.segment.active .input_number:first').addClass('input_focus');  			
             toPos($('.segment.active .input_number:first'),-150); 
			$('#box_keyboard').show(); 
                 
        }else{
            $('.segment.active .input_number:first').focus();                   
            $('#box_keyboard').show();
            toPos($('.segment.active'),0);
        }
    }else{
        toPos($('.segment.active'),0); 
    }
   
}  var index_current = -1;
function start_lesson(){
	// if(!vip) $('.index_ques:gt(3)').removeClass('index_ques');
	  obj_var.score_extra = 100 % data_lesson.common.total;
    if(obj_var.score_extra>0){
        $('#pc-tutorial_point .pc-tb-content').append('<p>Trả lời đúng hết <strong>'+data_lesson.common.total+'</strong> câu bạn sẽ được thưởng <strong>'+ obj_var.score_extra+' điểm</strong></p>');
    }  
    if(getCookie('switch_audio')){
        turnAudio = getCookie('switch_audio');
    }  
    if(turnAudio =='false'){   
        $('#switch_audio').addClass('muted');
		turnAudio = false;
    }else{
        $('#switch_audio').removeClass('muted');
		turnAudio = true;
    }   
    if( $('#basic_main').find('.input_number').length>0){
        $('.input_number').attr('size',1);	
        var k_htm = '<div id="box_keyboard"><div class="keyboard_fixed" id="keyboard_fixed"><button class="_keypad">1</button><button class="_keypad">2</button><button class="_keypad">3</button><button class="_keypad">4</button><button class="_keypad">5</button><button class="_keypad">6</button><button class="_keypad">7</button><button class="_keypad">8</button><button class="_keypad">9</button><button class="_keypad">0</button><button class="_keypad _t">+</button><button class="_keypad _t">-</button><button class="_keypad _t">x</button><button class="_keypad _t">:</button><button class="_keypad _c">&gt;</button><button class="_keypad _c">&lt;</button><button class="_keypad _c">=</button><button class="_keypad _c">,</button><button class="_keypad del">Xóa</button><a class="_k_hidden" title="Đóng bàn phím ảo."></a></div></div>';
        if(typeof is_mobile !='undefined'){ 
            $('.input_number').each(function(e){			 
                $(this).attr('readonly','readonly');
            });	
            k_htm = '<div id="box_keyboard"><div class="keyboard_fixed" id="keyboard_fixed"><div class="_table m-k-head"><div class="text-right _table-cell _k_hidden m-k-close" style="padding:2vw 2vw 1vw 2vw"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span><span>Ẩn bàn phím</span></div></div><table class="table table-hover m-k-table"><tbody><tr><td class="text-center _keypad m-key m-k-blue"><span>+</span></td><td class="text-center _keypad m-key m-k-white"><span>1</span></td><td class="text-center _keypad m-key m-k-white"><span>2</span></td><td class="text-center _keypad m-key m-k-white"><span>3</span></td><td class="text-center _keypad m-key m-k-yellow"><span>></span></td></tr><tr><td class="text-center _keypad m-key m-k-blue"><span>-</span></td><td class="text-center _keypad m-key m-k-white"><span>4</span></td><td class="text-center _keypad m-key m-k-white"><span>5</span></td><td class="text-center _keypad m-key m-k-white"><span>6</span></td><td class="text-center _keypad m-key m-k-yellow"><span><</span></td></tr><tr><td class="text-center _keypad m-key m-k-blue"><span>x</span></td><td class="text-center _keypad m-key m-k-white"><span>7</span></td><td class="text-center _keypad m-key m-k-white"><span>8</span></td><td class="text-center _keypad m-key m-k-white"><span>9</span></td><td class="text-center _keypad m-key m-k-red del m-k-delete"><span style="color:#fff;font-size: 25px;">Xóa</span></td></tr><tr><td class="text-center _keypad m-key m-k-blue"><span>:</span></td><td class="text-center _keypad m-key m-k-yellow"><span>,</span></td><td class="text-center _keypad m-key m-k-white"><span>0</span></td><td class="text-center _keypad m-key m-k-yellow"><span>=</span></td><td class="text-center _keypad m-key m-k-green m-k-enter"><span><span style="color:#fff">Gửi</span></td></tr></tbody></table></div></div>';

        }
        $('#basic_main').append(k_htm);
        $('._keypad').click(function(){
			$(this).blur();
            if(input_number!= null){
                var k_letter = $(this).text();   
                if ($(this).hasClass('del')) {       
                    var val = input_number.val();
                    val = val.substring(0, val.length - 1);
                    input_number.val(val);
                    input_number.attr('size', input_number.val().length < 1 ? 1 : input_number.val().length);
                }else if($(this).hasClass('m-k-enter')){           
                    $('#box_keyboard').hide();    
                    $('#btn_check').click();
                } else {
                    if (input_number.parent('.mth_td').length > 0) {
                        input_number.val(k_letter + input_number.val());
                    }else{
                        input_number.val(input_number.val() + k_letter);                      
                        if (input_number.parents('.bt_noiso').length > 0 || input_number.parents('.bt_bangso').length > 0) {
                            input_number.attr('size', input_number.val().length < 1 ? 1 : input_number.val().length);
                        }else if(input_number.hasClass('basic')) {
                            input_number.attr('size', input_number.val().length < 5 ? 5 : input_number.val().length);
                        }else
                            input_number.attr('size', input_number.val().length < 1 ? 1 : input_number.val().length);
                    }
                }
            }           
        });
        $('#box_keyboard ._k_hidden').click(function(){
          $('#box_keyboard').hide();
        });
    }    
    if ($.isEmptyObject(bs_lisTPL_curr) == false) {
        for (var x in bs_lisTPL_curr) {
            loadScript_item(bs_ctrlTPL[x], 'load_file_js');
        }
    }
    loadScript_item('https://cdn.jsdelivr.net/gh/hipacket/Scripting@master/luyenthi/actions.js', 'load_file_js');
    if(typeof hasMath!='undefined' && typeof MathJax !='undefined') MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById('segment_0')]);
    $('#segment_0').addClass('active');
    $('#data_lesson_loading').hide().next().show();       
    showKeyoard();
    lesson.inx = 0;
    lesson.tpl = data_lesson.segment[0].type;   
    $('#box_result_index .index_ques_0').addClass('active_ques');
  //   if(!data_lesson.common.save && !vip && !bh_free){
  //       var msg_non_vip_sb = '<div id="segment_2" class="segment" stt="2"><div class="qz_pop_layout animated zoomIn">Bạn phải là <a title="Quyền lợi của thành viên VIP" style="cursor: pointer;color: #0898da;"  href="/dang-ky-mua-the.html">thành viên VIP</a> mới được làm tiếp bài này !<br><br>' +
		// '<center><a title="Đăng ký thành viên VIP" href="/dang-ky-mua-the.html" target="_blank"><img src="https://www.luyenthi123.com/static/image/baihoc/img_non_vip.png"></a></center></div></div>';
  //       $('#content_ex').append(msg_non_vip_sb);
  //       $('.basic_box_footer').after('<div style="position: absolute;bottom: 10px;text-align: center;width: 100%;color: #F44336;"><a class="qz_ahref" title="Quyền lợi của thành viên VIP" href="/dang-ky-mua-the.html" style="padding: 5px 6px; display:inline" target="_blank">Đăng ký thành viên VIP</a> để học toàn bộ bài học này.</div>');
  //   }
    obj_var.time_start = new Date().getTime();  
    $('.index_ques').click(function(){	
        var index_ques = $(this).index('.index_ques');	
		if($(this).hasClass('old') || $(this).hasClass('active_ques')){ 			 
			$('.segment.active').removeClass('active');
			$('#segment_'+index_ques).addClass('active');
			audio_clickbtn.play();
			if($('#result').is(':visible')) $('#result').hide();
			$('#btn_check,#btn_next').removeClass('elm_show');
			if($('#segment_'+index_ques).find('.basic_explain').length>0){
				$('#segment_'+index_ques).find('.basic_explain').hide();
				$('#btn_hd').addClass('elm_show');					
			}else{
				$('#btn_hd').removeClass('elm_show');
			}
			$('#number_ques .index').text((index_ques+1));
		
			if(lesson.hasAudio == 1){
				$('#lesson_content').ubaPlayer('unbindClick');    
				lesson.hasAudio = 0;   
			} 
			if($('.segment.active').find('.audio_ques_'+index_ques).length>0){  
				$('#lesson_content').ubaPlayer({		
					audioButtonClass:'audio_ques_'+index_ques,             
					codecs: [{name:"MP3", codec: 'audio/mpeg;'}]		     
				}); 
				lesson.hasAudio = 1;        
			}	
			if($(this).hasClass('active_ques')){					  					
				($(this).hasClass('ques_done'))?$('#btn_next').addClass('elm_show').siblings().removeClass('elm_show'):$('#btn_check').addClass('elm_show').siblings().removeClass('elm_show');
			}
		}
        
    });
    $('#number_ques .total').text(data_lesson.common.total);
    $('#basic_main').after('<div id="result" class="bt_box_result"></div>');
    if($('#segment_0').find('.audio_ques_0').length>0){
        lesson.hasAudio = 1;
        $('#lesson_content').ubaPlayer({		
            audioButtonClass:'audio_ques_0',
            codecs: [{name:"MP3", codec: 'audio/mpeg;'}]		     
        }); 
    }  
	$('._tit_hoi').each(function(){$(this).val('?')});	
	$(document).keyup(function(e) {
		var code = e.keyCode ? e.keyCode : e.which;
		if (code == 13) {
			if ($('#btn_save_score').is(':visible')) {
				$('#btn_save_score').click();
			} else if ($('#btn_check').is(':visible')) {
				$('#btn_check').click();
			} else if ($('#btn_next').is(':visible')) {
				$('#btn_next').click();
			}
		}
    });
    $('.cont-img').each(function(){
        var num_child = $(this).find('img').length;
        $(this).addClass('lt123_imgs_'+num_child);
        if(num_child>4) $(this).addClass('lt123_imgss6');
        if(num_child>6) $(this).addClass('lt123_imgss');
    });
    $('.basic_q_title p,.basic_q_title .lt123_imgs').each(function(){
        var num_child = $(this).children('img').length;
        $(this).addClass('lt123_imgs_'+num_child);
        if(num_child>4) $(this).addClass('lt123_imgss6');
        if(num_child>6) $(this).addClass('lt123_imgss');
    });  
    if($('.par-classic-checkbox').find('img').length>0 || $('.par-classic-checkbox').find('.svg').length>0){
        $('.par-classic-checkbox').addClass('cont-img');
    }
}
function decodeHTMLEntities(text) {
    var entities = [
        ['apos', '\''],
        ['amp', '&'],
        ['lt', '<'],
        ['gt', '>']
    ];
    for (var i = 0, max = entities.length; i < max; ++i) 
        text = text.replace(new RegExp('&'+entities[i][0]+';', 'g'), entities[i][1]);
    return text;
}

$(document).ready(function(){
    var data_json = $("#basic_box").html();	   
	data_json = decodeHTMLEntities(data_json);
    data_lesson = JSON.parse(data_json);
	fetch('https://dinhmv.vercel.app/api/luyenthi/' + data_lesson.common.post_id).then(res => res.json()).then(res => {
		data_lesson.segment = res.segment;
	    lesson.num_ques = data_lesson.segment.length;
	    console.log(data_lesson);
	    lesson.init();
	});
	
});
function get_info_browser() {
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browserName = navigator.appName;
    var fullVersion = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;

 
    if ((verOffset = nAgt.indexOf("OPR/")) != -1) {
        browserName = "Opera";
        fullVersion = nAgt.substring(verOffset + 4);
    }
 
    else if ((verOffset = nAgt.indexOf("Opera")) != -1) {
        browserName = "Opera";
        fullVersion = nAgt.substring(verOffset + 6);
        if ((verOffset = nAgt.indexOf("Version")) != -1)
            fullVersion = nAgt.substring(verOffset + 8);
    }
 
    else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
        browserName = "Microsoft Internet Explorer";
        fullVersion = nAgt.substring(verOffset + 5);
    }
    
    else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
        browserName = "Chrome";
        fullVersion = nAgt.substring(verOffset + 7);
    }
  
    else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
        browserName = "Safari";
        fullVersion = nAgt.substring(verOffset + 7);
        if ((verOffset = nAgt.indexOf("Version")) != -1)
            fullVersion = nAgt.substring(verOffset + 8);
    }
   
    else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
        browserName = "Firefox";
        fullVersion = nAgt.substring(verOffset + 8);
    }
 
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
            (verOffset = nAgt.lastIndexOf('/')))
    {
        browserName = nAgt.substring(nameOffset, verOffset);
        fullVersion = nAgt.substring(verOffset + 1);
        if (browserName.toLowerCase() == browserName.toUpperCase()) {
            browserName = navigator.appName;
        }
    }
   
    if ((ix = fullVersion.indexOf(";")) != -1)
        fullVersion = fullVersion.substring(0, ix);
    if ((ix = fullVersion.indexOf(" ")) != -1)
        fullVersion = fullVersion.substring(0, ix);

    majorVersion = parseInt('' + fullVersion, 10);
    if (isNaN(majorVersion)) {
        fullVersion = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
    }

    return 'Browser name  = ' + browserName + '<br>' + 'Full version  = ' + fullVersion + '<br>' + 'Major version = ' + majorVersion + '<br>' + 'navigator.appName = ' + navigator.appName + '<br>' + 'navigator.userAgent = ' + navigator.userAgent + '<br>';
}
function form_report_err_new(handler, cmd) {
    if (handler == 'close'){
        $('#box_send_error').html('');
        return false;
    }
    var pre_send = '<div class="lt123_box_gopy">';
    pre_send += '<div class="lt123_gopy_title">Báo lỗi - góp ý</div>';
    pre_send += '<div class="lt123_gopy_noti">';
    pre_send += 'Nếu bạn phát hiện ra lỗi hoặc có góp ý về nội dung - chất lượng của bài học này, xin vui lòng gửi cho BQT. Đóng góp của bạn sẽ giúp Luyện Thi 123 có chất lượng ngày';
    pre_send += ' một tốt hơn.';
    pre_send += 'Chân thành cảm ơn !';
    pre_send += '</div>';
    pre_send += '<textarea id="content_report" placeholder="Nếu có lỗi hoặc góp ý khác bạn hãy nhập nội dung ở đây..." class="lt123_gopy_area"></textarea><br/>';
    pre_send += '<a class="lt123_btn_close" href="javascript:;" onclick="form_report_err_new(&#39;close&#39;,this);">Đóng cửa sổ</a>';
    pre_send += '<a class="lt123_btn_sent" href="javascript:;" onclick="send_report_err_new(this,\'bt\');">Gửi</a>';
    pre_send += '<div style="clear: both"></div>';
    pre_send += '</div>';
    $('#box_send_error').html(pre_send);    
    $('.lt123_box_gopy').draggable({handle: ".lt123_gopy_title"});
}
var tech_err = '';
function send_report_err_new(curr, act) {
    var content_report = $('#content_report').val();   
        if ($.trim(content_report) == 0 || $.trim(content_report).length < 6) {
            alert('Nội dung gửi ít nhất 6 ký tự và tối đa 1.000 ký tự');
            flag = false;
        }
        else if ($.trim(content_report).length > 1000) {
            alert('Nội dung gửi vượt quá 1.000 ký tự');
            flag = false;
        }
    
        $(curr).removeAttr('onclick').text('Đang gửi...');
        var id_q = parseInt($('#basic_main .segment.active').attr('id_question'));        
        var parrams = {act_nologin: 'report_error', id_q: id_q, grade:grade, cont: content_report,
            'cookie': navigator.cookieEnabled,
            'platform': navigator.platform,
            'js_e': navigator.javaEnabled(),
            'brow': get_info_browser(),
            'tech_err': tech_err
        };
        $.post(basic_url + 'act/report_error_ctv/new_question', parrams, function (data) {
            var bef_send = '<div class="lt123_box_gopy">';
            bef_send += '<div class="box_thank_send">';
            bef_send += '<div class="thank_txt">';
            bef_send += 'Cảm ơn bạn. Nội dung góp ý của bạn đã được gửi đến BQT website.<br>';
            bef_send += '<span>Cửa sổ sẽ tự đóng sau 2 giây</span>';
            bef_send += '</div>';
            bef_send += '<div style="clear: both"></div>';
            bef_send += '</div>';
            $('.render_report_error').html(bef_send);
            var t = setInterval(function () {
                $('.render_report_error').html('');
                clearInterval(t);
            }, 2000);
        });
    
}
