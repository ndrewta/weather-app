import ps from "./pubsub";

export default function weatherPageLayout() {
  // Cache page elements
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const input = document.querySelector("input");
  const weatherCountry = document.getElementById("weather-country");
  const weatherCity = document.getElementById("weather-city");
  const weatherTemperature = document.getElementById("weather-output");

  function updateCountry(country) {
    weatherCountry.textContent = `Country: ${country}`;
  }

  function updateCity(location) {
    // Update location
    weatherCity.textContent = `City: ${location}`;
  }

  function updateTemperature(temperature) {
    // Update temperature
    weatherTemperature.textContent = `Temperature: ${temperature}`;
  }

  function getWeather() {
    let city = input.value;
    weatherCountry.textContent = "Country: Loading...";
    weatherCity.textContent = "City: Loading...";
    weatherTemperature.textContent = "Current temperature: Loading...";
    ps.publish("get-weather", city);
  }

  getWeatherBtn.addEventListener("click", getWeather);
  ps.subscribe("weather-country", updateCountry);
  ps.subscribe("weather-location", updateCity);
  ps.subscribe("weather-temperature", updateTemperature);
}
