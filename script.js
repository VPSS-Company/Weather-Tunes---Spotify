```javascript
// ===============================
// WEATHERTUNES
// ===============================


// ---------- API KEY ----------

const API_KEY =
"c7381768e61790666afe986230e94282";



// ---------- ELEMENTS ----------

const cityEl =
document.getElementById("city");

const tempEl =
document.getElementById("temp");

const conditionEl =
document.getElementById("condition");

const humidityEl =
document.getElementById("humidity");

const windEl =
document.getElementById("wind");

const dateEl =
document.getElementById("date");

const video =
document.getElementById("bg-video");

const spotify =
document.getElementById("spotify-player");

const cityInput =
document.getElementById("city-input");

const searchBtn =
document.getElementById("search-btn");

const locationBtn =
document.getElementById("location-btn");



// ---------- PLAYLISTS ----------

const playlists = {

rain:
"https://open.spotify.com/embed/playlist/37i9dQZF1DX2mKzQ3tl6gD",

sunny:
"https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd",

cloudy:
"https://open.spotify.com/embed/playlist/37i9dQZF1DX4WYpdgoIcn6",

night:
"https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO",

storm:
"https://open.spotify.com/embed/playlist/37i9dQZF1DX76Wlfdnj7AP"

};



// ---------- DATE ----------

const today = new Date();

dateEl.innerText =
today.toLocaleDateString(
"en-IN",
{
weekday:"long",
day:"numeric",
month:"long"
}
);



// ---------- LOCATION BUTTON ----------

locationBtn.addEventListener(

"click",

()=>{

requestLocation();

}

);



// ---------- SEARCH BUTTON ----------

searchBtn.addEventListener(

"click",

()=>{

const city =
cityInput.value.trim();

if(city){

getWeatherByCity(city);

}

}

);



// ---------- ENTER KEY ----------

cityInput.addEventListener(

"keydown",

(e)=>{

if(e.key==="Enter"){

searchBtn.click();

}

}

);



// ---------- AUTO LOAD DEFAULT ----------

getWeatherByCity(
"Ahmedabad"
);



// ---------- REQUEST LOCATION ----------

function requestLocation(){

if("geolocation" in navigator){

cityEl.innerText =
"Detecting Location...";

conditionEl.innerText =
"Please allow location access.";

navigator.geolocation.getCurrentPosition(

success,

error,

{
enableHighAccuracy:true,
timeout:10000,
maximumAge:0
}

);

}
else{

cityEl.innerText =
"Geolocation Unsupported";

conditionEl.innerText =
"Use city search instead.";

}

}



// ---------- SUCCESS ----------

function success(position){

const lat =
position.coords.latitude;

const lon =
position.coords.longitude;

getWeather(lat,lon);

}



// ---------- ERROR ----------

function error(err){

console.log(err);

cityEl.innerText =
"Location Denied";

conditionEl.innerText =
"Showing Ahmedabad weather.";

getWeatherByCity(
"Ahmedabad"
);

}



// ---------- WEATHER FETCH ----------

async function getWeather(lat,lon){

try{

const url =

`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

const response =
await fetch(url);

const data =
await response.json();

updateUI(data);

}

catch(err){

console.log(err);

cityEl.innerText =
"Weather Error";

}

}



// ---------- WEATHER BY CITY ----------

async function getWeatherByCity(city){

try{

const url =

`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

const response =
await fetch(url);

const data =
await response.json();


if(data.cod != 200){

cityEl.innerText =
"City Not Found";

conditionEl.innerText =
"Try another city.";

return;

}

updateUI(data);

}

catch(err){

console.log(err);

}

}



// ---------- UPDATE UI ----------

function updateUI(data){

cityEl.innerText =
data.name;

tempEl.innerText =
Math.round(
data.main.temp
)+"°C";

conditionEl.innerText =
data.weather[0].main;

humidityEl.innerText =
data.main.humidity+"%";

windEl.innerText =
Math.round(
data.wind.speed*3.6
)+" km/h";


const weather =
data.weather[0].main;

const hour =
new Date().getHours();

applyTheme(
weather,
hour
);

}



// ---------- THEME SWITCH ----------

function applyTheme(
weather,
hour
){

document.body.className="";



// ---------- RAIN ----------

if(

weather==="Rain" ||

weather==="Drizzle"

){

document.body.classList.add(
"rain"
);

video.src =
"videos/rain.mp4";

spotify.src =
playlists.rain;

return;

}



// ---------- THUNDER ----------

if(

weather==="Thunderstorm"

){

document.body.classList.add(
"storm"
);

video.src =
"videos/storm.mp4";

spotify.src =
playlists.storm;

return;

}



// ---------- CLOUDS ----------

if(

weather==="Clouds"

){

document.body.classList.add(
"cloudy"
);

video.src =
"videos/cloudy.mp4";

spotify.src =
playlists.cloudy;

return;

}



// ---------- NIGHT ----------

if(

hour>=19 ||

hour<=5

){

document.body.classList.add(
"night"
);

video.src =
"videos/night.mp4";

spotify.src =
playlists.night;

return;

}



// ---------- SUNNY ----------

document.body.classList.add(
"sunny"
);

video.src =
"videos/sunny.mp4";

spotify.src =
playlists.sunny;

}
```
