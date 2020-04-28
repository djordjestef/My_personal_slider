(function ($) {

    $.fn.my_personal_slider = function (options) {

        var default_settings = {
            dotsPosition: 'inside',
            dotsText: false,
            side_btn: false
        };

        var settings = $.extend(default_settings, options);

        if (settings.dotsPosition != 'outside' && settings.dotsPosition != 'inside') {
            settings.dotsPosition = 'outside';
        }

        this.addClass('.my_personal_slider')
        var main_children = this.children();
        var chld_num = 1;
        main_children.each(function () {
            $(this).addClass('slides');
            $(this).addClass('slide_' + chld_num);
            chld_num++;
        });

        if (settings.dotColor) {
            var style = $('<style>ul li.dot { background-color: ' + settings.dotColor + '; }</style>');
            $('head').append(style);
        }

        if (settings.dotColorActive) {
            var style = $('<style>ul li.dot.active { background-color: ' + settings.dotColorActive + '; }</style>');
            $('head').append(style);
        }

        var inner_content = this.html();
        this.html('<div class="slider_content"></div><div class="dots_content ' + settings.dotsPosition + '"></div><div class="a_left"></div><div class="a_right"></div>');
        this.find('.slider_content').html(inner_content)

        var dots = '<ul>';
        for (var i = 0; i < main_children.length; i++) {
            var dotsText = '';
            var dotClass = 'dot';
            if (settings.dotsText) {
                dotsText = this.find('.slider_content').find('.slide_' + (i + 1)).attr('dot-name');
                dotClass = '';
            }

            dots += '<li class= "' + dotClass + ' dot_' + (i + 1) + '" data-id="' + (i + 1) + '">' + dotsText + '</li>';
        }
        
        dots += '</ul>';
        this.find('.dots_content').html(dots);

        if (settings.side_btn == true) {
            var arrow_left = '<a>&#8249;';
            this.find('.a_left').html(arrow_left)
            arrow_left += '</a>';

            var arrow_right = '<a>&#8250;';
            arrow_right += '</a>';
            this.find('.a_right').html(arrow_right);

            this.find('.a_left').find('a').click(function () {
                var active_slide = $(this).parent().parent().find('.dots_content').find('li.active').attr('data-id');
                var total_slides = $(this).parent().parent().find('.dots_content').find('li').length;
                console.log(active_slide);
                console.log(total_slides);

                if (active_slide == 1) {
                    $(this).parent().parent().find('.dots_content').find('li.active').removeClass('active');
                    $(this).parent().parent().find('.dots_content').find('li:last-of-type').addClass('active');
                    $(this).parent().parent().find('.slider_content').find('.slides:last-of-type').addClass('higher_z').animate({ left: '0' }, 1200);
                }

                else {
                    $(this).parent().parent().find('.dots_content').find('li.active').removeClass('active').prev().addClass('active');
                    $(this).parent().parent().find('.slider_content').find('.slides:not(.slide_' + active_slide + ')').removeClass('higher_z').addClass('lower_z');
                    $(this).parent().parent().find('.slider_content').find('.slides:not(.slide_' + active_slide + ')').css({ 'left': 'auto', 'right': '-100%' });
                    $(this).parent().parent().find('.slider_content').find('.slide_' + active_slide).removeClass('higher_z').prev().addClass('higher_z').animate({ right: '0' }, 1200)
                }
            })

            this.find('.a_right').find('a').click(function () {
                var active_slide = $(this).parent().parent().find('.dots_content').find('li.active').attr('data-id');
                var total_slides = $(this).parent().parent().find('.dots_content').find('li').length;
                console.log(active_slide);
                console.log(total_slides);

                if (active_slide == total_slides) {
                    $(this).parent().parent().find('.dots_content').find('li.active').removeClass('active');
                    $(this).parent().parent().find('.dots_content').find('li:first-of-type').addClass('active');
                    $(this).parent().parent().find('.slider_content').find('.slides:last-of-type').removeClass('higher_z');
                    $(this).parent().parent().find('.slider_content').find('.slides:last-of-type').prev().removeAttr('style');
                    $(this).parent().parent().find('.slider_content').find('.slide_1').addClass('higher_z').animate({ left: '0' }, 1200);
                }

                else {
                    $(this).parent().parent().find('.dots_content').find('li.active').removeClass('active').next().addClass('active');
                    $(this).parent().parent().find('.slider_content').find('.slides:not(.slide_' + active_slide + ')').removeClass('higher_z').addClass('lower_z');
                    $(this).parent().parent().find('.slider_content').find('.slides:not(.slide_' + active_slide + ')').removeAttr('style');
                    $(this).parent().parent().find('.slider_content').find('.slide_' + active_slide).removeClass('higher_z').next().addClass('higher_z').animate({ left: '0' }, 1200)
                }
            })
        }

        this.find('.dots_content').find('li').click(function () {
            var id = $(this).attr('data-id');

            $('li.active:not(.dot_' + id + ')').removeClass('active')
            $(this).addClass('active');

            $(this).parent().parent().parent().find('.slider_content').find('.slides:not(.slide_' + id + ')').removeClass('higher_z').addClass('lower_z');
            $(this).parent().parent().parent().find('.slider_content').find('.slide_' + id).addClass('higher_z').animate({ left: 0 }, 1200, function () {
                $(this).parent().parent().parent().find('.slider_content').find('.slides:not(.slide_' + id + ')').removeAttr('style');
            });
        })

        this.find('.dots_content').find('li:first').addClass('active');
        this.find('.slider_content').find('.slides:first').css('left', '0');
    }

}(jQuery));

$(document).ready(function () {
    var slider_settings = {
        dotColor: '#2c94ff',
        dotsPosition: 'outside',
        dotsText: false,
        side_btn: true
    };

    $('#my_slider').my_personal_slider(slider_settings);
})
