import ps from "./pubsub";

export default function getWeatherData() {
  const weatherKey = "f3b3f9de329746d2a0b91417230706";

  function publishData(data) {
    // Publish successful datga
    ps.publish("weather-country", `${data.location.country}`);
    ps.publish("weather-temperature", `${data.current.temp_c}°C`);
    ps.publish("weather-location", data.location.name);
  }

  function publishError() {
    // Publish error message
    ps.publish("weather-country", "INVALID LOCATION");
    ps.publish("weather-location", "INVALID LOCATION");
    ps.publish("weather-temperature", "ERROR");
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
        `https://api.weatherapi.com/v1/current.json?key=${weatherKey}&q=${input}`,
        { mode: "cors" }
      );
      const weatherData = await response.json();
      console.log(weatherData);
      publishData(weatherData);
    } catch (err) {
      handleError(err);
    }
  }

  ps.subscribe("get-weather", getWeather);
}
