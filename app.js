"use strict";

searchBtn.addEventListener("click", searchWeather);
searchBar.addEventListener("keyup", function(e) {
    if (e.keyCode === 13) {
        searchWeather();
    }
});

function searchWeather() {
    
    loadingBox.style.display = "block";
    weatherBox.style.display = "none";
    
    var city = searchBar.value;
    
    if (city === null || city.trim() === "") {
        console.log("no value");
    }
    
    var ajax = new XMLHttpRequest();
    var apiKey = "&APPID=c70b4229442aa59935041d5e2daf5e3e";
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric${apiKey}`;
    
    ajax.open("GET", url, true);
    ajax.send();
    
    
    ajax.onreadystatechange = function() {
        if (ajax.readyState === 4 && ajax.status === 200) {
            var data = JSON.parse(ajax.responseText);
            weatherUpdate(data);
            console.log(data);
        } else if (ajax.readyState === 4 && ajax.status !== 200) {
            var error = JSON.parse(ajax.responseText);
            err(error);
        }
    }
}

function weatherUpdate(data) {
     
    loadingBox.style.display = "none";
//    weatherBox.style.display = "block";
    $(function() {
        $("#weather").fadeIn(1000);
    });
    
    if (data.main.temp > 10 && data.main.temp < 30) {
        weatherBox.style.backgroundColor = "rgb(0, 204, 0)";
    } else if (data.main.temp < 10) {
        weatherBox.style.backgroundColor = "rgb(102, 217, 255)";
    } else {
        weatherBox.style.backgroundColor = "rgb(255, 102, 0)";
    }
    
    weatherCity.innerHTML = data.name;
    weatherDescription.innerHTML = data.weather[0].description;
    weatherTemperature.innerHTML = data.main.temp + "&#8451";
    
    searchBar.value = "";
}

function err(error) {
    loadingBox.innerHTML = `${error.message}<br /> <p>Please enter a valid city name.</p>`;
    
    searchBar.value = "";
}