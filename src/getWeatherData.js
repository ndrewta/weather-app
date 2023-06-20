import ps from "./pubsub";

export default function getWeatherData() {
  const weatherKey = "f3b3f9de329746d2a0b91417230706";

  function publishData(data) {
    // Publish successful datga
    ps.publish("update-country", `${data.location.country}`);
    ps.publish("update-temperature", `${data.current.temp_c}°C`);
    ps.publish("update-location", data.location.name);
    ps.publish("update-wind-speed", `${data.current.wind_kph} km/h`);
    ps.publish("update-wind-direction", data.current.wind_dir);
    ps.publish("update-humidity", `${data.current.humidity}%`);
    ps.publish("update-precipitation", `${data.current.precip_mm}mm`);
    ps.publish("update-condition", data.current.condition.text);
    ps.publish("update-weather-icon", data.current.condition.icon);
    ps.publish("update-local-time", timeConverter(data.location.localtime));
    ps.publish("update-forecast", sortForecast(data.forecast.forecastday));
  }

  function publishError() {
    // Publish error message
    ps.publish("update-country", "INVALID LOCATION");
    ps.publish("update-location", "INVALID LOCATION");
    ps.publish("update-temperature", "ERROR");
    ps.publish("update-wind-speed", "ERROR");
    ps.publish("update-wind-direction", "ERROR");
    ps.publish("update-humidity", "ERROR");
    ps.publish("update-precipitation", "ERROR");
    ps.publish("update-condition", "ERROR");
    ps.publish("update-weather-icon", "");
    ps.publish("update-local-time", "ERROR");
    ps.publish("update-forecast", "ERROR");
  }

  function handleError(err) {
    // Handle error
    console.log(err);
    publishError(err);
  }

  async function getWeather(input) {
    // Get weather data
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${weatherKey}&q=${input}&days=7`,
        { mode: "cors" }
      );
      const weatherData = await response.json();
      publishData(weatherData);
    } catch (err) {
      handleError(err);
    }
  }

  function sortForecast(forecastData) {
    // Sort day, weather icon, high and low temps, hourly highs
    const array = [];

    for (let i = 0; i < forecastData.length; i += 1) {
      const dayData = forecastData[i];
      const obj = {
        mintemp: dayData.day.mintemp_c,
        maxtemp: dayData.day.maxtemp_c,
        icon: dayData.day.condition.icon,
        day: new Date(dayData.date).toLocaleDateString("en-US", {
          weekday: "short",
        }),
      };
      array.push(obj);
    }

    return array;
  }

  function timeConverter(timeData) {
    let day = "";
    // Switch case for day of week
    switch (new Date(timeData).getDay()) {
      case 0:
        day = "Sunday";
        break;
      case 1:
        day = "Monday";
        break;
      case 2:
        day = "Tuesday";
        break;
      case 3:
        day = "Wednesday";
        break;
      case 4:
        day = "Thursday";
        break;
      case 5:
        day = "Friday";
        break;
      case 6:
        day = "Saturday";
        break;
    }

    let time = new Date(timeData).toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return `${day} ${time}`;
  }

  ps.subscribe("get-weather", getWeather);
}
