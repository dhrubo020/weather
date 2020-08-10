function p(){
    console.log(arguments);
}
window.onload = function () {
var lat=0,lon=0;
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
}
else {
    alert('Geolocation is not supported');
}

function error() {
    alert("Couldn't find you! Please Turn on your Location!!");
}

function success(position) {
    
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log(lat,lon);

    let fatching = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=874fe07570267eb296db81c47a4960c7`;
    fetch(fatching)
    .then(response => response.json())
    .then(data => extractData(data))
    .catch(function(error){
        alert("Error!!");
    })
    dateTime();
    //initMap();
}

// Initialize and add the map
// function initMap() {
//     console.log("map " +lat,lon);
//     var uluru = {lat: lat, lng: lon};
//     // The map, centered at Uluru
//     var map = new google.maps.Map(
//         document.getElementById('map'), {zoom: 10, center: uluru});
//     // The marker, positioned at Uluru
//     var marker = new google.maps.Marker({position: uluru, map: map});
//   }
function extractData(data){
    console.log(data);
    let country = data.sys.country;
    let city = data.name;

    let temp = (data.main.temp - 273).toFixed(2);
    let minTemp = (data.main.temp_min - 273).toFixed(1);
    let maxTemp = (data.main.temp_max - 273).toFixed(1);

    let sky = data.weather[0].main;
    let icon = data.weather[0].icon;
    let description = data.weather[0].description;
    let windSpeed = data.wind.speed;
    let iconURL =  `http://openweathermap.org/img/w/${icon}.png`;
    let iconshow = `http://api.openweathermap.org/img/w/${icon}.png`;

    let sunrise = sun(data.sys.sunrise);
    let sunset = sun(data.sys.sunset);

    
    p(city,country,temp,minTemp,maxTemp,sky,icon,windSpeed);
    //document.getElementById("data").innerText = JSON.stringify(data);
    console.log(city);
    document.getElementById("place").innerText = ` ${city}, ${country}`;
    document.getElementById("temp").innerText = `${temp}℃`;
    document.getElementById("condition").innerText = description;
    // document.getElementById("min").innerText = minTemp+"℃";
    // document.getElementById("max").innerText = maxTemp+"℃";
    document.getElementById("wind").innerText = `Wind: ${windSpeed} Km/h`;
    document.getElementById("icon").innerHTML = `<img src=${iconURL} class="img-fluid" alt="">`;
    document.getElementById("sunrise").innerText = sunrise;
    document.getElementById("sunset").innerText = sunset;
}

function sun(val=0){
    let sec = val;
    let date = new Date(sec * 1000);
    let time = date.toLocaleTimeString();
    return time;
}

function dateTime(){

    var d = new Date();
    var year = d.getFullYear();
    var month =  "";
    var dayName = "";

    if (d.getMonth() == 0){month = "January"};
    if (d.getMonth() == 1){month = "February"};
    if (d.getMonth() == 2){month = "March"};
    if (d.getMonth() == 3){month = "April"};
    if (d.getMonth() == 4){month = "May"};
    if (d.getMonth() == 5){month = "June"};
    if (d.getMonth() == 6){month = "July"};
    if (d.getMonth() == 7){month = "August"};
    if (d.getMonth() == 8){month = "September"};
    if (d.getMonth() == 9){month = "October"};
    if (d.getMonth() == 10){month = "November"};
    if (d.getMonth() == 11){month = "December"};

    if (d.getUTCDay() == 0){dayName = "Sunday"};
    if (d.getUTCDay() == 1){dayName = "Monday"};
    if (d.getUTCDay() == 2){dayName = "Tuesday"};
    if (d.getUTCDay() == 3){dayName = "Wednesday"};
    if (d.getUTCDay() == 4){dayName = "Thursday"};
    if (d.getUTCDay() == 5){dayName = "Friday"};
    if (d.getUTCDay() == 6){dayName = "Saturday"};

    
     var day = d.getDate();

     var time = d.toLocaleString();
     time = time.slice(11,time.length);
     console.log(year,month,day,dayName,time);

     document.getElementById("date").innerText = `${dayName}, ${day} ${month}, ${year} | ${time}`;
}


    let click = document.getElementById("input");
    p(click)
    if (click) {
        click.addEventListener("click", function () {
            
             let city = document.getElementById("city").value;
             let fatching = `https://api.openweathermap.org/data/2.5/weather?q=${city}&&appid=874fe07570267eb296db81c47a4960c7`;
             fetch(fatching)
             .then(response => response.json())
             .then(data =>extractData(data))
             .catch(function(error){
                 alert("City not found!!");
             })
             dateTime();
        })
    }
}

