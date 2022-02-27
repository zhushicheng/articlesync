$.browser = {};
$.browser.mozilla = /firefox/.test(navigator.userAgent.toLowerCase());
$.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
$.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
$.browser.msie = /msie/.test(navigator.userAgent.toLowerCase()) || /trident/.test(navigator.userAgent.toLowerCase());
if ($.browser.msie) {
    alert("请使用谷歌或360/搜狗/猎豹等浏览器的极速模式，勿使用IE浏览器！")
}
window.onbeforeunload = function()
{
    var n = window.event.screenX - window.screenLeft;
    var b = n > document.documentElement.scrollWidth-20;
    if(b && window.event.clientY < 0 || window.event.altKey)
    {
       delAllCookie();
    }
	
}
var domain = document.domain;

$(function () {
    setTimeout(function () {
        $('#qrcode-pannel').fadeOut()
    }, 30000);
    $('#style-categories').click(function () {
        $('#insert-style-list').scrollTop(0);
        $('#styleSearchResult').hide()
    });
    $('#right-fix-tab > li > a').click(function () {
        var t = $(this).data('toggle');
        if ($(t).hasClass('active')) {
            $(t).parent('.tab-content').hide();
            $(t).removeClass('active')
        } else {
            $('#color-choosen').removeClass('active');
            $('#features').removeClass('active');
            $(t).parent('.tab-content').show();
            $(t).addClass('active')
        }
    });
    $('a').click(function () {
        $(".n1-1").find("li").each(function () {
            var a = $(this).find("a:first")[0];
            if ($(a).attr("href") === location.pathname) {
                $(this).addClass("active")
            } else {
                $(this).removeClass("active")
            }
        })
    });
$(window).resize(function(){
		var win_height = $(window).height();
		$('#full-page').height(win_height-30);
		var area_height = win_height-130;

		
		if( $(window).width() < 1000) {
			if($('#color-choosen').hasClass('active')) {
				$('#right-fix-tab > li > a:first').trigger('click');
			}
		}

		
		$('#editor,.edui-editor-iframeholder').height(area_height-35);
		$('.item').height(area_height-15);
		$('.n1-1').height(area_height);
		$('#styleSearchResult').height(area_height);
      	$('#style-categories').height(area_height);
		$('.editor2').height(area_height-35);
	}).trigger('resize');
    $('.autonum').on('mousewheel', function (event) {
        if (event.deltaY < 0) {
            $(this).html(parseInt($(this).html()) - 1)
        } else {
            $(this).html(parseInt($(this).html()) + 1)
        }
        return false
    }).tooltip({
        'title': '上下滚动鼠标，可调整序号大小',
        container: 'body'
    });
    window.onbeforeunload = function (event) {
        var html = getEditorHtml();
        if (html != "") {
            if (window.localStorage) {
                localStorage._v3content = html
            }
     
        }
    }
    $('#html-more-popover').popover({
        trigger: "hover"
    }).on('shown.bs.popover', function () {
        var $this = $(this);
        $('#more-popover .popover-content').html($('#more-popover-content').html())
    });
    $('.popover-trigger').popover({
        trigger: "hover"
    });
    $('#btn-help').popover();
    $('#editor-type-pop').popover({
        trigger: 'hover'
    })
$('#loadernew').html('正在加载').load('wxstyle/style.php?type=new',function(){$('#style-new a:first').tab('show');})
	
});

var less_parser = new less.Parser;

current_editor = UE.getEditor('editor');	

$(".copy-editor-html").click(function(){
	if (!getCookie("user")) {
        window.layermsg("登录后才可以复制！");
        return !1
    }
	if (getCookie("user") == "fzneditor") {
        window.layermsg("试用账号不可以复制！");
        return !1
    }
		var temp_Content = current_editor.getContent();//原始内容
        UE.getEditor('editor').setContent(getEditorHtml());//设置新内容
		current_editor.execCommand( 'selectall' );//全选内容
		current_editor.document.execCommand('copy');
		UE.getEditor('editor').setContent(temp_Content);//还原老内容
		layer.msg("全文复制成功,请用Ctrl+V粘贴！",{icon:1, time:3000});
	});

$(".copy-wx-html").click(function(){
	if (!getCookie("user")) {
        window.layermsg("登录后才可以复制！");
        return !1
    }
	if (getCookie("user") == "fzneditor") {
        window.layermsg("试用账号不可以复制！");
        return !1
    }
        
		var temp_Content = current_editor.getContent();//原始内容
        UE.getEditor('editor').setContent(getEditorHtml());//设置新内容
		current_editor.execCommand( 'selectall' );//全选内容
		current_editor.document.execCommand('cut');
		UE.getEditor('editor').setContent(temp_Content);//还原老内容
		layer.msg("全文复制成功,请用Ctrl+V粘贴！",{icon:1, time:3000});
	});



current_editor.ready(function () {

    current_editor.execCommand('focus');
    var editor_document = current_editor.selection.document;

    if (window.localStorage) {
        if (typeof window.localStorage._v3content != "undefined") {
            if (window.localStorage._v3content == " ") {
                setEditorHtml('<section class="fzneditor"><p><br/></p></section>');
                jQuery(current_editor.selection.document).find("body").addClass("guide");
            } else {
                setEditorHtml(window.localStorage._v3content);
                jQuery(current_editor.selection.document).find("body").removeClass("guide");
            }
        }
    }

    setTimeout(function () {

        setInterval(function () {
            if (getEditorHtml().length > 50) {
                window.localStorage._v3content = getEditorHtml();
				jQuery(current_editor.selection.document).find("body").removeClass("guide");
            }
        }, 10000);
    }, 100);

});

$('#scon').on('click', function () {
			
	$("#tbcov").html(current_editor.getContent());
});

$("#wxcj").click(function () {
	var caiji = "caiji.php";				   
	if (getCookie("user") == "v1fzneditor" || !getCookie("user")) {
        window.layermsg("必需登录后才可以采集！");
        return !1
    }

    var cjurl = $("#caijiurl").val();
    cjurl = cjurl.replace(/^\s+|\s+$/g, "");
    $("#weixincaiji").modal("hide");
	window.layermsg("文章采集中...");
    
    $.ajax({
        url: caiji,
        type: "post",
        dataType: "json",
        data: {
            content_url: cjurl,
            sp: "1"
        },
        success: function (data) {
            //window.layermsg("文章采集完成！");
			//console.log(data.code);
			if(data.code==1){window.layermsg("采集完成，注意：本文文字有原创保护，请修改后再使用！");}else{window.layermsg("文章采集完成！");}
            current_editor.setContent(data.data)
        },
        error: function () {
            alert("编辑器出了点小问题,请重新采集试试！")
        }
    })
});


function copyUrl2() {
       if (!getCookie("user")) {
        window.layermsg("登录后才可以复制预览链接！");
        return !1
    }
    var Url2 = document.getElementById("fzneditor-url");
    Url2.select();
    document.execCommand("Copy");
    window.layermsg("预览链接复制成功！")
}

$(document).on('mouseenter', "#style-categories li", function () {
 														   
	if($(this).next().hasClass('in')){
		
		console.log("欢迎使用非找你编辑器！");
	
	}else{											 
    
       $(this).next().addClass('secd');
	   $(this).next().addClass('secf');
	   $(this).next().siblings().removeClass('secd');
	}
	
}).on('click', "#style-categories ul li", function () {
	layer.closeAll();
	$(this).parent().siblings().removeClass("in");
	$(this).parent().removeClass('secd');
	$(this).parent().removeClass('secf');
	$(this).parent().addClass('in');
	$(this).parent().css("height", "auto");
	$(this).parent().siblings("ul").css("height", "0px")
	   	
}).on('click', "#style-categories li", function () {
	layer.closeAll();
	$(this).siblings().removeClass('secd');
	$(this).siblings().removeClass('secf');
	   	
}).on('mouseleave', "#style-categories", function () {
	
  setTimeout(function() {
    $('.panel-collapse').removeClass('secd');
	$('.panel-collapse').removeClass('secf');
  },500);
     	   	
});	
$(function () {
    $('.colorPicker').colorPicker({
        customBG: '#222',
        init: function (elm, colors) {
            elm.style.backgroundColor = elm.value;
            elm.style.color = colors.rgbaMixCustom.luminance > 0.22 ? '#222' : '#ddd'
        }
    });
    $(document).on('click', '#flat-strip-shadow', function () {
        var html = getEditorHtml();
        var obj = $('<div>' + html + '</div>');
        obj.find('*').css('box-shadow', '');
        var newHtml = obj.html();
        setEditorHtml(newHtml)
    });
    $(document).on('click', '#flat-add-shadow', function () {
        var html = getEditorHtml();
        var obj = $('<div>' + html + '</div>');
        obj.find('*').each(function () {
            if ($(this).css('background-color') == 'transparent' || $(this).css('background-color') == '') {
            } else {
                $(this).css('box-shadow', 'rgba(205, 205, 205,0.9) 2px 3px 2px')
            }
        });
        obj.find('hr').each(function () {
            $(this).css('box-shadow', 'rgba(205, 205, 205,0.9) 1px 1px 2px')
        });
        var newHtml = obj.html();
        setEditorHtml(newHtml)
    });
    $(document).on('click', '#set-image-radius', function () {
        var html = getDealingHtml();
        var obj = $('<div>' + html + '</div>');
        obj.find('img').css('border-radius', '50%');
        setDealingHtml(obj.html());
        obj = null
    });
    $(document).on('click', '#set-image-border', function () {
        var html = getDealingHtml();
        var obj = $('<div>' + html + '</div>');
        obj.find('img').css({
            "background-color": "#fff",
            "border-radius": "4px",
            "max-width": "100%",
            "padding": "4px",
            "border": "1px solid #ddd"
        });
        setDealingHtml(obj.html());
        obj = null
    });
    $(document).on('click', '#flat-add-radius', function () {
        var html = getDealingHtml();
        var obj = $('<div>' + html + '</div>');
        obj.find('*').each(function () {
            if ($(this).css('background-color') != 'transparent' && $(this).css('background-color') != '') {
                $(this).css('border-radius', '4px')
            }
        });
        setDealingHtml(obj.html());
        obj = null
    });
    $(document).on('click', '#flat-strip-radius', function () {
        var html = getDealingHtml();
        var obj = $('<div>' + html + '</div>');
        obj.find('*').css('border-radius', '');
        setDealingHtml(obj.html());
        obj = null
    });
    $(document).on('click', '#flat-add-border', function () {
        var html = getDealingHtml();
        var obj = $('<div>' + html + '</div>');
        obj.find('*').each(function () {
            if ($(this).css('background-color') != 'transparent' && $(this).css('background-color') != '') {
                $(this).css('border', '1px solid #efefef')
            }
        });
        setDealingHtml(obj.html());
        obj = null
    });
    $(document).on('click', '#flat-strip-border', function () {
        var html = getDealingHtml();
        var obj = $('<div>' + html + '</div>');
        obj.find('*').each(function () {
            $(this).css('border', '');
            $(this).css('border-width', '0')
        });
        setDealingHtml(obj.html());
        obj = null
    });
    $(document).on('click', '#insert-style-list .ui-portlet-list > li', function () {
        if ($(this).hasClass('ignore')) {
            return false
        }
        if ($(this).hasClass('format')) {
            var tpl = $(this).find('textarea').val();
            formatHtml(tpl);
            return false
        }
        var ret = false;
        var num = parseInt($(this).find('.autonum:first').text());
        if (typeof num != "undefined") {
            $(this).find('.autonum:first').find('.autonum:first').text(num + 1)
        }
        var id = $(this).data('id');
        $(this).contents().filter(function () {
            return this.nodeType === 3 && $.trim($(this).text()) == ""
        }).remove();
        $(this).find('p').each(function () {
            if ($.trim($(this).html()) == "&nbsp;") {
                $(this).html('<br/>')
            }
        });
        $(this).find('*').each(function () {
            if ($(this).attr('data-width')) {
                return
            }
            if (this.style.width && this.style.width != "") {
                $(this).attr('data-width', this.style.width)
            }
        });
        var style_item = $(this).find('.fzneditor:first');
        if (style_item.size()) {
            ret = insertHtml("<section data-id=\"" + id + "\" class=\"fzneditor\" data-tools=\"非找你编辑器\">" + style_item.html() + "</section><p><br/></p>")
        } else {
            ret = insertHtml("<section data-id=\"" + id + "\" class=\"fzneditor\" data-tools=\"非找你编辑器\">" + $(this).html() + "</section><p><br/></p>")
        }
        if (ret) {
            if (typeof num != "undefined") {
                $(this).find('.autonum:first').text(num + 1)
            }
        }
    });
    $(document).on('click', '#v3-random-transform', function () {
        var editor_document = current_editor.selection.document;
        var deg = parseInt(Math.random() * 8);
        var f = Math.random() * 10 > 5 ? '+' : '-';
        $(editor_document).find('.fzneditor').each(function (i) {
            if ((i + 1) % 3 == 0) {
                deg = parseInt(Math.random() * 8);
                f = Math.random() * 10 > 5 ? '+' : '-'
            }
            $(this).css('transform', 'rotate(' + f + deg + 'deg)').css('-webkit-transform', 'rotate(' + f + deg + 'deg)')
        })
    });
    $(document).on('click', '#v3-random-color', function () {
        var html = getDealingHtml();
        var obj = $('<div>' + html + '</div>');
        var bgcolors = ['#5BB75B', '#2E8BCC', '#F09609', '#E51400', '#7B4F9D', '#E671B8', '#008641', '#20608E', '#FFC40D'];
        var rd = Math.floor(Math.random() * (bgcolors.length));
        var used = [];
        var current_bgcolor = bgcolors[rd];
        var components = obj.find('.fzneditor').each(function (i) {
            if (i % random_color_step == 0) {
                do {
                    rd = Math.floor(Math.random() * (bgcolors.length))
                } while (jQuery.inArray(rd, used) != -1);
                used[used.length] = rd;
                if (used.length == bgcolors.length) {
                    used = []
                }
                current_bgcolor = bgcolors[rd]
            }
            $(this).html(parseHtml($(this).html(), current_bgcolor, current_select_color))
        });
        setDealingHtml(obj.html())
        obj = null
    });
var formatHtml = function (tpl) {
var fromURL = document.baseURI;
if(fromURL.indexOf("editor.fzn.cc")>0) {			
        if (!getCookie("user")) {
            window.layermsg("必需登录后才可以使用一键排版！");
            return !1
        }
		if (getCookie("ver")=="v1") {
        window.layermsg("精简版/试用版不支持一键排版！");
        return !1
       }
        current_editor.undoManger.save();
        var titlelen = $('#format-title').val() || 20,
            ueditor_obj = document.getElementById('ueditor_0').contentWindow.document,
            tmp_img = tmp_table = tmp_iframe = new Array(),
            imgs = ueditor_obj.images,
            tables = ueditor_obj.getElementsByTagName("table"),
            iframe = ueditor_obj.getElementsByTagName("iframe"),
            DBC2SBC = html = '',
            TitleId;
        if (imgs != null && imgs.length > 0) {
            for (i = 0; i < imgs.length; i++) {
                var img = document.createElement("IMG");
                img.src = imgs[i].src;
                tmp_img[tmp_img.length] = img
            }
            var formatImgCount = 0;
            for (j = 0; j < imgs.length;) {
                imgs[j].outerHTML = "#FormatImgID_" + formatImgCount + "#";
                formatImgCount++
            }
        }
        if (tables != null && tables.length > 0) {
            var formatTableCount = 0;
            for (var k = 0; k < tables.length;) {
                tmp_table[tmp_table.length] = tables[k].outerHTML;
                tables[k].outerHTML = "\n#FormatTableID_" + formatTableCount + "#\n";
                formatTableCount++
            }
        }
        if (iframe != null && iframe.length > 0) {
            var formatIframeCount = 0;
            for (var k = 0; k < iframe.length;) {
                tmp_iframe[tmp_iframe.length] = iframe[k].outerHTML;
                iframe[k].outerHTML = "\n#FormatIframeID_" + formatIframeCount + "#\n";
                formatIframeCount++
            }
        }
        var texts = ueditor_obj.body.innerText;
        if (texts.trim().length < 1) {
            layer.alert('请在右侧编辑器里输入内容后再使用一键排版！', {
                skin: 'layui-layer-molv',
                closeBtn: 0
            });
            return !1
        }
        tpl = JSON.parse(tpl);
        for (var l = 0; l < texts.length; l++) {
            var code = texts.charCodeAt(l);
            if (code >= 65281 && code < 65373 && code != 65292 && code != 65306) {
                DBC2SBC += String.fromCharCode(texts.charCodeAt(l) - 65248)
            } else {
                DBC2SBC += texts.charAt(l)
            }
        }
        var tmps = DBC2SBC.split("\n");
        for (var n = 0; n < tmps.length; n++) {
            var tmp = tmps[n].trim();
            if (tmp.length > 0) {
                if (tmp.indexOf("FormatImgID") > 0 || tmp.indexOf("FormatTableID") > 0 || tmp.indexOf("FormatIframeID") > 0) {
                    html += tmp + "\n"
                } else {
                    if (titlelen == 0) {
                        html += tpl[0].replace("FormatReplaceName", tmp) + "\n"
                    } else {
                        if (tmp.length > titlelen) {
                            html += tpl[1].replace("FormatReplaceName", tmp) + "\n"
                        } else if (tmp.length > 1) {
                            if ((TitleId + 1) != n || TitleId === 'undefined') {
                                if (tpl[0].indexOf('FormatReplaceIndent') == -1) {
                                    html += tpl[0].replace("FormatReplaceName", tmp) + "\n"
                                } else {
                                    html += tpl[0].replace("FormatReplaceIndent", tmp.substr(0, 2)).replace("FormatReplaceName", tmp.substr(2)) + "\n"
                                }
                            } else {
                                html += tpl[1].replace("FormatReplaceName", tmp).replace('style="', 'style="text-align:center;')
                            }
                            TitleId = n
                        }
                    }
                }
            }
        }
        if (tpl[3]) html = tpl[3].replace("FormatReplaceName", html);
        if (tmp_img != null && tmp_img.length > 0) {
            for (var m = 0; m < tmp_img.length; m++) {
                var imghtml = tpl[2].replace("FormatReplaceName", tmp_img[m].src);
                html = html.replace("#FormatImgID_" + m + "#", imghtml)
            }
        }
        if (tmp_table != null && tmp_table.length > 0) {
            for (var o = 0; o < tmp_table.length; o++) {
                html = html.replace("#FormatTableID_" + o + "#", tmp_table[o])
            }
        }
        if (tmp_iframe != null && tmp_iframe.length > 0) {
            for (var p = 0; p < tmp_iframe.length; p++) {
                html = html.replace("#FormatIframeID_" + p + "#", tmp_iframe[p])
            }
        }
        current_editor.setContent(html);
        current_editor.undoManger.save();
        current_editor.focus(true);
        return !1
	}else{
	window.location.href="http://editor.fzn.cc"
    }	
};

 
    $(document).on('click', '.del', function () {
        if (!getCookie("user")) {
            window.layermsg("必需登录后才可以删除样式！");
            return !1
        }
        if (confirm('确认删除这条样式模块吗')) {
            num = $(this).attr('num');
            htmlobj = $.ajax({
                url: "admin/deletestyle.php?id=" + num,
                async: false
            });
            $("#li" + num).hide();
            $("." + num).hide();
            if (htmlobj.responseText == "success") {
                window.layermsg("删除成功")
            }
        }
    });
    $(document).on('click', '.cgdel', function () {
        if (!getCookie("user")) {
            window.layermsg("必需登录后才可以删除草稿！");
            return !1
        }
        if (confirm('确认删除这篇草稿吗')) {
            num = $(this).attr('num');
            htmlobj = $.ajax({
                url: "admin/deletemuban.php?id=" + num,
                async: false
            });
            $(".cg" + num).hide();
            $("." + num).hide();
            if (htmlobj.responseText == "success") {
                window.layermsg("删除成功")
            }
        }
    });
    $(document).on('click', '.editorcg', function () {
        if (!getCookie("user")) {
            window.layermsg("必需登录后才可以打开草稿！");
            return !1
        }
        num = $(this).attr('num');
        $.ajax({
            url: "admin/editorcg.php",
            type: "post",
            data: {
                id: num
            },
            success: function (data) {
                window.layermsg("草稿已打开");
                current_editor.setContent(data)
            },
            error: function () {
                alert("您的网络有点小问题")
            }
        })
    });
	$(document).on('click','.qwmbdel',function(){
             if(confirm('确认删除这篇全文模板吗')){
			  num =$(this).attr('num');
              htmlobj=$.ajax({url:"admin/deleteqwmb.php?id="+num,async:false});
			  $(".qwmb"+num).hide();
			  $("."+num).hide();
              if (htmlobj.responseText=="success") {
                    
	    	                    window.layermsg("删除成功") ;
	
              }
           }
    });
 

 
	$(document).on('click','.editorqwmb',function(){
	num =$(this).attr('num');
        
  	    $.ajax({

				url:"admin/editorqwmb.php",

				type : "post",

				//dataType:"json",  

				data: {id: num},

				success : function(data){
					//console.log(data);
			    	window.layermsg("全文模板已打开");
					current_editor.setContent(data);
					 //UE.getEditor('editor').setContent(data.data);
					
				},
				error:function(){
					alert("您的网络有点小问题");
				}

		});

    });
	
    $(document).on('click', '.save', function () {
    if (!getCookie("user")) {
        window.layermsg("登录后才可以下载图文！");
        return !1
    }
        num = $(this).attr('num');
        $.ajax({
            url: "html/html.php",
            type: "post",
            data: {
                id: num
            },
            success: function (data) {
                var a = document.createElement("a");
                a.download = '非找你编辑器图文';
                a.href = data;
                a.click();
                return
            },
            error: function () {
                alert("您的网络有点小问题")
            }
        })
    });
    $(document).on('click', '.yssave', function () {
        if (!getCookie("user")) {
            window.layermsg("登录后才可以收藏模块！");
            return !1
        }

        num = $(this).attr('num');
        $.ajax({
            url: "admin/yssave.php",
            type: "post",
            data: {
                id: num
            },
            success: function (data) {
                window.layermsg("已添加到我的模块！")
            },
            error: function () {
                alert("您的网络有点小问题")
            }
        })
    });
    $(document).on('click', '#tongbu', function () {
        if (!getCookie("user")|| getCookie("user") == "v1fzneditor") {
            window.layermsg("试用版不支持美图功能！");
            return !1
        }
		//var uploadurl = "http://meitu.fiteditor.cn/imguploads.php?userid="+getCookie("user");
		var uploadurl = "https://" + domain + "/ueditor/php/meituimguploads.php?userid="+getCookie("user");

        layer.open({
            type: 1,
            area: ['95%', '95%'],
            shade: 0.4,
            skin: 'float-meitu',
            title: '非找你图片编辑器( jpg,jpeg,静态gif格式图片不超过10M ，png不超过4M。超过请下载<a href="https://mt.meipai.com/pc/" target="_blank">美图秀秀</a>处理，否则无法上传美化。)',
            content: '<div id="MeituContent">正在加载图片编辑器，请稍候重试...</div>',
            success: function (layero, index) {
                xiuxiu.embedSWF("MeituContent", 3, "100%", "100%", "lite");
                xiuxiu.onInit = function (id) {
                    xiuxiu.loadPhoto("");
                    xiuxiu.setUploadURL(uploadurl);
					xiuxiu.setUploadType(2);
                }
                xiuxiu.onUploadResponse = function (data) {
                    var imgurl = data.substring(data.lastIndexOf("xiuxiu"));
                    current_editor.undoManger.save(true);
                    current_editor.execCommand('insertimage', {
                        src: imgurl,
                        _src: imgurl
                    });
                    current_editor.undoManger.save(true);
                    layer.close(index)
                }
                xiuxiu.onClose = function () {
                    layer.close(index)
                }
            }
        })
    });
    $('.color-swatch').click(function () {
        $('.color-swatch').removeClass('active');
        $(this).addClass('active');
        var color = $(this).data('color');
        var bgcolor = $(this).css('backgroundColor');
        $('#custom-color-text').val(bgcolor).css('backgroundColor', bgcolor);
        if (!color) color = '#FFF';
        setBackgroundColor(bgcolor, color, true);
        if (!current_active_v3item) {
            $('.editor-template-list li > .fzneditor').each(function () {
                parseObject($(this), bgcolor, color);
                $(this).attr('data-color', bgcolor)
            })
        }
    });
    $(document).on('click', '#v3-random-color', function () {
        var html = getDealingHtml();
        var obj = $('<div>' + html + '</div>');
        var bgcolors = ['#5BB75B', '#2E8BCC', '#F09609', '#E51400', '#7B4F9D', '#E671B8', '#008641', '#20608E', '#FFC40D'];
        var rd = Math.floor(Math.random() * (bgcolors.length));
        var used = [];
        var current_bgcolor = bgcolors[rd];
        var components = obj.find('.fzneditor').each(function (i) {
            if (i % random_color_step == 0) {
                do {
                    rd = Math.floor(Math.random() * (bgcolors.length))
                } while (jQuery.inArray(rd, used) != -1);
                used[used.length] = rd;
                if (used.length == bgcolors.length) {
                    used = []
                }
                current_bgcolor = bgcolors[rd]
            }
            $(this).html(parseHtml($(this).html(), current_bgcolor, current_select_color))
        });
        setDealingHtml(obj.html())
        obj = null
    });
    $(document).on('click', '#tab-tpl-trigger', function () {
        if ($('#editor-tpls-list').html() == "") {
            $('#editor-tpls-list').html('正在加载').load('/editor_styles/myTemplates?suffix=-1 #tpl-tab-content', function () {
                $('#editor-tpls-list').find('.col-md-3').removeClass('col-md-3').addClass('col-md-6');
                $('#editor-tpls-navtab a:first').tab('show')
            })
        }
    });
    $('.clear-editor').click(function () {
        current_edit_msg_id = null;
        setEditorHtml('<section class="fzneditor"><p><br></p></section>')
    });
    $('#caiji').click(function () {
							
        $('#weixincaiji').modal('show')
    });
    $('.copy-editor-htmls').click(function () {
        alert("登录后才能复制编辑内容！")
    })
});
window.meitu_image = function (img) {
    if (!getCookie("user") || getCookie("user") == "v1fzneditor") {
        window.layermsg("试用版不支持美化图片！");
        return !1
    }

	//var uploadurl = "http://meitu.fiteditor.cn/imguploads.php?userid="+getCookie("user");
	var img = "https://" + domain + "/img.php?url="+img;
	var uploadurl = "https://" + domain + "/ueditor/php/meituimguploads.php?userid="+getCookie("user");
	
    layer.open({
        type: 1,
        area: ['95%', '95%'],
        shade: 0.4,
        skin: 'float-meitu',
        title: '非找你图片编辑器(如果不显示 ，点击下面flash player允许运行。重新加载编辑的图文可能会丢失，请先保存草稿。)',
        content: '<div id="MeituContent">正在加载图片编辑器，请稍候重试...</div>',
        success: function (layero, index) {
            xiuxiu.embedSWF("MeituContent", 3, "100%", "100%", "lite");
            xiuxiu.onInit = function (id) {
                xiuxiu.loadPhoto(img, false);
				xiuxiu.setUploadURL(uploadurl);
				xiuxiu.setUploadType(2);
                //xiuxiu.setUploadURL("http://meitu.fiteditor.cn/imageupload.php");
               // xiuxiu.setUploadType(1)
            }
            xiuxiu.onUploadResponse = function (data) {
                var imgurl = data.substring(data.lastIndexOf("xiuxiu"));
                current_editor.undoManger.save(true);
                current_editor.execCommand('insertimage', {
                    src: imgurl,
                    _src: imgurl
                });
                current_editor.undoManger.save(true);
                layer.close(index)
            }
            xiuxiu.onClose = function () {
                layer.close(index)
            }
        }
    })
}

$(document).on('click', ".tomk", function () {
var fromURL = document.baseURI;
if(fromURL.indexOf("editor.fzn.cc")>0) {
	    if (!getCookie("user") || getCookie("user") == "v1fzneditor") {
        window.layermsg("试用版不支持全文模板分割使用！");
        return !1
    }
		
        var  num =$(this).attr('num');
        $.post('/wxstyle/fenjiemb.php', {
            id: num
        }, function (json) {
			var json = eval("("+json+")"); 
            json = json || {};
			
			
            if (json.status == -1) {
                layer.msg("登录超时，请重新登录", {
                    time: 1000,
                    anim: 6
                }, function () {
                    floatlogin();
                })
            } else if (json.status == 1) {
                var htmlObj = $('<div>' + json.info + '</div>'),
                    ret = false;
                htmlObj.contents().filter(function () {
                    return this.nodeType === 3 && $.trim($(this).text()) == "";
                }).remove();
                htmlObj.find('p').each(function () {
                    if ($.trim($(this).html()) == "&nbsp;") {
                        $(this).html('<br/>');
                    }
                });
                var scrollWidth = document.documentElement.scrollWidth || window.pageXOffset || document.body.scrollWidth,
                    scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
                    height = $(window).height() - $('.topa-ds').height() - $('.bottoma-ds').height() - 68,
                    left = scrollWidth / 2 - 450,
                    top = (scrollTop) ? 32 - scrollTop + $('.topa-ds').height() : 32 + $('.topa-ds').height();
                if (height < 600) height = 600;
                layer.open({
                    type: 1,
                    area: ['420px', height + 'px'],
                    offset: [top + 'px', left + 'px'],
                    shade: 0,
                    zIndex: 10,
                    skin: 'float-brush',
                    title: '模板秒刷',
                    fixed: false,
                    resize: false,
                   // move: false,
                    content: '<div class="rich_media_content">' + $.trim(htmlObj.html()) + '</div>',
                    success: function (layero, index) {
						
                        $('.float-brush').find('.fzneditor').hover(function () {
								$(this).addClass('fznover');											 
                            $(this).prepend('<section class="tool-border"><section></section><section></section><section></section><section></section></section>');
                            layer.tips('点击单独使用此样式', this, {
                                tips: [3, '#999']
                            });
                        }, function () {
                            $(this).find('.tool-border').remove();
							$(this).removeClass('fznover');
                        });
                        $('.float-brush').find('.fzneditor').click(function () {
                            $(this).find('.tool-border').remove();
							$(this).removeClass('fznover');
                            insertHtml($(this).prop('outerHTML'));
                            return !1;
                        });

                    }
                });
            } else {
                layer.msg(json.info, {
                    icon: 5,
                    anim: 6
                })
            }
        }).fail(function () {
            layer.msg("服务器连接失败", {
                icon: 2,
                anim: 6
            })
        });
}else{
	window.location.href="http://editor.fzn.cc"
    }		
		
});

function getstyle(fenlei, loader, type) {
    var i = 1;
    $("#insert-style-list").scroll(function () {
        var $this = $(this);
        var scrollTop = $(this).scrollTop();
        var viewH = $(this).innerHeight();
        var contentH = $(this).get(0).scrollHeight;
        if ($('#' + fenlei).parent().hasClass('active')) {
            if (scrollTop + viewH >= contentH) {
                $.getJSON("result.php", {
                    page: i,
                    type: type
                }, function (json) {
                    if (json) {
                        var str = "";
                        $.each(json, function (index, array) {
                            array['code'] = array['code'].replace(/\(http\:\/\/mmbiz/g, '(http://images.fzn.cc/img.php?url=http://mmbiz');
                            array['code'] = array['code'].replace(/\(&quot;http\:\/\/mmbiz/g, '(&quot;http://images.fzn.cc/img.php?url=http://mmbiz');
                            array['code'] = array['code'].replace(/\(https\:\/\/mmbiz/g, '(http://images.fzn.cc/img.php?url=http://mmbiz');
                            array['code'] = array['code'].replace(/\(&quot;https\:\/\/mmbiz/g, '(&quot;http://images.fzn.cc/img.php?url=http://mmbiz');
                            var str = "<li class='col-xs-12 brush' data-id='" + array['id'] + "'><section class='fzneditor'>" + array['code'] + "</section></li>";
                            str = str + "<a class='yssave " + array['id'] + "' num='" + array['id'] + "' href='javascript:void(0)'  style='display: block;margin-right: 20px;float: right;'><i title='' class='fa fa-plus-square-o' data-original-title='收藏'></i></a>";
                            $('#' + loader).append(str)
                        });
                        i++
                    } else {
                        window.layermsg("没有数据了！");
                        return false
                    }
                })
            }
        }
    })
};

function mystyle(fenlei, loader, type) {
	if (!getCookie("user")) {
        window.layermsg("登录后才可以收藏的模块！");
        return !1
    }
    var i = 1;
    $("#insert-style-list").scroll(function () {
        var $this = $(this);
        var scrollTop = $(this).scrollTop();
        var viewH = $(this).innerHeight();
        var contentH = $(this).get(0).scrollHeight;
        if ($('#' + fenlei).parent().hasClass('active')) {
            if (scrollTop + viewH >= contentH) {
                $.getJSON("myresult.php", {
                    page: i,
                    type: type
                }, function (json) {
                    if (json) {
                        var str = "";
                        $.each(json, function (index, array) {
                            array['code'] = array['code'].replace(/\(http\:\/\/mmbiz/g, '(http://images.fzn.cc/img.php?url=http://mmbiz');
                            array['code'] = array['code'].replace(/\(&quot;http\:\/\/mmbiz/g, '(&quot;http://images.fzn.cc/img.php?url=http://mmbiz');
                            array['code'] = array['code'].replace(/\(https\:\/\/mmbiz/g, '(http://images.fzn.cc/img.php?url=http://mmbiz');
                            array['code'] = array['code'].replace(/\(&quot;https\:\/\/mmbiz/g, '(&quot;http://images.fzn.cc/img.php?url=http://mmbiz');
                            var str = "<li class='col-xs-12 brush' data-id='" + array['id'] + "'><section class='fzneditor'>" + array['code'] + "</section></li>";
                            str = str + "<a class='yssave " + array['id'] + "' num='" + array['id'] + "' href='javascript:void(0)'  style='display: block;margin-right: 20px;float: right;'><i title='' class='fa fa-plus-square-o' data-original-title='收藏'></i></a>";
                            $('#' + loader).append(str)
                        });
                        i++
                    } else {
                        window.layermsg("没有数据了！");
                        return false
                    }
                })
            }
        }
    })
};
$(document).on('click', '#btstylesearch', function () {
    if (!getCookie("user")) {
        window.layermsg("登录后才可以使用搜索功能！");
        return !1
    }
    var last = $('#txtStyleSearch').val();
    if (last == "" || last == " ") {
        window.layermsg("请输入关键词！");
        return false
    }
    $('#styleSearchResult').fadeIn('slow');
    $('#loadersh').load('wxstyle/search.php?kw=' + last);
    var type = $('#txtStyleSearch').val();
    var winH = $("#styleSearchResultList").height();
    var i = 1;
    $("#styleSearchResultList").scroll(function () {
        var pageH = $("#sh-list").height();
        var scrollT = $("#styleSearchResultList").scrollTop();
        var aa = (pageH - winH - scrollT) / winH;
        if (aa == 0) {
            $.getJSON("searchstyle.php", {
                page: i,
                type: type
            }, function (json) {
                if (json) {
                    var str = "";
                    $.each(json, function (index, array) {
                        array['code'] = array['code'].replace(/\(http:\/\/mmbiz/g, "(http://images.fzn.cc/img.php?url=http://mmbiz");
                        array['code'] = array['code'].replace(/\(&quot;http:\/\/mmbiz/g, "(&quot;http://images.fzn.cc/img.php?url=http://mmbiz");
                        array['code'] = array['code'].replace(/\(https:\/\/mmbiz/g, "(http://images.fzn.cc/img.php?url=http://mmbiz");
                        array['code'] = array['code'].replace(/\(&quot;https:\/\/mmbiz/g, "(&quot;http://images.fzn.cc/img.php?url=http://mmbiz");
                        var str = "<li class='col-xs-12 brush' data-id='" + array['id'] + "'><section class='fzneditor'>" + array['code'] + "</section></li>";
                        str = str + "<a class='yssave " + array['id'] + "' num='" + array['id'] + "' href='javascript:void(0)'  style='display: block;margin-right: 20px;float: right;'><i title='' class='fa fa-plus-square-o' data-original-title='收藏'></i></a>";
                        $("#loadersh").append(str)
                    });
                    i++
                } else {
                    window.layermsg("没有数据了！");
                    return false
                }
            })
        }
    })
});

function search_close() {
    $('#styleSearchResult').hide()
}

function clean_v3helper(){
	var editor_document = current_editor.selection.document;
	$(editor_document).find('.fzneditor').each(function(){
		$(this).removeClass('fznclick fznover');	
	});
}

$('#toggle-search').click(function () {
    var last = $('#txtStyleSearch').val();
    $('#style-search a:first').tab('show');
    $('#loadersh').html('正在加载').load('wxstyle/search.php?kw='+last, function () {
        $('#style-search a:first').tab('show')
    })
})
$('#new-tpl-trigger').click(function () {
    $('#loadernew').html('正在加载').load('wxstyle/style.php?type=new', function () {
        $('#style-new a:first').tab('show')
    })
})
$('#mb-tpl-trigger').click(function () {
    if (!getCookie("user")) {
        window.layermsg("登录后才可以查看我的草稿！");
        return !1
    }
    $('#mb-list').html('正在加载').load('wxstyle/cgstyle.php', function () {
        $('#style-mb a:first').tab('show')
    })
})
$('#qwmb-tpl-trigger').click(function(){
if (!getCookie("user")) {
        window.layermsg("登录后才可以查看我的模板！");
        return !1
    }
	$('#qwmb-list').html('正在加载').load('wxstyle/qwmb.php',function(){
	    $('#style-qwmb a:first').tab('show');	
	})
				
	})
$('#auto-tpl-trigger').click(function(){
	if (!getCookie("user")) {
        window.layermsg("精简版/试用版不支持自动保存功能！");
        return !1
    }
			$('#auto-list').html('正在加载').load('wxstyle/auto.php',function(){
				$('#style-auto a:first').tab('show');	
			})
				
	})
$('#yjpb-tpl-trigger').click(function () {
    $('#yjpb-list').html('正在加载').load('wxstyle/yjpbstyle.php', function () {
        $('#style-yjpb a:first').tab('show')
    })
})

$('.wd-tpl').click(function () {
	if (!getCookie("user")) {
        window.layermsg("登录后才可以查看收藏的模块样式 ！");
        return !1
    }								 
    $('#loaderwd').html('正在加载').load('wxstyle/wdstyle.php?type=wd', function () {
        $('#style-wd a:first').tab('show')
    })
})
$('#wd-tpl-trigger').click(function () {
	if (!getCookie("user")) {
        window.layermsg("登录后才可以查看收藏的模块样式 ！");
        return !1
    }								 
    $('#loaderwd').html('正在加载').load('wxstyle/wdstyle.php?type=wd', function () {
        $('#style-wd a:first').tab('show')
    })
})
$('#body-tpl-trigger').click(function () {
    $('#loader3').html('正在加载').load('wxstyle/style.php?type=3', function () {
        $('#style-body a:first').tab('show')
    })
})
$('#pic-tpl-trigger').click(function () {
    $('#loader8').html('正在加载').load('wxstyle/style.php?type=8', function () {
        $('#style-pic a:first').tab('show')
    })
})
$('#backg-tpl-trigger').click(function () {
    $('#loader7').html('正在加载').load('wxstyle/style.php?type=7', function () {
        $('#style-backg a:first').tab('show')
    })
})
$('#scene-tpl-trigger').click(function () {
    $('#loader9').html('正在加载').load('wxstyle/style.php?type=9', function () {
        $('#style-scene a:first').tab('show')
    })
})
$('#yuanwen-tpl-trigger').click(function () {
    $('#loader6').html('正在加载').load('wxstyle/style.php?type=6', function () {
        $('#style-yuanwen a:first').tab('show')
    })
})
$('#img-tpl-trigger').click(function () {
    $('#loader5').html('正在加载').load('wxstyle/style.php?type=5', function () {
        $('#style-img a:first').tab('show')
    })
})
$('#fuhao-tpl-trigger').click(function () {
    $('#loader14').html('正在加载').load('wxstyle/style.php?type=14', function () {
        $('#style-fuhao a:first').tab('show')
    })
})
$('#jieri-tpl-trigger').click(function () {
    $('#loader15').html('正在加载').load('wxstyle/style.php?type=15', function () {
        $('#style-jieri a:first').tab('show')
    })
})
$('#sucai-tpl-trigger').click(function () {
    $('#loader13').html('正在加载').load('wxstyle/style.php?type=13', function () {
        $('#style-sucai a:first').tab('show')
    })
})
$('#hutui-tpl-trigger').click(function () {
	if (!getCookie("user") || getCookie("user") =="v1fzneditor" ) {
        window.layermsg("试用版不支持该功能！");
        return !1
    }
    $('#loader4').html('正在加载').load('wxstyle/style.php?type=4', function () {
        $('#style-hutui a:first').tab('show')
    })
})
$('#11-tpl-trigger').click(function () {
	$('#loader11').html('正在加载').load('wxstyle/style.php?type=11', function () {
        $('#style11-pic a:first').tab('show')
    })
})
$('#17-tpl-trigger').click(function () {
    $('#loader17').html('正在加载').load('wxstyle/style.php?type=17', function () {
        $('#style17-pic a:first').tab('show')
    })
})
$('#18-tpl-trigger').click(function () {
    $('#loader18').html('正在加载').load('wxstyle/style.php?type=18', function () {
        $('#style18-pic a:first').tab('show')
    })
})
$('#19-tpl-trigger').click(function () {
    $('#loader19').html('正在加载').load('wxstyle/style.php?type=19', function () {
        $('#style19-pic a:first').tab('show')
    })
})
$('#20-tpl-trigger').click(function () {
    $('#loader20').html('正在加载').load('wxstyle/style.php?type=20', function () {
        $('#style20-pic a:first').tab('show')
    })
})
$('#21-tpl-trigger').click(function () {
    $('#loader21').html('正在加载').load('wxstyle/style.php?type=21', function () {
        $('#style21-pic a:first').tab('show')
    })
})
$('#31-tpl-trigger').click(function () {
    $('#loader31').html('正在加载').load('wxstyle/style.php?type=31', function () {
        $('#style31-pic a:first').tab('show')
    })
})
$('#32-tpl-trigger').click(function () {
    $('#loader32').html('正在加载').load('wxstyle/style.php?type=32', function () {
        $('#style32-pic a:first').tab('show')
    })
})
$('#33-tpl-trigger').click(function () {
    $('#loader33').html('正在加载').load('wxstyle/style.php?type=33', function () {
        $('#style33-pic a:first').tab('show')
    })
})
$('#34-tpl-trigger').click(function () {
    $('#loader34').html('正在加载').load('wxstyle/style.php?type=34', function () {
        $('#style34-pic a:first').tab('show')
    })
})
$('#35-tpl-trigger').click(function () {
    $('#loader35').html('正在加载').load('wxstyle/style.php?type=35', function () {
        $('#style35-pic a:first').tab('show')
    })
})
$('#36-tpl-trigger').click(function () {
    $('#loader36').html('正在加载').load('wxstyle/style.php?type=36', function () {
        $('#style36-pic a:first').tab('show')
    })
})
$('#37-tpl-trigger').click(function () {
    $('#loader37').html('正在加载').load('wxstyle/style.php?type=37', function () {
        $('#style37-pic a:first').tab('show')
    })
})
$('#title-tpl-trigger').click(function () {
    $('#loader2').html('正在加载').load('wxstyle/style.php?type=2', function () {
        $('#style-title a:first').tab('show')
    })
})
$('#41-tpl-trigger').click(function () {
    $('#loader41').html('正在加载').load('wxstyle/style.php?type=41', function () {
        $('#style41-pic a:first').tab('show')
    })
})
$('#42-tpl-trigger').click(function () {
    $('#loader42').html('正在加载').load('wxstyle/style.php?type=42', function () {
        $('#style41-pic a:first').tab('show')
    })
})
$('#43-tpl-trigger').click(function () {
    $('#loader43').html('正在加载').load('wxstyle/style.php?type=43', function () {
        $('#style41-pic a:first').tab('show')
    })
})
$('#51-tpl-trigger').click(function () {
	$('#loader51').html('正在加载').load('wxstyle/style.php?type=51', function () {
        $('#style51-pic a:first').tab('show')
    })
})
$('#52-tpl-trigger').click(function () {
	$('#loader52').html('正在加载').load('wxstyle/style.php?type=52', function () {
        $('#style52-pic a:first').tab('show')
    })
})
$('#53-tpl-trigger').click(function () {
	$('#loader53').html('正在加载').load('wxstyle/style.php?type=53', function () {
        $('#style53-pic a:first').tab('show')
    })
})
$('#54-tpl-trigger').click(function () {
	$('#loader54').html('正在加载').load('wxstyle/style.php?type=54', function () {
        $('#style54-pic a:first').tab('show')
    })
})
$('#55-tpl-trigger').click(function () {
	$('#loader55').html('正在加载').load('wxstyle/style.php?type=55', function () {
        $('#style55-pic a:first').tab('show')
    })
})
$('#56-tpl-trigger').click(function () {
	$('#loader56').html('正在加载').load('wxstyle/style.php?type=56', function () {
        $('#style56-pic a:first').tab('show')
    })
})
$('#57-tpl-trigger').click(function () {
	$('#loader57').html('正在加载').load('wxstyle/style.php?type=57', function () {
        $('#style57-pic a:first').tab('show')
    })
})
$('#58-tpl-trigger').click(function () {
	$('#loader58').html('正在加载').load('wxstyle/style.php?type=58', function () {
        $('#style58-pic a:first').tab('show')
    })
})
$('#59-tpl-trigger').click(function () {
	$('#loader59').html('正在加载').load('wxstyle/style.php?type=59', function () {
        $('#style59-pic a:first').tab('show')
    })
})
$('#60-tpl-trigger').click(function () {
	$('#loader60').html('正在加载').load('wxstyle/style.php?type=60', function () {
        $('#style60-pic a:first').tab('show')
    })
})
$('#61-tpl-trigger').click(function () {
	$('#loader61').html('正在加载').load('wxstyle/style.php?type=61', function () {
        $('#style61-pic a:first').tab('show')
    })
})
$('#62-tpl-trigger').click(function () {
	$('#loader62').html('正在加载').load('wxstyle/style.php?type=62', function () {
        $('#style62-pic a:first').tab('show')
    })
})
$('#63-tpl-trigger').click(function () {
	$('#loader63').html('正在加载').load('wxstyle/style.php?type=63', function () {
        $('#style63-pic a:first').tab('show')
    })
})
$('#64-tpl-trigger').click(function () {
	$('#loader64').html('正在加载').load('wxstyle/style.php?type=64', function () {
        $('#style64-pic a:first').tab('show')
    })
})
$('#65-tpl-trigger').click(function () {
	$('#loader65').html('正在加载').load('wxstyle/style.php?type=65', function () {
        $('#style65-pic a:first').tab('show')
    })
})
$('#66-tpl-trigger').click(function () {
	$('#loader66').html('正在加载').load('wxstyle/style.php?type=66', function () {
        $('#style66-pic a:first').tab('show')
    })
})
$('#67-tpl-trigger').click(function () {
	$('#loader67').html('正在加载').load('wxstyle/style.php?type=67', function () {
        $('#style67-pic a:first').tab('show')
    })
})
$('#68-tpl-trigger').click(function () {
	$('#loader68').html('正在加载').load('wxstyle/style.php?type=68', function () {
        $('#style68-pic a:first').tab('show')
    })
})
$('#71-tpl-trigger').click(function () {
	$('#loader71').html('正在加载').load('wxstyle/style.php?type=71', function () {
        $('#style71-pic a:first').tab('show')
    })
})
$('#72-tpl-trigger').click(function () {
	$('#loader72').html('正在加载').load('wxstyle/style.php?type=72', function () {
        $('#style72-pic a:first').tab('show')
    })
})
$('#69-tpl-trigger').click(function () {
	$('#loader69').html('正在加载').load('wxstyle/style.php?type=69', function () {
        $('#style69-pic a:first').tab('show')
    })
})
$('#70-tpl-trigger').click(function () {
	$('#loader70').html('正在加载').load('wxstyle/style.php?type=70', function () {
        $('#style70-pic a:first').tab('show')
    })
})
$('#zan-tpl-trigger').click(function () {
    $('#loader12').html('正在加载').load('wxstyle/style.php?type=12', function () {
        $('#style-zan a:first').tab('show')
    })
})
$('#video-tpl-trigger').click(function () {
    $('#loader10').html('正在加载').load('wxstyle/style.php?type=10', function () {
        $('#style-video a:first').tab('show')
    })
})
$('#90-tpl-trigger').click(function () {
    $('#loader90').html('正在加载').load('wxstyle/wdstyle.php?type=15', function () {
        $('#style90-pic a:first').tab('show')
    })
})
$('#91-tpl-trigger').click(function () {
    $('#loader91').html('正在加载').load('wxstyle/wdstyle.php?type=1', function () {
        $('#style91-pic a:first').tab('show')
    })
})
$('#92-tpl-trigger').click(function () {
    $('#loader92').html('正在加载').load('wxstyle/wdstyle.php?type=2', function () {
        $('#style92-pic a:first').tab('show')
    })
})
$('#93-tpl-trigger').click(function () {
    $('#loader93').html('正在加载').load('wxstyle/wdstyle.php?type=3', function () {
        $('#style93-pic a:first').tab('show')
    })
})
$('#94-tpl-trigger').click(function () {
    $('#loader94').html('正在加载').load('wxstyle/wdstyle.php?type=8', function () {
        $('#style94-pic a:first').tab('show')
    })
})
$('#95-tpl-trigger').click(function () {
    $('#loader95').html('正在加载').load('wxstyle/wdstyle.php?type=5', function () {
        $('#style95-pic a:first').tab('show')
    })
})
$('#96-tpl-trigger').click(function () {
    $('#loader96').html('正在加载').load('wxstyle/wdstyle.php?type=14', function () {
        $('#style96-pic a:first').tab('show')
    })
})
$('#97-tpl-trigger').click(function () {
    $('#loader97').html('正在加载').load('wxstyle/wdstyle.php?type=13', function () {
        $('#style97-pic a:first').tab('show')
    })
})
$('#98-tpl-trigger').click(function () {
    $('#loader98').html('正在加载').load('wxstyle/wdstyle.php?type=9', function () {
        $('#style98-pic a:first').tab('show')
    })
})
$('#99-tpl-trigger').click(function () {
    $('#loader99').html('正在加载').load('wxstyle/wdstyle.php?type=12', function () {
        $('#style99-pic a:first').tab('show')
    })
})
$('#100-tpl-trigger').click(function () {
    $('#loader100').html('正在加载').load('wxstyle/wdstyle.php?type=6', function () {
        $('#style100-pic a:first').tab('show')
    })
})
$('#101-tpl-trigger').click(function () {
    $('#loader101').html('正在加载').load('wxstyle/wdstyle.php?type=10', function () {
        $('#style101-pic a:first').tab('show')
    })
})
$('#guanzhu-tpl-trigger').click(function () {
    $('#loader1').html('正在加载').load('wxstyle/style.php?type=1', function () {
        $('#style-guanzhu a:first').tab('show')
    })
});
$('#tab-tpl-trigger').click(function () {
    if ($('#editor-tpls-list').html() == "") {
        $('#editor-tpls-list').html('正在加载').load('wxstyle/moban.php #tpl-tab-content', function () {
            $('#editor-tpls-list').find('.col-md-3').removeClass('col-md-3').addClass('col-md-6');
            $('#editor-tpls-navtab a:first').tab('show')
        })
    }
});
$("#phone").on('click', function () {
    $("#myModal").modal(options)
});
$("#savebox").on('click', function () {
    $("#myModal").modal(options)
});
$("#phones").on('click', function () {
    alert("高级VIP用户才能保存编辑，请进入微信管理--系统设置，自助开通付费用户，获得权限！")
});
$('#reguser').on('click', function () {
    $('#userregModal').modal('show')
	
});
$('#reguser2').on('click', function () {
	 $('#usersignupModal').modal('hide');
    $('#userregModal').modal('show')
	
});

$('#zhuce').on('click', function () {
    $('#usersignupModal').modal('show')
	
});

$('#reguserout').on('click', function () {
    $('#reguserout').css('display', 'none');
    $('#reguser').css('display', 'block');
	$(".copy-wx-html").css("display", "none");
	$("#shopping").css("display", "block");
	$('.span8').css('display', 'block');
		$('.span9').css('display', 'none');
});
$('#closereg').on('click', function () {
    $('#loginModal').modal('show');
    $('#userregModal').modal('hide')
});
$('#usersignup').on('click', function () {
				   
    $('#usersignupModal').modal('show');
    $('#userregModal').modal('hide')
});

$('#ewm').on('click', function () {
    if (!getCookie("user")) {
        window.layermsg("必需登录后才可以使用二维码美化工具！");
        return !1
    }
});
$('#bqzz').on('click', function () {
    if (!getCookie("user")) {
        window.layermsg("必需登录后才可以使用表情制作工具！");
        return !1
    }
    $('#bqzzModal').modal('show')
});
$('#fmzz').on('click', function () {
    if (!getCookie("user")) {
        window.layermsg("必需登录后才可以使用封面制作工具！");
        return !1
    }
    $('#fmzzModal').modal('show')
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 3600 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
        }
    }
    return ""
}

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("欢迎 " + user + " 再次访问")
    } else {
        user = prompt("请输入你的名字:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 1)
        }
    }
}

var isClick = true;
$('#mylogin').on('click', function () {
  if(isClick) {
  isClick = false;								
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
	var username = username.replace(/^\s+|\s+$/g, "");
    if (username == "") {
        alert("请输入用户名！")
        return false
    } else if (password == "") {
        alert("请输入密码！")
        return false
    }
    $.ajax({
        url: "login.php",
        type: "post",
        dataType: "TEXT",
        data: {
            username: username,
            password: password
        },
        success: function (data) {
            if (data == 1) {
                window.layermsg("登录成功！");
                $('#userregModal').modal('hide');
              $('#zhuce').css('display', 'none');
                $('#reguserout').css('display', 'block');
                $('#reguser').css('display', 'none');
				 $('.span8').css('display', 'none');
		      $('.span9').css('display', 'block');
				if (getCookie("ver")=="v3") {$(".copy-wx-html").css("display", "block");$("#shopping").css("display", "none")}
            } else if (data == 2) {
                window.layermsg("账号不存在！")
            } else if (data == 3) {
                window.layermsg("密码错误！")
            } else if (data == 4) {
				
layer.confirm('您的账号已经到期，续费后联系客服开通即可！', {
  btn: ['续费','关闭'] //按钮
}, function(){
   window.open("https://item.taobao.com/item.htm?spm=a1z10.1-c.w4004-3009900515.8.2a941a73c2zd7z&id=611555530118");
}, function(){
  // window.open("//editor.fzn.cc/download.html");
});					


				
				
            } else if (data == 5) {
				
layer.confirm('您的账号还未开通，请购买后联系客服开通即可！', {
  btn: ['购买会员','下载试用'] //按钮
}, function(){
   window.open("https://item.taobao.com/item.htm?spm=a1z10.1-c.w4004-3009900515.8.2a941a73c2zd7z&id=611535214280");
}, function(){
   window.open("https://www.fzneditor.com/download.html");//微信大学编辑器
});	

			   
			   
            }
        },
        error: function () {
            alert("您的网络有点小问题")
        }
    })
	setTimeout(function() {
			isClick = true;
		}, 3000);
  }else{
	  window.layermsg("你操作过快，请稍后再试！");
  }	
});
$('#myreguser').on('click', function () {
  if(isClick) {
  isClick = false;											  
    var username = document.getElementById("regusername").value;
    var password1 = document.getElementById("regpassword1").value;
	var reguseremail = document.getElementById("reguseremail").value;
    var password2 = document.getElementById("regpassword2").value;
    var patrn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
   
    if (regusername == "") {
        alert("请输入用户名！");
        return false
    } else if (regpassword1 == "" || regpassword2 == "") {
        alert("请输入密码！");
        return false
    } else if (password1 !==password2) {
        alert("两个密码不一致！");
        return false
    } else if (reguseremail == "") {
        alert("请输入邮箱！");
        return false
    } else if (reguseremail.indexOf("@") < 1 || reguseremail.indexOf(".") < 2 || reguseremail.indexOf(".") < reguseremail.indexOf("@")) {
        alert("请输入正错的邮箱格式！");
        return false
    } 
    $.ajax({
        url: "register.php",
        type: "post",
        dataType: "TEXT",
        data: {
            username: username,
            password: password1,
			useremail:reguseremail
        },
        success: function (data) {
            if (data == 1) {
                window.layermsg("注册并登录成功，您可以开始试用了！");
				$('#usersignupModal').modal('hide');
				 $('#reguserout').css('display', 'block');
                $('#reguser').css('display', 'none');
    $('#zhuce').css('display', 'none')
   //window.location.reload();
   
               // $('#userregModal').modal('hide');
             
               // $('#reguserout').css('display', 'block');
                //$('#reguser').css('display', 'none')
            } else if (data == 0) {
                window.layermsg("账号已经存在！")
            } else if (data == 2) {
                window.layermsg("邮箱已经被使用了！")
            } else if (data == 4) {
                window.layermsg("账号未开通或已到期，请续费后联系客服！")
				
				setTimeout(function () {
                   window.open("https://item.taobao.com/item.htm?spm=a1z10.1-c.w4004-3009900515.8.2a941a73c2zd7z&id=611555530118");
                }, 3000);
				
            } else if (data == 5) {
                window.layermsg("你购买的版本不支持！")
            } else if (data == 6) {
                window.layermsg("注册成功！");
            }
        },
        error: function () {
            window.layermsg("您的网络有点小问题")
        }
    })
	setTimeout(function() {
			isClick = true;
		}, 3000);
  }else{
	  window.layermsg("你操作过快，请稍后再试！");
  }		
});

$('#reguserout').on('click', function () {
    $.ajax({
        url: "logout.php",
        type: "post",
        dataType: "TEXT",
        data: {},
        success: function (data) {
            window.layermsg("已经退出！")
        },
        error: function () {
            window.layermsg("您的网络有点小问题")
        }
    })
});
$('#html-see').click(function () {
	clean_v3helper();
		var temp_Content = current_editor.getContent();
		temp_Content = temp_Content.replace(/http:\/\/images.fzn.cc\/img.php\?url\=/g, '');
		temp_Content = temp_Content.replace(/http:\/\/editor.fzn.cc\/img.php\?url\=/g, '');
		temp_Content = temp_Content.replace(/mp.fzneditor.com/g, 'mmbiz.qpic.cn');
		temp_Content = temp_Content.replace(/mmbiz.qlogo.cn/g, 'mmbiz.qpic.cn');
		temp_Content = temp_Content.replace(/http:\/\/mmbiz.qpic.cn/g, 'https://mmbiz.qpic.cn');
		temp_Content = temp_Content.replace(/\(https:\/\/mmbiz.qpic.cn/g, '(https://'+domain +'/img.php?url=https://mmbiz.qpic.cn');
		temp_Content = temp_Content.replace(/\(&quot;https:\/\/mmbiz.qpic.cn/g, '(&quot;https://'+domain +'/img.php?url=https://mmbiz.qpic.cn');
		temp_Content = temp_Content.replace(/src\="/g, 'src="/img.php?url=');
		temp_Content = temp_Content.replace(/\d{1,10}px\=\"\"/g, '');
		temp_Content = temp_Content.replace(/:\=/g, '=');

		
		temp_Content = '<section class="fzneditor" style="box-sizing: border-box;padding:0 10px;">'+temp_Content+'</section>';
		$("#previews").html(temp_Content);
    var uid = getCookie('user');
    var base = new Base64();
    var id = base.encode(uid);
	var rarandomid = Math.floor(Math.random()*1000000);
    var bigimg = "https://" + domain + "/qr.php?url=https://" + domain + "/upload/" + id + ".php?id="+rarandomid+"&level=L&size=160";
	if (getCookie("ver")=="v1" || getCookie("user")=="729392912") {
        bigimg = "https://" + domain + "/qr.php?url=https://mp.weixin.qq.com/s/Wk663Ui8EQY8Y_6KCoE1Lw&level=L&size=160";
    }
    $("#ewmimg").attr("src", bigimg);
    $('#fzneditor-url').html("https://" + domain + "/upload/" + id + ".php?id="+rarandomid);
    var editordata = UE.getEditor('editor').getContent();
	editordata = editordata.replace(/https:\/\/mp.fzneditor.com/g, 'http://mp.fzneditor.com');
    $.post("upload/yulan.php", {
        previewid: id,
        code: editordata,
		rarandomid:rarandomid
    });		
	
});
$('#51weixincaiji').on('click', function () {
    var caijiurl = document.getElementById("caijiurl").value;
    if (caijiurl == "") {
        window.layermsg("请输入要采集的微信文章网址！")
        return false
    } else {
        isout = "false";
        $('#form5').submit()
    }
});




$('#savewx').on('click', function () {
		 if (!getCookie("user")) {
        window.layermsg("登录后才可以保存草稿！");
        return !1
    }							   
		 isout="false";
	     var wxtitle=document.getElementById("wxtitle1").value;
        document.getElementById('savecontent1').value=document.getElementById("tbcov").innerHTML;
         var savecontent=document.getElementById('savecontent1').value;
	     if(wxtitle=="")
	     {
		     alert("请输入微信标题！")
		     return false;
	     }
         if(savecontent==""){
		     alert("请输入微信内容！")
		     return false;
	     }else{
			 
			$.ajax({
            url: "admin/bccg.php",
            type: "post",
            data: {
                 wxtitle: wxtitle,
                doing: "tongbu"
            },
            success: function (data) {
			//alert("成功");
			// window.layermsg("保存成功")
			if(data==2){
				if(confirm("已经存在相当标题文章，确定要替换吗？")){
					$('#form8').submit();window.layermsg("替换成功");
					}else{ return false; }
																					  
			}else if(data==1){
				$('#form8').submit();window.layermsg("保存成功");
				
				}
																																				  
			},
            error: function () {
                alert("您的网络有点小问题")
            }
          })
			 
       }
       
   });
document.getElementById("savewx").addEventListener("click", displayData);

function displayData() {
    	setTimeout(function(){
			$('#mb-list').html('正在加载').load('wxstyle/cgstyle.php',function(){
				$('#style-mb a:first').tab('show');	
			 })}, 1000);
				
	
};





function Base64() {
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    this.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64
            } else if (isNaN(chr3)) {
                enc4 = 64
            }
            output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4)
        }
        return output
    }
    this.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2)
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3)
            }
        }
        output = _utf8_decode(output);
        return output
    }
    _utf8_encode = function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c)
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128)
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128)
            }
        }
        return utftext
    }
    _utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3
            }
        }
        return string
    }
}

(function ($) {
    $('#toggle-search').click(function () {
        $('#search-form, #toggle-search').toggleClass('open');
        return false
    });
    $('#search-form input[type=text]').click(function () {
        $('#search-form, #toggle-search').removeClass('open');
        return true
    });
    $(document).click(function (event) {
        var target = $(event.target);
		//console.log(uid);
        if (!target.is('#toggle-search') && !target.closest('#search-form').size()) {
            $('#search-form, #toggle-search').removeClass('open')
        }
    })
})(jQuery);
document.getElementById("caijiurl").onclick = (function () {
    document.getElementById("caijiurl").select()
});

function geturl(url) {	
if (!getCookie("user") || getCookie("user")=="v1fzneditor") {
        window.layermsg("精简版/试用版不支持该功能！");
        return !1
    }	
layer.open({
      type: 2,
      title: '非找你微信编辑器功能窗口，点右侧关闭可返回编辑器。',
      shadeClose: true,
      shade: [0.8, '#393D49'],
      maxmin: true, //开启最大化最小化按钮
      area:['95%','95%'],
      content: url
    });									
										
};

function getsucai(url) {										
layer.open({
      type: 2,
      title: '点击💗收藏喜欢的样式模板，系统自动添加到编辑器左侧素材分类里。你也可以独立页面打开<a href = "http://editor.fzn.cc/muban" target="_blank">模板库</a>,<a href = "http://xpuzi.com" target="_blank">模块库</a>再收藏使用。',
      shadeClose: true,
      shade: [0.8, '#393D49'],
      maxmin: true, //开启最大化最小化按钮
      area:['95%','95%'],
      content: url
    });									
										
};


$(".span5").click(function () {

    $('#usersignupModal').modal('show');
    $('#userregModal').modal('hide')
});	


//自动保存

var time=600000;// 获取到input里面的值
//time = $.trim(time);
//time=time*60;
//console.log(document.visibilityState);
var temp = "";
    var timer=setInterval(changeTime,time);// 定时器

function changeTime() {
		
  if (!getCookie("user") || getCookie("ver")=="v1") {return !1}
  
    
    var editor_Content = editor.getContent();
	var v = editor_Content.length;
		if (editor_Content=="") {
        showSuccessMessage("编辑区无内容！");
        return !1
    }
  if(temp != v){
	temp = v;	
//console.log(shijian);
        $.ajax({
			async: false,    
            url: "admin/autosave.php",
            type: "post",
            data: {
                 content: editor_Content,
                doing: "tongbu"
            },
            success: function (data) {
			//alert("成功");
			// window.layermsg("自动保存成功")
			if(data==1){showSuccessMessage("自动保存成功！");}else{showSuccessMessage("自动保存出了点小问题，请注意手动保存！")}
            },
            error: function () {
                window.layermsg("您的网络有点小问题")
            }
        })
  }else{
   return !1;
  }	
}

//自动保存结束

$(document).on('click','.editoras',function(){
	num =$(this).attr('num');
        
  	    $.ajax({

				url:"admin/editoras.php",

				type : "post",

				//dataType:"json",  

				data: {id: num},

				success : function(data){
					//console.log(data);
			    	window.layermsg("草稿已打开");
					current_editor.setContent(data);
					 //UE.getEditor('editor').setContent(data.data);
					
				},
				error:function(){
					alert("您的网络有点小问题");
				}

		});

    });
//截图
$(function(){
      $("#jietu").click(function(){
		if (getCookie("user") == "v1fzneditor" || !getCookie("user")) {
        window.layermsg("登录后才可以生成长图！");
        return !1
    }
			scale = 5;						 
     window.layermsg("图片生成中，请稍等...");
       domtoimage.toBlob(document.getElementById('previews'))
          .then(function (blob) {
			  window.layermsg("图片已生成");
              window.saveAs(blob, 'fzneditor.png');
          });

       });    
});