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

                setCurrentForecast(
                    data.name,
                    localDate(data.timezone).current,
                    Math.round(data.main.temp),
                    data.weather[0].icon,
                    Math.round(data.main.feels_like),
                    data.main.humidity,
                    data.wind.speed
                );

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
            console.log(currentForecast)

            $.ajax({
                url:`https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&cnt=40&appid=${key}&units=metric`,
                data: {
                    format: 'json'
                },
                error: function(err) {
                    console.log(err);
                },
                dataType: 'json',
                success: function(data) {
                    console.log('five day: ')
                    console.log(data)

                    let list = data.list;

                    const indexOfDate = (arr, key) => {
                        let result = arr.findIndex(i => i.dt_txt === key);
                        if (result !== -1) {
                            return true;
                        } else {
                            return false;
                        }
                    }

                    let dateObj = {
                        one: localDate(data.city.timezone).one.toISOString().substring(0,10),
                        two: localDate(data.city.timezone).two.toISOString().substring(0,10),
                        three: localDate(data.city.timezone).three.toISOString().substring(0,10),
                        four: localDate(data.city.timezone).four.toISOString().substring(0,10),
                        five: localDate(data.city.timezone).five.toISOString().substring(0,10),
                    }

                    let firstDay = list.filter(obj => {
                        if (indexOfDate(list, `${dateObj.one} 12:00:00`)) {
                            return obj.dt_txt === `${dateObj.one} 12:00:00`;
                        } else if (indexOfDate(list, `${dateObj.one} 13:00:00`)) {
                            return obj.dt_txt === `${dateObj.one} 13:00:00`;
                        } else if (indexOfDate(list, `${dateObj.one} 14:00:00`)) {
                            return obj.dt_txt === `${dateObj.one} 14:00:00`;
                        } else if (indexOfDate(list, `${dateObj.one} 15:00:00`)) {
                            return obj.dt_txt === `${dateObj.one} 15:00:00`;
                        } else if (indexOfDate(list, `${dateObj.one} 16:00:00`)) {
                            return obj.dt_txt === `${dateObj.one} 16:00:00`;
                        } else {
                            return obj.dt_txt === `${dateObj.one} 17:00:00`;
                        }
                    });
                    let secondDay = list.filter(obj => {
                        if (indexOfDate(list, `${dateObj.two} 12:00:00`)) {
                            return obj.dt_txt === `${dateObj.two} 12:00:00`;
                        } else if (indexOfDate(list, `${dateObj.two} 13:00:00`)) {
                            return obj.dt_txt === `${dateObj.two} 13:00:00`;
                        } else if (indexOfDate(list, `${dateObj.two} 14:00:00`)) {
                            return obj.dt_txt === `${dateObj.two} 14:00:00`;
                        } else if (indexOfDate(list, `${dateObj.two} 15:00:00`)) {
                            return obj.dt_txt === `${dateObj.two} 15:00:00`;
                        } else if (indexOfDate(list, `${dateObj.two} 16:00:00`)) {
                            return obj.dt_txt === `${dateObj.two} 16:00:00`;
                        } else {
                            return obj.dt_txt === `${dateObj.two} 17:00:00`;
                        }
                    });
                    let thirdDay = list.filter(obj => {
                        if (indexOfDate(list, `${dateObj.three} 12:00:00`)) {
                            return obj.dt_txt === `${dateObj.three} 12:00:00`;
                        } else if (indexOfDate(list, `${dateObj.three} 13:00:00`)) {
                            return obj.dt_txt === `${dateObj.three} 13:00:00`;
                        } else if (indexOfDate(list, `${dateObj.three} 14:00:00`)) {
                            return obj.dt_txt === `${dateObj.three} 14:00:00`;
                        } else if (indexOfDate(list, `${dateObj.three} 15:00:00`)) {
                            return obj.dt_txt === `${dateObj.three} 15:00:00`;
                        } else if (indexOfDate(list, `${dateObj.three} 16:00:00`)) {
                            return obj.dt_txt === `${dateObj.three} 16:00:00`;
                        } else {
                            return obj.dt_txt === `${dateObj.three} 17:00:00`;
                        }
                    });
                    let fourthDay = list.filter(obj => {
                        if (indexOfDate(list, `${dateObj.four} 12:00:00`)) {
                            return obj.dt_txt === `${dateObj.four} 12:00:00`;
                        } else if (indexOfDate(list, `${dateObj.four} 13:00:00`)) {
                            return obj.dt_txt === `${dateObj.four} 13:00:00`;
                        } else if (indexOfDate(list, `${dateObj.four} 14:00:00`)) {
                            return obj.dt_txt === `${dateObj.four} 14:00:00`;
                        } else if (indexOfDate(list, `${dateObj.four} 15:00:00`)) {
                            return obj.dt_txt === `${dateObj.four} 15:00:00`;
                        } else if (indexOfDate(list, `${dateObj.four} 16:00:00`)) {
                            return obj.dt_txt === `${dateObj.four} 16:00:00`;
                        } else {
                            return obj.dt_txt === `${dateObj.four} 17:00:00`;
                        }
                    });
                    let fifthDay = list.filter(obj => {
                        if (indexOfDate(list, `${dateObj.five} 12:00:00`)) {
                            return obj.dt_txt === `${dateObj.five} 12:00:00`;
                        } else if (indexOfDate(list, `${dateObj.five} 13:00:00`)) {
                            return obj.dt_txt === `${dateObj.five} 13:00:00`;
                        } else if (indexOfDate(list, `${dateObj.five} 14:00:00`)) {
                            return obj.dt_txt === `${dateObj.five} 14:00:00`;
                        } else if (indexOfDate(list, `${dateObj.five} 15:00:00`)) {
                            return obj.dt_txt === `${dateObj.five} 15:00:00`;
                        } else if (indexOfDate(list, `${dateObj.five} 16:00:00`)) {
                            return obj.dt_txt === `${dateObj.five} 16:00:00`;
                        } else {
                            return obj.dt_txt === `${dateObj.five} 17:00:00`;
                        }
                    });

                    let firstNight = list.filter(obj => {
                        if (indexOfDate(list, `${dateObj.two} 00:00:00`)) {
                            return obj.dt_txt === `${dateObj.two} 00:00:00`;
                        } else if (indexOfDate(list, `${dateObj.two} 01:00:00`)) {
                            return obj.dt_txt === `${dateObj.two} 01:00:00`;
                        } else if (indexOfDate(list, `${dateObj.two} 02:00:00`)) {
                            return obj.dt_txt === `${dateObj.two} 02:00:00`;
                        } else if (indexOfDate(list, `${dateObj.two} 03:00:00`)) {
                            return obj.dt_txt === `${dateObj.two} 03:00:00`;
                        } else if (indexOfDate(list, `${dateObj.two} 04:00:00`)) {
                            return obj.dt_txt === `${dateObj.two} 04:00:00`;
                        } else {
                            return obj.dt_txt === `${dateObj.two} 05:00:00`;
                        }
                    });
                    let secondNight = list.filter(obj => {
                        if (indexOfDate(list, `${dateObj.three} 00:00:00`)) {
                            return obj.dt_txt === `${dateObj.three} 00:00:00`;
                        } else if (indexOfDate(list, `${dateObj.three} 01:00:00`)) {
                            return obj.dt_txt === `${dateObj.three} 01:00:00`;
                        } else if (indexOfDate(list, `${dateObj.three} 02:00:00`)) {
                            return obj.dt_txt === `${dateObj.three} 02:00:00`;
                        } else if (indexOfDate(list, `${dateObj.three} 03:00:00`)) {
                            return obj.dt_txt === `${dateObj.three} 03:00:00`;
                        } else if (indexOfDate(list, `${dateObj.three} 04:00:00`)) {
                            return obj.dt_txt === `${dateObj.three} 04:00:00`;
                        } else {
                            return obj.dt_txt === `${dateObj.three} 05:00:00`;
                        }
                    });
                    let thirdNight = list.filter(obj => {
                        if (indexOfDate(list, `${dateObj.four} 00:00:00`)) {
                            return obj.dt_txt === `${dateObj.four} 00:00:00`;
                        } else if (indexOfDate(list, `${dateObj.four} 01:00:00`)) {
                            return obj.dt_txt === `${dateObj.four} 01:00:00`;
                        } else if (indexOfDate(list, `${dateObj.four} 02:00:00`)) {
                            return obj.dt_txt === `${dateObj.four} 02:00:00`;
                        } else if (indexOfDate(list, `${dateObj.four} 03:00:00`)) {
                            return obj.dt_txt === `${dateObj.four} 03:00:00`;
                        } else if (indexOfDate(list, `${dateObj.four} 04:00:00`)) {
                            return obj.dt_txt === `${dateObj.four} 04:00:00`;
                        } else {
                            return obj.dt_txt === `${dateObj.four} 05:00:00`;
                        }
                    });
                    let fourthNight = list.filter(obj => {
                        if (indexOfDate(list, `${dateObj.five} 00:00:00`)) {
                            return obj.dt_txt === `${dateObj.five} 00:00:00`;
                        } else if (indexOfDate(list, `${dateObj.five} 01:00:00`)) {
                            return obj.dt_txt === `${dateObj.five} 01:00:00`;
                        } else if (indexOfDate(list, `${dateObj.five} 02:00:00`)) {
                            return obj.dt_txt === `${dateObj.five} 02:00:00`;
                        } else if (indexOfDate(list, `${dateObj.five} 03:00:00`)) {
                            return obj.dt_txt === `${dateObj.five} 03:00:00`;
                        } else if (indexOfDate(list, `${dateObj.five} 04:00:00`)) {
                            return obj.dt_txt === `${dateObj.five} 04:00:00`;
                        } else {
                            return obj.dt_txt === `${dateObj.five} 05:00:00`;
                        }
                    });
                    
                    let cardDate = {
                        one: localDate(data.city.timezone).one.toDateString().substring(4,10),
                        two: localDate(data.city.timezone).two.toDateString().substring(4,10),
                        three: localDate(data.city.timezone).three.toDateString().substring(4,10),
                        four: localDate(data.city.timezone).four.toDateString().substring(4,10),
                        five: localDate(data.city.timezone).five.toDateString().substring(4,10),
                    }

                    setDay(dayOne, cardDate.one, firstDay[0].weather[0].icon, Math.round(firstDay[0].main.temp), firstDay[0].main.humidity);
                    setDay(dayTwo, cardDate.two, secondDay[0].weather[0].icon, Math.round(secondDay[0].main.temp), secondDay[0].main.humidity);
                    setDay(dayThree, cardDate.three, thirdDay[0].weather[0].icon, Math.round(thirdDay[0].main.temp), thirdDay[0].main.humidity);
                    setDay(dayFour, cardDate.four, fourthDay[0].weather[0].icon, Math.round(fourthDay[0].main.temp), fourthDay[0].main.humidity);
                    setDay(dayFive, cardDate.five, fifthDay[0].weather[0].icon, Math.round(fifthDay[0].main.temp), fifthDay[0].main.humidity);

                    setNight(nightOne, firstNight[0].weather[0].main, Math.round(firstNight[0].main.temp), firstNight[0].main.humidity);
                    setNight(nightTwo, secondNight[0].weather[0].main, Math.round(secondNight[0].main.temp), secondNight[0].main.humidity);
                    setNight(nightThree, thirdNight[0].weather[0].main, Math.round(thirdNight[0].main.temp), thirdNight[0].main.humidity);
                    setNight(nightFour, fourthNight[0].weather[0].main, Math.round(fourthNight[0].main.temp), fourthNight[0].main.humidity);
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
        let current = new Date(combined);
    
        let result = {
            current: current.toDateString().substring(4),
            one: new Date(combined + dayInMilliseconds * 1),
            two: new Date(combined + (dayInMilliseconds * 2)),
            three: new Date(combined + (dayInMilliseconds * 3)),
            four: new Date(combined + (dayInMilliseconds * 4)),
            five: new Date(combined + (dayInMilliseconds * 5))
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

    const setCurrentForecast = (name, date, temp, icon, feels, humidity, wind) => {
        currentForecast = {
            name: name,
            date: date,
            temp: temp,
            icon: icon,
            feels: feels,
            humidity: humidity,
            wind: wind
        }
    }

    var currentForecast = {
        name: '',
        temp: '',
        date: '',
        icon: '',
        feels: '',
        humidity: '',
        wind: ''
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