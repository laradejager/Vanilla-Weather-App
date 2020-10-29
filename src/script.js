let todayDetails = new Date();
let day = todayDetails.getDay();
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = document.querySelector("#day");
currentDay.innerHTML = weekdays[todayDetails.getDay()];

let currentHour = todayDetails.getHours();
let currentMinutes = todayDetails.getMinutes();
let currentTime = document.querySelector("#time");
currentTime.innerHTML = `${currentHour}:${currentMinutes}`;
if (todayDetails.getMinutes() < 10) {
  currentTime.innerHTML = `${currentHour}:0${currentMinutes}`;
}
if (todayDetails.getHours() < 10) {
  currentTime.innerHTML = `0${currentHour}:${currentMinutes}`;
}

function getCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector(".current");
currentLocationButton.addEventListener("click", getCurrentLocation);

function searchLocation(position) {
  let apiKey = "3a485b9e6f1a186e9db5df9f95bbfad7";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  document.querySelector("h2").innerHTML = `Currently in ${response.data.name}`;
  document.querySelector(".TodayTemp").innerHTML = `${Math.round(
    response.data.main.temp
  )} ${"°C"}`;

  document.querySelector("#wind").innerHTML = `${
    response.data.wind.speed
  }${"km/h"}`;
  document.querySelector("#sky-description").innerHTML =
    response.data.weather[0].main;
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector(".form-control").value;
  search(city);
}

let citySearch = document.querySelector("form");
citySearch.addEventListener("submit", handleSubmit);

function search(city) {
  let apiKey = "3a485b9e6f1a186e9db5df9f95bbfad7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function SearchForCity(event) {
  event.preventDefault();
  let cityTextInput = document.querySelector(".form-control");
  let description = document.querySelector("h2");
  description.innerHTML = `Currently in ${cityTextInput.value}`;
}

search("New York");
