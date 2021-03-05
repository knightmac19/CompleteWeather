const reverseHash = str => {
    let result = '';
    for (var i = str.length - 1; i >= 0; i--) {
        result += str[i];
    }
    return result;
}
var yek = '8867845d766766103b7874c8ae32f415';
const key = reverseHash(yek);

$(document).ready(() => {
    console.log('script ready!');
    var currentCol = $('#current-col');
    var nightTemp = $('.night-temp-row');
    var fiveLg = $('.five-lg');
    var modal = $('#exampleModal');
    // var pageError = $('#error-msg');
    // var errorContainer = $('#error-container');
    // pageError.hide();

    currentCol.hide();
    // nightTemp.hide();
    fiveLg.hide();

    // start: local storage & btn manipulation functions
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

    searchBtn.on('click', function(e) {
        e.preventDefault();
        currentCol.show();
        let editedStr = capitalizeFirst(input.val().trim());
        getCurrentWeather(editedStr);
        input.val('');
    });

    $(document).on('click', '.reload', function (e) {
        e.preventDefault();
        currentCol.show();
        let thisString = $(this).text();
        // console.log(thisString);
        getCurrentWeather(thisString);
        
        updateList(citiesList, thisString);
        setLocal(citiesList);
        cities.children().remove();
        renderBtns(JSON.parse(localStorage.getItem('cities')));
    });


    const getCurrentWeather = str => {

        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/weather?q=${str}&appid=${key}&units=metric`,
            data: {
              format: 'json'
            },
            error: function(err) {
              console.log(err);
                modal.modal({
                    show: true
                })
            },
            dataType: 'json',
            success: function(data) {
              console.log(data);
              
              updateList(citiesList, data.name);
              setLocal(citiesList);
              cities.children().remove();
              renderBtns(JSON.parse(localStorage.getItem('cities')));

              setCurrent(
                  currentCol,
                  data.name,
                  localDate(data.timezone).current,
                  Math.round(data.main.temp),
                  data.weather[0].icon,
                  Math.round(data.main.feels_like),
                  data.main.humidity,
                  data.wind.speed
                );
            },
            type: 'GET'
        }).then(data => {

            $.ajax({
                url:`https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${key}&units=metric`,
                data: {
                    format: 'json'
                },
                error: function(err) {
                    console.log(err);
                },
                dataType: 'json',
                success: function(data) {
                    // console.log('five day: ')
                    // console.log(data)

                    let firstDay = data.list[4];
                    let secondDay = data.list[12];
                    let thirdDay = data.list[20];
                    let fourthDay = data.list[28];
                    let fifthDay = data.list[36];

                    let firstNight = data.list[8]; 
                    let secondNight = data.list[16];
                    let thirdNight = data.list[24];
                    let fourthNight = data.list[32];

                    setDay(dayOne, localDate(data.city.timezone).one, firstDay.weather[0].icon, Math.round(firstDay.main.temp), firstDay.main.humidity);
                    setDay(dayTwo, localDate(data.city.timezone).two, secondDay.weather[0].icon, Math.round(secondDay.main.temp), secondDay.main.humidity);
                    setDay(dayThree, localDate(data.city.timezone).three, thirdDay.weather[0].icon, Math.round(thirdDay.main.temp), thirdDay.main.humidity);
                    setDay(dayFour, localDate(data.city.timezone).four, fourthDay.weather[0].icon, Math.round(fourthDay.main.temp), fourthDay.main.humidity);
                    setDay(dayFive, localDate(data.city.timezone).five, fifthDay.weather[0].icon, Math.round(fifthDay.main.temp), fifthDay.main.humidity);

                    setNight(nightOne, firstNight.weather[0].main, Math.round(firstNight.main.temp), firstNight.main.humidity);
                    setNight(nightTwo, secondNight.weather[0].main, Math.round(secondNight.main.temp), secondNight.main.humidity);
                    setNight(nightThree, thirdNight.weather[0].main, Math.round(thirdNight.main.temp), thirdNight.main.humidity);
                    setNight(nightFour, fourthNight.weather[0].main, Math.round(fourthNight.main.temp), fourthNight.main.humidity);
                }
            }).then(res => {
                fiveLg.show();
            }).catch(err => {
                console.log(err);
            })
            
        }).catch(err => {
            console.log(err);
        });
          
    }



    const localDate = (zone) => {
        let unixEpochTimeStamp = Date.parse(new Date(Date.now()));
        let timeZone = zone * 1000;
        let combined = unixEpochTimeStamp + timeZone;

        let dayInMilliseconds = 24 * 60 * 60 * 1000;

        let result = {
            current: new Date(combined).toDateString().substring(4),
            one: new Date(combined + (dayInMilliseconds * 1)).toDateString().substring(4 , 11),
            two: new Date(combined + (dayInMilliseconds * 2)).toDateString().substring(4 , 11),
            three: new Date(combined + (dayInMilliseconds * 3)).toDateString().substring(4 , 11),
            four: new Date(combined + (dayInMilliseconds * 4)).toDateString().substring(4 , 11),
            five: new Date(combined + (dayInMilliseconds * 5)).toDateString().substring(4 , 11)
        }

        return result;
    }






    
    let currentWeatherPrimary = false;
    let dayOnePrimary = false;
    let dayTwoPrimary = false;
    let dayThreePrimary = false;
    let dayFourPrimary = false;
    let dayFivePrimary = false;
    var cityName = $('#city-name');
    var currentNight = $('.current-night');
    var cities = $('#cities');

    
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
            wind: ''
        },
        night: {
            temp: '',
            humidity: '',
            wind: ''
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
    var city = 'Queretaro';
    var time = 'now'
    var date = '2/6/21'

    // set content for current weather card
    const setCurrent = (element, city, date, actual, icon, feels, humidity, wind) => {
        element.children('h2').text(city);
        element.children('h4.date').text(date);
        element.children('h4').children('span.actual').text(actual);

        let parent = element.children('div.row').children();
        parent.children('img.current-condition').attr('src', `http://openweathermap.org/img/wn/${icon}@2x.png`);
        parent.children('h6.feels').children('span.feels').text(feels);
        parent.children('h6.humid').children('span.humid').text(humidity);
        parent.children('h6.wind').children('span.wind').text(wind);
    }

    // sets content for each day card
    const setDay = (element, date, icon, temp, humidity) => {
        element.children('.card-header').children('p.text-center').text(date);
        element.children().children('img.icon').attr('src', `http://openweathermap.org/img/wn/${icon}.png`);
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
    // setCurrent(currentCol, '', '', '', '', '', '', '');
    
    // setDay(dayOne, date, icon, temp, humidity);
    // setDay(dayTwo, date, icon, temp, humidity);
    // setDay(dayThree, date, icon, temp, humidity);
    // setDay(dayFour, date, icon, temp, humidity);
    // setDay(dayFive, date, icon, temp, humidity);

    // setNight(nightOne, icon, temp, humidity);
    // setNight(nightTwo, icon, temp, humidity);
    // setNight(nightThree, icon, temp, humidity);
    // setNight(nightFour, icon, temp, humidity);
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
        // console.log($(this).children().children('p.icon').text('hello'));
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