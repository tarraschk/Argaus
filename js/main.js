var bgfixed = $('#bg-fixed');
var menu = $('#menu');
var menuButtons = menu.find('li a');
var content = $('#content');

function switchMode() {
        if(menu.hasClass('top')) {
            menu.removeClass('top');
            content.removeClass('top');
        } else {
            menu.addClass('top');
            content.addClass('top');
        }
}

$(document).load(function() {
});
$(document).ready(function() {
    menu.on('click', '.invert', function () {
        switchMode();
    });
    bgfixed.on('mouseover', '#bg-logo', function () {
        switchMode();
        menuButtons.first().addClass('active');
    });
    menu.on('click', 'a', function () {
        menuButtons.removeClass('active');
        $(this).addClass('active');
    });
});