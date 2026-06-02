// ===============================
// WEATHER TUNES V2.5 FIXED
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

// ---------- PLAYLISTS ----------

const playlists = {

rain:
"https://open.spotify.com/embed/playlist/5LAe5v55uamtXa1hILBjeQ?utm_source=generator",

sunny:
"https://open.spotify.com/embed/playlist/6XwhBsU30XulZs4YJJ3usk?utm_source=generator",

cloudy:
"https://open.spotify.com/embed/playlist/7G8ba4IDCXRV04Q2rORD94?utm_source=generator",

night:
"https://open.spotify.com/embed/playlist/5gikXqUHz8LvMz0oggsmm5?utm_source=generator",

storm:
"https://open.spotify.com/embed/playlist/5nB0aS2goHzFPrvxJAYlwz?utm_source=generator"

};

// ---------- DATE ----------

const today =
new Date();

dateEl.innerText =
today.toLocaleDateString(
"en-IN",
{
weekday:"long",
day:"numeric",
month:"long"
}
);

// ---------- GEOLOCATION ----------

if("geolocation" in navigator){

navigator.geolocation.getCurrentPosition(

success,

error,

{
enableHighAccuracy:true,
timeout:15000,
maximumAge:0
}

);

}
else{

cityEl.innerText =
"Browser unsupported";

conditionEl.innerText =
"Location not supported";

}

// ---------- SUCCESS ----------

function success(position){

const lat =
position.coords.latitude;

const lon =
position.coords.longitude;

getWeather(
lat,
lon
);

}

// ---------- ERROR ----------

function error(err){

console.log(
"Location Error:",
err
);

cityEl.innerText =
"Location denied";

conditionEl.innerText =
"Showing Ahmedabad";

getWeatherByCity(
"Ahmedabad"
);

}

// ---------- WEATHER FETCH LAT/LON ----------

async function getWeather(
lat,
lon
){

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

// ---------- WEATHER FETCH CITY ----------

async function getWeatherByCity(
city
){

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
"Try Again";

return;

}

updateUI(data);

}

catch(err){

console.log(err);

cityEl.innerText =
"Weather Error";

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

// ---------- THEME SWITCHING ----------

function applyTheme(
weather,
hour
){

document.body.className =
"";

// RAIN

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

// STORM

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

// CLOUDS

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

// NIGHT

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

// SUNNY DEFAULT

document.body.classList.add(
"sunny"
);

video.src =
"videos/sunny.mp4";

spotify.src =
playlists.sunny;

}
