import key from './keys';
$(document).ready(() => {
    console.log('script ready!');

    var DateTime = luxon.DateTime;
    var now = DateTime.local();
    var parsed = now.toLocaleString(DateTime.DATETIME_MED);
    console.log(parsed);

    console.log(key);
    // one call:
    // var queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=minutely,hourly,daily,alerts&appid=${key}&units=metric&lang=en`


    
    // luxon tour:
        // https://moment.github.io/luxon/docs/manual/tour.html
    
    // new api key: https://home.openweathermap.org/api_keys


    // start: local storage & btn manipulation functions

    const getCurrent = (URL) => {
        $.ajax({
            url: URL, 

        })
    }

    const setLocal = (arr) => {
        localStorage.setItem('cities', JSON.stringify(arr));
    };

    const capitalizeFirst = (str) => {
        let words = str.toLowerCase().split(' ');
        for (var i = 0; i < words.length; i++) {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1);
        }
        return words.join(' ');
    }

    const renderBtns = arr => {
        for (var i = 0; i < arr.length; i++) {
            cities.prepend(`<button type="button" class="btn reload btn-outline-primary mb-2">${arr[i]}</button>`);
        }
    }

    const updateList = (arr, el) => {
        if (arr.length === 10) {
            arr.shift();
        }
        if (arr.includes(el)) {
            let index = arr.indexOf(el)
            arr.splice(index,1)
            arr.push(el);
            return arr;
        } else {
            arr.push(el)
            return arr;
        }
    }
    // end: local storage & btn manipulation functions

    var cities = $('#cities');
    var searchBtn = $('.search-btn');
    var input = $('.input');

    // set citiesList array to whatever is in local storage, or to empty array
    var citiesList = JSON.parse(localStorage.getItem('cities')) || [];
    renderBtns(citiesList);

    searchBtn.on('click', function() {
        let editedStr = capitalizeFirst(input.val());
        updateList(citiesList, editedStr);
        setLocal(citiesList);
        cities.children().remove();
        renderBtns(JSON.parse(localStorage.getItem('cities')));
        input.val('');
    });
    
    let currentWeatherPrimary = false;
    let dayOnePrimary = false;
    let dayTwoPrimary = false;
    let dayThreePrimary = false;
    let dayFourPrimary = false;
    let dayFivePrimary = false;
    var cityName = $('#city-name');
    var currentNight = $('.current-night');
    var cities = $('#cities');

    var currentCol = $('#current-col');
    // grab five-day cards for content manipulation
    var dayOne = $('#day-one');
    var dayTwo = $('#day-two');
    var dayThree = $('#day-three');
    var dayFour = $('#day-four');
    var dayFive = $('#day-five');

    var nightOne = $('#night-one');
    var nightTwo = $('#night-two');
    var nightThree = $('#night-three');
    var nightFour = $('#night-four');

    const bgPrimary = 'bg-primary';
    const bgDark = 'bg-dark';
    const defaultLgBg = 'default-lg-bg';
    const dayBackground = 'day-background';
    const nightBackground = 'night-background';
    const fiveDay = 'five-day';
    const fiveNight = 'five-night';

    var currentForecast = {
        date: '',
        time: '',
        day: {
            temp: '',
            humidity: '',
            wind: '',
            uvIndex: ''
        },
        night: {
            temp: '',
            humidity: '',
            wind: '',
            uvIndex: ''
        }
    }

    var fiveForecast = {
        one: {
            day: {
                icon: '',
                temp: '',
                humidity: ''
            },
            night: {
                icon: '',
                temp: '',
                humidity: ''
            }
        },
        two: {
            day: {
                icon: '',
                temp: '',
                humidity: ''
            },
            night: {
                icon: '',
                temp: '',
                humidity: ''
            }
        },
        three: {
            day: {
                icon: '',
                temp: '',
                humidity: ''
            },
            night: {
                icon: '',
                temp: '',
                humidity: ''
            }
        },
        four: {
            day: {
                icon: '',
                temp: '',
                humidity: ''
            },
            night: {
                icon: '',
                temp: '',
                humidity: ''
            }
        },
        five: {
            day: {
                icon: '',
                temp: '',
                humidity: ''
            },
            night: {
                icon: '',
                temp: '',
                humidity: ''
            }
        }
    }

    var fourNight = {
        one: {
            icon: '',
            temp: '',
            humidity: ''
        },
        two: {
            icon: '',
            temp: '',
            humidity: ''
        },
        three: {
            icon: '',
            temp: '',
            humidity: ''
        },
        four: {
            icon: '',
            temp: '',
            humidity: ''
        },
    }

    var icon = 'cloudy';
    var date = '2/6/21';
    var temp = '17';
    var humidity = '55';
    var wind = '15';
    var uv = '2.63';
    var city = 'Queretaro';
    var time = 'now'
    var date = '2/6/21'

    // set content for current weather card
    const setCurrent = (element, city, time, date, temp, humidity, wind, uv) => {
        element.children('h3').text(city);
        element.children('h6').text(time);
        element.children('h4').text(date);

        let parent = element.children('div.row').children();
        parent.children('p.current-condition').text(icon);
        parent.children('p.temp').children('span.temp').text(temp);
        parent.children('p.humid').children('span.humid').text(humidity);
        parent.children('p.wind').children('span.wind').text(wind);
        parent.children('p.uv').children('span.uv').text(uv);
    }

    // sets content for each day card
    const setDay = (element, date, icon, temp, humidity) => {
        element.children().children('h5').text(date);
        element.children().children('p.icon').text(icon);
        element.children().children().children('span.temp').text(temp);
        element.children().children().children('span.humidity').text(humidity);
    }

    // set content for each night card
    const setNight = (element, icon, temp, humidity) => {
        element.children('p.icon').text(icon);
        element.children().children('span.temp').text(temp);
        element.children().children('span.humidity').text(humidity);
    }
    
    // start: testing presets
    setCurrent(currentCol, city, time, date, temp, humidity, wind, uv);
    
    setDay(dayOne, date, icon, temp, humidity);
    setDay(dayTwo, date, icon, temp, humidity);
    setDay(dayThree, date, icon, temp, humidity);
    setDay(dayFour, date, icon, temp, humidity);
    setDay(dayFive, date, icon, temp, humidity);

    setNight(nightOne, icon, temp, humidity);
    setNight(nightTwo, icon, temp, humidity);
    setNight(nightThree, icon, temp, humidity);
    setNight(nightFour, icon, temp, humidity);
    // end: testing presets

    const resetFalse = () => {
        currentWeatherPrimary = false;
        dayOnePrimary = false;
        dayTwoPrimary = false;
        dayThreePrimary = false;
        dayFourPrimary = false;
        dayFivePrimary = false;
    }

    if (window.innerWidth < 768) {
        cities.addClass('collapse');
    }
    
    // initial width check for layout
    if (window.innerWidth <= 600) {
        $('.card-day').each(function() {
            // console.log($(this));
            $(this).css('width','75%');
            $(this).removeClass('bg-primary').addClass('five-day');
        });
        currentCol.removeClass('default-lg-bg').addClass('day-background');
    } else {
        $('.card-day').each(function() {
            // console.log($(this));
            $(this).css('width','18%');
        });
        currentNight.addClass('text-center');
    }

    // listening to update UI as width changes
    const check = () => {
        // console.log(window.innerWidth);
        if (window.innerWidth < 768) {
            cities.addClass('collapse');
        } else {
            cities.removeClass('collapse');
        }

        if (window.innerWidth <= 600 ) {
            $('.card-day').each(function() {
                // console.log($(this));
                $(this).css('width','75%');
                $(this).removeClass('bg-primary').addClass('five-day');
            });
            currentCol.removeClass('default-lg-bg').addClass('day-background');
        } else {
            resetFalse();
            $('.card-day').each(function() {
                // console.log($(this));
                $(this).css('width','18%');
                $(this).removeClass('five-day five-night').addClass('bg-primary');
            });
            currentCol.removeClass('night-background day-background').addClass('default-lg-bg');
        }
    };

    currentCol.on('click', function() {
        if (window.innerWidth <= 600) {
            if (currentWeatherPrimary) {
                currentCol.removeClass('default-lg-bg night-background').addClass('day-background');
                currentWeatherPrimary = false;        
            } else {
                currentCol.removeClass('default-lg-bg day-background').addClass('night-background');
                currentWeatherPrimary = true;
            }
        }
        return;
    });

    dayOne.on('click', function() {
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

    dayTwo.on('click', function() {
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

    dayThree.on('click', function() {
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

    dayFour.on('click', function() {
        console.log($(this).children().children('p.icon').text('hello'));
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

    dayFive.on('click', function() {
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

    

    

});