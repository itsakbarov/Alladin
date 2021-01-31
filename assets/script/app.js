$(document).ready(function () {

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
    });

    $('.popular').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 6,
        slidesToScroll: 3,
        prevArrow: $('.best-prev'),
        nextArrow: $('.best-next'),
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false

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
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.latest').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 6,
        prevArrow: $('.latest-prev'),
        nextArrow: $('.latest-next'),
        slidesToScroll: 2,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
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
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    $('.responsive').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 6,
        prevArrow: $('.responsive-prev'),
        nextArrow: $('.responsive-next'),
        slidesToScroll: 2,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });


    $('.fade').slick({
        dots: false,
        infinite: true,
        speed: 1000,
        dots: false,
        fade: true,
        autoplay: true,
        autoplaySpeed: 2500,
        prevArrow: $('.prev'),
        nextArrow: $('.next'),
        cssEase: 'linear'
    });

    $('.best-wrapper').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 2,
        slidesToScroll: 1,
    });
    $('.movie-button__link--watch').click(() => {
        $('.movie-wrapper').toggleClass('opened');
        $('body').toggleClass('overflow-none');
        $('.overlay').toggleClass('opened');
    })
    $('.overlay').click(() => {
        $('.movie-wrapper').removeClass('opened');
        $('body').removeClass('overflow-none');
        $('.overlay').removeClass('opened');
        $('.video-source').pause()
    })
    $('.movie-wrapper').mouseenter(() => {
        $('.video-controls').css('transform', 'translateY(-60px)');
        $('.video-status-img').fadeIn(500)
    })
    $('.movie-wrapper').mouseleave(() => {
        $('.video-controls').css('transform', 'translateY(0px)');
        $('.video-status-img').fadeOut(500)

    })
    $('.range').mousedown(() => {
        $('.range').css('height', '8px');
    })
    $('.range').mouseleave(() => {
        $('.range').css('height', '2px');
    })
    $('.more-info').mouseover(() => {
        $('.more-info-content').addClass('clicked');
    })
    $('.more-info').mouseleave(() => {
        $('.more-info-content').removeClass('clicked');
    })
})

let video = document.querySelector('.video-source');
let duration = document.querySelector('.video-length-time');
let movieWrapper = document.querySelector('.movie-wrapper');
let playBtn = document.querySelector('.play-pause');
let nextBtn = document.querySelector('.next-btn');
let volumeRange = document.querySelector('.volume-range');
let videoLengthRange = document.querySelector('.video-length-range');
let volumeIcon = document.querySelector('.volume-icon');

video.addEventListener('load', () => {
    volumeRange.value = 100
    videoLengthRange.value = 0;
    volumeIconChanger(video.volume * 100);
})

playBtn.addEventListener('click', () => {
    if (video.paused || video.ended) {
        video.play();
        // $('.video-status-img').fadeToggle(500)
        $('.pp-stat').attr('src', './assets/icons/pause.svg')
        $('.video-status-img').attr('src', './assets/icons/pause.svg')
    } else {
        video.pause();
        // $('.video-status-img').fadeToggle(500)
        $('.pp-stat').attr('src', './assets/icons/play-button-arrowhead.svg')
        $('.video-status-img').attr('src', './assets/icons/play-button-arrowhead.svg')
    }
})

function volumeIconChanger(volumeStatus) {
    switch (true) {
        case volumeStatus > 80:
            volumeIcon.setAttribute('src', './assets/icons/vol3.svg')
            break;

        case volumeStatus > 60:
            volumeIcon.setAttribute('src', './assets/icons/vol2.svg')
            break;

        case volumeStatus > 20:
            volumeIcon.setAttribute('src', './assets/icons/vol1.svg')
            break;

        case volumeStatus < 5 || volumeStatus == 0:
            volumeIcon.setAttribute('src', './assets/ icons/vol0.svg')
            break;

        default:
            volumeIcon.setAttribute('src', './icons/vol0.svg')
            break;
    }
}
volumeRange.addEventListener('change', () => {
    video.volume = volumeRange.value / 100
    console.log(video.volume);
    volumeIconChanger(video.volume * 100)
})

function updateProgress() {
    videoLengthRange.value = Math.floor((video.currentTime * 100) / video.duration);
    currentVideoTime();
    formattorTime(video.duration)

}

document.querySelector('.fullscreen').addEventListener('click', function openFullscreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
})
video.addEventListener('timeupdate', updateProgress);

volumeIcon.addEventListener('click', () => {
    video.volume = 0;
    volumeRange.value = 0;
    volumeIconChanger(video.volume * 100)

})
let currentTime = document.querySelector('.current-time')

function formattorTime(fullDuration) {
    let secondToMinutes = fullDuration / 60;
    let minutes = Math.round(secondToMinutes);
    let seconds = Math.ceil(secondToMinutes - minutes);
    currentTime.innerHTML = `${Math.floor(seconds)} : ${Math.ceil(video.currentTime)}`
}

function currentVideoTime() {
    currentTime.innerHTML = Math.round(video.currentTime);
    videoLengthRange.setAttribute('max', Math.round(video.duration))
}
nextBtn.addEventListener('click', () => {
    video.currentTime = video.currentTime + 15
})
videoLengthRange.addEventListener('change', () => {
    video.currentTime = (videoLengthRange.value * video.duration) / 100;
})

function formatTime(timeInSeconds) {
    let result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

    return {
        minutes: result.substr(3, 2),
        seconds: result.substr(6, 2),
    };
}
setInterval(() => {
    let time = formatTime(video.duration);
    duration.innerText = `${time.minutes}:${time.seconds}`;
    duration.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`);
}, 1000);

video.addEventListener('dblclick', () => {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
})
window.addEventListener('keypress', (e) => {
    switch (e.key) {
        case ' ':
            if (video.paused || video.ended) {
                video.play();
                // $('.video-status-img').fadeToggle(500)
                $('.pp-stat').attr('src', './assets/icons/pause.svg')
                $('.video-status-img').attr('src', './assets/icons/pause.svg')
            } else {
                video.pause();
                // $('.video-status-img').fadeToggle(500)
                $('.pp-stat').attr('src', './assets/icons/play-button-arrowhead.svg')
                $('.video-status-img').attr('src', './assets/icons/play-button-arrowhead.svg')
            }
            break;
        case 'm':
            video.volume = 0;
            volumeRange.value = 0;
            volumeIconChanger(video.volume * 100)
            break;
        case 'd':
            video.currentTime = +15
            // video.volume = video.volume + 0.10 
            break;
        case 'a':
            video.currentTime = -15
            break;
        case 'w':
            video.volume = video.volume + 0.10
            volumeRange.value = video.volume;
            volumeIconChanger(video.volume * 100)
            break;
        case 's':
            video.volume = video.volume - 0.10
            volumeRange.value = video.volume;
            volumeIconChanger(video.volume * 100)
            break;
        default:
            break;

    }
})

let videoStatusImg = document.querySelector('.video-status-img');

videoStatusImg.addEventListener('click', () => {
    if (video.paused || video.ended) {
        video.play();
        $('.pp-stat').attr('src', './assets/icons/pause.svg')
        $('.video-status-img').attr('src', './assets/icons/pause.svg')
    } else {
        video.pause();
        $('.pp-stat').attr('src', './assets/icons/play-button-arrowhead.svg')
        $('.video-status-img').attr('src', './assets/icons/play-button-arrowhead.svg')
    }
})