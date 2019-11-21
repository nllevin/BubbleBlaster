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

/***/ "./src/bubble.js":
/*!***********************!*\
  !*** ./src/bubble.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Bubble; });\nconst BUBBLE_SPRITES_MAP = {\n  POS: {\n    RED: {\n      0: [106, 23],\n      1: [86, 19],\n      2: [52, 13],\n      3: [1, 6]\n    },\n    BLUE: {\n      0: [106, 73],\n      1: [86, 69],\n      2: [52, 63],\n      3: [1, 56]\n    },\n    GREEN: {\n      0: [106, 122],\n      1: [86, 118],\n      2: [52, 112],\n      3: [1, 105]\n    }\n  },\n  DIMS: {\n    0: [8, 7],\n    1: [16, 14],\n    2: [32, 26],\n    3: [48, 40]\n  }\n};\n\nconst BUBBLE_CONSTANTS = {\n  DIMS: {\n    0: [11, 11],\n    1: [21, 21],\n    2: [42, 42],\n    3: [60, 60]\n  },\n  Y_MIN: {\n    0: 310,\n    1: 240,\n    2: 212,\n    3: 192\n  },\n  X_VEL: 1.1,\n  GRAVITY: 0.11\n};\n\nclass Bubble {\n  constructor(ctx, bubble) {\n    this.color = bubble.color;\n    this.size = bubble.size;\n\n    this.x_pos = bubble.x_init;\n    this.y_pos = bubble.y_init;\n\n    this.y_min = bubble.y_init - this.dims()[1];\n    this.x_dir = bubble.x_dir;\n    this.y_vel_init = bubble.y_vel_init || this.zeroTime() * BUBBLE_CONSTANTS.GRAVITY * (6 - this.size) / 6;\n    this.time = 0;\n  }\n\n  animate(ctx, bubbleSprites) {\n    ctx.drawImage(\n      bubbleSprites,\n      ...BUBBLE_SPRITES_MAP.POS[this.color][this.size],\n      ...BUBBLE_SPRITES_MAP.DIMS[this.size],\n      this.x_pos, this.y_pos,\n      ...this.dims()\n    );\n  }\n\n  center() {\n    return [this.x_pos + this.dims()[0] / 2, this.y_pos + this.dims()[1] / 2];\n  }\n\n  collidesWith(obj) {\n    const objBounds = obj.getBounds();\n    if (\n      this.center()[1] + this.radius() < objBounds[0][1] + this.radius() / 4\n      || this.center()[0] + this.radius() < objBounds[0][0] + this.radius() / 4\n      || this.center()[0] - this.radius() > objBounds[1][0] - this.radius() / 4\n    ) {\n      return false;\n    } else {\n      return true;\n    }\n  }\n\n  dims() {\n    return BUBBLE_CONSTANTS.DIMS[this.size];\n  }\n\n  getY() {\n    return this.y_min + this.y_vel_init * this.time + 0.5 * BUBBLE_CONSTANTS.GRAVITY * this.time * this.time;\n  }\n\n  radius() {\n    return this.dims()[0] / 2;\n  }\n\n  update() {\n    if (this.x_pos <= 92 || this.x_pos + this.dims()[0] >= 807) {\n      this.x_dir = -this.x_dir;\n    }\n    if ( this.getY() >= (400 - this.dims()[1])) {\n      this.y_min = BUBBLE_CONSTANTS.Y_MIN[this.size];\n      this.y_vel_init = 0;\n      this.time = this.zeroTime();\n    } \n\n    this.y_pos = this.getY();\n    this.x_pos = this.x_pos + BUBBLE_CONSTANTS.X_VEL * this.x_dir;\n    this.time = this.time + 1;\n  }\n\n  zeroTime() {\n    return -Math.sqrt(((400 - this.dims()[1]) - BUBBLE_CONSTANTS.Y_MIN[this.size]) * 2 / BUBBLE_CONSTANTS.GRAVITY);\n  }\n}\n\n//# sourceURL=webpack:///./src/bubble.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return BubbleBlaster; });\n/* harmony import */ var _level__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./level */ \"./src/level.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n/* harmony import */ var _bubble__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bubble */ \"./src/bubble.js\");\n\n\n\n\nclass BubbleBlaster {\n  constructor(canvas) {\n    this.ctx = canvas;\n    this.level = new _level__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    this.player = new _player__WEBPACK_IMPORTED_MODULE_1__[\"default\"](canvas);\n    this.bubbles = [\n      new _bubble__WEBPACK_IMPORTED_MODULE_2__[\"default\"](canvas, {\n        color: \"GREEN\", \n        size: 0, \n        x_dir: -1, \n        x_init: canvas.canvas.width * 0.25,\n        y_init: 210,\n        y_vel_init: 0.01\n      }),\n      new _bubble__WEBPACK_IMPORTED_MODULE_2__[\"default\"](canvas, {\n        color: \"GREEN\", \n        size: 3, \n        x_dir: -1,\n        x_init: canvas.canvas.width * 0.75,\n        y_init: 210,\n        y_vel_init: 0.01\n      })\n    ];\n    \n    this.preloaded = false;\n    this.images = {};\n    this.loadImages([\n      \"background\", \n      \"players\", \n      \"mirrorPlayers\", \n      \"items\", \n      \"bubbles\",\n      \"spikes\"\n    ]);\n    this.frozen = false;\n    \n    this.play = this.play.bind(this);\n    this.play();\n  }\n  \n  animate() {\n    this.level.animate(this.ctx, this.images.background, this.images.spikes);\n    if (this.player.harpoon) {\n      this.player.harpoon.animate(this.ctx, this.images.items);\n    }\n    this.bubbles.forEach(bubble => bubble.animate(this.ctx, this.images.bubbles));\n    this.player.animate(this.ctx, {\n      right: this.images.players, \n      left: this.images.mirrorPlayers,\n      dying: this.images.players\n    });\n  }\n\n  checkCollisions() {\n    if (this.bubbles.some(bubble => bubble.collidesWith(this.player))) {\n      this.frozen = true;\n      this.player.orientation = \"dying\";\n      this.player.spriteIdx = 0;\n      this.lossSequenceFrame = 1;\n    } else {\n      let bubblesCopy = this.bubbles.slice();\n      let newBubbles = [];\n\n      bubblesCopy.forEach(bubble => {\n        if (bubble.y_pos > 32) {\n          newBubbles.push(bubble);\n        }\n      });\n\n      if (this.player.harpoon) {\n        const poppedBubbleIdx = this.bubbles.findIndex(bubble => {\n          return bubble.collidesWith(this.player.harpoon);\n        });\n        if (poppedBubbleIdx !== -1) {\n          this.player.harpoon = null;\n          newBubbles.splice(poppedBubbleIdx, 1);\n\n          const poppedBubble = this.bubbles[poppedBubbleIdx];\n          if (poppedBubble.size) {\n            newBubbles = newBubbles.concat([\n              new _bubble__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.ctx, {\n                color: poppedBubble.color,\n                size: poppedBubble.size - 1,\n                x_dir: -1,\n                x_init: poppedBubble.x_pos + 0.375 * poppedBubble.radius(),\n                y_init: poppedBubble.y_pos + 0.5 * poppedBubble.radius()\n              }),\n              new _bubble__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.ctx, {\n                color: poppedBubble.color,\n                size: poppedBubble.size - 1,\n                x_dir: 1,\n                x_init: poppedBubble.x_pos + 0.375 * poppedBubble.radius(),\n                y_init: poppedBubble.y_pos + 0.5 * poppedBubble.radius()\n              })\n            ]);\n          }\n        }\n      }\n      this.bubbles = newBubbles;\n    }\n  }\n\n  loadImages(imageNames) {\n    imageNames.forEach(imageName => {\n      const image = new Image();\n      \n      image.onload = () => {\n        this.images[imageName] = image;\n        if (Object.keys(this.images).length === imageNames.length) {\n          this.preloaded = true;\n        }\n      };\n\n      image.src = `./assets/${imageName}.png`;\n    });\n  }\n\n  play() {\n    window.requestAnimationFrame(this.play);\n\n    if (!this.preloaded) {\n      // display loading bar\n    } else if (!this.frozen) {\n      this.update();\n      this.animate();\n      this.checkCollisions();\n    } else {\n      this.player.deathThroes(this.lossSequenceFrame);\n      this.animate();\n      this.lossSequenceFrame = this.lossSequenceFrame + 1;\n    }\n  }\n\n  update() {\n    this.player.update();\n    this.bubbles.forEach(bubble => bubble.update());\n  }\n}\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/harpoon.js":
/*!************************!*\
  !*** ./src/harpoon.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Harpoon; });\nconst HARPOON_CONSTANTS = {\n  SPRITE_POS: [399, 1564],\n  SPRITE_DIMS: [10, 188],\n  WIDTH: 17,\n  MAX_HEIGHT: 387,\n  INIT_FRACTION: 0.095,\n  CEILING_HEIGHT: 14,\n  FLIGHT_TIME: 1.75,\n  FPS: 60\n}\n\nclass Harpoon {\n  constructor(x_pos) {\n    this.x_pos = x_pos;\n    this.y_pos = HARPOON_CONSTANTS.CEILING_HEIGHT + HARPOON_CONSTANTS.MAX_HEIGHT * (1 - HARPOON_CONSTANTS.INIT_FRACTION);\n    this.fraction = HARPOON_CONSTANTS.INIT_FRACTION;\n  }\n\n  animate(ctx, itemsSprites) {\n    this.update();\n    ctx.drawImage(\n      itemsSprites,\n      ...HARPOON_CONSTANTS.SPRITE_POS,\n      HARPOON_CONSTANTS.SPRITE_DIMS[0], HARPOON_CONSTANTS.SPRITE_DIMS[1] * this.fraction,\n      this.x_pos, this.y_pos,\n      HARPOON_CONSTANTS.WIDTH, HARPOON_CONSTANTS.MAX_HEIGHT * this.fraction\n    )\n  }\n\n  getBounds() {\n    return [\n      [this.x_pos, this.y_pos],\n      [this.x_pos + HARPOON_CONSTANTS.WIDTH, 400]\n    ];\n  }\n\n  update() {\n    if (this.y_pos > HARPOON_CONSTANTS.CEILING_HEIGHT) {\n      this.fraction = this.fraction + (1 - HARPOON_CONSTANTS.INIT_FRACTION) / (HARPOON_CONSTANTS.FLIGHT_TIME * HARPOON_CONSTANTS.FPS);\n      this.y_pos = this.y_pos - (HARPOON_CONSTANTS.MAX_HEIGHT * (1 - HARPOON_CONSTANTS.INIT_FRACTION)) / (HARPOON_CONSTANTS.FLIGHT_TIME * HARPOON_CONSTANTS.FPS);\n    }\n  }\n}\n\n//# sourceURL=webpack:///./src/harpoon.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Level; });\nconst CONSTANTS = {\n  BACKGROUND_WIDTH: 384,\n  BACKGROUND_HEIGHT: 208,\n  LEVEL_X: 76,\n  LEVEL_Y: 5,\n  LEVEL_WIDTH: 731 + 2 * 8,\n  LEVEL_HEIGHT: 394 + 2 * 8,\n};\n\nclass Level {\n  constructor() {\n  }\n\n  animate(ctx, backgroundSprites, spikesSprites) {\n    ctx.fillStyle = \"blue\";\n    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);\n    ctx.drawImage(\n      backgroundSprites, \n      8, 8, \n      CONSTANTS.BACKGROUND_WIDTH, CONSTANTS.BACKGROUND_HEIGHT, \n      CONSTANTS.LEVEL_X, CONSTANTS.LEVEL_Y, \n      CONSTANTS.LEVEL_WIDTH, CONSTANTS.LEVEL_HEIGHT\n    );\n    \n    ctx.drawImage(\n      spikesSprites,\n      111, 110,\n      526, 16,\n      CONSTANTS.LEVEL_X + 2 * 8.5, CONSTANTS.LEVEL_Y + 2 * 8,\n      (CONSTANTS.LEVEL_WIDTH - 4 * 8) / 2, 10\n    );\n    ctx.drawImage(\n      spikesSprites,\n      111, 110,\n      526, 16,\n      CONSTANTS.LEVEL_X + 2 * 8 + (CONSTANTS.LEVEL_WIDTH - 4 * 8) / 2, CONSTANTS.LEVEL_Y + 2 * 8,\n      (CONSTANTS.LEVEL_WIDTH - 4 * 8) / 2, 10\n    );\n  }\n}\n\n//# sourceURL=webpack:///./src/level.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Player; });\n/* harmony import */ var _harpoon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./harpoon */ \"./src/harpoon.js\");\n\n\nconst CONSTANTS = {\n  SPRITE_SIZE: [30, 31.5],\n  FLOOR_HEIGHT: 400,\n  PLAYER_WIDTH: 45,\n  PLAYER_HEIGHT: 47.5,\n  VEL: 2.2,\n  ANIMATION_RATE: 11\n};\n\nconst PLAYER_SPRITES_MAP = {\n  \"right\": {\n    \"-2\": [44.5, 112],\n    \"-1\": [10.5, 112],\n    0: [10.5, 2],\n    1: [44.5, 2],\n    2: [78.5, 2],\n    3: [112.5, 2],\n    4: [146.5, 2],\n    5: [78.5, 2],\n  },\n  \"left\": {\n    0: [355.5, 2],\n    1: [321.5, 2],\n    2: [287.5, 2],\n    3: [254.5, 2],\n    4: [220.5, 2],\n    5: [287.5, 2]\n  },\n  \"dying\": {\n    0: [148, 78]\n  }\n};\n\nclass Player {\n  constructor(ctx) {\n    this.x_pos = (ctx.canvas.width - CONSTANTS.PLAYER_WIDTH) / 2;\n    this.y_pos = CONSTANTS.FLOOR_HEIGHT - CONSTANTS.PLAYER_HEIGHT;\n    this.orientation = \"right\";\n    this.spriteIdx = -1;\n    this.harpoon = null;\n    this.isFiring = 0;\n  }\n\n  animate(ctx, playerSprites) {\n    ctx.drawImage(\n      playerSprites[this.orientation],\n      ...PLAYER_SPRITES_MAP[this.orientation][Math.floor(this.spriteIdx / CONSTANTS.ANIMATION_RATE) % 6],\n      ...CONSTANTS.SPRITE_SIZE,\n      this.x_pos, this.y_pos,\n      CONSTANTS.PLAYER_WIDTH, CONSTANTS.PLAYER_HEIGHT\n    );\n  }\n\n  deathThroes(frame) {\n    this.x_pos = this.x_pos - CONSTANTS.VEL;\n    this.y_pos = (CONSTANTS.FLOOR_HEIGHT - CONSTANTS.PLAYER_HEIGHT) - 1.5 * CONSTANTS.VEL * frame + 0.5 * 0.11 * frame * frame;\n  }\n\n  getBounds() {\n    return [\n      [this.x_pos, CONSTANTS.FLOOR_HEIGHT - CONSTANTS.PLAYER_HEIGHT],\n      [this.x_pos + CONSTANTS.PLAYER_WIDTH * 0.75, CONSTANTS.FLOOR_HEIGHT]\n    ];\n  }\n\n  update() {\n    if (this.harpoon && this.harpoon.fraction >= 1) {\n      this.harpoon = null;\n    }\n\n    if ((key.isPressed(\"space\") && !this.harpoon) || this.isFiring) {\n      this.harpoon = this.harpoon || new _harpoon__WEBPACK_IMPORTED_MODULE_0__[\"default\"](4 + this.x_pos + CONSTANTS.SPRITE_SIZE[0] / 2);\n      this.isFiring = this.isFiring + 1;\n      if (this.isFiring <= 1.25 * CONSTANTS.ANIMATION_RATE) {\n        this.orientation = \"right\";\n        this.spriteIdx = -2 * CONSTANTS.ANIMATION_RATE;\n      } else if (this.isFiring <= 1.75 * CONSTANTS.ANIMATION_RATE) {\n        this.orientation = \"right\";\n        this.spriteIdx = -1;\n      } else {\n        this.isFiring = false;\n      }\n    } else if (key.isPressed(\"left\") && this.x_pos > (90.4 + CONSTANTS.VEL)) {\n      this.orientation = \"left\";\n      this.spriteIdx = this.spriteIdx + 1;\n      this.x_pos = this.x_pos - CONSTANTS.VEL;\n    } else if (key.isPressed(\"right\") && this.x_pos < (770.2 - CONSTANTS.VEL)) {\n      this.orientation = \"right\";\n      this.spriteIdx = this.spriteIdx + 1;\n      this.x_pos = this.x_pos + CONSTANTS.VEL;\n    } else {\n      this.orientation = \"right\";\n      this.spriteIdx = -1;\n    }\n  }\n}\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ })

/******/ });