/**
 * ���÷����� $('#more').more({'url':'data.php'});
 * amount   ÿ����ʾ��¼��
 * address  ����ĵ�ַ
 * format   �������ݵĸ�ʽ
 * template html��¼DIV��class����
 * trigger  �������ظ����¼��class����
 * scroll   �Ƿ�֧�ֹ�����������
 * offset   ������������ʱ��ƫ����
 * data     �Զ������
 * loading  ����ʱ��ʾ
 */
(function($) {
    var target = null;
    var template = null;
    var lock = false;
    var cur_last = 0;
    var variables = {
        'last' : 0
    }
    var settings = {
        'amount'   : '10',
        'address'  : 'comments.php',
        'format'   : 'json',
        'template' : '.single_item',
        'trigger'  : '.get_more',
        'scroll'   : 'false',
        'offset'   : '100',
        'data'     : {},
        'loading'  : '������...'
    }
    var methods = {
        init: function(options) {
            return this.each(function() {
                if (options) {
                    $.extend(settings, options);
                }
                template = $(this).children(settings.template).wrap('<div/>').parent();
                template.css('display', 'none');
                $(this).append('<div class="loading">' + settings.loading + '</div>');
                template.remove();
                target = $(this);
                if (settings.scroll == 'false') {
                    $(this).find(settings.trigger).bind('click.more', methods.get_data);
                    $(this).more('get_data');
                } else {
                    if ($(this).height() <= $(this).attr('scrollHeight')) {
                        target.more('get_data', settings.amount * 2);
                    }
                    $(this).bind('scroll.more', methods.check_scroll);
                }
            })
        },
        check_scroll: function() {
            if ((target.scrollTop() + target.height() + parseInt(settings.offset)) >= target.attr('scrollHeight') && lock == false) {
                target.more('get_data');
            }
        },
        debug: function() {
            var debug_string = '';
            $.each(variables, function(k, v) {
                debug_string += k + ' : ' + v + '\n';
            })
            alert(debug_string);
        },
        remove: function() {
            target.children(settings.trigger).unbind('.more');
            target.unbind('.more')
            target.children(settings.trigger).remove();

        },
        add_elements: function(data) {
            var root = target
            var counter = 0;
            if (data) {
                $(data).each(function() {
                    counter++
                    var t = template
                    $.each(this, function(key, value) {
                        if (t.find('.' + key)) t.find('.' + key).html(value);
                    })
                    if (settings.scroll == 'true') {
                        root.children('.loading').before(t.html())
                    } else {
                        root.children(settings.trigger).before(t.html())
                    }
                    root.children(settings.template + ':last').attr('id', 'more_element_' + ((variables.last++) + 1));
                })

            } else methods.remove()
            // target.children('.loading').css('display', 'none');
            if (counter < settings.amount){
                methods.remove();
                target.children('.loading').html("�Ѿ�������");
            }
        },
        get_data: function() {
            var ile;
            lock = true;
            target.children(".loading").css('display', 'block');
            $(settings.trigger).css('display', 'none');
            if (typeof(arguments[0]) == 'number') {
                ile = arguments[0];
            } else {
                ile = settings.amount;
            }
            if(variables.last >= cur_last) {
                var postdata = settings.data;
                postdata['last'] = variables.last;
                postdata['amount'] = ile;
                $.post(settings.address, postdata, function(data){
                    $(settings.trigger).css('display', 'block')
                    methods.add_elements(data)
                    lock = false;
                }, settings.format);
                cur_last = cur_last + 10;
            }
        }
    };
    $.fn.more = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method == 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else $.error('Method ' + method + ' does not exist!');
    }
    $(document).ready(function() {
        $(window).on('scroll', function() {
            if ($(document).scrollTop() + $(window).height() > $(document).height() - 10) {
                $('.get_more').click();
            }
        });
    });
})(jQuery)