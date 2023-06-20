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
      // Check if data is available then create elements
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
    setTimeout(_pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish("get-weather", request), 5000);
  }

  getWeatherBtn.addEventListener("click", getWeather);
  _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe("update-country", updateCountry);
  _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe("update-location", updateCity);
  _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe("update-temperature", updateTemperature);
  _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe("update-wind-speed", updateWindSpeed);
  _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe("update-wind-direction", updateWindDirection);
  _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe("update-humidity", updateHumidity);
  _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe("update-precipitation", updatePrecipitation);
  _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe("update-condition", updateCondition);
  _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe("update-weather-icon", updateWeatherIcon);
  _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe("update-local-time", updateLocalTime);
  _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe("update-forecast", updateForecast);
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0EsaUVBQWUsWUFBWSxFQUFDOzs7Ozs7O1VDNUI1QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTjBCOztBQUVYO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNDQUFzQyxZQUFZO0FBQ2xEOztBQUVBO0FBQ0E7QUFDQSxnQ0FBZ0MsYUFBYTtBQUM3Qzs7QUFFQTtBQUNBO0FBQ0EsOENBQThDLGdCQUFnQjtBQUM5RDs7QUFFQTtBQUNBO0FBQ0EsMkNBQTJDLGNBQWM7QUFDekQ7O0FBRUE7QUFDQTtBQUNBLG1EQUFtRCxrQkFBa0I7QUFDckU7O0FBRUE7QUFDQTtBQUNBLHdDQUF3QyxhQUFhO0FBQ3JEOztBQUVBO0FBQ0E7QUFDQSxrREFBa0Qsa0JBQWtCO0FBQ3BFOztBQUVBO0FBQ0E7QUFDQSwwQ0FBMEMsY0FBYztBQUN4RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkNBQTJDLGNBQWM7QUFDekQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLCtCQUErQixhQUFhO0FBQzVDLCtCQUErQixhQUFhO0FBQzVDLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSwrQ0FBRTtBQUNqQjs7QUFFQTtBQUNBLEVBQUUsK0NBQUU7QUFDSixFQUFFLCtDQUFFO0FBQ0osRUFBRSwrQ0FBRTtBQUNKLEVBQUUsK0NBQUU7QUFDSixFQUFFLCtDQUFFO0FBQ0osRUFBRSwrQ0FBRTtBQUNKLEVBQUUsK0NBQUU7QUFDSixFQUFFLCtDQUFFO0FBQ0osRUFBRSwrQ0FBRTtBQUNKLEVBQUUsK0NBQUU7QUFDSixFQUFFLCtDQUFFO0FBQ0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9wdWJzdWIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9sYXlvdXQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gcHViU3ViKCkge1xuICBjb25zdCBzdWJzY3JpYmVycyA9IHt9O1xuXG4gIGZ1bmN0aW9uIHB1Ymxpc2goZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHN1YnNjcmliZXJzW2V2ZW50TmFtZV0pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHN1YnNjcmliZXJzW2V2ZW50TmFtZV0uZm9yRWFjaCgoY2FsbGJhY2spID0+IHtcbiAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIHN1YnNjcmliZShldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHN1YnNjcmliZXJzW2V2ZW50TmFtZV0pKSB7XG4gICAgICBzdWJzY3JpYmVyc1tldmVudE5hbWVdID0gW107XG4gICAgfVxuICAgIHN1YnNjcmliZXJzW2V2ZW50TmFtZV0ucHVzaChjYWxsYmFjayk7XG4gICAgY29uc3QgaW5kZXggPSBzdWJzY3JpYmVyc1tldmVudE5hbWVdLmxlbmd0aCAtIDE7XG5cbiAgICByZXR1cm4ge1xuICAgICAgdW5zdWJzY3JpYmUoKSB7XG4gICAgICAgIHN1YnNjcmliZXJzW2V2ZW50TmFtZV0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuICByZXR1cm4geyBwdWJsaXNoLCBzdWJzY3JpYmUgfTtcbn1cblxuY29uc3Qgc2hhcmVkUHViU3ViID0gcHViU3ViKCk7XG5leHBvcnQgZGVmYXVsdCBzaGFyZWRQdWJTdWI7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBwcyBmcm9tIFwiLi9wdWJzdWJcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2VhdGhlclBhZ2VMYXlvdXQoKSB7XG4gIC8vIENhY2hlIHBhZ2UgZWxlbWVudHNcbiAgY29uc3QgZ2V0V2VhdGhlckJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2V0LXdlYXRoZXItYnRuXCIpO1xuICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFwiKTtcbiAgY29uc3QgY291bnRyeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY291bnRyeVwiKTtcbiAgY29uc3QgY2l0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2l0eVwiKTtcbiAgY29uc3QgdGVtcGVyYXR1cmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRlbXBlcmF0dXJlXCIpO1xuICBjb25zdCB3aW5kU3BlZWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpbmQtc3BlZWRcIik7XG4gIGNvbnN0IHdpbmREaXJlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpbmQtZGlyZWN0aW9uXCIpO1xuICBjb25zdCBodW1pZGl0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaHVtaWRpdHlcIik7XG4gIGNvbnN0IHByZWNpcGl0YXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByZWNpcGl0YXRpb25cIik7XG4gIGNvbnN0IGNvbmRpdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29uZGl0aW9uXCIpO1xuICBjb25zdCB3ZWF0aGVySWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2VhdGhlci1pY29uXCIpO1xuICBjb25zdCBsb2NhbFRpbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvY2FsLXRpbWVcIik7XG4gIGNvbnN0IGZvcmVjYXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JlY2FzdFwiKTtcblxuICBmdW5jdGlvbiB1cGRhdGVDb3VudHJ5KGNvdW50cnlEYXRhKSB7XG4gICAgY291bnRyeS50ZXh0Q29udGVudCA9IGBDb3VudHJ5OiAke2NvdW50cnlEYXRhfWA7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVDaXR5KGxvY2F0aW9uRGF0YSkge1xuICAgIC8vIFVwZGF0ZSBsb2NhdGlvblxuICAgIGNpdHkudGV4dENvbnRlbnQgPSBgQ2l0eTogJHtsb2NhdGlvbkRhdGF9YDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVRlbXBlcmF0dXJlKHRlbXBlcmF0dXJlRGF0YSkge1xuICAgIC8vIFVwZGF0ZSB0ZW1wZXJhdHVyZVxuICAgIHRlbXBlcmF0dXJlLnRleHRDb250ZW50ID0gYFRlbXBlcmF0dXJlOiAke3RlbXBlcmF0dXJlRGF0YX1gO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlV2luZFNwZWVkKHdpbmRTcGVlZERhdGEpIHtcbiAgICAvLyBVcGRhdGUgd2luZCBzcGVlZFxuICAgIHdpbmRTcGVlZC50ZXh0Q29udGVudCA9IGBXaW5kIFNwZWVkOiAke3dpbmRTcGVlZERhdGF9YDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVdpbmREaXJlY3Rpb24od2luZERpcmVjdGlvbkRhdGEpIHtcbiAgICAvLyBVcGRhdGUgd2luZCBkaXJlY3Rpb25cbiAgICB3aW5kRGlyZWN0aW9uLnRleHRDb250ZW50ID0gYFdpbmQgZGlyZWN0aW9uOiAke3dpbmREaXJlY3Rpb25EYXRhfWA7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVIdW1pZGl0eShodW1pZGl0eURhdGEpIHtcbiAgICAvLyBVcGRhdGUgaHVtaWRpdHlcbiAgICBodW1pZGl0eS50ZXh0Q29udGVudCA9IGBIdW1pZGl0eTogJHtodW1pZGl0eURhdGF9YDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVByZWNpcGl0YXRpb24ocHJlY2lwaXRhdGlvbkRhdGEpIHtcbiAgICAvLyBVcGRhdGUgcHJlY2lwaXRhdGlvblxuICAgIHByZWNpcGl0YXRpb24udGV4dENvbnRlbnQgPSBgUHJlY2lwaXRhdGlvbjogJHtwcmVjaXBpdGF0aW9uRGF0YX1gO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlQ29uZGl0aW9uKGNvbmRpdGlvbkRhdGEpIHtcbiAgICAvLyBVcGRhdGUgY29uZGl0aW9uXG4gICAgY29uZGl0aW9uLnRleHRDb250ZW50ID0gYENvbmRpdGlvbjogJHtjb25kaXRpb25EYXRhfWA7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVXZWF0aGVySWNvbih3ZWF0aGVySWNvbkRhdGEpIHtcbiAgICAvLyBVcGRhdGUgd2VhdGhlciBpY29uXG4gICAgd2VhdGhlckljb24uc3JjID0gd2VhdGhlckljb25EYXRhO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlTG9jYWxUaW1lKGxvY2FsVGltZURhdGEpIHtcbiAgICAvLyBVcGRhdGUgbG9jYWwgdGltZVxuICAgIGxvY2FsVGltZS50ZXh0Q29udGVudCA9IGBMb2NhbCB0aW1lOiAke2xvY2FsVGltZURhdGF9YDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZUZvcmVjYXN0KGZvcmVDYXN0RGF0YSkge1xuICAgIC8vIFVwZGF0ZSA3IGRheSBmb3JlY2FzdFxuICAgIGNvbnN0IGxpRWxlbXMgPSBmb3JlY2FzdC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImxpXCIpO1xuXG4gICAgZm9yZUNhc3REYXRhLmZvckVhY2goKGRhdGEsIGluZGV4KSA9PiB7XG4gICAgICAvLyBDaGVjayBpZiBkYXRhIGlzIGF2YWlsYWJsZSB0aGVuIGNyZWF0ZSBlbGVtZW50c1xuICAgICAgY29uc3QgZGF5RWxlbSA9IGxpRWxlbXNbaW5kZXhdLnF1ZXJ5U2VsZWN0b3IoXCIuZm9yZWNhc3QtZGF5XCIpO1xuICAgICAgY29uc3QgaWNvbkVsZW0gPSBsaUVsZW1zW2luZGV4XS5xdWVyeVNlbGVjdG9yKFwiLmZvcmVjYXN0LWljb25cIik7XG4gICAgICBjb25zdCBtYXhFbGVtID0gbGlFbGVtc1tpbmRleF0ucXVlcnlTZWxlY3RvcihcIi5mb3JlY2FzdC1tYXhcIik7XG4gICAgICBjb25zdCBtaW5FbGVtID0gbGlFbGVtc1tpbmRleF0ucXVlcnlTZWxlY3RvcihcIi5mb3JlY2FzdC1taW5cIik7XG5cbiAgICAgIGRheUVsZW0udGV4dENvbnRlbnQgPSBkYXRhLmRheTtcbiAgICAgIGljb25FbGVtLnNyYyA9IGRhdGEuaWNvbjtcblxuICAgICAgbWF4RWxlbS50ZXh0Q29udGVudCA9IGAke2RhdGEubWF4dGVtcH3CsENgO1xuICAgICAgbWluRWxlbS50ZXh0Q29udGVudCA9IGAke2RhdGEubWludGVtcH3CsENgO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0V2VhdGhlcigpIHtcbiAgICBsZXQgcmVxdWVzdCA9IGlucHV0LnZhbHVlO1xuICAgIGNvdW50cnkudGV4dENvbnRlbnQgPSBcIkNvdW50cnk6IExvYWRpbmcuLi5cIjtcbiAgICBjaXR5LnRleHRDb250ZW50ID0gXCJDaXR5OiBMb2FkaW5nLi4uXCI7XG4gICAgdGVtcGVyYXR1cmUudGV4dENvbnRlbnQgPSBcIkN1cnJlbnQgdGVtcGVyYXR1cmU6IExvYWRpbmcuLi5cIjtcbiAgICB3aW5kU3BlZWQudGV4dENvbnRlbnQgPSBcIldpbmQgc3BlZWQ6IExvYWRpbmcuLi5cIjtcbiAgICB3aW5kRGlyZWN0aW9uLnRleHRDb250ZW50ID0gXCJXaW5kIGRpcmVjdGlvbjogTG9hZGluZy4uLlwiO1xuICAgIGh1bWlkaXR5LnRleHRDb250ZW50ID0gXCJIdW1pZGl0eTogTG9hZGluZy4uLlwiO1xuICAgIHByZWNpcGl0YXRpb24udGV4dENvbnRlbnQgPSBcIlByZWNpcGl0YXRpb246IExvYWRpbmcuLi5cIjtcbiAgICBjb25kaXRpb24udGV4dENvbnRlbnQgPSBcIkNvbmRpdGlvbjogTG9hZGluZy4uLlwiO1xuICAgIGxvY2FsVGltZS50ZXh0Q29udGVudCA9IFwiTG9jYWwgdGltZTogTG9hZGluZy4uLlwiO1xuICAgIHNldFRpbWVvdXQocHMucHVibGlzaChcImdldC13ZWF0aGVyXCIsIHJlcXVlc3QpLCA1MDAwKTtcbiAgfVxuXG4gIGdldFdlYXRoZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGdldFdlYXRoZXIpO1xuICBwcy5zdWJzY3JpYmUoXCJ1cGRhdGUtY291bnRyeVwiLCB1cGRhdGVDb3VudHJ5KTtcbiAgcHMuc3Vic2NyaWJlKFwidXBkYXRlLWxvY2F0aW9uXCIsIHVwZGF0ZUNpdHkpO1xuICBwcy5zdWJzY3JpYmUoXCJ1cGRhdGUtdGVtcGVyYXR1cmVcIiwgdXBkYXRlVGVtcGVyYXR1cmUpO1xuICBwcy5zdWJzY3JpYmUoXCJ1cGRhdGUtd2luZC1zcGVlZFwiLCB1cGRhdGVXaW5kU3BlZWQpO1xuICBwcy5zdWJzY3JpYmUoXCJ1cGRhdGUtd2luZC1kaXJlY3Rpb25cIiwgdXBkYXRlV2luZERpcmVjdGlvbik7XG4gIHBzLnN1YnNjcmliZShcInVwZGF0ZS1odW1pZGl0eVwiLCB1cGRhdGVIdW1pZGl0eSk7XG4gIHBzLnN1YnNjcmliZShcInVwZGF0ZS1wcmVjaXBpdGF0aW9uXCIsIHVwZGF0ZVByZWNpcGl0YXRpb24pO1xuICBwcy5zdWJzY3JpYmUoXCJ1cGRhdGUtY29uZGl0aW9uXCIsIHVwZGF0ZUNvbmRpdGlvbik7XG4gIHBzLnN1YnNjcmliZShcInVwZGF0ZS13ZWF0aGVyLWljb25cIiwgdXBkYXRlV2VhdGhlckljb24pO1xuICBwcy5zdWJzY3JpYmUoXCJ1cGRhdGUtbG9jYWwtdGltZVwiLCB1cGRhdGVMb2NhbFRpbWUpO1xuICBwcy5zdWJzY3JpYmUoXCJ1cGRhdGUtZm9yZWNhc3RcIiwgdXBkYXRlRm9yZWNhc3QpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9