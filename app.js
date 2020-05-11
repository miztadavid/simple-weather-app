
// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");
const button= document.querySelector(".butt");
let input=document.querySelector(".textinput");

// App data
const weather = {};

weather.temperature = {
    unit : "celsius"
};

// APP CONSTS AND VARS
const KELVIN = 273;

// API KEY
const key = "7c75f3c7c89189edb8cdfebfdc4e36c4";

//CALL EVENT LISTENER FOR BUTTON CLICK
button.addEventListener('click', function(e){
  
    let api =`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
          return response.json();
        })
        
        .then(function(data){
            weather[temperature][value] = Math.floor(data.main.temp - KELVIN);
            weather[description] = data.weather[0].description;
            weather[iconId] = data.weather[0].icon;
            weather[city] = data.name;
            weather[country] = data.sys.country;
            weather[search] = [data.input].name;
            weather[position] = [data.coord.lat, data.coord.lon];
        })
      
        .catch(err=>errormessage() );
     
        displayWeather();

});

// DISPLAY WEATHER VALUES TO UI/ USER
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;

};

function errormessage(){
    if(weather.city == undefined){
        notificationElement.style.display = "block";
        notificationElement.innerHTML = "<p>Invalid City Name</p>";
        input.value='';
    };
};

// Celcius to Farenhiet conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
};

// CHANGING TEMPERATURE UNIT WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    };
});
