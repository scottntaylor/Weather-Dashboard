
//AJAX for API

var cities = []

const apiKey = "e0818257cd1cec98e6e8a758e431816e"
const proxy = "https://cors-anywhere.herokuapp.com/"



$("#go").on("click", function (event) {
    event.preventDefault();
    var city = $("#search").val();
    console.log(city);
    var queryURL = `${proxy}api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`

    function getUV(lon, lat) {
        var UVAPI = `${proxy}api.openweathermap.org/data/2.5/uvi/forecast?appid=${apiKey}&lat=${lat}&lon=${lon}`

        $.ajax({
            url: UVAPI,
            method: "GET"
        }).then(function (response) {
            console.log(response);
        }
        )}

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(response.name);

        var cityName = response.name;
        var date = moment(new Date()).format("MM/DD/YYYY");
        var temp = response.main.temp;
        var humidity = response.main.humidity;
        var wind = response.wind.speed;
        var lon = response.coord.lon;
        var lat = response.coord.lat;
        console.log(lon, lat);
        getUV(lon, lat);
        console.log(getUV);
    })
})


//On Click Function
function searchCity(response) {

    //Grap city from API
}
searchCity();
function displayCityData() {
    // Pull data from API
    $("#cityndate").text(response.name);

}


// function addCity(response) {
//     $("#cities").append("<div>" + city + "<div>");

// }
// addCity();
