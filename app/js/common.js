$(function() {

	// Custom JS

    // Custom JS
    $(".menu").on("click","a", function (event) {
        event.preventDefault(); //опустошим стандартную обработку
        var id  = $(this).attr('href'), //заберем айдишник блока с параметром URL
            top = $(id).offset().top; //определим высоту от начала страницы до якоря
        $('body,html').animate({scrollTop: top}, 1000); //сделаем прокрутку за 1 с
        $('.mobile__menu').toggleClass('active');
        $('.burger').toggleClass('active');
    });


    $('.burger').on('click', function () {
        $(this).toggleClass('active');
        $('.menu').toggleClass('active');
    });

    $('.select .placeholder').on('click', function () {
        $(this).parents('.select').toggleClass('active');
    });
    $('.select ul li').on('click', function () {
        let atrName = $(this).attr('attr-name'),
            val = $(this).text();
        $('.select .placeholder span').text(val);
        $('.select .placeholder').attr('attr-name', atrName);
        $('.select').removeClass('active');
    });

    $('form input').focusout(function(){
        if($(this).val() != ''){
            $(this).removeClass('error');
        }else{
            $(this).addClass('error');
        }
    });

    $('form button').on('click', function (e) {
        e.preventDefault();
        let name = $('form .name').val(),
            phone = $('form .phone').val(),
            mail = $('form .mail').val(),
            text = $('form .mail').val(),
            theme = $('form .select .placeholder span').text();
        if(phone != '' || mail != ''){
            let data = new FormData();
            data.append('name', name);
            data.append('phone', phone);
            data.append('mail', mail);
            data.append('text', text);
            data.append('theme', theme);
            $.ajax({
                type: "POST",
                url: "/mail.php",
                data: data,
                processData: false,
                contentType: false,
                cache: false,
                success: function (data) {
                    if(data == 'ok'){
                        $.fancybox.open({
                            src  : '#isGood',
                            type : 'inline',
                        });
                    }else{
                        alert('Произошла ошибка')
                    }
                },
            });
        }else{
            if($('form .phone').val() != ''){
                $('form .phone').removeClass('error');
            }else{
                $('form .phone').addClass('error');
            }
            if($('form .mail').val() != ''){
                $('form .mail').removeClass('error');
            }else{
                $('form .mail').addClass('error');
            }
        }
    });
    $('.js--news-slider').slick({
        autoplay: false,
        autoplaySpeed: 4000,
        prevArrow: $('.news .prev'),
        nextArrow: $('.news .next'),
    });
});
