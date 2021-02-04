$(document).ready(() => {
    console.log('script ready!')

    
    // rain script start

    var makeItRain = function() {
    //clear out everything
    $('.rain').empty();

    var increment = 0;
    var drops = "";
    var backDrops = "";

    while (increment < 100) {
        //couple random numbers to use for various randomizations
        //random number between 98 and 1
        var randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
        //random number between 5 and 2
        var randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
        //increment
        increment += randoFiver;
        //add in a new raindrop with various randomizations to certain CSS properties
        drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
        backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
    }

    $('.rain.front-row').append(drops);
    $('.rain.back-row').append(backDrops);
    }

    $('.splat-toggle.toggle').on('click', function() {
    $('body').toggleClass('splat-toggle');
    $('.splat-toggle.toggle').toggleClass('active');
    makeItRain();
    });

    $('.back-row-toggle.toggle').on('click', function() {
    $('body').toggleClass('back-row-toggle');
    $('.back-row-toggle.toggle').toggleClass('active');
    makeItRain();
    });

    $('.single-toggle.toggle').on('click', function() {
    $('body').toggleClass('single-toggle');
    $('.single-toggle.toggle').toggleClass('active');
    makeItRain();
    });

    makeItRain();

    // rain script end
    
















    
    let currentWeatherPrimary = false;
    let dayOnePrimary = false;
    let dayTwoPrimary = false;
    let dayThreePrimary = false;
    let dayFourPrimary = false;
    let dayFivePrimary = false;
    var dayNight = $('#day-night');
    var currentNight = $('.current-night');

    const bgPrimary = 'bg-primary';
    const bgDark = 'bg-dark';
    const defaultLgBg = 'default-lg-bg';
    const dayBackground = 'day-background';
    const nightBackground = 'night-background';
    const fiveDay = 'five-day';
    const fiveNight = 'five-night';

    const resetFalse = () => {
        currentWeatherPrimary = false;
        dayOnePrimary = false;
        dayTwoPrimary = false;
        dayThreePrimary = false;
        dayFourPrimary = false;
        dayFivePrimary = false;
    }
    

    if (window.innerWidth <= 600) {
        $('#current-col').removeClass('default-lg-bg').addClass('day-background');
        dayNight.text('default small');
        $('#day-one').removeClass('bg-primary').addClass('five-day');
        $('#day-two').removeClass('bg-primary').addClass('five-day');
        $('#day-three').removeClass('bg-primary').addClass('five-day');
        $('#day-four').removeClass('bg-primary').addClass('five-day');
        $('#day-five').removeClass('bg-primary').addClass('five-day');
    } else {
        dayNight.text('default large');
        currentNight.addClass('text-center');
    }

    const check = () => {
        // console.log(window.innerWidth);
        if (window.innerWidth <= 600 ) {
            $('#current-col').removeClass('default-lg-bg').addClass('day-background');
            dayNight.text('Day');
            $('#day-one').removeClass('bg-primary').addClass('five-day');
            $('#day-two').removeClass('bg-primary').addClass('five-day');
            $('#day-three').removeClass('bg-primary').addClass('five-day');
            $('#day-four').removeClass('bg-primary').addClass('five-day');
            $('#day-five').removeClass('bg-primary').addClass('five-day');
        } else {
            resetFalse();
            $('#current-col').removeClass('night-background day-background').addClass('default-lg-bg');
            dayNight.text('default large');
            $('#day-one').removeClass('five-day five-night').addClass('bg-primary');
            $('#day-two').removeClass('five-day five-night').addClass('bg-primary');
            $('#day-three').removeClass('five-day five-night').addClass('bg-primary');
            $('#day-four').removeClass('five-day five-night').addClass('bg-primary');
            $('#day-five').removeClass('five-day five-night').addClass('bg-primary');
        }
    };

    $('#current-col').on('click', () => {
        if (window.innerWidth <= 600) {
            if (currentWeatherPrimary) {
                $('#current-col').removeClass('default-lg-bg night-background').addClass('day-background');
                dayNight.text('Day');
                currentWeatherPrimary = false;        
            } else {
                $('#current-col').removeClass('default-lg-bg day-background').addClass('night-background');
                dayNight.text('Night');
                currentWeatherPrimary = true;
            }
        }
        return;
    });

    $('#day-one').on('click', () => {
        if (window.innerWidth <= 600) {
            if (dayOnePrimary) {
                $('#day-one').removeClass('bg-primary five-night').addClass('five-day');
                dayOnePrimary = false;        
            } else {
                $('#day-one').removeClass('five-day').addClass('five-night');
                dayOnePrimary = true;
            }
        }
        return;
    });

    $('#day-two').on('click', () => {
        if (window.innerWidth <= 600) {
            if (dayTwoPrimary) {
                $('#day-two').removeClass('bg-primary five-night').addClass('five-day');
                dayTwoPrimary = false;        
            } else {
                $('#day-two').removeClass('five-day').addClass('five-night');
                dayTwoPrimary = true;
            }
        }
        return;
    });

    $('#day-three').on('click', () => {
        if (window.innerWidth <= 600) {
            if (dayThreePrimary) {
                $('#day-three').removeClass('bg-primary five-night').addClass('five-day');
                dayThreePrimary = false;        
            } else {
                $('#day-three').removeClass('five-day').addClass('five-night');
                dayThreePrimary = true;
            }
        }
        return;
    });

    $('#day-four').on('click', () => {
        if (window.innerWidth <= 600) {
            if (dayFourPrimary) {
                $('#day-four').removeClass('bg-primary five-night').addClass('five-day');
                dayFourPrimary = false;        
            } else {
                $('#day-four').removeClass('five-day').addClass('five-night');
                dayFourPrimary = true;
            }
        }
        return;
    });

    $('#day-five').on('click', () => {
        if (window.innerWidth <= 600) {
            if (dayFivePrimary) {
                $('#day-five').removeClass('bg-primary five-night').addClass('five-day');
                dayFivePrimary = false;        
            } else {
                $('#day-five').removeClass('five-day').addClass('five-night');
                dayFivePrimary = true;
            }
        }
        return;
    });

    $(window).resize(()=> {
        check();
    });

    

    const citiesList = ['New York', 'Seattle', 'Washington, D.C.', 'Queretaro'];

});