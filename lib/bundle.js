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

const Cell = __webpack_require__(2);

const GRIDSIZE = 8;
const COLORS = ["red", "orange", "green", "blue", "purple"];
const DIRECTIONS = [[0, 1], [1, 0], [0, -1], [-1, 0]];

class Board {
  constructor($el){
    this.$el = $el;
    this.grid = this.fillGrid();
    this.$firstClick = undefined;
    this.$secondClick = undefined;

    this.createCell = this.createCell.bind(this);
    this.makeGrid = this.makeGrid.bind(this);
    this.fillGrid = this.fillGrid.bind(this);
    this.swapCells = this.swapCells.bind(this);
    this.resetClick = this.resetClick.bind(this);
    this.getPos = this.getPos.bind(this);
    this.clearGrid = this.clearGrid.bind(this);
    this.findVerticalMatch = this.findVerticalMatch.bind(this);
    this.findHorizontalMatch = this.findHorizontalMatch.bind(this);
    this.getVerticalMatch = this.getVerticalMatch.bind(this);

    this.setupGrid();
    this.bindEvents();
    this.findHorizontalMatch();
    this.findVerticalMatch();
  }

  bindEvents(){
    this.$el.on("click", "li", (e => {
      if (this.$firstClick){
        this.$secondClick = e.currentTarget;
        // console.log(this.$secondClick);
        const positions = this.getPos();
        this.swapCells(positions.firstPos, positions.secondPos);
      } else {
        this.$firstClick = e.currentTarget;
        // console.log(this.$firstClick);
      }
    }));
  }

  getPos(){
    const firstPos = this.$firstClick.id.split("-").map(el => (
      parseInt(el)
    ));
    const secondPos = this.$secondClick.id.split("-").map(el => (
      parseInt(el)
    ));

    return {firstPos, secondPos};
  }

  makeGrid(){
    const grid = new Array(GRIDSIZE);
    for(let i = 0; i < grid.length; i++){
      grid[i] = new Array(GRIDSIZE);
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

  swapCells(firstPos, secondPos){
    console.log(this.grid)
    [this.grid[firstPos[0]][firstPos[1]].color,
    this.grid[secondPos[0]][secondPos[1]].color] =
    [this.grid[secondPos[0]][secondPos[1]].color,
    this.grid[firstPos[0]][firstPos[1]].color];
    this.clearGrid();
    this.setupGrid();
    this.resetClick();
  }

  resetClick(){
    this.$firstClick = undefined;
    this.$secondClick = undefined;
  }

  clearGrid(){
    this.$el.empty();
  }

  setupGrid(){
    // console.log(this.grid)
    const $ul = $("<ul>");
    $ul.addClass("cells-list");
    $ul.css("list-style-type", "none");

    for(let i = 0; i < this.grid.length; i++){
      for(let j = 0; j < this.grid.length; j++){
        let cell = this.grid[i][j];
        let $li = $("<li>");
        $li.attr({
          'id': `${cell.pos[0]}-${cell.pos[1]}`,
        });
        $li.css({
          "background-color": cell.color,
          "border": "1px solid black",
          "height": cell.height,
          "width": cell.width,
          "float": "left"
        });
        $ul.append($li);
      }
    }
    this.$el.append($ul);
  }

  findHorizontalMatch(){
    const matches = [];
    let matchLength = 1;
    for(let i = 0; i < this.grid.length; i++){
      for(let j = 0; j < this.grid.length - 1; j++){
        if (this.grid[i][j].color === this.grid[i][j+1].color){
          matchLength ++;
        } else if (matchLength >= 3){
          matches.push(this.grid[i].slice(j+1-matchLength, j+1));
          matchLength = 1;
        } else {
          matchLength = 1;
        }
      }
      if(matchLength >= 3){
        matches.push(this.grid[i].slice(this.grid.length-matchLength, this.grid.length));
      }
    }
    console.log("findHorizontalMatch")
    console.log(matches);
    return matches;
  }

  findVerticalMatch(){
    const matches = [];
    let matchLength = 1;
    for(let i = 0; i < this.grid.length; i++){
      for(let j = 0; j < this.grid.length - 1; j++){
        if (this.grid[j][i].color === this.grid[j+1][i].color){
          matchLength ++;
        } else if (matchLength >= 3){
          matches.push(this.getVerticalMatch(i, j, matchLength));
          matchLength = 1;
        } else {
          matchLength = 1;
        }
      }
    }
    console.log("findVerticalMatch")
    console.log(matches);
    return matches;
  }

  getVerticalMatch(col, row, matchLength){
    console.log(col)
    console.log(row)
    console.log(matchLength)
    const match = [];
    for(let i = row+1-matchLength; i < row+1; i++){
      match.push(this.grid[i][col]);
    }
    return match;
  }

}


module.exports = Board;


/***/ }),
/* 2 */
/***/ (function(module, exports) {



const DEFAULTS = {
  HEIGHT: 40,
  WIDTH: 40
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