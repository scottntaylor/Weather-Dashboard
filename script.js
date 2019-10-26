
//AJAX for API

var cities = []

const apiKey = "e0818257cd1cec98e6e8a758e431816e"
const proxy = "https://cors-anywhere.herokuapp.com/"



$("#go").on("click", function (event) {
    event.preventDefault();
    $("#appendHere").empty();
    var city = $("#search").val();
    console.log(city);
    getWeather(city);
    addCity(city);
    saveToStorage(city);

});


function getWeather(city) {
    var queryURL = `${proxy}api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(response.name);

        var weather = {
            cityName: response.name,
            date: moment(new Date()).format("MM/DD/YYYY"),
            icon: response.weather[0].icon,
            temp: response.main.temp,
            humidity: response.main.humidity,
            wind: response.wind.speed
        };

        displayWeatherData(weather, city);

        var lon = response.coord.lon;
        var lat = response.coord.lat;
        console.log(lon, lat);

        getUV(lon, lat);
        console.log(getUV);

        getFiveDay(city);
    })
}

function getUV(lon, lat) {
    var UVAPI = `${proxy}api.openweathermap.org/data/2.5/uvi/forecast?appid=${apiKey}&lat=${lat}&lon=${lon}`

    $.ajax({
        url: UVAPI,
        method: "GET"
    }).then(function (response) {
        console.log(response[0].value);
        var UV = response[0].value;
        displayUV(UV);

    })
}

function getFiveDay(city) {

    var fiveDayAPI = `${proxy}api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&APPID=${apiKey}`

    $.ajax({
        url: fiveDayAPI,
        method: "GET"
    }).then(function (response) {
        console.log(response);


        for (var i = 4; i < 37; i+=8) {

            var fiveDayData = {
                date: response.list[i].dt_txt,
                temp: response.list[i].main.temp,
                humidity: response.list[i].main.humidity,
            }

            console.log(fiveDayData);
            displayFiveDay(fiveDayData, city);
        }

    })

}


function displayWeatherData(weather, cityName) {
    // Pull data from API
    console.log(weather);
    $("#cityndate").text(weather.cityName + " " + weather.date);
    var iconcode = weather.icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    $('#wicon').attr('src', iconurl);
    $("#temp").text("Temperature: " + weather.temp + " F");
    $("#humidity").text("Humidity: " + weather.humidity + "%");
    $("#wind").text("Wind: " + weather.wind + " MPH");


}
function displayUV(UV) {
    $("#UV").text("UV: " + UV);
}

function displayFiveDay(fiveDayData) {
    
    var displayContainer = $(`<div class="col"></div>`)
    var dayDisplay = $(`<div class="card"></div>`)
    // var img = $(`<img src="..." class="card-img-top" alt="...">`)
    var cardbody = $(`<div class="card-body"></div>`)
    var cardtitle = $(` <h5 class="card-text">${fiveDayData.date}</h5>`)
    var cardtitle2 = $(` <h5 class="card-text">${fiveDayData.temp}</h5>`)
    var cardtitle3 = $(` <h5 class="card-text">${fiveDayData.humidity}</h5>`)
    cardbody.append(cardtitle, cardtitle2, cardtitle3);
    dayDisplay.append(cardbody);
    displayContainer.append(dayDisplay);
    
    //To Do
    var forecastDiv = $("<div id=fivedate></div>")
    // $("<div id=fivedate" + ).text(fiveDayData.date);
    forecastDiv.text("Temp: " + fiveDayData.temp + " F");
    $("#appendHere").append(displayContainer);

    // $("#fivehumidity").text("Humidity: " + fiveDayData.humidity + "%");
}
function addCity(city) {
    $("<button id=cityButton>" + city + "</button>").appendTo('#cities');
}

$("#cities").on("click", "#cityButton", function (event) {
    event.preventDefault();
    $("#appendHere").empty();
    var buttonValue = $(this).text();
    console.log(buttonValue);
    getWeather(buttonValue);
})

function saveToStorage(city) {
    var cityData = {
        cities: []
    }
    var savedCity = JSON.parse(localStorage.getItem("city"))
    cityData.cities = savedCity.cities;
    cityData.cities.push(city);
    localStorage.setItem("city", JSON.stringify(cityData))
    
}

function getStorage(){
   var savedCity = JSON.parse(localStorage.getItem("city"))
   console.log(savedCity);
   for(i=0; i <savedCity.cities.length; i++){
   addCity(savedCity.cities[i]);
   }
}
getStorage();