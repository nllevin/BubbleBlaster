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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return BubbleBlaster; });\n/* harmony import */ var _level__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./level */ \"./src/level.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n\n\n\nclass BubbleBlaster {\n  constructor(canvas) {\n    this.ctx = canvas;\n    this.level = new _level__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    this.player = new _player__WEBPACK_IMPORTED_MODULE_1__[\"default\"](canvas);\n    \n    this.preloaded = false;\n    this.images = {};\n    this.loadImages([\"background\", \"players\", \"mirrorPlayers\", \"items\"]);\n    \n    this.animate = this.animate.bind(this);\n    this.animate();\n  }\n  \n  loadImages(imageNames) {\n    imageNames.forEach(imageName => {\n      const image = new Image();\n      \n      image.onload = () => {\n        this.images[imageName] = image;\n        if (Object.keys(this.images).length === imageNames.length) {\n          this.preloaded = true;\n        }\n      };\n\n      image.src = `./assets/${imageName}.png`;\n    });\n  }\n\n  animate() {\n    window.requestAnimationFrame(this.animate);\n\n    if (!this.preloaded) {\n      // display loading bar\n    } else {\n      this.level.animate(this.ctx, this.images.background);\n      if (this.player.harpoon) {\n        this.player.harpoon.animate(this.ctx, this.images.items);\n      }\n      this.player.animate(this.ctx, {\n        \"right\": this.images.players, \n        \"left\": this.images.mirrorPlayers\n      });\n    }\n  }\n}\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/harpoon.js":
/*!************************!*\
  !*** ./src/harpoon.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Harpoon; });\nconst HARPOON_CONSTANTS = {\n  SPRITE_POS: [399, 1564],\n  SPRITE_DIMS: [10, 188],\n  WIDTH: 17,\n  MAX_HEIGHT: 343,\n  INIT_FRACTION: 0.095,\n  CEILING_HEIGHT: 14,\n  FLIGHT_TIME: 1.75,\n  FPS: 60\n}\n\nclass Harpoon {\n  constructor(x_pos) {\n    this.x_pos = x_pos;\n    this.y_pos = HARPOON_CONSTANTS.CEILING_HEIGHT + HARPOON_CONSTANTS.MAX_HEIGHT * (1 - HARPOON_CONSTANTS.INIT_FRACTION);\n    this.fraction = HARPOON_CONSTANTS.INIT_FRACTION;\n  }\n\n  animate(ctx, itemsSprites) {\n    this.update();\n    ctx.drawImage(\n      itemsSprites,\n      ...HARPOON_CONSTANTS.SPRITE_POS,\n      HARPOON_CONSTANTS.SPRITE_DIMS[0], HARPOON_CONSTANTS.SPRITE_DIMS[1] * this.fraction,\n      this.x_pos, this.y_pos,\n      HARPOON_CONSTANTS.WIDTH, HARPOON_CONSTANTS.MAX_HEIGHT * this.fraction\n    )\n  }\n\n  update() {\n    if (this.y_pos > HARPOON_CONSTANTS.CEILING_HEIGHT) {\n      this.fraction = this.fraction + (1 - HARPOON_CONSTANTS.INIT_FRACTION) / (HARPOON_CONSTANTS.FLIGHT_TIME * HARPOON_CONSTANTS.FPS);\n      this.y_pos = this.y_pos - (HARPOON_CONSTANTS.MAX_HEIGHT * (1 - HARPOON_CONSTANTS.INIT_FRACTION)) / (HARPOON_CONSTANTS.FLIGHT_TIME * HARPOON_CONSTANTS.FPS);\n    }\n  }\n}\n\n//# sourceURL=webpack:///./src/harpoon.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Player; });\n/* harmony import */ var _harpoon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./harpoon */ \"./src/harpoon.js\");\n\n\nconst CONSTANTS = {\n  SPRITE_SIZE: [30, 31.5],\n  FLOOR_HEIGHT: 400,\n  PLAYER_WIDTH: 45,\n  PLAYER_HEIGHT: 47.5,\n  VEL: 2.2,\n  ANIMATION_RATE: 11\n};\n\nconst PLAYER_SPRITES_MAP = {\n  \"right\": {\n    \"-2\": [44.5, 112],\n    \"-1\": [10.5, 112],\n    0: [10.5, 2],\n    1: [44.5, 2],\n    2: [78.5, 2],\n    3: [112.5, 2],\n    4: [146.5, 2],\n    5: [78.5, 2],\n  },\n  \"left\": {\n    0: [355.5, 2],\n    1: [321.5, 2],\n    2: [287.5, 2],\n    3: [254.5, 2],\n    4: [220.5, 2],\n    5: [287.5, 2]\n  }\n};\n\nclass Player {\n  constructor(ctx) {\n    this.pos = (ctx.canvas.width - CONSTANTS.PLAYER_WIDTH) / 2;\n    this.orientation = \"right\";\n    this.spriteIdx = -1;\n    this.harpoon = null;\n    this.isFiring = 0;\n  }\n\n  animate(ctx, playerSprites) {\n    this.update();\n    ctx.drawImage(\n      playerSprites[this.orientation],\n      ...PLAYER_SPRITES_MAP[this.orientation][Math.floor(this.spriteIdx / CONSTANTS.ANIMATION_RATE) % 6],\n      ...CONSTANTS.SPRITE_SIZE,\n      this.pos, CONSTANTS.FLOOR_HEIGHT - CONSTANTS.PLAYER_HEIGHT,\n      CONSTANTS.PLAYER_WIDTH, CONSTANTS.PLAYER_HEIGHT\n    );\n  }\n\n  update() {\n    if (this.harpoon && this.harpoon.fraction >= 1) {\n      this.harpoon = null;\n    }\n\n    if ((key.isPressed(\"space\") && !this.harpoon) || this.isFiring) {\n      this.harpoon = this.harpoon || new _harpoon__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.pos + CONSTANTS.SPRITE_SIZE[0] / 2);\n      this.isFiring = this.isFiring + 1;\n      if (this.isFiring <= 1.25 * CONSTANTS.ANIMATION_RATE) {\n        this.orientation = \"right\";\n        this.spriteIdx = -2 * CONSTANTS.ANIMATION_RATE;\n      } else if (this.isFiring <= 2 * CONSTANTS.ANIMATION_RATE) {\n        this.orientation = \"right\";\n        this.spriteIdx = -1;\n      } else {\n        this.isFiring = false;\n        // this.harpoon = null;\n      }\n    } else if (key.isPressed(\"left\") && this.pos > (90.4 + CONSTANTS.VEL)) {\n      this.orientation = \"left\";\n      this.spriteIdx = this.spriteIdx + 1;\n      this.pos = this.pos - CONSTANTS.VEL;\n    } else if (key.isPressed(\"right\") && this.pos < (770.2 - CONSTANTS.VEL)) {\n      this.orientation = \"right\";\n      this.spriteIdx = this.spriteIdx + 1;\n      this.pos = this.pos + CONSTANTS.VEL;\n    } else {\n      this.orientation = \"right\";\n      this.spriteIdx = -1;\n    }\n  }\n}\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ })

/******/ });