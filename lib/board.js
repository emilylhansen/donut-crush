const Cell = require("./cell");

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
    this.removeCell = this.removeCell.bind(this);
    this.swapCells = this.swapCells.bind(this);
    this.makeGrid = this.makeGrid.bind(this);
    this.fillGrid = this.fillGrid.bind(this);
    this.clearGrid = this.clearGrid.bind(this);
    this.resetClick = this.resetClick.bind(this);
    this.getPos = this.getPos.bind(this);
    this.findVerticalMatch = this.findVerticalMatch.bind(this);
    this.findHorizontalMatch = this.findHorizontalMatch.bind(this);
    this.getVerticalMatch = this.getVerticalMatch.bind(this);
    this.makeMove = this.makeMove.bind(this);

    this.removeCell();
    this.makeMove();
  }

  bindEvents(){
    this.$el.on("click", "li", (e => {
      if (this.$firstClick){
        this.$secondClick = e.currentTarget;
        console.log(this.$secondClick);
        const positions = this.getPos();
        this.swapCells(positions.firstPos, positions.secondPos);
      } else {
        this.$firstClick = e.currentTarget;
        console.log(this.$firstClick);
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
    [this.grid[firstPos[0]][firstPos[1]].color,
    this.grid[secondPos[0]][secondPos[1]].color] =
    [this.grid[secondPos[0]][secondPos[1]].color,
    this.grid[firstPos[0]][firstPos[1]].color];
    this.clearGrid();
    this.setupGrid();
    this.resetClick();
    this.removeCell();
    this.makeMove();
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
      matchLength = 1;
    }
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
      if(matchLength >= 3){
        matches.push(this.getVerticalMatch(i, this.grid.length - 1, matchLength));
      }
      matchLength = 1;
    }
    return matches;
  }

  getVerticalMatch(col, row, matchLength){
    const match = [];
    for(let i = row+1-matchLength; i < row+1; i++){
      match.push(this.grid[i][col]);
    }
    return match;
  }

  removeCell(){
    const matches = this.findHorizontalMatch().
                    concat(this.findVerticalMatch());
    for(let i = 0; i < matches.length; i++){
      for(let j = 0; j < matches[i].length; j++){
        const pos = matches[i][j].pos;
        this.grid[pos[0]][pos[1]].color = null;
      }
    }
  }

  makeMove(){
    this.clearGrid();
    this.setupGrid();
    this.bindEvents();
  }

}


module.exports = Board;
