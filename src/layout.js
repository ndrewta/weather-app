import ps from "./pubsub";

export default function weatherPageLayout() {
  // Cache page elements
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const input = document.querySelector("input");
  const location = document.getElementById("location");
  const temperature = document.getElementById("temperature");
  const windSpeed = document.getElementById("wind-speed");
  const windDirection = document.getElementById("wind-direction");
  const humidity = document.getElementById("humidity");
  const precipitation = document.getElementById("precipitation");
  const condition = document.getElementById("condition");
  const weatherIcon = document.getElementById("weather-icon");
  const localTime = document.getElementById("local-time");
  const forecastOL = document.getElementById("forecast");
  const forecastCanvas = document.getElementById("forecast-canvas");
  const forecastList = document.getElementById("forecast-list-div");
  let storedForecastData;

  function updateLocation(locationData) {
    // Update Location
    location.textContent = locationData;
  }

  function updateTemperature(temperatureData) {
    // Update temperature
    temperature.textContent = temperatureData;
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
    condition.textContent = conditionData;
  }

  function updateWeatherIcon(weatherIconData) {
    // Update weather icon
    weatherIcon.src = weatherIconData;
  }

  function updateLocalTime(localTimeData) {
    // Update local time
    localTime.textContent = localTimeData;
  }

  function updateForecast(foreCastData) {
    // Update 7 day forecast
    const liElems = Array.from(forecastOL.getElementsByTagName("li"));

    if (foreCastData === "ERROR") {
      liElems.forEach((data, index) => {
        // Get each list item by index then update each element
        const dayElem = liElems[index].querySelector(".forecast-day");
        const maxElem = liElems[index].querySelector(".forecast-max");
        const minElem = liElems[index].querySelector(".forecast-min");

        dayElem.textContent = "---";
        maxElem.textContent = `--°C`;
        minElem.textContent = `--°C`;
      });
    } else {
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
  }

  function getWeather() {
    let request = input.value;
    temperature.textContent = "Current temperature: Loading...";
    windSpeed.textContent = "Wind speed: Loading...";
    windDirection.textContent = "Wind direction: Loading...";
    humidity.textContent = "Humidity: Loading...";
    precipitation.textContent = "Precipitation: Loading...";
    condition.textContent = "Condition: Loading...";
    localTime.textContent = "Local time: Loading...";
    ps.publish("get-weather", request);
  }

  function getId(target) {
    // Get id of target forecast index number
    let id;

    if (target.getAttribute("class") === "forecast-daily-info") {
      id = target.dataset.id;
      return id;
    }
    if (target.closest(".forecast-daily-info")) {
      id = target.closest(".forecast-daily-info").dataset.id;
      return id;
    }
  }

  function updateChart(data) {
    // Update forecast chart
    const obj = { canvas: forecastCanvas, time: data };
    ps.publish("update-chart", obj);
  }

  function storeForecastData(forecastData) {
    // Store forecast data
    storedForecastData = forecastData;
    updateChart(storedForecastData[0].hour);
  }

  function toggleForecast(target) {
    // Remove class from all other divs
    const liElems = Array.from(forecastOL.getElementsByTagName("li"));
    liElems.forEach((elem) => elem.classList.remove("toggle-forecast"));

    // Check target if parent div then toggle class
    let parentDiv = target;
    if (target.closest(".forecast-daily-info")) {
      parentDiv = target.closest(".forecast-daily-info");
    }
    parentDiv.classList.toggle("toggle-forecast");
  }

  function getForecastData(target) {
    // Get hourly data
    const id = getId(target);
    if (id === undefined) {
      return;
    }
    const data = storedForecastData[id].hour;

    // Create chart
    updateChart(data);

    // Toggle class
    toggleForecast(target);
  }

  forecastList.addEventListener("click", (e) => {
    getForecastData(e.target);
  });
  window.addEventListener("load", () => ps.publish("get-weather-ip"));
  getWeatherBtn.addEventListener("click", getWeather);
  ps.subscribe("update-location", updateLocation);
  ps.subscribe("update-temperature", updateTemperature);
  ps.subscribe("update-wind-speed", updateWindSpeed);
  ps.subscribe("update-wind-direction", updateWindDirection);
  ps.subscribe("update-humidity", updateHumidity);
  ps.subscribe("update-precipitation", updatePrecipitation);
  ps.subscribe("update-condition", updateCondition);
  ps.subscribe("update-weather-icon", updateWeatherIcon);
  ps.subscribe("update-local-time", updateLocalTime);
  ps.subscribe("update-forecast", updateForecast);
  ps.subscribe("update-forecast", storeForecastData);
}
