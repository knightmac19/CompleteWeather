$(document).ready(() => {
    console.log('script ready!')

    let currentWeatherPrimary = false;
    let dayOnePrimary = false;
    let dayTwoPrimary = false;
    let dayThreePrimary = false;
    let dayFourPrimary = false;
    let dayFivePrimary = false;

    $('.current-day').on('click', () => {
        if ($(window).width() < 600) {
            if (currentWeatherPrimary) {
                $('.current-day').removeClass('bg-dark').addClass('bg-primary');
                currentWeatherPrimary = false;        
            } else {
                $('.current-day').removeClass('bg-primary').addClass('bg-dark');
                currentWeatherPrimary = true;
            }
        }
        return;
    });

    $('#day-one').on('click', () => {
        if ($(window).width() < 600) {
            if (dayOnePrimary) {
                $('#day-one').removeClass('bg-dark').addClass('bg-primary');
                dayOnePrimary = false;        
            } else {
                $('#day-one').removeClass('bg-primary').addClass('bg-dark');
                dayOnePrimary = true;
            }
        }
        return;
    });

    $('#day-two').on('click', () => {
        if ($(window).width() < 600) {
            if (dayTwoPrimary) {
                $('#day-two').removeClass('bg-dark').addClass('bg-primary');
                dayTwoPrimary = false;        
            } else {
                $('#day-two').removeClass('bg-primary').addClass('bg-dark');
                dayTwoPrimary = true;
            }
        }
        return;
    });
    
    $('#day-three').on('click', () => {
        if ($(window).width() < 600) {
            if (dayThreePrimary) {
                $('#day-three').removeClass('bg-dark').addClass('bg-primary');
                dayThreePrimary = false;        
            } else {
                $('#day-three').removeClass('bg-primary').addClass('bg-dark');
                dayThreePrimary = true;
            }
        }
        return;
    });

    $('#day-four').on('click', () => {
        if ($(window).width() < 600) {
            if (dayFourPrimary) {
                $('#day-four').removeClass('bg-dark').addClass('bg-primary');
                dayFourPrimary = false;        
            } else {
                $('#day-four').removeClass('bg-primary').addClass('bg-dark');
                dayFourPrimary = true;
            }
        }
        return;
    });

    $('#day-five').on('click', () => {
        if ($(window).width() < 600) {
            if (dayFivePrimary) {
                $('#day-five').removeClass('bg-dark').addClass('bg-primary');
                dayFivePrimary = false;        
            } else {
                $('#day-five').removeClass('bg-primary').addClass('bg-dark');
                dayFivePrimary = true;
            }
        }
        return;
    });

    const citiesList = ['New York', 'Seattle', 'Washington, D.C.', 'Queretaro'];

});