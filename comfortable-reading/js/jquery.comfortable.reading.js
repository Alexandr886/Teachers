(function ($) {
    var methods = {
        init: function (options, initLink) {
            console.log('============> init');
            console.log('-> options: ', options);
            console.log('-> initLink: ', initLink);

            $.cookie.json = true;

            lastSettings = $.cookie('sver-last-options') || {};
            var settings = $.extend({
                'base-style'        : '',
                'default-background': '#fff',
                'default-text-color': '#000',
                'back-link-text'    : 'Обычная версия',
                'container'         : 'body'
            }, lastSettings, options);

            $.cookie('sver-last-options', settings, {path: '/'});

            if (settings['base-style']) {
                $("head").append($("<link rel='stylesheet' id='special-version-base-style' href='" + settings['base-style'] + "' type='text/css' media='screen' />"));
            }

            container = $('<div id="special-version-container"></div>');
            $(settings['container']).children().each(function () {
                $(this).appendTo(container);
            });
            $(settings['container']).html('').append(container);


            $.fn.specialVersion('changeParams', settings['default-text-size'], settings['default-text-color'], settings['default-background']);

            $('<div id="special-version-controls"></div>').prependTo('body');
            $('<div id="crfont-style">Размер шрифта: <a href="#" a-font-size="16" style="font-size:16px">A</a><a href="#" a-font-size="20" style="font-size:20px">A</a><a href="#" a-font-size="24" style="font-size:24px">A</a><a href="#" a-font-size="28" style="font-size:28px">A</a></div>').appendTo('#special-version-controls');
            $('<div>Цветовая схема: <a href="#" a-bg-color="#fff" a-color="#000" style="background-color:#fff;color:#000">A</a><a href="#" a-bg-color="#000" a-color="#fff" style="background-color:#000;color:#fff">A</a><a href="#" a-bg-color="#9DD1FF" a-color="#063462" style="background-color:#9DD1FF;color:#063462">A</a></div>').appendTo('#special-version-controls');


            $('#special-version-controls a').click(function (event) {
                event.preventDefault();
                size    = $(this).attr('a-font-size')   || false;
                color   = $(this).attr('a-color')       || false;
                bgColor = $(this).attr('a-bg-color')    || false;

                $.fn.specialVersion('changeParams', size, color, bgColor);
            });

            initLink.hide();

            backLink = $(initLink).clone().appendTo('#special-version-controls');
            backLink.text(settings['back-link-text']).show();
            backLink.click(function (event) {
                event.preventDefault();
                $.fn.specialVersion('return', backLink, initLink);
            });

            // add class for body
            $('body').removeClass(function (index, className) {
                return (className.match(/(^|\s)ovz270721_version_size-\S+/g) || []).join(' ');
            });

            $('body').addClass('ovz270721_version_size-' + $.cookie('sver-last-options')['default-text-size']);

            $('body').removeClass(function (index, className) {
                return (className.match(/(^|\s)ovz270721_version_bgc-\S+/g) || []).join(' ');
            });

            var bgc = $.cookie('sver-last-options')['default-background'].replace('#', '')

            $('body').addClass('ovz270721_version_bgc-' + bgc);

            $('body').addClass( 'ovz270721_version' );
        },

        bind: function (options) {
            console.log('============> bind');
            console.log('-> options: ', options);

            this.click(function (event) {
                event.preventDefault();
                initLink = $(this);
                $.cookie('sver-initLinkId', initLink.attr('id'), {path: '/'});

                return methods.init(options, initLink);
            });
        },

        return: function (backLink, initLink, retry) {
            retry = retry ?? 0;
            console.log('============> return*****************************************');
            console.log('-> backLink: ', backLink);
            console.log('-> initLink: ', initLink);
            console.log('-> retry: ', retry);

            // remove class
            $('body').removeClass(function (index, className) {
                return (className.match(/(^|\s)ovz270721_version_size-\S+/g) || []).join(' ');
            });

            //
            $('#special-version-container').children().each(function () {
                $(this).insertBefore($('#special-version-container'))
            });

            $('#special-version-container').remove();
            $('#special-version-base-style').remove();
            $('#special-version-controls').remove();
            $('*').each(function () {
                if ($(this).attr('original-font-size'))
                    $(this).css('font-size', $(this).attr('original-font-size'));
                if ($(this).attr('original-line-height'))
                    $(this).css('line-height', $(this).attr('original-line-height'));

                $(this).css('background-color', $(this).attr('original-bg-color'));
                $(this).css('color', $(this).attr('original-text-color'));
            });

            backLink.remove();
            initLink.show();

            $.cookie.json = false;
            $.removeCookie('sver-size', {path: '/'});
            $.removeCookie('sver-color', {path: '/'});
            $.removeCookie('sver-bgColor', {path: '/'});
            $.removeCookie('sver-initLinkId', {path: '/'});
            $.removeCookie('sver-last-options', {path: '/'});

            // if (retry > 3) {

                setTimeout( () => {
                    window.location.reload();
                },500 );
                
            $('body').css('opacity', 0);
            // }
            // else {
            //     retry++
            //     $.fn.specialVersion('return', backLink, initLink, retry);
            // }
        },
        changeParams: function (size, color, bgColor) {
            console.log('============> changeParams');
            console.log('-> size: ', size);
            console.log('-> color: ', color);
            console.log('-> bgColor: ', bgColor);

            if (size)       $.cookie('sver-size', size, {path: '/'});
            if (color)      $.cookie('sver-color', color, {path: '/'});
            if (bgColor)    $.cookie('sver-bgColor', bgColor, {path: '/'});

            $('#special-version-container *').each(function () {
                if (!$(this).attr('original-font-size')) $(this).attr('original-font-size', $(this).css('font-size'));
                if (!$(this).attr('original-line-height')) $(this).attr('original-line-height', $(this).css('line-height'));
            });

            $('*').each(function () {
                if (!$(this).attr('original-bg-color')) $(this).attr('original-bg-color', $(this).css('background-color'));
                if (!$(this).attr('original-text-color')) $(this).attr('original-text-color', $(this).css('color'));
            });

            if (size) {
                $('#special-version-container *').each(function () {
                    if ($(this).css('font-weight') == 'bold')
                        $(this).css({
                            'font-size': (Math.round(size * 1.2)) + 'px',
                            'line-height': Math.round(size * 1.4) + 'px'
                        });
                    else
                        $(this).css({'font-size': size + 'px', 'line-height': Math.round(size * 1.4) + 'px'});
                });
            }

            if (color) {
                $('*').not('#special-version-controls,#special-version-controls *').each(function () {
                    $(this).css({'color': color});
                });
            }

            if (bgColor) {
                $('*').not('#special-version-controls,#special-version-controls *').each(function () {
                    $(this).css({'background-color': bgColor});
                });
            }

            // add class for body
            $('body').removeClass(function (index, className) {
                return (className.match(/(^|\s)ovz270721_version_size-\S+/g) || []).join(' ');
            });

            $('body').addClass('ovz270721_version_size-' + $.cookie('sver-size'));

            var bgc = '';

            if (bgColor) {
                $('body').removeClass(function (index, className) {
                    return (className.match(/(^|\s)ovz270721_version_bgc-\S+/g) || []).join(' ');
                });

                bgc = bgColor.replace('#', '');
                $('body').addClass('ovz270721_version_bgc-' + bgc);
            }

            // mx change slider bg
            setTimeout(function () {
                $('.hm-slide-holder').css('background-color', 'transparent');
                $('.hm-slide-content').css('background-color', 'transparent');
                $('.hm-slider-details').css('background-color', 'transparent');
            }, 2000);

            if (typeof backLink !== 'undefined' && typeof size === 'undefined') {
                $.fn.specialVersion('return', backLink, initLink, 4);
            }
        },

        newMethod: function () {
            console.log('============> newMethod');

        }
    };

    $.fn.specialVersion = function (method) {
        console.log('************> $.fn.specialVersion');
        console.log('-> arguments', arguments);

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.bind.apply(this, arguments);
        } else {
            $.error('Method named ' + method + ' exists for jQuery.specialVersion');
        }
    };
})(jQuery);

jQuery(document).ready(function ($) {
    if ($.cookie('sver-initLinkId') && ($.cookie('sver-size') || $.cookie('sver-color') || $.cookie('sver-bgColor'))) {
        $.fn.specialVersion('init', {
            'default-background': $.cookie('sver-bgColor'),
            'default-text-color': $.cookie('sver-color'),
            'default-text-size': $.cookie('sver-size')
        }, $('#' + $.cookie('sver-initLinkId')));
    };
});

jQuery(document).ready(function () {
   jQuery('#cr_version_link').specialVersion({'base-style': '/add/comfortable-reading/css/styles.css'});
});