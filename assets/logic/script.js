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
    var fiveLg = $('.five-lg');
    var modal = $('#exampleModal');

    currentCol.hide();
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
                        if (indexOfDate(list, `${dateObj.four} 20:00:00`)) {
                            return obj.dt_txt === `${dateObj.four} 20:00:00`;
                        } else if (indexOfDate(list, `${dateObj.four} 21:00:00`)) {
                            return obj.dt_txt === `${dateObj.four} 21:00:00`;
                        } else if (indexOfDate(list, `${dateObj.four} 22:00:00`)) {
                            return obj.dt_txt === `${dateObj.four} 22:00:00`;
                        } else if (indexOfDate(list, `${dateObj.four} 23:00:00`)) {
                            return obj.dt_txt === `${dateObj.four} 23:00:00`;
                        } else if (indexOfDate(list, `${dateObj.five} 00:00:00`)) {
                            return obj.dt_txt === `${dateObj.five} 00:00:00`;
                        } else {
                            return obj.dt_txt === `${dateObj.four} 19:00:00`;
                        }
                    });
                    let cardDate = {
                        one: localDate(data.city.timezone).one.toDateString().substring(4,10),
                        two: localDate(data.city.timezone).two.toDateString().substring(4,10),
                        three: localDate(data.city.timezone).three.toDateString().substring(4,10),
                        four: localDate(data.city.timezone).four.toDateString().substring(4,10),
                        five: localDate(data.city.timezone).five.toDateString().substring(4,10),
                    }

                    setDayOne(cardDate.one, firstDay[0].weather[0].icon, firstDay[0].weather[0].main, Math.round(firstDay[0].main.temp), firstDay[0].main.humidity);
                    setDayTwo(cardDate.two, secondDay[0].weather[0].icon, secondDay[0].weather[0].main, Math.round(secondDay[0].main.temp), secondDay[0].main.humidity);
                    setDayThree(cardDate.three, thirdDay[0].weather[0].icon, thirdDay[0].weather[0].main, Math.round(thirdDay[0].main.temp), thirdDay[0].main.humidity);
                    setDayFour(cardDate.four, fourthDay[0].weather[0].icon, fourthDay[0].weather[0].main, Math.round(fourthDay[0].main.temp), fourthDay[0].main.humidity);

                    setNightOne(firstNight[0].weather[0].icon, firstNight[0].weather[0].main, Math.round(firstNight[0].main.temp), firstNight[0].main.humidity);
                    setNightTwo(secondNight[0].weather[0].icon, secondNight[0].weather[0].main, Math.round(secondNight[0].main.temp), secondNight[0].main.humidity);
                    setNightThree(thirdNight[0].weather[0].icon, thirdNight[0].weather[0].main, Math.round(thirdNight[0].main.temp), thirdNight[0].main.humidity);
                    setNightFour(fourthNight[0].weather[0].icon, fourthNight[0].weather[0].main, Math.round(fourthNight[0].main.temp), fourthNight[0].main.humidity);

                    setDay(dayOne, cardDate.one, firstDay[0].weather[0].icon, firstDay[0].weather[0].main, Math.round(firstDay[0].main.temp), firstDay[0].main.humidity);
                    setDay(dayTwo, cardDate.two, secondDay[0].weather[0].icon, secondDay[0].weather[0].main, Math.round(secondDay[0].main.temp), secondDay[0].main.humidity);
                    setDay(dayThree, cardDate.three, thirdDay[0].weather[0].icon, thirdDay[0].weather[0].main, Math.round(thirdDay[0].main.temp), thirdDay[0].main.humidity);
                    setDay(dayFour, cardDate.four, fourthDay[0].weather[0].icon, fourthDay[0].weather[0].main, Math.round(fourthDay[0].main.temp), fourthDay[0].main.humidity);

                    setNight(nightOne, firstNight[0].weather[0].icon, firstNight[0].weather[0].main, Math.round(firstNight[0].main.temp), firstNight[0].main.humidity);
                    setNight(nightTwo, secondNight[0].weather[0].icon, secondNight[0].weather[0].main, Math.round(secondNight[0].main.temp), secondNight[0].main.humidity);
                    setNight(nightThree, thirdNight[0].weather[0].icon, thirdNight[0].weather[0].main, Math.round(thirdNight[0].main.temp), thirdNight[0].main.humidity);
                    setNight(nightFour, fourthNight[0].weather[0].icon, fourthNight[0].weather[0].main, Math.round(fourthNight[0].main.temp), fourthNight[0].main.humidity);
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

    let dayOnePrimary = true;
    let dayTwoPrimary = true;
    let dayThreePrimary = true;
    let dayFourPrimary = true;
    var currentNight = $('.current-night');
    var cities = $('#cities');
    
    // grab five-day cards for content manipulation
    var dayOne = $('#day-one');
    var dayTwo = $('#day-two');
    var dayThree = $('#day-three');
    var dayFour = $('#day-four');

    var nightOne = $('#night-one');
    var nightTwo = $('#night-two');
    var nightThree = $('#night-three');
    var nightFour = $('#night-four');

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

    const setDayOne = (date, icon, condition, temp, humidity) => {
        daysForecast.one = {
            date: date,
            icon: icon,
            condition: condition,
            temp: temp,
            humidity: humidity
        }
    }

    const setDayTwo = (date, icon, condition, temp, humidity) => {
        daysForecast.two = {
            date: date,
            icon: icon,
            condition: condition,
            temp: temp,
            humidity: humidity
        }
    }

    const setDayThree = (date, icon, condition, temp, humidity) => {
        daysForecast.three = {
            date: date,
            icon: icon,
            condition: condition,
            temp: temp,
            humidity: humidity
        }
    }

    const setDayFour = (date, icon, condition, temp, humidity) => {
        daysForecast.four = {
            date: date,
            icon: icon,
            condition: condition,
            temp: temp,
            humidity: humidity
        }
    }

    const setNightOne = (icon, condition, temp, humidity) => {
        nightsForecast.one = {
            icon: icon,
            condition: condition,
            temp: temp,
            humidity: humidity
        }
    }

    const setNightTwo = (icon, condition, temp, humidity) => {
        nightsForecast.two = {
            icon: icon,
            condition: condition,
            temp: temp,
            humidity: humidity
        }
    }

    const setNightThree = (icon, condition, temp, humidity) => {
        nightsForecast.three = {
            icon: icon,
            condition: condition,
            temp: temp,
            humidity: humidity
        }
    }

    const setNightFour = (icon, condition, temp, humidity) => {
        nightsForecast.four = {
            icon: icon,
            condition: condition,
            temp: temp,
            humidity: humidity
        }
    }

    var daysForecast = {
        one: {
            date: '',
            icon: '',
            condition: '',
            temp: '',
            humidity: ''
        },
        two: {
            date: '',
            icon: '',
            condition: '',
            temp: '',
            humidity: ''
        },
        three: {
            date: '',
            icon: '',
            condition: '',
            temp: '',
            humidity: ''
        },
        four: {
            date: '',
            icon: '',
            condition: '',
            temp: '',
            humidity: ''
        }
    }

    var nightsForecast = {
        one: {
            icon: '',
            condition: '',
            temp: '',
            humidity: ''
        },
        two: {
            icon: '',
            condition: '',
            temp: '',
            humidity: ''
        },
        three: {
            icon: '',
            condition: '',
            temp: '',
            humidity: ''
        },
        four: {
            icon: '',
            condition: '',
            temp: '',
            humidity: ''
        }
    }

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
    const setDay = (element, date, icon, condition, temp, humidity) => {
        element.children('.card-header').children('h6.text-center').text(date);
        element.children().children('img.icon').attr('src', `http://openweathermap.org/img/wn/${icon}.png`);
        element.children().children('p.condition').text(condition);
        element.children().children().children('span.temp').text(temp);
        element.children().children().children('span.humidity').text(humidity);
    }

    // set content for each night card
    const setNight = (element, icon, condition, temp, humidity) => {
        element.children('img.icon').attr('src', `http://openweathermap.org/img/wn/${icon}.png`);
        element.children('p.condition').text(condition);
        element.children().children('span.temp').text(temp);
        element.children().children('span.humidity').text(humidity);
    }

    if (window.innerWidth < 768) {
        cities.addClass('collapse');
    }
    
    // initial width check for layout
    if (window.innerWidth <= 600) {
        $('.card-day').each(function() {
            $(this).css('width','75%');
            $(this).removeClass('bg-primary').addClass('five-day');
        });
        currentCol.removeClass('default-lg-bg').addClass('day-background');
    } else {
        $('.card-day').each(function() {
            $(this).css('width','22%');
        });
        currentNight.addClass('text-center');
    }

    // listening to update UI as width changes
    const check = () => {
        if (window.innerWidth < 768) {
            cities.addClass('collapse');
        } else {
            cities.removeClass('collapse');
        }

        if (window.innerWidth <= 600 ) {
            $('.card-day').each(function() {
                $(this).css('width','75%');
                $(this).removeClass('bg-primary').addClass('five-day');
            });
            currentCol.removeClass('default-lg-bg').addClass('day-background');
        } else {
            $('.card-day').each(function() {
                $(this).css('width','22%');
                $(this).removeClass('five-day five-night').addClass('bg-primary');
            });
            currentCol.removeClass('night-background day-background').addClass('default-lg-bg');
        }
    };

    dayOne.on('click', function() {
        if (window.innerWidth <= 600) {
            if (dayOnePrimary) {
                let obj = nightsForecast.one
                setDay(dayOne, daysForecast.one.date, obj.icon, obj.condition, obj.temp, obj.humidity);
                $('#day-one').removeClass('bg-primary five-day').addClass('five-night');
                dayOnePrimary = false;        
            } else {
                let obj = daysForecast.one
                setDay(dayOne, obj.date, obj.icon, obj.condition, obj.temp, obj.humidity);
                $('#day-one').removeClass('five-night').addClass('five-day');
                dayOnePrimary = true;
            }
        }
        return;
    });

    dayTwo.on('click', function() {
        if (window.innerWidth <= 600) {
            if (dayTwoPrimary) {
                $('#day-two').removeClass('bg-primary five-day').addClass('five-night');
                let obj = nightsForecast.two
                setDay(dayTwo, daysForecast.two.date, obj.icon, obj.condition, obj.temp, obj.humidity);
                dayTwoPrimary = false;        
            } else {
                $('#day-two').removeClass('five-night').addClass('five-day');
                let obj = daysForecast.two
                setDay(dayTwo, obj.date, obj.icon, obj.condition, obj.temp, obj.humidity);
                dayTwoPrimary = true;
            }
        }
        return;
    });

    dayThree.on('click', function() {
        if (window.innerWidth <= 600) {
            if (dayThreePrimary) {
                $('#day-three').removeClass('bg-primary five-day').addClass('five-night');
                let obj = nightsForecast.three
                setDay(dayThree, daysForecast.three.date, obj.icon, obj.condition, obj.temp, obj.humidity);
                dayThreePrimary = false;        
            } else {
                $('#day-three').removeClass('five-night').addClass('five-day');
                let obj = daysForecast.three
                setDay(dayThree, obj.date, obj.icon, obj.condition, obj.temp, obj.humidity);
                dayThreePrimary = true;
            }
        }
        return;
    });

    dayFour.on('click', function() {
        if (window.innerWidth <= 600) {
            if (dayFourPrimary) {
                $('#day-four').removeClass('bg-primary five-day').addClass('five-night');
                let obj = nightsForecast.four
                setDay(dayFour, daysForecast.four.date, obj.icon, obj.condition, obj.temp, obj.humidity);
                dayFourPrimary = false;        
            } else {
                $('#day-four').removeClass('five-night').addClass('five-day');
                let obj = daysForecast.four
                setDay(dayFour, obj.date, obj.icon, obj.condition, obj.temp, obj.humidity);
                dayFourPrimary = true;
            }
        }
        return;
    });

    $(window).resize(()=> {
        check();
    });

});