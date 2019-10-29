# Homework-6

This web application is a weather dashboard that can display current weather and a five day forecast based on the city selected by the user. This webpage was constructed using HTML, CSS, bootstrap, JavaScript, jQuery, and a weather API.  Together, they build a full functionable we application.  

On the left side of the screen is a search bar where a user can input a specific city in which they would like to see the weather.  Using jQuery and an onclick event, the text value of their search is implemented in to an AJAX call for the weather API.  Once it has been implemented, the data is stored as an object in the browser.  From that object, the data is posted to the page in both a single day format and a 5 day forecast format.  Additionally, the page also uses local storage to save the past searches as buttons and remain on the page when refreshed.
