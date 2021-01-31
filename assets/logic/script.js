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
            if (dayOnePrimary) {
                $('#day-two').removeClass('bg-dark').addClass('bg-primary');
                dayOnePrimary = false;        
            } else {
                $('#day-two').removeClass('bg-primary').addClass('bg-dark');
                dayOnePrimary = true;
            }
        }
        return;
    });
    
    $('#day-three').on('click', () => {
        if ($(window).width() < 600) {
            if (dayOnePrimary) {
                $('#day-three').removeClass('bg-dark').addClass('bg-primary');
                dayOnePrimary = false;        
            } else {
                $('#day-three').removeClass('bg-primary').addClass('bg-dark');
                dayOnePrimary = true;
            }
        }
        return;
    });

    $('#day-four').on('click', () => {
        if ($(window).width() < 600) {
            if (dayOnePrimary) {
                $('#day-four').removeClass('bg-dark').addClass('bg-primary');
                dayOnePrimary = false;        
            } else {
                $('#day-four').removeClass('bg-primary').addClass('bg-dark');
                dayOnePrimary = true;
            }
        }
        return;
    });

    $('#day-five').on('click', () => {
        if ($(window).width() < 600) {
            if (dayOnePrimary) {
                $('#day-five').removeClass('bg-dark').addClass('bg-primary');
                dayOnePrimary = false;        
            } else {
                $('#day-five').removeClass('bg-primary').addClass('bg-dark');
                dayOnePrimary = true;
            }
        }
        return;
    });

    const citiesList = ['New York', 'Seattle', 'Washington, D.C.', 'Queretaro'];

});