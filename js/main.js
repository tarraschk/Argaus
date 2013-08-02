var bgfixed = $('#bg-fixed');
var menu = $('#menu');
var menuButtons = menu.find('li a');
var content = $('#content');
var ghost = $('#bg-ghost-area');


$(document).load(function() {
});
$(document).ready(function() {
    $(window).scroll(function() {
         if ($(window).scrollTop() > $(window).height() - 50) {
            menu.addClass('top');
         }
         else {
            menu.removeClass('top');
         }
    });
$('a').click(function(){
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top - 50
    }, 800);
    return false;
});
});
