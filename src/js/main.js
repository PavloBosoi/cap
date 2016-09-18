$(function () {
    var ScreenWidth = $(window).width(),
        ScreenHeight = $(window).height();

    //обработка тачей
    if (isTouch()) {
        $('html').addClass('touch');
    }
    else{
        $('html').addClass('no-touch');
    }
    function isTouch() {
        try {
            document.createEvent("TouchEvent");
            return true;
        }
        catch (e) {
            return false;
        }
    }

    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $(".js-header").addClass('header-scroll');
        }
        else {
            $(".js-header").removeClass('header-scroll'); 
        }
    });

    //подпрыгивание блока при навидении
    $('.js-jumps').hover(function(){
            $(this).animate({ top: '-=10px' }, 500, 'easeOutElastic');
        },
        function(){
            $(this).animate({ top: '+=10px' }, 500, 'easeOutElastic');
        }
    );

    //скрол шапки
/*    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $(".header-top").addClass('scroll-top');
        }
        else {
            $(".header-top").removeClass('scroll-top'); 
        }
    });*/

    //подключение паралакса
    $('.scene').parallax();


    //кнопка меню
    $(".js-menu").on('click', function(e) {
        $(this).siblings('ul').slideToggle(300);
        $(this).toggleClass("active");
    });

    //скролл к анкору на главной
    $('.js-scroll-main').on('click',function(e){
        e.preventDefault();
        var contentY = $('.l-content').offset().top;
        $('html,body').animate({
            scrollTop: contentY
        }, 500);
    });

    //нумерация итемов формы discount
    $('.js-list').find('.js-number').each(function(indx){
        $(this).text(indx+1);
    });

    //всплывающие попапы
    $('.js-swim-block').on('click',function(e){
        e.preventDefault();
        $(this).siblings('.popup-swim').slideToggle(500);/*.animate({'opacity':1},500);*/
    });

/*---------------------------ПЛАГИНЫ-------------------------------*/
    //form-styler
    $('input, select').styler();

/*    $('.select-search').styler({
        selectSearch: true,
        selectVisibleOptions: 9
    });*/

    //fancybox КАРТИНКИ
    $(".fancybox").fancybox({
        locked : false,
        openEffect: 'fade',
        closeEffect: 'fade'
    });

    //fancybox ФОРМЫ
    $(".fancybox-form").fancybox({
        locked : false,
        openEffect: 'fade',
        closeEffect: 'fade',
        afterShow: function() {
            //form-styler
            $('.popup-block select').trigger('refresh');
        }
    });

/*---------------------------ПЛАГИНЫ-------------------------------*/

        //слайдер с 2 итемами
        if($('.js-slider-two').find('.js-sitem').length > 1){
            setTimeout(function () {
                $('.js-slider-two').owlCarousel({
                    items: 2,
                    margin: 20,
                    loop:true,
                    lazyLoad:true,
                    /*autoplay: true,*/
                    autoplayHoverPause: true,
                    autoplaySpeed: 1500,
                    dotsSpeed: 1500,
                    navSpeed: 1500,
                    dots: false,
                    nav: true,
                    navText: [],
                    navClass: ['nav-prev fa fa-angle-left', 'nav-next fa fa-angle-right'],
                responsive:{
                    580:{
                        items:2,
                        margin: 10
                    },
                    180:{
                        items:1,
                        margin: 0
                    }
                }
                });
            },200);
        }


//функция подгрузки большой картинки из маленького слайдера
function sliderImg(parent){
    $('.js-slide').on('click', function(e){
        e.preventDefault();
            var smallImgSrc = $(this).find('img').attr('src'),
                bigImg = $(this).parents(parent).find('.js-big-slide');
                bigImg.find('img').attr('src',smallImgSrc);

                $(this).addClass('current');
                $(this).siblings().removeClass('current');
    });
}

    //подгрузка большой картинки из слайдера
    sliderImg('.vertical-slider');
    sliderImg('.horizontal-slider');




    //вывод подменю в зависимости от оставшейся высоты меню
/*    $(".js-menu").on('click', function(e) {
        setTimeout(function () {
            var parent = $('.js-deep-menu').parent('li'),
                mainMenuHeights = 0;
                parent.each(function(indx, element){
                    $(this).nextAll().each(function(indx, element){
                        mainMenuHeights += $(this).outerHeight();             
                    });
                    if(mainMenuHeights < $(this).children('.js-deep-menu').outerHeight()){
                        $(this).children('.js-deep-menu').css({'top':'auto','bottom': '-10px'});
                    }
                    mainMenuHeights = 0;
                });
        },300);
    });*/


/*    $(".js-menu").on('click', function(e) {

            var menu = $(this).siblings('ul');
            posMenu = menu.offset().top,
            parent = menu.parent('.h-bot-menu');
            menu.insertAfter(parent);
            menu.css({'position':posMenu});
    });*/


    //btn-menu header
/*        $(".btn-s-menu").on('click', function(e) {
            $(this).siblings('ul').slideToggle(300);
            if($(this).hasClass('active')){
                $(this).removeClass('active');
            }
            else{
                $(this).addClass('active');
            }
        });

    //btn-menu
    $(".js-menu").on('click', function(e) {
        $(this).siblings('ul').slideToggle(300);
        if($(this).children('.btn-menu').hasClass('active')){
            $(this).children('.btn-menu').removeClass('active');
        }
        else{
            $(this).children('.btn-menu').addClass('active');
        }
    });*/






/*---------------------------ФУНКЦИИ-------------------------------*/
//функция проверки: имеет ли пункт меню подменю
function isLiParent(selector){
    $(selector).children('li').each(function(idx){
        if($(this).is(':has(ul)')){
            $(this).addClass('is-li-parent');
        }
    });
    $('.is-li-parent').hover(
        function(){
            $(this).addClass('is-li-active');
            $(this).children('ul').delay(200).slideDown(300);
        },
        function(){
            $(this).removeClass('is-li-active');
            $(this).children('ul').slideUp(300);
            
        }
    );
}

function isSearchVisible(selector){
    var curEl = $(selector).siblings('.is-hidden');
    $(selector).on('click', function(e) {
        curEl.css({'display':'block'}).animate({'width':'150px'},300);
    });
    $(document).mouseup(function (e){ // событие клика по веб-документу
        if (!$(selector).is(e.target) && curEl.has(e.target).length === 0) { //есликлик был не поселектору и (не по его соседнему элемепнту и дочерним элементам)
            curEl.animate({'width':0},300); // скрываем его соседний элемент
            setTimeout(function(){
                curEl.css({'display':'none'});
            },300);
        }
    });
}

isSearchVisible('.js-search');


    //функция обработки слайдеров
    function createSlider (sliderTag){
        if(sliderTag.find('.item').length > 1){
            setTimeout(function () {
                sliderTag.owlCarousel({
                    items: 1,
                    loop:true,
                    lazyLoad:true,
                    /*autoplay: true,*/
                    autoplayHoverPause: true,
                    autoplaySpeed: 1500,
                    dotsSpeed: 1500,
                    navSpeed: 1500,
                    dots: true,
                    nav: true,
                    navText: [],
                    navClass: ['nav-prev icon icon-arrow-prev', 'nav-next icon icon-arrow-next']
                });
            },200);
        }
    }






    //функция переноса блоков в начало блока
    function prependBlock(currentBlock,parentBlock){
        console.log(currentBlock);
        currentBlock.prependTo(parentBlock);
    }

    function autoColumn(columns, className, minColumn){
        $('.js-columns').autocolumnlist({
            columns: columns,
            classname: className,
            min: minColumn
        });
        $('.js-columns').find('.column').wrapAll('<div class="parent-column"></div>')
    }
/*---------------------------ФУНКЦИИ-------------------------------*/
    
    //функция проверки: имеет ли пункт меню подменю
    isLiParent('.js-is-parent');

    createSlider($('.js-slider'));

    if(ScreenWidth > 1680){
        autoColumn(3,'column',2);
    }
    if(ScreenWidth < 1680){
        autoColumn(2,'column',2);
    }
    if(ScreenWidth < 992){
        prependBlock($('.logo'),$('.header-align-middle'));
    }
    if(ScreenWidth < 768){

    }
    if(ScreenWidth < 580){
       
    }
    if(ScreenWidth < 480){

    }

    $(window).resize(function(){
        ScreenWidth = $(window).width();
        
    });
});