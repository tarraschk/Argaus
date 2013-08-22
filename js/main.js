var bgfixed = $('#bg-fixed');
var menu = $('#menu');
var menuButtons = $('#menu ul.nav li');
var menuCollapsible = $('.navbar-collapse');
var content = $('#content');
var ghost = $('#bg-ghost-area');


$(document).load(function() {
});
$(document).ready(function() {
    $(window).scroll(function() {
         if ($(window).scrollTop() > $(window).height() - 50) {
            menu.addClass('top');
            if(menuButtons.parent().find(".active").size() === 0)
                menuButtons.first().addClass('active');
         }
         else {
            menu.removeClass('top');
            menuButtons.removeClass('active');
         }
    });
$('#menu a').click(function(){
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top - 50
    }, 800);
    menuCollapsible.collapse('hide');
    return false;
});
});
