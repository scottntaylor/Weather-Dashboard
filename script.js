
//AJAX for API

var cities = []

const apiKey = "e0818257cd1cec98e6e8a758e431816e"
const proxy = "https://cors-anywhere.herokuapp.com/"



$("#go").on("click", function (event) {
    event.preventDefault();
    var city = $("#search").val();
    console.log(city);
    getWeather(city);
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


//On Click Function
// function searchCity(response) {

// //     //Grap city from API
// // }
// searchCity();

function displayWeatherData(weather, cityName) {
    // Pull data from API
    $("#cityndate").text(weather.cityName + " " + weather.date);
    // var iconcode = weather[0].icon;
    // // var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    // $('#wicon').attr('src', iconurl);
    $("#temp").text("Temperature: " + weather.temp + " F");
    $("#humidity").text("Humidity: " + weather.humidity + "%");
    $("#wind").text("Wind: " + weather.wind + " MPH");
    // $("#UV").text(UV);

}
function displayUV(UV){
    $("#UV").text("UV: " + UV);
}

function fiveDayForecast() {
    //To Do
}
// function addCity(response) {
//     $("#cities").append("<div>" + city + "<div>");

// }
// addCity();
