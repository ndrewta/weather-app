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
/*!*******************************!*\
  !*** ./src/getWeatherData.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWeatherData)
/* harmony export */ });
/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubsub */ "./src/pubsub.js");


function getWeatherData() {
  const weatherKey = "389f0ff0bad1485095d94113232206";

  function publishData(data) {
    // Publish successful datga
    _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish("update-temperature", `${data.current.temp_c}°C`);
    _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish(
      "update-location",
      `${data.location.name}, ${data.location.country}`
    );
    _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish("update-wind-speed", `${data.current.wind_kph} km/h`);
    _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish("update-wind-direction", data.current.wind_dir);
    _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish("update-humidity", `${data.current.humidity}%`);
    _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish("update-precipitation", `${data.current.precip_mm}mm`);
    _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish("update-condition", data.current.condition.text);
    _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish("update-weather-icon", data.current.condition.icon);
    _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish("update-local-time", timeConverter(data.location.localtime));
    _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish("update-forecast", sortForecast(data.forecast.forecastday));
  }

  function publishError() {
    // Publish error message
    _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish("update-location", "INVALID LOCATION");
    _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish("update-temperature", "ERROR");
    _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish("update-wind-speed", "ERROR");
    _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish("update-wind-direction", "ERROR");
    _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish("update-humidity", "ERROR");
    _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish("update-precipitation", "ERROR");
    _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish("update-condition", "ERROR");
    _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish("update-weather-icon", "");
    _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish("update-local-time", "ERROR");
    _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish("update-forecast", "ERROR");
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

  async function getWeatherByIp() {
    // Get weather by ip request
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${weatherKey}&q=auto:ip&days=7`,
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
        hour: dayData.hour,
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

  _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe("get-weather", getWeather);
  _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe("get-weather-ip", getWeatherByIp);
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0V2VhdGhlckRhdGEuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQSxpRUFBZSxZQUFZLEVBQUM7Ozs7Ozs7VUM1QjVCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOMEI7O0FBRVg7QUFDZjs7QUFFQTtBQUNBO0FBQ0EsSUFBSSwrQ0FBRSxrQ0FBa0Msb0JBQW9CO0FBQzVELElBQUksK0NBQUU7QUFDTjtBQUNBLFNBQVMsbUJBQW1CLElBQUksc0JBQXNCO0FBQ3REO0FBQ0EsSUFBSSwrQ0FBRSxpQ0FBaUMsdUJBQXVCO0FBQzlELElBQUksK0NBQUU7QUFDTixJQUFJLCtDQUFFLCtCQUErQixzQkFBc0I7QUFDM0QsSUFBSSwrQ0FBRSxvQ0FBb0MsdUJBQXVCO0FBQ2pFLElBQUksK0NBQUU7QUFDTixJQUFJLCtDQUFFO0FBQ04sSUFBSSwrQ0FBRTtBQUNOLElBQUksK0NBQUU7QUFDTjs7QUFFQTtBQUNBO0FBQ0EsSUFBSSwrQ0FBRTtBQUNOLElBQUksK0NBQUU7QUFDTixJQUFJLCtDQUFFO0FBQ04sSUFBSSwrQ0FBRTtBQUNOLElBQUksK0NBQUU7QUFDTixJQUFJLCtDQUFFO0FBQ04sSUFBSSwrQ0FBRTtBQUNOLElBQUksK0NBQUU7QUFDTixJQUFJLCtDQUFFO0FBQ04sSUFBSSwrQ0FBRTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQsV0FBVyxLQUFLLE1BQU07QUFDakYsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQsV0FBVztBQUN0RSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLHlCQUF5QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMLGNBQWMsS0FBSyxFQUFFLEtBQUs7QUFDMUI7O0FBRUEsRUFBRSwrQ0FBRTtBQUNKLEVBQUUsK0NBQUU7QUFDSiIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3B1YnN1Yi5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2dldFdlYXRoZXJEYXRhLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHB1YlN1YigpIHtcbiAgY29uc3Qgc3Vic2NyaWJlcnMgPSB7fTtcblxuICBmdW5jdGlvbiBwdWJsaXNoKGV2ZW50TmFtZSwgZGF0YSkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShzdWJzY3JpYmVyc1tldmVudE5hbWVdKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzdWJzY3JpYmVyc1tldmVudE5hbWVdLmZvckVhY2goKGNhbGxiYWNrKSA9PiB7XG4gICAgICBjYWxsYmFjayhkYXRhKTtcbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiBzdWJzY3JpYmUoZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShzdWJzY3JpYmVyc1tldmVudE5hbWVdKSkge1xuICAgICAgc3Vic2NyaWJlcnNbZXZlbnROYW1lXSA9IFtdO1xuICAgIH1cbiAgICBzdWJzY3JpYmVyc1tldmVudE5hbWVdLnB1c2goY2FsbGJhY2spO1xuICAgIGNvbnN0IGluZGV4ID0gc3Vic2NyaWJlcnNbZXZlbnROYW1lXS5sZW5ndGggLSAxO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHVuc3Vic2NyaWJlKCkge1xuICAgICAgICBzdWJzY3JpYmVyc1tldmVudE5hbWVdLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9LFxuICAgIH07XG4gIH1cbiAgcmV0dXJuIHsgcHVibGlzaCwgc3Vic2NyaWJlIH07XG59XG5cbmNvbnN0IHNoYXJlZFB1YlN1YiA9IHB1YlN1YigpO1xuZXhwb3J0IGRlZmF1bHQgc2hhcmVkUHViU3ViO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgcHMgZnJvbSBcIi4vcHVic3ViXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFdlYXRoZXJEYXRhKCkge1xuICBjb25zdCB3ZWF0aGVyS2V5ID0gXCIzODlmMGZmMGJhZDE0ODUwOTVkOTQxMTMyMzIyMDZcIjtcblxuICBmdW5jdGlvbiBwdWJsaXNoRGF0YShkYXRhKSB7XG4gICAgLy8gUHVibGlzaCBzdWNjZXNzZnVsIGRhdGdhXG4gICAgcHMucHVibGlzaChcInVwZGF0ZS10ZW1wZXJhdHVyZVwiLCBgJHtkYXRhLmN1cnJlbnQudGVtcF9jfcKwQ2ApO1xuICAgIHBzLnB1Ymxpc2goXG4gICAgICBcInVwZGF0ZS1sb2NhdGlvblwiLFxuICAgICAgYCR7ZGF0YS5sb2NhdGlvbi5uYW1lfSwgJHtkYXRhLmxvY2F0aW9uLmNvdW50cnl9YFxuICAgICk7XG4gICAgcHMucHVibGlzaChcInVwZGF0ZS13aW5kLXNwZWVkXCIsIGAke2RhdGEuY3VycmVudC53aW5kX2twaH0ga20vaGApO1xuICAgIHBzLnB1Ymxpc2goXCJ1cGRhdGUtd2luZC1kaXJlY3Rpb25cIiwgZGF0YS5jdXJyZW50LndpbmRfZGlyKTtcbiAgICBwcy5wdWJsaXNoKFwidXBkYXRlLWh1bWlkaXR5XCIsIGAke2RhdGEuY3VycmVudC5odW1pZGl0eX0lYCk7XG4gICAgcHMucHVibGlzaChcInVwZGF0ZS1wcmVjaXBpdGF0aW9uXCIsIGAke2RhdGEuY3VycmVudC5wcmVjaXBfbW19bW1gKTtcbiAgICBwcy5wdWJsaXNoKFwidXBkYXRlLWNvbmRpdGlvblwiLCBkYXRhLmN1cnJlbnQuY29uZGl0aW9uLnRleHQpO1xuICAgIHBzLnB1Ymxpc2goXCJ1cGRhdGUtd2VhdGhlci1pY29uXCIsIGRhdGEuY3VycmVudC5jb25kaXRpb24uaWNvbik7XG4gICAgcHMucHVibGlzaChcInVwZGF0ZS1sb2NhbC10aW1lXCIsIHRpbWVDb252ZXJ0ZXIoZGF0YS5sb2NhdGlvbi5sb2NhbHRpbWUpKTtcbiAgICBwcy5wdWJsaXNoKFwidXBkYXRlLWZvcmVjYXN0XCIsIHNvcnRGb3JlY2FzdChkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5KSk7XG4gIH1cblxuICBmdW5jdGlvbiBwdWJsaXNoRXJyb3IoKSB7XG4gICAgLy8gUHVibGlzaCBlcnJvciBtZXNzYWdlXG4gICAgcHMucHVibGlzaChcInVwZGF0ZS1sb2NhdGlvblwiLCBcIklOVkFMSUQgTE9DQVRJT05cIik7XG4gICAgcHMucHVibGlzaChcInVwZGF0ZS10ZW1wZXJhdHVyZVwiLCBcIkVSUk9SXCIpO1xuICAgIHBzLnB1Ymxpc2goXCJ1cGRhdGUtd2luZC1zcGVlZFwiLCBcIkVSUk9SXCIpO1xuICAgIHBzLnB1Ymxpc2goXCJ1cGRhdGUtd2luZC1kaXJlY3Rpb25cIiwgXCJFUlJPUlwiKTtcbiAgICBwcy5wdWJsaXNoKFwidXBkYXRlLWh1bWlkaXR5XCIsIFwiRVJST1JcIik7XG4gICAgcHMucHVibGlzaChcInVwZGF0ZS1wcmVjaXBpdGF0aW9uXCIsIFwiRVJST1JcIik7XG4gICAgcHMucHVibGlzaChcInVwZGF0ZS1jb25kaXRpb25cIiwgXCJFUlJPUlwiKTtcbiAgICBwcy5wdWJsaXNoKFwidXBkYXRlLXdlYXRoZXItaWNvblwiLCBcIlwiKTtcbiAgICBwcy5wdWJsaXNoKFwidXBkYXRlLWxvY2FsLXRpbWVcIiwgXCJFUlJPUlwiKTtcbiAgICBwcy5wdWJsaXNoKFwidXBkYXRlLWZvcmVjYXN0XCIsIFwiRVJST1JcIik7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVFcnJvcihlcnIpIHtcbiAgICAvLyBIYW5kbGUgZXJyb3JcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIHB1Ymxpc2hFcnJvcihlcnIpO1xuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlcihpbnB1dCkge1xuICAgIC8vIEdldCB3ZWF0aGVyIGRhdGFcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PSR7d2VhdGhlcktleX0mcT0ke2lucHV0fSZkYXlzPTdgLFxuICAgICAgICB7IG1vZGU6IFwiY29yc1wiIH1cbiAgICAgICk7XG4gICAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIHB1Ymxpc2hEYXRhKHdlYXRoZXJEYXRhKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGhhbmRsZUVycm9yKGVycik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlckJ5SXAoKSB7XG4gICAgLy8gR2V0IHdlYXRoZXIgYnkgaXAgcmVxdWVzdFxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9JHt3ZWF0aGVyS2V5fSZxPWF1dG86aXAmZGF5cz03YCxcbiAgICAgICAgeyBtb2RlOiBcImNvcnNcIiB9XG4gICAgICApO1xuICAgICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICBwdWJsaXNoRGF0YSh3ZWF0aGVyRGF0YSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBoYW5kbGVFcnJvcihlcnIpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNvcnRGb3JlY2FzdChmb3JlY2FzdERhdGEpIHtcbiAgICAvLyBTb3J0IGRheSwgd2VhdGhlciBpY29uLCBoaWdoIGFuZCBsb3cgdGVtcHMsIGhvdXJseSBoaWdoc1xuICAgIGNvbnN0IGFycmF5ID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZvcmVjYXN0RGF0YS5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgZGF5RGF0YSA9IGZvcmVjYXN0RGF0YVtpXTtcbiAgICAgIGNvbnN0IG9iaiA9IHtcbiAgICAgICAgbWludGVtcDogZGF5RGF0YS5kYXkubWludGVtcF9jLFxuICAgICAgICBtYXh0ZW1wOiBkYXlEYXRhLmRheS5tYXh0ZW1wX2MsXG4gICAgICAgIGljb246IGRheURhdGEuZGF5LmNvbmRpdGlvbi5pY29uLFxuICAgICAgICBkYXk6IG5ldyBEYXRlKGRheURhdGEuZGF0ZSkudG9Mb2NhbGVEYXRlU3RyaW5nKFwiZW4tVVNcIiwge1xuICAgICAgICAgIHdlZWtkYXk6IFwic2hvcnRcIixcbiAgICAgICAgfSksXG4gICAgICAgIGhvdXI6IGRheURhdGEuaG91cixcbiAgICAgIH07XG4gICAgICBhcnJheS5wdXNoKG9iaik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycmF5O1xuICB9XG5cbiAgZnVuY3Rpb24gdGltZUNvbnZlcnRlcih0aW1lRGF0YSkge1xuICAgIGxldCBkYXkgPSBcIlwiO1xuICAgIC8vIFN3aXRjaCBjYXNlIGZvciBkYXkgb2Ygd2Vla1xuICAgIHN3aXRjaCAobmV3IERhdGUodGltZURhdGEpLmdldERheSgpKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIGRheSA9IFwiU3VuZGF5XCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxOlxuICAgICAgICBkYXkgPSBcIk1vbmRheVwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgZGF5ID0gXCJUdWVzZGF5XCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBkYXkgPSBcIldlZG5lc2RheVwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDpcbiAgICAgICAgZGF5ID0gXCJUaHVyc2RheVwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNTpcbiAgICAgICAgZGF5ID0gXCJGcmlkYXlcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDY6XG4gICAgICAgIGRheSA9IFwiU2F0dXJkYXlcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgbGV0IHRpbWUgPSBuZXcgRGF0ZSh0aW1lRGF0YSkudG9Mb2NhbGVTdHJpbmcoXCJlbi1VU1wiLCB7XG4gICAgICBob3VyOiBcIm51bWVyaWNcIixcbiAgICAgIG1pbnV0ZTogXCJudW1lcmljXCIsXG4gICAgICBob3VyMTI6IHRydWUsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gYCR7ZGF5fSAke3RpbWV9YDtcbiAgfVxuXG4gIHBzLnN1YnNjcmliZShcImdldC13ZWF0aGVyXCIsIGdldFdlYXRoZXIpO1xuICBwcy5zdWJzY3JpYmUoXCJnZXQtd2VhdGhlci1pcFwiLCBnZXRXZWF0aGVyQnlJcCk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=