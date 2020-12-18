$(document).ready(function () {
    // $('.next').click(function () {
    //     $('.carousel__item').css({
    //         'background-image': 'linear-gradient(180deg, rgba(22, 21, 29, 0) 0%, rgba(22, 21, 29, 0.8) 48.31%, #16151D 100%),url(https://images.alphacoders.com/905/thumb-1920-905006.jpg)',
    //         'background-size': 'cover',
    //         'transition': 'all ease 0.8s'
    //     })
    //     console.log('blablabla')
    // });
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 3
            }
        }
    })
    $('.popular').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 6,
        slidesToScroll: 3,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
    $('.latest').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 6,
        slidesToScroll: 3,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
    $('.responsive').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 6,
        slidesToScroll: 3,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });


    $('.fade').slick({
        dots: false,
        infinite: true,
        speed: 1000,
        dots: false,
        fade: true,
        // autoplay: true,
        autoplaySpeed: 2500,
        cssEase: 'linear'
    });
})