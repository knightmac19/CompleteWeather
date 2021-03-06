# CompleteWeather
Local &amp; international weather application powered by openweathermap API  

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  

[Deployed site](https://knightmac19.github.io/CompleteWeather/)

## <a name="contents"></a>  Contents
- [Description](#description)
- [Usage](#usage)
- [Responsive Design](#responsive)
- [API](#API)
- [Challenges](#challenges)
- [License](#license)
- [Contributors](#contributors)  

## <a name="description"></a> Description 
[Contents](#contents)  
Single page weather application that allows users to query current and four day weather information. Weather data supplied by [openweathermap's API](https://openweathermap.org/api). Users can search for large cities. To emphasize simplicity, the application returns data for the first instance of a city name. While there's a [Rome, NY](https://romenewyork.com/), if a user searches for 'Rome,' then weather information for the capital of Italy will be returned. 

## <a name="usage"></a> Usage
[Contents](#contents)  
After a search the application displays the city name as returned from the API, current date in the queried locale, current temperature, weather icon, what the current temperature feels like (after wind chill / humidity), wind speed, and humidity level. All displayed values are metric. 

![Honolulu Weather](https://github.com/knightmac19/CompleteWeather/blob/main/assets/img/Honolulu_Weather.png)  

Below the current weather information, 7 cards are displayed -- four days / 3 nights. The day cards give the date, weather icon, conditions, temperature, and humidity level, while the night cards display the same information *sans* the date.  

![Cairo Four Day Cards](https://github.com/knightmac19/CompleteWeather/blob/main/assets/img/Cairo_Four_Day_Cards.png)  

On large screens, a column will appear to the left housing the search bar and a list of previous searches. Clicking a previous search will reload that city's weather data. The number of buttons is capped at 10. Previous search buttons are only added if the API returns a successful response with valid data, so there's no concern about *'weri;lk'* being added as a previous search.  

![Previous Searches on Page Load](https://github.com/knightmac19/CompleteWeather/blob/main/assets/img/Previous_Searches.png)  

If the API does not return a successful response a modal will inform the user that the search didn't produce any results.

![Modal with Error Message](https://github.com/knightmac19/CompleteWeather/blob/main/assets/img/Error_Modal.png)  

## <a name="responsive"></a> Responsive Design
[Contents](#contents)  
Development began with designing the desired layout. The application displays all information cleanly with two main layouts: screens less than 600px wide and screens more than 600px wide. Beyond distinct layous, content areas resize themselves proportionally to the screen as the width grows or shrinks. 

Mobile - less than 600px  

![Mobile Design 1](https://github.com/knightmac19/CompleteWeather/blob/main/assets/img/Mobile_1.png)

![Mobile Design 2](https://github.com/knightmac19/CompleteWeather/blob/main/assets/img/Mobile_2.png)   

Tablet - more than 600px  

![Tablet Design](https://github.com/knightmac19/CompleteWeather/blob/main/assets/img/Tablet.png)  

Laptop / Desktop - more than 992px  

![Laptop Design](https://github.com/knightmac19/CompleteWeather/blob/main/assets/img/Laptop.png)  


## <a name="API"></a> API
[Contents](#contents)  
Two queries are made to the API and data is returned in JSON format. The first query asks the API for current weather information for the queried city.  

![Current Weather JSON Response](https://github.com/knightmac19/CompleteWeather/blob/main/assets/img/Current_Res.png)  

If the first query is successful, the application asks the API for 5 day weather information. The response includes general information about the city and then an array of objects with weather information for 3-hour intervals.

![Future Weather JSON Response](https://github.com/knightmac19/CompleteWeather/blob/main/assets/img/Future_Headers.png)  

![Array Index JSON Response](https://github.com/knightmac19/CompleteWeather/blob/main/assets/img/Future_Indices.png)  

## <a name="challenges"></a> Challenges
[Contents](#contents)  

## <a name="license"></a> License
[Contents](#contents)  

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## <a name="contributors"></a> Contributors
[Contents](#contents)  

Patrick Dunn // [knightmac19](https://github.com/knightmac19)

Email me with questions &/or suggestions at [pmdunn78@gmail.com](mailto:pmdunn78@gmail.com)




