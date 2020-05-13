
// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");
const button= document.querySelector(".butt");
let input=document.querySelector(".textinput");

const KELVIN = 273;

// API KEY
const key = "7c75f3c7c89189edb8cdfebfdc4e36c4";

async function getData() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${key}`)
    const data = await response.json();
    return data;
}

button.addEventListener('click', function(e){
    getData()
    .then(data => {
        data.temperature = {
             unit : "celsius",
             value : Math.floor(data.main.temp - KELVIN)
        };
        iconElement.innerHTML = `<img src="icons/${data.weather[0].icon}.png"/>`;
        tempElement.innerHTML = `${data.temperature.value}°<span>C</span>`;
        descElement.innerHTML = data.weather[0].description;
        locationElement.innerHTML = `${data.name}, ${data.sys.country}`;
   
        tempElement.addEventListener("click", convert());
    })
   
    .catch(err => errormessage());
})

function errormessage(){
    if(data.city == undefined){
        notificationElement.style.display = "block";
        notificationElement.innerHTML = "<p>Invalid City Name</p>";
        input=input.reset();
    };
};

// Celcius to Farenhiet conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
};

// CHANGING TEMPERATURE UNIT WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement.addEventListener("click", function(){
    if(data.temperature.value === undefined) return;
    
    if(data.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(data.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        data.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${data.temperature.value}°<span>C</span>`;
        data.temperature.unit = "celsius"
    };
});
