$(document).ready(() => {
    console.log('script ready!')
    
    let currentWeatherPrimary = false;
    let dayOnePrimary = false;
    let dayTwoPrimary = false;
    let dayThreePrimary = false;
    let dayFourPrimary = false;
    let dayFivePrimary = false;
    var dayNight = $('#day-night');
    var currentNight = $('.current-night');

    const resetFalse = () => {
        currentWeatherPrimary = false;
        dayOnePrimary = false;
        dayTwoPrimary = false;
        dayThreePrimary = false;
        dayFourPrimary = false;
        dayFivePrimary = false;
    };

    const resetTrue = () => {
        currentWeatherPrimary = true;
        dayOnePrimary = true;
        dayTwoPrimary = true;
        dayThreePrimary = true;
        dayFourPrimary = true;
        dayFivePrimary = true;
    };

    if ($(window).width() <= 600) {
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
        if ($(window).width() <= 600 ) {
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
        if ($(window).width() <= 600) {
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
        if ($(window).width() <= 600) {
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
        if ($(window).width() <= 600) {
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
        if ($(window).width() <= 600) {
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
        if ($(window).width() <= 600) {
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
        if ($(window).width() <= 600) {
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