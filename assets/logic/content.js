const content = {
    resetFalse: function() {
        console.log('reset here')
        currentWeatherPrimary = false;
        dayOnePrimary = false;
        dayTwoPrimary = false;
        dayThreePrimary = false;
        dayFourPrimary = false;
        dayFivePrimary = false;
    },
    setFiveDayBackgrounds: function() {
        console.log('setFiveDayBackgrounds');
    }
}

module.exports = content;