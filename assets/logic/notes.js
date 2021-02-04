/* 
    goals for this project: 
    -single page application 
    -users load the page and are presented with
        -search box on left
        -cities list (clickable) from local storage 
        -clear list button if applicable
        -get weather from location button (icon?)
    
    -upon search (enter key or button)
        -current weather (for current time using moment)
        -five day forecast cards high / low temp & nighttime temp in-between cards
        -remove the overnight temp cards on smaller screens (either 5 cards per row or 1 card per row)


    workflow: 
    -create:
        statically-coded search bar
        cities list
        buttons
        current weather content box
        five day rows (for various screen sizes)

    -include moment to get local time
    -include location request button
    -current weather api which shows the current weather content card, and updates its content
    -five day weather api call 
    -set previous searches array in local storage
    -use cities list in local storage to render list to UI
    -add click listeners so that clicking a city name reloads that city's results
        -add a timestamp to each request, and if user makes the same request for the same city within 30 minutes, return statically-stored data from local storage


    --on layout: 
        if less than 768px, for 5-day section: display 2 rows -- 1 of 3 columns, 1 of 2 columns, with nighttime sky & temp info as part of each card




    css:
        rainy day: https://codepen.io/arickle/pen/XKjMZY
        clear sunny: https://codepen.io/nitinnairdev/pen/exVLow
        snowing: https://codepen.io/codeconvey/pen/xRzQay
        cloudy: https://codepen.io/jkavenka/pen/XYKqpO
        clear night: https://codepen.io/tulioha/pen/fkClK

*/