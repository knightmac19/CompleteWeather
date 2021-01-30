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
*/