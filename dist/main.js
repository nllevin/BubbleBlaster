/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return BubbleBlaster; });\n/* harmony import */ var _level__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./level */ \"./src/level.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n\n\n\nclass BubbleBlaster {\n  constructor(canvas) {\n    this.ctx = canvas;\n    this.level = new _level__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    this.player = new _player__WEBPACK_IMPORTED_MODULE_1__[\"default\"](canvas);\n    \n    this.preloaded = false;\n    this.images = {};\n    this.loadImages([\"background\", \"players\", \"mirrorPlayers\"]);\n    \n    this.animate = this.animate.bind(this);\n    this.animate();\n  }\n  \n  loadImages(imageNames) {\n    imageNames.forEach(imageName => {\n      const image = new Image();\n      \n      image.onload = () => {\n        this.images[imageName] = image;\n        if (Object.keys(this.images).length === imageNames.length) {\n          this.preloaded = true;\n        }\n      };\n\n      image.src = `./assets/${imageName}.png`;\n    });\n  }\n\n  animate() {\n    window.requestAnimationFrame(this.animate);\n\n    if (!this.preloaded) {\n      // display loading bar\n    } else {\n      this.player.update();\n      this.level.animate(this.ctx, this.images.background);\n      this.player.animate(this.ctx, {\n        \"right\": this.images.players, \n        \"left\": this.images.mirrorPlayers\n      });\n    }\n  }\n}\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\nwindow.addEventListener(\"DOMContentLoaded\", () => {\n  const canvas = document.getElementById(\"game-canvas\").getContext(\"2d\");\n  new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas);\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/level.js":
/*!**********************!*\
  !*** ./src/level.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Level; });\nconst CONSTANTS = {\n  BACKGROUND_WIDTH: 384,\n  BACKGROUND_HEIGHT: 208,\n  LEVEL_X: 76,\n  LEVEL_Y: 5,\n  LEVEL_WIDTH: 731 + 2 * 8,\n  LEVEL_HEIGHT: 394 + 2 * 8,\n};\n\nclass Level {\n  constructor() {\n  }\n\n  animate(ctx, backgroundImage) {\n    ctx.fillStyle = \"blue\";\n    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);\n    ctx.drawImage(\n      backgroundImage, \n      8, 8, \n      CONSTANTS.BACKGROUND_WIDTH, CONSTANTS.BACKGROUND_HEIGHT, \n      CONSTANTS.LEVEL_X, CONSTANTS.LEVEL_Y, \n      CONSTANTS.LEVEL_WIDTH, CONSTANTS.LEVEL_HEIGHT\n    );\n  }\n}\n\n//# sourceURL=webpack:///./src/level.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Player; });\nconst CONSTANTS = {\n  SPRITE_SIZE: [30, 31.5],\n  FLOOR_HEIGHT: 400,\n  PLAYER_WIDTH: 45,\n  PLAYER_HEIGHT: 47.5,\n  VEL: 2.2,\n  ANIMATION_RATE: 11\n};\n\nconst SPRITES_MAP = {\n  \"right\": {\n    \"-1\": [10.5, 112],\n    0: [10.5, 2],\n    1: [44.5, 2],\n    2: [78.5, 2],\n    3: [112.5, 2],\n    4: [146.5, 2],\n    5: [78.5, 2]\n  },\n  \"left\": {\n    0: [355.5, 2],\n    1: [321.5, 2],\n    2: [287.5, 2],\n    3: [254.5, 2],\n    4: [220.5, 2],\n    5: [287.5, 2]\n  }\n};\n\nclass Player {\n  constructor(ctx) {\n    this.pos = (ctx.canvas.width - CONSTANTS.PLAYER_WIDTH) / 2;\n    this.orientation = \"right\";\n    this.spriteIdx = -1;\n  }\n\n  animate(ctx, playerSprites) {\n    ctx.drawImage(\n      playerSprites[this.orientation],\n      ...(SPRITES_MAP[this.orientation][Math.floor(this.spriteIdx / CONSTANTS.ANIMATION_RATE) % 6]),\n      ...CONSTANTS.SPRITE_SIZE,\n      this.pos, CONSTANTS.FLOOR_HEIGHT - CONSTANTS.PLAYER_HEIGHT,\n      CONSTANTS.PLAYER_WIDTH, CONSTANTS.PLAYER_HEIGHT\n    );\n  }\n\n  update() {\n    if (key.isPressed(\"left\") && this.pos > (90.4 + CONSTANTS.VEL)) {\n      this.orientation = \"left\";\n      this.spriteIdx = this.spriteIdx + 1;\n      this.pos = this.pos - CONSTANTS.VEL;\n    } else if (key.isPressed(\"right\") && this.pos < (770.2 - CONSTANTS.VEL)) {\n      this.orientation = \"right\";\n      this.spriteIdx = this.spriteIdx + 1;\n      this.pos = this.pos + CONSTANTS.VEL;\n    } else {\n      this.orientation = \"right\";\n      this.spriteIdx = -1;\n    }\n  }\n}\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ })

/******/ });