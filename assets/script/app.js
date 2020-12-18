$(document).ready(function () {
    // $('.next').click(function () {
    //     $('.carousel__item').css({
    //         'background-image': 'linear-gradient(180deg, rgba(22, 21, 29, 0) 0%, rgba(22, 21, 29, 0.8) 48.31%, #16151D 100%),url(https://images.alphacoders.com/905/thumb-1920-905006.jpg)',
    //         'background-size': 'cover',
    //         'transition': 'all ease 0.8s'
    //     })
    //     console.log('salom,')
    // });


    $('.fade').slick({
        dots: false,
        infinite: true,
        speed: 1000,
        dots: false,
        fade: true,
        autoplay: true,
        autoplaySpeed: 2500,
        cssEase: 'linear'
    });
})
