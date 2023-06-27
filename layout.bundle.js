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

  function updateChart(data) {
    // Update forecast chart
    const obj = { canvas: forecastCanvas, time: data };
    _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish("update-chart", obj);
  }

  function storeForecastData(forecastData) {
    // Store forecast data
    storedForecastData = forecastData;
    updateChart(storedForecastData[0].hour);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0EsaUVBQWUsWUFBWSxFQUFDOzs7Ozs7O1VDNUI1QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTjBCOztBQUVYO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDJDQUEyQyxjQUFjO0FBQ3pEOztBQUVBO0FBQ0E7QUFDQSxtREFBbUQsa0JBQWtCO0FBQ3JFOztBQUVBO0FBQ0E7QUFDQSx3Q0FBd0MsYUFBYTtBQUNyRDs7QUFFQTtBQUNBO0FBQ0Esa0RBQWtELGtCQUFrQjtBQUNwRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQ0FBaUMsYUFBYTtBQUM5QyxpQ0FBaUMsYUFBYTtBQUM5QyxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLCtDQUFFO0FBQ047O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEIsSUFBSSwrQ0FBRTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNILHdDQUF3QywrQ0FBRTtBQUMxQztBQUNBLEVBQUUsK0NBQUU7QUFDSixFQUFFLCtDQUFFO0FBQ0osRUFBRSwrQ0FBRTtBQUNKLEVBQUUsK0NBQUU7QUFDSixFQUFFLCtDQUFFO0FBQ0osRUFBRSwrQ0FBRTtBQUNKLEVBQUUsK0NBQUU7QUFDSixFQUFFLCtDQUFFO0FBQ0osRUFBRSwrQ0FBRTtBQUNKLEVBQUUsK0NBQUU7QUFDSixFQUFFLCtDQUFFO0FBQ0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9wdWJzdWIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9sYXlvdXQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gcHViU3ViKCkge1xuICBjb25zdCBzdWJzY3JpYmVycyA9IHt9O1xuXG4gIGZ1bmN0aW9uIHB1Ymxpc2goZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHN1YnNjcmliZXJzW2V2ZW50TmFtZV0pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHN1YnNjcmliZXJzW2V2ZW50TmFtZV0uZm9yRWFjaCgoY2FsbGJhY2spID0+IHtcbiAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIHN1YnNjcmliZShldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHN1YnNjcmliZXJzW2V2ZW50TmFtZV0pKSB7XG4gICAgICBzdWJzY3JpYmVyc1tldmVudE5hbWVdID0gW107XG4gICAgfVxuICAgIHN1YnNjcmliZXJzW2V2ZW50TmFtZV0ucHVzaChjYWxsYmFjayk7XG4gICAgY29uc3QgaW5kZXggPSBzdWJzY3JpYmVyc1tldmVudE5hbWVdLmxlbmd0aCAtIDE7XG5cbiAgICByZXR1cm4ge1xuICAgICAgdW5zdWJzY3JpYmUoKSB7XG4gICAgICAgIHN1YnNjcmliZXJzW2V2ZW50TmFtZV0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuICByZXR1cm4geyBwdWJsaXNoLCBzdWJzY3JpYmUgfTtcbn1cblxuY29uc3Qgc2hhcmVkUHViU3ViID0gcHViU3ViKCk7XG5leHBvcnQgZGVmYXVsdCBzaGFyZWRQdWJTdWI7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBwcyBmcm9tIFwiLi9wdWJzdWJcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2VhdGhlclBhZ2VMYXlvdXQoKSB7XG4gIC8vIENhY2hlIHBhZ2UgZWxlbWVudHNcbiAgY29uc3QgZ2V0V2VhdGhlckJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2V0LXdlYXRoZXItYnRuXCIpO1xuICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFwiKTtcbiAgY29uc3QgbG9jYXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvY2F0aW9uXCIpO1xuICBjb25zdCB0ZW1wZXJhdHVyZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGVtcGVyYXR1cmVcIik7XG4gIGNvbnN0IHdpbmRTcGVlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2luZC1zcGVlZFwiKTtcbiAgY29uc3Qgd2luZERpcmVjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2luZC1kaXJlY3Rpb25cIik7XG4gIGNvbnN0IGh1bWlkaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJodW1pZGl0eVwiKTtcbiAgY29uc3QgcHJlY2lwaXRhdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJlY2lwaXRhdGlvblwiKTtcbiAgY29uc3QgY29uZGl0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb25kaXRpb25cIik7XG4gIGNvbnN0IHdlYXRoZXJJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWF0aGVyLWljb25cIik7XG4gIGNvbnN0IGxvY2FsVGltZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9jYWwtdGltZVwiKTtcbiAgY29uc3QgZm9yZWNhc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcmVjYXN0XCIpO1xuICBjb25zdCBmb3JlY2FzdENhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9yZWNhc3QtY2FudmFzXCIpO1xuICBjb25zdCBmb3JlY2FzdExpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcmVjYXN0LWxpc3QtZGl2XCIpO1xuICBsZXQgc3RvcmVkRm9yZWNhc3REYXRhO1xuXG4gIGZ1bmN0aW9uIHVwZGF0ZUxvY2F0aW9uKGxvY2F0aW9uRGF0YSkge1xuICAgIC8vIFVwZGF0ZSBMb2NhdGlvblxuICAgIGxvY2F0aW9uLnRleHRDb250ZW50ID0gbG9jYXRpb25EYXRhO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlVGVtcGVyYXR1cmUodGVtcGVyYXR1cmVEYXRhKSB7XG4gICAgLy8gVXBkYXRlIHRlbXBlcmF0dXJlXG4gICAgdGVtcGVyYXR1cmUudGV4dENvbnRlbnQgPSB0ZW1wZXJhdHVyZURhdGE7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVXaW5kU3BlZWQod2luZFNwZWVkRGF0YSkge1xuICAgIC8vIFVwZGF0ZSB3aW5kIHNwZWVkXG4gICAgd2luZFNwZWVkLnRleHRDb250ZW50ID0gYFdpbmQgU3BlZWQ6ICR7d2luZFNwZWVkRGF0YX1gO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlV2luZERpcmVjdGlvbih3aW5kRGlyZWN0aW9uRGF0YSkge1xuICAgIC8vIFVwZGF0ZSB3aW5kIGRpcmVjdGlvblxuICAgIHdpbmREaXJlY3Rpb24udGV4dENvbnRlbnQgPSBgV2luZCBkaXJlY3Rpb246ICR7d2luZERpcmVjdGlvbkRhdGF9YDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZUh1bWlkaXR5KGh1bWlkaXR5RGF0YSkge1xuICAgIC8vIFVwZGF0ZSBodW1pZGl0eVxuICAgIGh1bWlkaXR5LnRleHRDb250ZW50ID0gYEh1bWlkaXR5OiAke2h1bWlkaXR5RGF0YX1gO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlUHJlY2lwaXRhdGlvbihwcmVjaXBpdGF0aW9uRGF0YSkge1xuICAgIC8vIFVwZGF0ZSBwcmVjaXBpdGF0aW9uXG4gICAgcHJlY2lwaXRhdGlvbi50ZXh0Q29udGVudCA9IGBQcmVjaXBpdGF0aW9uOiAke3ByZWNpcGl0YXRpb25EYXRhfWA7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVDb25kaXRpb24oY29uZGl0aW9uRGF0YSkge1xuICAgIC8vIFVwZGF0ZSBjb25kaXRpb25cbiAgICBjb25kaXRpb24udGV4dENvbnRlbnQgPSBjb25kaXRpb25EYXRhO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlV2VhdGhlckljb24od2VhdGhlckljb25EYXRhKSB7XG4gICAgLy8gVXBkYXRlIHdlYXRoZXIgaWNvblxuICAgIHdlYXRoZXJJY29uLnNyYyA9IHdlYXRoZXJJY29uRGF0YTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZUxvY2FsVGltZShsb2NhbFRpbWVEYXRhKSB7XG4gICAgLy8gVXBkYXRlIGxvY2FsIHRpbWVcbiAgICBsb2NhbFRpbWUudGV4dENvbnRlbnQgPSBsb2NhbFRpbWVEYXRhO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlRm9yZWNhc3QoZm9yZUNhc3REYXRhKSB7XG4gICAgLy8gVXBkYXRlIDcgZGF5IGZvcmVjYXN0XG4gICAgY29uc3QgbGlFbGVtcyA9IEFycmF5LmZyb20oZm9yZWNhc3QuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJsaVwiKSk7XG5cbiAgICBpZiAoZm9yZUNhc3REYXRhID09PSBcIkVSUk9SXCIpIHtcbiAgICAgIGxpRWxlbXMuZm9yRWFjaCgoZGF0YSwgaW5kZXgpID0+IHtcbiAgICAgICAgLy8gR2V0IGVhY2ggbGlzdCBpdGVtIGJ5IGluZGV4IHRoZW4gdXBkYXRlIGVhY2ggZWxlbWVudFxuICAgICAgICBjb25zdCBkYXlFbGVtID0gbGlFbGVtc1tpbmRleF0ucXVlcnlTZWxlY3RvcihcIi5mb3JlY2FzdC1kYXlcIik7XG4gICAgICAgIGNvbnN0IG1heEVsZW0gPSBsaUVsZW1zW2luZGV4XS5xdWVyeVNlbGVjdG9yKFwiLmZvcmVjYXN0LW1heFwiKTtcbiAgICAgICAgY29uc3QgbWluRWxlbSA9IGxpRWxlbXNbaW5kZXhdLnF1ZXJ5U2VsZWN0b3IoXCIuZm9yZWNhc3QtbWluXCIpO1xuXG4gICAgICAgIGRheUVsZW0udGV4dENvbnRlbnQgPSBcIi0tLVwiO1xuICAgICAgICBtYXhFbGVtLnRleHRDb250ZW50ID0gYC0twrBDYDtcbiAgICAgICAgbWluRWxlbS50ZXh0Q29udGVudCA9IGAtLcKwQ2A7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yZUNhc3REYXRhLmZvckVhY2goKGRhdGEsIGluZGV4KSA9PiB7XG4gICAgICAgIC8vIEdldCBlYWNoIGxpc3QgaXRlbSBieSBpbmRleCB0aGVuIHVwZGF0ZSBlYWNoIGVsZW1lbnRcbiAgICAgICAgY29uc3QgZGF5RWxlbSA9IGxpRWxlbXNbaW5kZXhdLnF1ZXJ5U2VsZWN0b3IoXCIuZm9yZWNhc3QtZGF5XCIpO1xuICAgICAgICBjb25zdCBpY29uRWxlbSA9IGxpRWxlbXNbaW5kZXhdLnF1ZXJ5U2VsZWN0b3IoXCIuZm9yZWNhc3QtaWNvblwiKTtcbiAgICAgICAgY29uc3QgbWF4RWxlbSA9IGxpRWxlbXNbaW5kZXhdLnF1ZXJ5U2VsZWN0b3IoXCIuZm9yZWNhc3QtbWF4XCIpO1xuICAgICAgICBjb25zdCBtaW5FbGVtID0gbGlFbGVtc1tpbmRleF0ucXVlcnlTZWxlY3RvcihcIi5mb3JlY2FzdC1taW5cIik7XG5cbiAgICAgICAgZGF5RWxlbS50ZXh0Q29udGVudCA9IGRhdGEuZGF5O1xuICAgICAgICBpY29uRWxlbS5zcmMgPSBkYXRhLmljb247XG4gICAgICAgIG1heEVsZW0udGV4dENvbnRlbnQgPSBgJHtkYXRhLm1heHRlbXB9wrBDYDtcbiAgICAgICAgbWluRWxlbS50ZXh0Q29udGVudCA9IGAke2RhdGEubWludGVtcH3CsENgO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0V2VhdGhlcigpIHtcbiAgICBsZXQgcmVxdWVzdCA9IGlucHV0LnZhbHVlO1xuICAgIHRlbXBlcmF0dXJlLnRleHRDb250ZW50ID0gXCJDdXJyZW50IHRlbXBlcmF0dXJlOiBMb2FkaW5nLi4uXCI7XG4gICAgd2luZFNwZWVkLnRleHRDb250ZW50ID0gXCJXaW5kIHNwZWVkOiBMb2FkaW5nLi4uXCI7XG4gICAgd2luZERpcmVjdGlvbi50ZXh0Q29udGVudCA9IFwiV2luZCBkaXJlY3Rpb246IExvYWRpbmcuLi5cIjtcbiAgICBodW1pZGl0eS50ZXh0Q29udGVudCA9IFwiSHVtaWRpdHk6IExvYWRpbmcuLi5cIjtcbiAgICBwcmVjaXBpdGF0aW9uLnRleHRDb250ZW50ID0gXCJQcmVjaXBpdGF0aW9uOiBMb2FkaW5nLi4uXCI7XG4gICAgY29uZGl0aW9uLnRleHRDb250ZW50ID0gXCJDb25kaXRpb246IExvYWRpbmcuLi5cIjtcbiAgICBsb2NhbFRpbWUudGV4dENvbnRlbnQgPSBcIkxvY2FsIHRpbWU6IExvYWRpbmcuLi5cIjtcbiAgICBwcy5wdWJsaXNoKFwiZ2V0LXdlYXRoZXJcIiwgcmVxdWVzdCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRJZCh0YXJnZXQpIHtcbiAgICAvLyBHZXQgaWQgb2YgdGFyZ2V0IGZvcmVjYXN0IGluZGV4IG51bWJlclxuICAgIGxldCBpZDtcblxuICAgIGlmICh0YXJnZXQuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgPT09IFwiZm9yZWNhc3QtZGFpbHktaW5mb1wiKSB7XG4gICAgICBpZCA9IHRhcmdldC5kYXRhc2V0LmlkO1xuICAgICAgcmV0dXJuIGlkO1xuICAgIH1cbiAgICBpZiAodGFyZ2V0LmNsb3Nlc3QoXCIuZm9yZWNhc3QtZGFpbHktaW5mb1wiKSkge1xuICAgICAgY29uc3QgeCA9IHRhcmdldC5jbG9zZXN0KFwiLmZvcmVjYXN0LWRhaWx5LWluZm9cIik7XG4gICAgICBpZCA9IHguZGF0YXNldC5pZDtcbiAgICAgIHJldHVybiBpZDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVDaGFydChkYXRhKSB7XG4gICAgLy8gVXBkYXRlIGZvcmVjYXN0IGNoYXJ0XG4gICAgY29uc3Qgb2JqID0geyBjYW52YXM6IGZvcmVjYXN0Q2FudmFzLCB0aW1lOiBkYXRhIH07XG4gICAgcHMucHVibGlzaChcInVwZGF0ZS1jaGFydFwiLCBvYmopO1xuICB9XG5cbiAgZnVuY3Rpb24gc3RvcmVGb3JlY2FzdERhdGEoZm9yZWNhc3REYXRhKSB7XG4gICAgLy8gU3RvcmUgZm9yZWNhc3QgZGF0YVxuICAgIHN0b3JlZEZvcmVjYXN0RGF0YSA9IGZvcmVjYXN0RGF0YTtcbiAgICB1cGRhdGVDaGFydChzdG9yZWRGb3JlY2FzdERhdGFbMF0uaG91cik7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRGb3JlY2FzdERhdGEodGFyZ2V0KSB7XG4gICAgLy8gR2V0IGhvdXJseSBkYXRhXG4gICAgY29uc3QgaWQgPSBnZXRJZCh0YXJnZXQpO1xuICAgIGlmIChpZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGRhdGEgPSBzdG9yZWRGb3JlY2FzdERhdGFbaWRdLmhvdXI7XG5cbiAgICB1cGRhdGVDaGFydChkYXRhKTtcbiAgfVxuXG4gIGZvcmVjYXN0TGlzdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBnZXRGb3JlY2FzdERhdGEoZS50YXJnZXQpO1xuICB9KTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHBzLnB1Ymxpc2goXCJnZXQtd2VhdGhlci1pcFwiKSk7XG4gIGdldFdlYXRoZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGdldFdlYXRoZXIpO1xuICBwcy5zdWJzY3JpYmUoXCJ1cGRhdGUtbG9jYXRpb25cIiwgdXBkYXRlTG9jYXRpb24pO1xuICBwcy5zdWJzY3JpYmUoXCJ1cGRhdGUtdGVtcGVyYXR1cmVcIiwgdXBkYXRlVGVtcGVyYXR1cmUpO1xuICBwcy5zdWJzY3JpYmUoXCJ1cGRhdGUtd2luZC1zcGVlZFwiLCB1cGRhdGVXaW5kU3BlZWQpO1xuICBwcy5zdWJzY3JpYmUoXCJ1cGRhdGUtd2luZC1kaXJlY3Rpb25cIiwgdXBkYXRlV2luZERpcmVjdGlvbik7XG4gIHBzLnN1YnNjcmliZShcInVwZGF0ZS1odW1pZGl0eVwiLCB1cGRhdGVIdW1pZGl0eSk7XG4gIHBzLnN1YnNjcmliZShcInVwZGF0ZS1wcmVjaXBpdGF0aW9uXCIsIHVwZGF0ZVByZWNpcGl0YXRpb24pO1xuICBwcy5zdWJzY3JpYmUoXCJ1cGRhdGUtY29uZGl0aW9uXCIsIHVwZGF0ZUNvbmRpdGlvbik7XG4gIHBzLnN1YnNjcmliZShcInVwZGF0ZS13ZWF0aGVyLWljb25cIiwgdXBkYXRlV2VhdGhlckljb24pO1xuICBwcy5zdWJzY3JpYmUoXCJ1cGRhdGUtbG9jYWwtdGltZVwiLCB1cGRhdGVMb2NhbFRpbWUpO1xuICBwcy5zdWJzY3JpYmUoXCJ1cGRhdGUtZm9yZWNhc3RcIiwgdXBkYXRlRm9yZWNhc3QpO1xuICBwcy5zdWJzY3JpYmUoXCJ1cGRhdGUtZm9yZWNhc3RcIiwgc3RvcmVGb3JlY2FzdERhdGEpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9