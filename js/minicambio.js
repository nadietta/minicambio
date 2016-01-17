/**
 * Created by Nadia on 17/01/2016.
 */

$(document).ready(function() {

    $(function() {
        $(window).on('resize', function resize()  {
            $(window).off('resize', resize);
            setTimeout(function () {
                var content = $('.centered');
                var top = (window.innerHeight - content.height()) / 2;
                content.css('top', Math.max(0, top) + 'px');
                $(window).on('resize', resize);
            }, 50);
        }).resize();
    });

    $.ajax({
        url: 'menu.php'
    }).done(function(data){
        $('#menu').append(data);
    });

});
