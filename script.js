
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

        displayWeatherData(response, city);

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
    })
}


//On Click Function
// function searchCity(response) {

// //     //Grap city from API
// // }
// searchCity();

function displayWeatherData(response, cityName) {

    var cityName = response.name;
    var date = moment(new Date()).format("MM/DD/YYYY");
    var temp = response.main.temp;
    var humidity = response.main.humidity;
    var wind = response.wind.speed;

    // Pull data from API
    $("#cityndate").text(cityName + " " + date);
    var iconcode = response.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    $('#wicon').attr('src', iconurl);
    $("#temp").text(temp);
    $("#humidity").text(humidity);
    $("#wind").text(wind);
    // $("#UV").text(UV);

}

function fiveDayForecast() {
    //To Do
}
// function addCity(response) {
//     $("#cities").append("<div>" + city + "<div>");

// }
// addCity();
