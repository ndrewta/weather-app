/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/pubsub.js":
/*!***********************!*\
  !*** ./src/pubsub.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function pubSub() {
  const subscribers = {};

  function publish(eventName, data) {
    if (!Array.isArray(subscribers[eventName])) {
      return;
    }
    subscribers[eventName].forEach((callback) => {
      callback(data);
    });
  }
  function subscribe(eventName, callback) {
    if (!Array.isArray(subscribers[eventName])) {
      subscribers[eventName] = [];
    }
    subscribers[eventName].push(callback);
    const index = subscribers[eventName].length - 1;

    return {
      unsubscribe() {
        subscribers[eventName].splice(index, 1);
      },
    };
  }
  return { publish, subscribe };
}

const sharedPubSub = pubSub();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sharedPubSub);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./src/layout.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ weatherPageLayout)
/* harmony export */ });
/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubsub */ "./src/pubsub.js");


function weatherPageLayout() {
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
  const forecast = document.getElementById("forecast");
  const forecastCanvas = document.getElementById("forecast-canvas");
  const forecastList = document.getElementById("forecast-list-div");
  let storedForecastData;
  let intialForecastChart = true;

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
    const liElems = Array.from(forecast.getElementsByTagName("li"));

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
    _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish("get-weather", request);
  }

  function getId(target) {
    // Get id of target forecast index number
    let id;

    if (target.getAttribute("class") === "forecast-daily-info") {
      id = target.dataset.id;
      return id;
    }
    if (target.closest(".forecast-daily-info")) {
      const x = target.closest(".forecast-daily-info");
      id = x.dataset.id;
      return id;
    }
  }

  function createChart(data) {
    // Create forecast chart
    const obj = { canvas: forecastCanvas, time: data };
    _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish("update-chart", obj);
  }

  function storeForecastData(forecastData) {
    // Store forecast data
    storedForecastData = forecastData;
    if (intialForecastChart) {
      createChart(storedForecastData[0].hour);
      intialForecastChart = false;
    }
  }

  function updateChart(data) {
    // Update forecast chart
    const obj = { canvas: forecastCanvas, time: data };
    _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish("update-chart", obj);
  }

  function getForecastData(target) {
    // Get hourly data
    const id = getId(target);
    if (id === undefined) {
      return;
    }
    const data = storedForecastData[id].hour;

    updateChart(data);
  }

  forecastList.addEventListener("click", (e) => {
    getForecastData(e.target);
  });
  window.addEventListener("load", () => _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish("get-weather-ip"));
  getWeatherBtn.addEventListener("click", getWeather);
  _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe("update-location", updateLocation);
  _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe("update-temperature", updateTemperature);
  _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe("update-wind-speed", updateWindSpeed);
  _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe("update-wind-direction", updateWindDirection);
  _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe("update-humidity", updateHumidity);
  _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe("update-precipitation", updatePrecipitation);
  _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe("update-condition", updateCondition);
  _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe("update-weather-icon", updateWeatherIcon);
  _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe("update-local-time", updateLocalTime);
  _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe("update-forecast", updateForecast);
  _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe("update-forecast", storeForecastData);
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0EsaUVBQWUsWUFBWSxFQUFDOzs7Ozs7O1VDNUI1QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTjBCOztBQUVYO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkNBQTJDLGNBQWM7QUFDekQ7O0FBRUE7QUFDQTtBQUNBLG1EQUFtRCxrQkFBa0I7QUFDckU7O0FBRUE7QUFDQTtBQUNBLHdDQUF3QyxhQUFhO0FBQ3JEOztBQUVBO0FBQ0E7QUFDQSxrREFBa0Qsa0JBQWtCO0FBQ3BFOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlDQUFpQyxhQUFhO0FBQzlDLGlDQUFpQyxhQUFhO0FBQzlDLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksK0NBQUU7QUFDTjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQixJQUFJLCtDQUFFO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCLElBQUksK0NBQUU7QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsd0NBQXdDLCtDQUFFO0FBQzFDO0FBQ0EsRUFBRSwrQ0FBRTtBQUNKLEVBQUUsK0NBQUU7QUFDSixFQUFFLCtDQUFFO0FBQ0osRUFBRSwrQ0FBRTtBQUNKLEVBQUUsK0NBQUU7QUFDSixFQUFFLCtDQUFFO0FBQ0osRUFBRSwrQ0FBRTtBQUNKLEVBQUUsK0NBQUU7QUFDSixFQUFFLCtDQUFFO0FBQ0osRUFBRSwrQ0FBRTtBQUNKLEVBQUUsK0NBQUU7QUFDSiIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3B1YnN1Yi5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2xheW91dC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBwdWJTdWIoKSB7XG4gIGNvbnN0IHN1YnNjcmliZXJzID0ge307XG5cbiAgZnVuY3Rpb24gcHVibGlzaChldmVudE5hbWUsIGRhdGEpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoc3Vic2NyaWJlcnNbZXZlbnROYW1lXSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc3Vic2NyaWJlcnNbZXZlbnROYW1lXS5mb3JFYWNoKChjYWxsYmFjaykgPT4ge1xuICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gc3Vic2NyaWJlKGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoc3Vic2NyaWJlcnNbZXZlbnROYW1lXSkpIHtcbiAgICAgIHN1YnNjcmliZXJzW2V2ZW50TmFtZV0gPSBbXTtcbiAgICB9XG4gICAgc3Vic2NyaWJlcnNbZXZlbnROYW1lXS5wdXNoKGNhbGxiYWNrKTtcbiAgICBjb25zdCBpbmRleCA9IHN1YnNjcmliZXJzW2V2ZW50TmFtZV0ubGVuZ3RoIC0gMTtcblxuICAgIHJldHVybiB7XG4gICAgICB1bnN1YnNjcmliZSgpIHtcbiAgICAgICAgc3Vic2NyaWJlcnNbZXZlbnROYW1lXS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfSxcbiAgICB9O1xuICB9XG4gIHJldHVybiB7IHB1Ymxpc2gsIHN1YnNjcmliZSB9O1xufVxuXG5jb25zdCBzaGFyZWRQdWJTdWIgPSBwdWJTdWIoKTtcbmV4cG9ydCBkZWZhdWx0IHNoYXJlZFB1YlN1YjtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHBzIGZyb20gXCIuL3B1YnN1YlwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3ZWF0aGVyUGFnZUxheW91dCgpIHtcbiAgLy8gQ2FjaGUgcGFnZSBlbGVtZW50c1xuICBjb25zdCBnZXRXZWF0aGVyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnZXQtd2VhdGhlci1idG5cIik7XG4gIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0XCIpO1xuICBjb25zdCBsb2NhdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9jYXRpb25cIik7XG4gIGNvbnN0IHRlbXBlcmF0dXJlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZW1wZXJhdHVyZVwiKTtcbiAgY29uc3Qgd2luZFNwZWVkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aW5kLXNwZWVkXCIpO1xuICBjb25zdCB3aW5kRGlyZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aW5kLWRpcmVjdGlvblwiKTtcbiAgY29uc3QgaHVtaWRpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImh1bWlkaXR5XCIpO1xuICBjb25zdCBwcmVjaXBpdGF0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmVjaXBpdGF0aW9uXCIpO1xuICBjb25zdCBjb25kaXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbmRpdGlvblwiKTtcbiAgY29uc3Qgd2VhdGhlckljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndlYXRoZXItaWNvblwiKTtcbiAgY29uc3QgbG9jYWxUaW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2NhbC10aW1lXCIpO1xuICBjb25zdCBmb3JlY2FzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9yZWNhc3RcIik7XG4gIGNvbnN0IGZvcmVjYXN0Q2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JlY2FzdC1jYW52YXNcIik7XG4gIGNvbnN0IGZvcmVjYXN0TGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9yZWNhc3QtbGlzdC1kaXZcIik7XG4gIGxldCBzdG9yZWRGb3JlY2FzdERhdGE7XG4gIGxldCBpbnRpYWxGb3JlY2FzdENoYXJ0ID0gdHJ1ZTtcblxuICBmdW5jdGlvbiB1cGRhdGVMb2NhdGlvbihsb2NhdGlvbkRhdGEpIHtcbiAgICAvLyBVcGRhdGUgTG9jYXRpb25cbiAgICBsb2NhdGlvbi50ZXh0Q29udGVudCA9IGxvY2F0aW9uRGF0YTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVRlbXBlcmF0dXJlKHRlbXBlcmF0dXJlRGF0YSkge1xuICAgIC8vIFVwZGF0ZSB0ZW1wZXJhdHVyZVxuICAgIHRlbXBlcmF0dXJlLnRleHRDb250ZW50ID0gdGVtcGVyYXR1cmVEYXRhO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlV2luZFNwZWVkKHdpbmRTcGVlZERhdGEpIHtcbiAgICAvLyBVcGRhdGUgd2luZCBzcGVlZFxuICAgIHdpbmRTcGVlZC50ZXh0Q29udGVudCA9IGBXaW5kIFNwZWVkOiAke3dpbmRTcGVlZERhdGF9YDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVdpbmREaXJlY3Rpb24od2luZERpcmVjdGlvbkRhdGEpIHtcbiAgICAvLyBVcGRhdGUgd2luZCBkaXJlY3Rpb25cbiAgICB3aW5kRGlyZWN0aW9uLnRleHRDb250ZW50ID0gYFdpbmQgZGlyZWN0aW9uOiAke3dpbmREaXJlY3Rpb25EYXRhfWA7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVIdW1pZGl0eShodW1pZGl0eURhdGEpIHtcbiAgICAvLyBVcGRhdGUgaHVtaWRpdHlcbiAgICBodW1pZGl0eS50ZXh0Q29udGVudCA9IGBIdW1pZGl0eTogJHtodW1pZGl0eURhdGF9YDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVByZWNpcGl0YXRpb24ocHJlY2lwaXRhdGlvbkRhdGEpIHtcbiAgICAvLyBVcGRhdGUgcHJlY2lwaXRhdGlvblxuICAgIHByZWNpcGl0YXRpb24udGV4dENvbnRlbnQgPSBgUHJlY2lwaXRhdGlvbjogJHtwcmVjaXBpdGF0aW9uRGF0YX1gO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlQ29uZGl0aW9uKGNvbmRpdGlvbkRhdGEpIHtcbiAgICAvLyBVcGRhdGUgY29uZGl0aW9uXG4gICAgY29uZGl0aW9uLnRleHRDb250ZW50ID0gY29uZGl0aW9uRGF0YTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVdlYXRoZXJJY29uKHdlYXRoZXJJY29uRGF0YSkge1xuICAgIC8vIFVwZGF0ZSB3ZWF0aGVyIGljb25cbiAgICB3ZWF0aGVySWNvbi5zcmMgPSB3ZWF0aGVySWNvbkRhdGE7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVMb2NhbFRpbWUobG9jYWxUaW1lRGF0YSkge1xuICAgIC8vIFVwZGF0ZSBsb2NhbCB0aW1lXG4gICAgbG9jYWxUaW1lLnRleHRDb250ZW50ID0gbG9jYWxUaW1lRGF0YTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZUZvcmVjYXN0KGZvcmVDYXN0RGF0YSkge1xuICAgIC8vIFVwZGF0ZSA3IGRheSBmb3JlY2FzdFxuICAgIGNvbnN0IGxpRWxlbXMgPSBBcnJheS5mcm9tKGZvcmVjYXN0LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwibGlcIikpO1xuXG4gICAgaWYgKGZvcmVDYXN0RGF0YSA9PT0gXCJFUlJPUlwiKSB7XG4gICAgICBsaUVsZW1zLmZvckVhY2goKGRhdGEsIGluZGV4KSA9PiB7XG4gICAgICAgIC8vIEdldCBlYWNoIGxpc3QgaXRlbSBieSBpbmRleCB0aGVuIHVwZGF0ZSBlYWNoIGVsZW1lbnRcbiAgICAgICAgY29uc3QgZGF5RWxlbSA9IGxpRWxlbXNbaW5kZXhdLnF1ZXJ5U2VsZWN0b3IoXCIuZm9yZWNhc3QtZGF5XCIpO1xuICAgICAgICBjb25zdCBtYXhFbGVtID0gbGlFbGVtc1tpbmRleF0ucXVlcnlTZWxlY3RvcihcIi5mb3JlY2FzdC1tYXhcIik7XG4gICAgICAgIGNvbnN0IG1pbkVsZW0gPSBsaUVsZW1zW2luZGV4XS5xdWVyeVNlbGVjdG9yKFwiLmZvcmVjYXN0LW1pblwiKTtcblxuICAgICAgICBkYXlFbGVtLnRleHRDb250ZW50ID0gXCItLS1cIjtcbiAgICAgICAgbWF4RWxlbS50ZXh0Q29udGVudCA9IGAtLcKwQ2A7XG4gICAgICAgIG1pbkVsZW0udGV4dENvbnRlbnQgPSBgLS3CsENgO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcmVDYXN0RGF0YS5mb3JFYWNoKChkYXRhLCBpbmRleCkgPT4ge1xuICAgICAgICAvLyBHZXQgZWFjaCBsaXN0IGl0ZW0gYnkgaW5kZXggdGhlbiB1cGRhdGUgZWFjaCBlbGVtZW50XG4gICAgICAgIGNvbnN0IGRheUVsZW0gPSBsaUVsZW1zW2luZGV4XS5xdWVyeVNlbGVjdG9yKFwiLmZvcmVjYXN0LWRheVwiKTtcbiAgICAgICAgY29uc3QgaWNvbkVsZW0gPSBsaUVsZW1zW2luZGV4XS5xdWVyeVNlbGVjdG9yKFwiLmZvcmVjYXN0LWljb25cIik7XG4gICAgICAgIGNvbnN0IG1heEVsZW0gPSBsaUVsZW1zW2luZGV4XS5xdWVyeVNlbGVjdG9yKFwiLmZvcmVjYXN0LW1heFwiKTtcbiAgICAgICAgY29uc3QgbWluRWxlbSA9IGxpRWxlbXNbaW5kZXhdLnF1ZXJ5U2VsZWN0b3IoXCIuZm9yZWNhc3QtbWluXCIpO1xuXG4gICAgICAgIGRheUVsZW0udGV4dENvbnRlbnQgPSBkYXRhLmRheTtcbiAgICAgICAgaWNvbkVsZW0uc3JjID0gZGF0YS5pY29uO1xuICAgICAgICBtYXhFbGVtLnRleHRDb250ZW50ID0gYCR7ZGF0YS5tYXh0ZW1wfcKwQ2A7XG4gICAgICAgIG1pbkVsZW0udGV4dENvbnRlbnQgPSBgJHtkYXRhLm1pbnRlbXB9wrBDYDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFdlYXRoZXIoKSB7XG4gICAgbGV0IHJlcXVlc3QgPSBpbnB1dC52YWx1ZTtcbiAgICB0ZW1wZXJhdHVyZS50ZXh0Q29udGVudCA9IFwiQ3VycmVudCB0ZW1wZXJhdHVyZTogTG9hZGluZy4uLlwiO1xuICAgIHdpbmRTcGVlZC50ZXh0Q29udGVudCA9IFwiV2luZCBzcGVlZDogTG9hZGluZy4uLlwiO1xuICAgIHdpbmREaXJlY3Rpb24udGV4dENvbnRlbnQgPSBcIldpbmQgZGlyZWN0aW9uOiBMb2FkaW5nLi4uXCI7XG4gICAgaHVtaWRpdHkudGV4dENvbnRlbnQgPSBcIkh1bWlkaXR5OiBMb2FkaW5nLi4uXCI7XG4gICAgcHJlY2lwaXRhdGlvbi50ZXh0Q29udGVudCA9IFwiUHJlY2lwaXRhdGlvbjogTG9hZGluZy4uLlwiO1xuICAgIGNvbmRpdGlvbi50ZXh0Q29udGVudCA9IFwiQ29uZGl0aW9uOiBMb2FkaW5nLi4uXCI7XG4gICAgbG9jYWxUaW1lLnRleHRDb250ZW50ID0gXCJMb2NhbCB0aW1lOiBMb2FkaW5nLi4uXCI7XG4gICAgcHMucHVibGlzaChcImdldC13ZWF0aGVyXCIsIHJlcXVlc3QpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0SWQodGFyZ2V0KSB7XG4gICAgLy8gR2V0IGlkIG9mIHRhcmdldCBmb3JlY2FzdCBpbmRleCBudW1iZXJcbiAgICBsZXQgaWQ7XG5cbiAgICBpZiAodGFyZ2V0LmdldEF0dHJpYnV0ZShcImNsYXNzXCIpID09PSBcImZvcmVjYXN0LWRhaWx5LWluZm9cIikge1xuICAgICAgaWQgPSB0YXJnZXQuZGF0YXNldC5pZDtcbiAgICAgIHJldHVybiBpZDtcbiAgICB9XG4gICAgaWYgKHRhcmdldC5jbG9zZXN0KFwiLmZvcmVjYXN0LWRhaWx5LWluZm9cIikpIHtcbiAgICAgIGNvbnN0IHggPSB0YXJnZXQuY2xvc2VzdChcIi5mb3JlY2FzdC1kYWlseS1pbmZvXCIpO1xuICAgICAgaWQgPSB4LmRhdGFzZXQuaWQ7XG4gICAgICByZXR1cm4gaWQ7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQ2hhcnQoZGF0YSkge1xuICAgIC8vIENyZWF0ZSBmb3JlY2FzdCBjaGFydFxuICAgIGNvbnN0IG9iaiA9IHsgY2FudmFzOiBmb3JlY2FzdENhbnZhcywgdGltZTogZGF0YSB9O1xuICAgIHBzLnB1Ymxpc2goXCJ1cGRhdGUtY2hhcnRcIiwgb2JqKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0b3JlRm9yZWNhc3REYXRhKGZvcmVjYXN0RGF0YSkge1xuICAgIC8vIFN0b3JlIGZvcmVjYXN0IGRhdGFcbiAgICBzdG9yZWRGb3JlY2FzdERhdGEgPSBmb3JlY2FzdERhdGE7XG4gICAgaWYgKGludGlhbEZvcmVjYXN0Q2hhcnQpIHtcbiAgICAgIGNyZWF0ZUNoYXJ0KHN0b3JlZEZvcmVjYXN0RGF0YVswXS5ob3VyKTtcbiAgICAgIGludGlhbEZvcmVjYXN0Q2hhcnQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVDaGFydChkYXRhKSB7XG4gICAgLy8gVXBkYXRlIGZvcmVjYXN0IGNoYXJ0XG4gICAgY29uc3Qgb2JqID0geyBjYW52YXM6IGZvcmVjYXN0Q2FudmFzLCB0aW1lOiBkYXRhIH07XG4gICAgcHMucHVibGlzaChcInVwZGF0ZS1jaGFydFwiLCBvYmopO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Rm9yZWNhc3REYXRhKHRhcmdldCkge1xuICAgIC8vIEdldCBob3VybHkgZGF0YVxuICAgIGNvbnN0IGlkID0gZ2V0SWQodGFyZ2V0KTtcbiAgICBpZiAoaWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBkYXRhID0gc3RvcmVkRm9yZWNhc3REYXRhW2lkXS5ob3VyO1xuXG4gICAgdXBkYXRlQ2hhcnQoZGF0YSk7XG4gIH1cblxuICBmb3JlY2FzdExpc3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgZ2V0Rm9yZWNhc3REYXRhKGUudGFyZ2V0KTtcbiAgfSk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiBwcy5wdWJsaXNoKFwiZ2V0LXdlYXRoZXItaXBcIikpO1xuICBnZXRXZWF0aGVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBnZXRXZWF0aGVyKTtcbiAgcHMuc3Vic2NyaWJlKFwidXBkYXRlLWxvY2F0aW9uXCIsIHVwZGF0ZUxvY2F0aW9uKTtcbiAgcHMuc3Vic2NyaWJlKFwidXBkYXRlLXRlbXBlcmF0dXJlXCIsIHVwZGF0ZVRlbXBlcmF0dXJlKTtcbiAgcHMuc3Vic2NyaWJlKFwidXBkYXRlLXdpbmQtc3BlZWRcIiwgdXBkYXRlV2luZFNwZWVkKTtcbiAgcHMuc3Vic2NyaWJlKFwidXBkYXRlLXdpbmQtZGlyZWN0aW9uXCIsIHVwZGF0ZVdpbmREaXJlY3Rpb24pO1xuICBwcy5zdWJzY3JpYmUoXCJ1cGRhdGUtaHVtaWRpdHlcIiwgdXBkYXRlSHVtaWRpdHkpO1xuICBwcy5zdWJzY3JpYmUoXCJ1cGRhdGUtcHJlY2lwaXRhdGlvblwiLCB1cGRhdGVQcmVjaXBpdGF0aW9uKTtcbiAgcHMuc3Vic2NyaWJlKFwidXBkYXRlLWNvbmRpdGlvblwiLCB1cGRhdGVDb25kaXRpb24pO1xuICBwcy5zdWJzY3JpYmUoXCJ1cGRhdGUtd2VhdGhlci1pY29uXCIsIHVwZGF0ZVdlYXRoZXJJY29uKTtcbiAgcHMuc3Vic2NyaWJlKFwidXBkYXRlLWxvY2FsLXRpbWVcIiwgdXBkYXRlTG9jYWxUaW1lKTtcbiAgcHMuc3Vic2NyaWJlKFwidXBkYXRlLWZvcmVjYXN0XCIsIHVwZGF0ZUZvcmVjYXN0KTtcbiAgcHMuc3Vic2NyaWJlKFwidXBkYXRlLWZvcmVjYXN0XCIsIHN0b3JlRm9yZWNhc3REYXRhKTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==