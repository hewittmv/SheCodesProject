function formatDate(date) {
  let year = date.getFullYear();
  let day = date.getDate();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekDay = dayIndex[date.getDay()];
  let monthIndex = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = monthIndex[date.getMonth()];

  return `${weekDay} ${hours}:${minutes} ${day} ${month} ${year}`;
}

function showCityTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let minTemp = Math.round(response.data.main.temp_min);
  let maxTemp = Math.round(response.data.main.temp_max);
  let minTempElement = document.querySelector("#minimum-temperature");
  let temperatureElement = document.querySelector("#city-Temp");
  let maxTempElement = document.querySelector("#maximum-temperature");
  let weatherDescription = document.querySelector("h4");
  let cityName = document.querySelector("h2");
  temperatureElement.innerHTML = `${temperature}°C`;
  minTempElement.innerHTML = `${minTemp}°C`;
  maxTempElement.innerHTML = `${maxTemp}°C`;
  weatherDescription.innerHTML = response.data.weather[0].description;
  cityName.innerHTML = response.data.name;
}

function searchCity(city) {
  let apiKey = "6f578b96aa9505bcce148ac22cb85794";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "6f578b96aa9505bcce148ac22cb85794";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityTemperature);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let dateElement = document.querySelector("h6");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let myLocationButton = document.querySelector("#myLocation");
myLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Tokyo");
