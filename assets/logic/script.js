$(document).ready(() => {
    console.log('script ready!');
    
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
    
    // initial width check for layout
    if (window.innerWidth <= 600) {
        $('.card-day').each(function() {
            // console.log($(this));
            $(this).css('width','75%');
            $(this).removeClass('bg-primary').addClass('five-day');
        });
        $('#current-col').removeClass('default-lg-bg').addClass('day-background');
        dayNight.text('default small');
    } else {
        $('.card-day').each(function() {
            // console.log($(this));
            $(this).css('width','18%');
        });
        dayNight.text('default large');
        currentNight.addClass('text-center');
    }

    // listening to update UI as width changes
    const check = () => {
        // console.log(window.innerWidth);
        if (window.innerWidth <= 600 ) {
            $('.card-day').each(function() {
                // console.log($(this));
                $(this).css('width','75%');
                $(this).removeClass('bg-primary').addClass('five-day');
            });
            $('#current-col').removeClass('default-lg-bg').addClass('day-background');
            dayNight.text('Day');
        } else {
            resetFalse();
            $('.card-day').each(function() {
                // console.log($(this));
                $(this).css('width','18%');
                $(this).removeClass('five-day five-night').addClass('bg-primary');
            });
            $('#current-col').removeClass('night-background day-background').addClass('default-lg-bg');
            dayNight.text('default large');
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