function p(){
    console.log(arguments);
}
var lat=0,lon=0;
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
}
else {
    alert('Geolocation is not supported');
}

function error() {
    alert("Couldn't find you! Please Turn on your Location and reload again!!");
}

function success(position) {

    lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log(lat,lon);

    let fatching = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=874fe07570267eb296db81c47a4960c7`;
    fetch(fatching)
    .then(response => response.json())
    .then(data => extractData(data));

    initMap();
}

// Initialize and add the map
function initMap() {
    console.log("map " +lat,lon);
    var uluru = {lat: lat, lng: lon};
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 10, center: uluru});
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: uluru, map: map});
  }
function extractData(data){
    console.log(data);
    let country = data.sys.country;
    let city = data.name;

    let temp = (data.main.temp - 273).toFixed(2);
    let minTemp = (data.main.temp_min - 273).toFixed(2);
    let maxTemp = (data.main.temp_max - 273).toFixed(2);

    let sky = data.weather[0].main;
    let icon = data.weather[0].icon;

    let windSpeed = data.wind.speed;

    p(city,country,temp,minTemp,maxTemp,sky,icon,windSpeed);
    document.getElementById("data").innerText = JSON.stringify(data);
}
