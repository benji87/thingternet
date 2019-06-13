$('.nav__item__link').on('mouseenter', function() {
   var selectedItem = $(this);
   $(selectedItem).addClass('nav__item__link--current');
   $(selectedItem).parent().find('.sub-nav').show();
});

$('.nav__item').on('mouseleave', function() {
    var selectedItem = $(this);
    $('.nav__item__link').removeClass('nav__item__link--current');
    $(selectedItem).parent().find('.sub-nav').hide();
});

$('.mobile-nav').on('click', function() {
   $('.nav').toggleClass('nav--show').addClass('animated slideInRight');
});