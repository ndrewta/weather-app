import ps from "./pubsub";

export default function weatherPageLayout() {
  // Cache page elements
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const input = document.querySelector("input");
  const country = document.getElementById("country");
  const city = document.getElementById("city");
  const temperature = document.getElementById("temperature");
  const windSpeed = document.getElementById("wind-speed");
  const windDirection = document.getElementById("wind-direction");
  const humidity = document.getElementById("humidity");
  const precipitation = document.getElementById("precipitation");
  const condition = document.getElementById("condition");
  const weatherIcon = document.getElementById("weather-icon");
  const localTime = document.getElementById("local-time");
  const forecast = document.getElementById("forecast");

  function updateCountry(countryData) {
    country.textContent = `Country: ${countryData}`;
  }

  function updateCity(locationData) {
    // Update location
    city.textContent = `City: ${locationData}`;
  }

  function updateTemperature(temperatureData) {
    // Update temperature
    temperature.textContent = `Temperature: ${temperatureData}`;
  }

  function updateWindSpeed(windSpeedData) {
    // Update wind speed
    windSpeed.textContent = `Wind Speed: ${windSpeedData}`;
  }

  function updateWindDirection(windDirectionData) {
    // Update wind direction
    windDirection.textContent = `Wind direction: ${windDirectionData}`;
  }

  function updateHumidity(humidityData) {
    // Update humidity
    humidity.textContent = `Humidity: ${humidityData}`;
  }

  function updatePrecipitation(precipitationData) {
    // Update precipitation
    precipitation.textContent = `Precipitation: ${precipitationData}`;
  }

  function updateCondition(conditionData) {
    // Update condition
    condition.textContent = `Condition: ${conditionData}`;
  }

  function updateWeatherIcon(weatherIconData) {
    // Update weather icon
    weatherIcon.src = weatherIconData;
  }

  function updateLocalTime(localTimeData) {
    // Update local time
    localTime.textContent = `Local time: ${localTimeData}`;
  }

  function updateForecast(foreCastData) {
    // Update 7 day forecast
    const liElems = forecast.getElementsByTagName("li");

    foreCastData.forEach((data, index) => {
      // Get each list item by index then update each element
      const dayElem = liElems[index].querySelector(".forecast-day");
      const iconElem = liElems[index].querySelector(".forecast-icon");
      const maxElem = liElems[index].querySelector(".forecast-max");
      const minElem = liElems[index].querySelector(".forecast-min");

      dayElem.textContent = data.day;
      iconElem.src = data.icon;
      maxElem.textContent = `${data.maxtemp}°C`;
      minElem.textContent = `${data.mintemp}°C`;
    });
  }

  function getWeather() {
    let request = input.value;
    country.textContent = "Country: Loading...";
    city.textContent = "City: Loading...";
    temperature.textContent = "Current temperature: Loading...";
    windSpeed.textContent = "Wind speed: Loading...";
    windDirection.textContent = "Wind direction: Loading...";
    humidity.textContent = "Humidity: Loading...";
    precipitation.textContent = "Precipitation: Loading...";
    condition.textContent = "Condition: Loading...";
    localTime.textContent = "Local time: Loading...";
    setTimeout(ps.publish("get-weather", request), 5000);
  }

  getWeatherBtn.addEventListener("click", getWeather);
  ps.subscribe("update-country", updateCountry);
  ps.subscribe("update-location", updateCity);
  ps.subscribe("update-temperature", updateTemperature);
  ps.subscribe("update-wind-speed", updateWindSpeed);
  ps.subscribe("update-wind-direction", updateWindDirection);
  ps.subscribe("update-humidity", updateHumidity);
  ps.subscribe("update-precipitation", updatePrecipitation);
  ps.subscribe("update-condition", updateCondition);
  ps.subscribe("update-weather-icon", updateWeatherIcon);
  ps.subscribe("update-local-time", updateLocalTime);
  ps.subscribe("update-forecast", updateForecast);
}
