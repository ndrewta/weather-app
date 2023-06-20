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
  const weatherKey = "f3b3f9de329746d2a0b91417230706";

  function publishData(data) {
    // Publish successful datga
    _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish("update-country", `${data.location.country}`);
    _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish("update-temperature", `${data.current.temp_c}°C`);
    _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish("update-location", data.location.name);
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
    _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish("update-country", "INVALID LOCATION");
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

  _pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe("get-weather", getWeather);
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0V2VhdGhlckRhdGEuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQSxpRUFBZSxZQUFZLEVBQUM7Ozs7Ozs7VUM1QjVCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOMEI7O0FBRVg7QUFDZjs7QUFFQTtBQUNBO0FBQ0EsSUFBSSwrQ0FBRSw4QkFBOEIsc0JBQXNCO0FBQzFELElBQUksK0NBQUUsa0NBQWtDLG9CQUFvQjtBQUM1RCxJQUFJLCtDQUFFO0FBQ04sSUFBSSwrQ0FBRSxpQ0FBaUMsdUJBQXVCO0FBQzlELElBQUksK0NBQUU7QUFDTixJQUFJLCtDQUFFLCtCQUErQixzQkFBc0I7QUFDM0QsSUFBSSwrQ0FBRSxvQ0FBb0MsdUJBQXVCO0FBQ2pFLElBQUksK0NBQUU7QUFDTixJQUFJLCtDQUFFO0FBQ04sSUFBSSwrQ0FBRTtBQUNOLElBQUksK0NBQUU7QUFDTjs7QUFFQTtBQUNBO0FBQ0EsSUFBSSwrQ0FBRTtBQUNOLElBQUksK0NBQUU7QUFDTixJQUFJLCtDQUFFO0FBQ04sSUFBSSwrQ0FBRTtBQUNOLElBQUksK0NBQUU7QUFDTixJQUFJLCtDQUFFO0FBQ04sSUFBSSwrQ0FBRTtBQUNOLElBQUksK0NBQUU7QUFDTixJQUFJLCtDQUFFO0FBQ04sSUFBSSwrQ0FBRTtBQUNOLElBQUksK0NBQUU7QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkRBQTJELFdBQVcsS0FBSyxNQUFNO0FBQ2pGLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IseUJBQXlCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMLGNBQWMsS0FBSyxFQUFFLEtBQUs7QUFDMUI7O0FBRUEsRUFBRSwrQ0FBRTtBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvcHVic3ViLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvZ2V0V2VhdGhlckRhdGEuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gcHViU3ViKCkge1xuICBjb25zdCBzdWJzY3JpYmVycyA9IHt9O1xuXG4gIGZ1bmN0aW9uIHB1Ymxpc2goZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHN1YnNjcmliZXJzW2V2ZW50TmFtZV0pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHN1YnNjcmliZXJzW2V2ZW50TmFtZV0uZm9yRWFjaCgoY2FsbGJhY2spID0+IHtcbiAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIHN1YnNjcmliZShldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHN1YnNjcmliZXJzW2V2ZW50TmFtZV0pKSB7XG4gICAgICBzdWJzY3JpYmVyc1tldmVudE5hbWVdID0gW107XG4gICAgfVxuICAgIHN1YnNjcmliZXJzW2V2ZW50TmFtZV0ucHVzaChjYWxsYmFjayk7XG4gICAgY29uc3QgaW5kZXggPSBzdWJzY3JpYmVyc1tldmVudE5hbWVdLmxlbmd0aCAtIDE7XG5cbiAgICByZXR1cm4ge1xuICAgICAgdW5zdWJzY3JpYmUoKSB7XG4gICAgICAgIHN1YnNjcmliZXJzW2V2ZW50TmFtZV0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuICByZXR1cm4geyBwdWJsaXNoLCBzdWJzY3JpYmUgfTtcbn1cblxuY29uc3Qgc2hhcmVkUHViU3ViID0gcHViU3ViKCk7XG5leHBvcnQgZGVmYXVsdCBzaGFyZWRQdWJTdWI7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBwcyBmcm9tIFwiLi9wdWJzdWJcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0V2VhdGhlckRhdGEoKSB7XG4gIGNvbnN0IHdlYXRoZXJLZXkgPSBcImYzYjNmOWRlMzI5NzQ2ZDJhMGI5MTQxNzIzMDcwNlwiO1xuXG4gIGZ1bmN0aW9uIHB1Ymxpc2hEYXRhKGRhdGEpIHtcbiAgICAvLyBQdWJsaXNoIHN1Y2Nlc3NmdWwgZGF0Z2FcbiAgICBwcy5wdWJsaXNoKFwidXBkYXRlLWNvdW50cnlcIiwgYCR7ZGF0YS5sb2NhdGlvbi5jb3VudHJ5fWApO1xuICAgIHBzLnB1Ymxpc2goXCJ1cGRhdGUtdGVtcGVyYXR1cmVcIiwgYCR7ZGF0YS5jdXJyZW50LnRlbXBfY33CsENgKTtcbiAgICBwcy5wdWJsaXNoKFwidXBkYXRlLWxvY2F0aW9uXCIsIGRhdGEubG9jYXRpb24ubmFtZSk7XG4gICAgcHMucHVibGlzaChcInVwZGF0ZS13aW5kLXNwZWVkXCIsIGAke2RhdGEuY3VycmVudC53aW5kX2twaH0ga20vaGApO1xuICAgIHBzLnB1Ymxpc2goXCJ1cGRhdGUtd2luZC1kaXJlY3Rpb25cIiwgZGF0YS5jdXJyZW50LndpbmRfZGlyKTtcbiAgICBwcy5wdWJsaXNoKFwidXBkYXRlLWh1bWlkaXR5XCIsIGAke2RhdGEuY3VycmVudC5odW1pZGl0eX0lYCk7XG4gICAgcHMucHVibGlzaChcInVwZGF0ZS1wcmVjaXBpdGF0aW9uXCIsIGAke2RhdGEuY3VycmVudC5wcmVjaXBfbW19bW1gKTtcbiAgICBwcy5wdWJsaXNoKFwidXBkYXRlLWNvbmRpdGlvblwiLCBkYXRhLmN1cnJlbnQuY29uZGl0aW9uLnRleHQpO1xuICAgIHBzLnB1Ymxpc2goXCJ1cGRhdGUtd2VhdGhlci1pY29uXCIsIGRhdGEuY3VycmVudC5jb25kaXRpb24uaWNvbik7XG4gICAgcHMucHVibGlzaChcInVwZGF0ZS1sb2NhbC10aW1lXCIsIHRpbWVDb252ZXJ0ZXIoZGF0YS5sb2NhdGlvbi5sb2NhbHRpbWUpKTtcbiAgICBwcy5wdWJsaXNoKFwidXBkYXRlLWZvcmVjYXN0XCIsIHNvcnRGb3JlY2FzdChkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5KSk7XG4gIH1cblxuICBmdW5jdGlvbiBwdWJsaXNoRXJyb3IoKSB7XG4gICAgLy8gUHVibGlzaCBlcnJvciBtZXNzYWdlXG4gICAgcHMucHVibGlzaChcInVwZGF0ZS1jb3VudHJ5XCIsIFwiSU5WQUxJRCBMT0NBVElPTlwiKTtcbiAgICBwcy5wdWJsaXNoKFwidXBkYXRlLWxvY2F0aW9uXCIsIFwiSU5WQUxJRCBMT0NBVElPTlwiKTtcbiAgICBwcy5wdWJsaXNoKFwidXBkYXRlLXRlbXBlcmF0dXJlXCIsIFwiRVJST1JcIik7XG4gICAgcHMucHVibGlzaChcInVwZGF0ZS13aW5kLXNwZWVkXCIsIFwiRVJST1JcIik7XG4gICAgcHMucHVibGlzaChcInVwZGF0ZS13aW5kLWRpcmVjdGlvblwiLCBcIkVSUk9SXCIpO1xuICAgIHBzLnB1Ymxpc2goXCJ1cGRhdGUtaHVtaWRpdHlcIiwgXCJFUlJPUlwiKTtcbiAgICBwcy5wdWJsaXNoKFwidXBkYXRlLXByZWNpcGl0YXRpb25cIiwgXCJFUlJPUlwiKTtcbiAgICBwcy5wdWJsaXNoKFwidXBkYXRlLWNvbmRpdGlvblwiLCBcIkVSUk9SXCIpO1xuICAgIHBzLnB1Ymxpc2goXCJ1cGRhdGUtd2VhdGhlci1pY29uXCIsIFwiXCIpO1xuICAgIHBzLnB1Ymxpc2goXCJ1cGRhdGUtbG9jYWwtdGltZVwiLCBcIkVSUk9SXCIpO1xuICAgIHBzLnB1Ymxpc2goXCJ1cGRhdGUtZm9yZWNhc3RcIiwgXCJFUlJPUlwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUVycm9yKGVycikge1xuICAgIC8vIEhhbmRsZSBlcnJvclxuICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgcHVibGlzaEVycm9yKGVycik7XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyKGlucHV0KSB7XG4gICAgLy8gR2V0IHdlYXRoZXIgZGF0YVxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9JHt3ZWF0aGVyS2V5fSZxPSR7aW5wdXR9JmRheXM9N2AsXG4gICAgICAgIHsgbW9kZTogXCJjb3JzXCIgfVxuICAgICAgKTtcbiAgICAgIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgcHVibGlzaERhdGEod2VhdGhlckRhdGEpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaGFuZGxlRXJyb3IoZXJyKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzb3J0Rm9yZWNhc3QoZm9yZWNhc3REYXRhKSB7XG4gICAgLy8gU29ydCBkYXksIHdlYXRoZXIgaWNvbiwgaGlnaCBhbmQgbG93IHRlbXBzLCBob3VybHkgaGlnaHNcbiAgICBjb25zdCBhcnJheSA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3JlY2FzdERhdGEubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGRheURhdGEgPSBmb3JlY2FzdERhdGFbaV07XG4gICAgICBjb25zdCBvYmogPSB7XG4gICAgICAgIG1pbnRlbXA6IGRheURhdGEuZGF5Lm1pbnRlbXBfYyxcbiAgICAgICAgbWF4dGVtcDogZGF5RGF0YS5kYXkubWF4dGVtcF9jLFxuICAgICAgICBpY29uOiBkYXlEYXRhLmRheS5jb25kaXRpb24uaWNvbixcbiAgICAgICAgZGF5OiBuZXcgRGF0ZShkYXlEYXRhLmRhdGUpLnRvTG9jYWxlRGF0ZVN0cmluZyhcImVuLVVTXCIsIHtcbiAgICAgICAgICB3ZWVrZGF5OiBcInNob3J0XCIsXG4gICAgICAgIH0pLFxuICAgICAgfTtcbiAgICAgIGFycmF5LnB1c2gob2JqKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyYXk7XG4gIH1cblxuICBmdW5jdGlvbiB0aW1lQ29udmVydGVyKHRpbWVEYXRhKSB7XG4gICAgbGV0IGRheSA9IFwiXCI7XG4gICAgLy8gU3dpdGNoIGNhc2UgZm9yIGRheSBvZiB3ZWVrXG4gICAgc3dpdGNoIChuZXcgRGF0ZSh0aW1lRGF0YSkuZ2V0RGF5KCkpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgZGF5ID0gXCJTdW5kYXlcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIGRheSA9IFwiTW9uZGF5XCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBkYXkgPSBcIlR1ZXNkYXlcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGRheSA9IFwiV2VkbmVzZGF5XCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0OlxuICAgICAgICBkYXkgPSBcIlRodXJzZGF5XCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA1OlxuICAgICAgICBkYXkgPSBcIkZyaWRheVwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNjpcbiAgICAgICAgZGF5ID0gXCJTYXR1cmRheVwiO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBsZXQgdGltZSA9IG5ldyBEYXRlKHRpbWVEYXRhKS50b0xvY2FsZVN0cmluZyhcImVuLVVTXCIsIHtcbiAgICAgIGhvdXI6IFwibnVtZXJpY1wiLFxuICAgICAgbWludXRlOiBcIm51bWVyaWNcIixcbiAgICAgIGhvdXIxMjogdHJ1ZSxcbiAgICB9KTtcblxuICAgIHJldHVybiBgJHtkYXl9ICR7dGltZX1gO1xuICB9XG5cbiAgcHMuc3Vic2NyaWJlKFwiZ2V0LXdlYXRoZXJcIiwgZ2V0V2VhdGhlcik7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=