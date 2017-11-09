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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(1);


// document.addEventListener("DOMContentLoaded", () => {
//   const board = new Board;
//   const boardEl = document.querySelector(".board").innerHTML = board.grid;
// });

$( () => {
  const boardEl = $('.board');
  new Board(boardEl);
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Cell = __webpack_require__(3);

const COLORS = ["red", "orange", "green", "blue", "purple"];



class Board {
  constructor($el){
    this.$el = $el;
    this.grid = this.fillGrid();

    this.createCell = this.createCell.bind(this);
    this.makeGrid = this.makeGrid.bind(this);
    this.fillGrid = this.fillGrid.bind(this);

  }

  makeGrid(){
    const grid = new Array(8);
    for(let i = 0; i < grid.length; i++){
      grid[i] = new Array(8);
    }
    return grid;
  }

  fillGrid(){
    const grid = this.makeGrid();
    for(let i = 0; i < grid.length; i++){
      for(let j = 0; j < grid[i].length; j++){
        grid[i][j] = this.createCell([i, j]);
      }
    }
    return grid;
  }

  createCell(pos){
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    return new Cell({pos, color});
  }

  setupGrid(){
    const $ul = $("<ul>");
    $ul.addClass("cells-list");

    for(let i = 0; i < this.grid.length; i++){
      for(let j = 0; j < this.grid[i].length; i++){
        let $li = $("<li>");
        $li.data("pos", this.grid[i][j].pos);

        $ul.append($li);
      }
    }
    this.$el.append($ul);
  }
}


module.exports = Board;


/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports) {



const DEFAULTS = {
  HEIGHT: 10,
  WIDTH: 10
};

class Cell {
  constructor(options = {}){
    this.height = DEFAULTS.HEIGHT;
    this.width = DEFAULTS.WIDTH;
    this.color = options.color;
    this.pos = options.pos;
  }
}

module.exports = Cell;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map