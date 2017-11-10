const Cell = require("./cell");

const GRIDSIZE = 8;
const COLORS = ["red", "orange", "green", "blue", "purple"];
const IMGPOS = ["640px 625px", "570px 625px", "570px 680px", "502px 680px", "502px 626px"];
const EXPLOSION_SRC = "./lib/images/explosion.png";
const EXPLOSION_POS = ["699px 566px"];
const CELL_SRC = "./lib/images/donut-mini.png";
//blue "502px 530px"
// green "502px 626px"
//yellow "502px 680px"
//pink "639px 680px"
// brown "570px 680px"
//hotpink "570px 625px"
//purple "640px 625px"
// explosion "699px 566px"
const DIRECTIONS = [[-1, 0], [0, 1], [1, 0], [0, -1]];

class Board {
  constructor($el){
    this.$el = $el;
    this.grid = this.fillGrid();
    this.$firstClick = undefined;
    this.$secondClick = undefined;
    this.matches = undefined;

    this.createCell = this.createCell.bind(this);
    this.getColor = this.getColor.bind(this);
    this.removeCell = this.removeCell.bind(this);
    this.swapCells = this.swapCells.bind(this);
    this.checkSwap = this.checkSwap.bind(this);
    this.isValidPos = this.isValidPos.bind(this);
    this.findVerticalMatch = this.findVerticalMatch.bind(this);
    this.findHorizontalMatch = this.findHorizontalMatch.bind(this);
    this.getVerticalMatch = this.getVerticalMatch.bind(this);

    this.makeGrid = this.makeGrid.bind(this);
    this.fillGrid = this.fillGrid.bind(this);
    this.clearGrid = this.clearGrid.bind(this);

    this.resetClick = this.resetClick.bind(this);
    this.getPos = this.getPos.bind(this);
    this.getImgPos = this.getImgPos.bind(this);


    // findVerticalMatch - find matches
    // findHorizontalMatch - find matches
    // removeCell - remove matches from initial board, matches = defined
    //  - change image to explosion, matches = defined
    //  - replace with new cell and donut, matches = defined
    //  - remove matches until no matches
    // bindEvents - add event handler to swap cells, matches = undefined
    // swapCells - swap cells on grid
    // resetClick - reset cell swap clicks
    // clearGrid - clear grid
    // setupGrid - re-populate board
    // removeCell - remove matches from board after user move
    // bindEvents - add event handle to swap cells again

    this.removeCell();
    this.bindEvents();
    // this.setupGrid();
  }

  removeCell(explosion){
    console.log("explosion", explosion)
    this.matches = this.matches === undefined ?
    this.findHorizontalMatch().concat(this.findVerticalMatch()) :
    this.matches;

    console.log("matches",this.matches)

    for(let i = 0; i < this.matches.length; i++){
      for(let j = 0; j < this.matches[i].length; j++){
        const pos = this.matches[i][j].pos;
        if (explosion){
          this.grid[pos[0]][pos[1]].imgPos = EXPLOSION_POS[0];
          this.grid[pos[0]][pos[1]].src = EXPLOSION_SRC;
        } else {
          this.grid[pos[0]][pos[1]].imgPos = this.getImgPos();
          this.grid[pos[0]][pos[1]].src = CELL_SRC;
        }
      }
    }
    console.log("removeCell", this.grid);
    this.clearGrid();
    this.setupGrid();
  }

  test(){
    const noMatches = false;
    while(this.matches.length > 0){
      this.removeCell();
    }
  }


  findHorizontalMatch(){
    const matches = [];
    let matchLength = 1;
    for(let i = 0; i < this.grid.length; i++){
      for(let j = 0; j < this.grid.length - 1; j++){
        if (this.grid[i][j].imgPos === null) {
          continue;
        } else if (this.grid[i][j].imgPos === this.grid[i][j+1].imgPos){
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
        if (this.grid[j][i].imgPos === null) {
          continue;
        } else if (this.grid[j][i].imgPos === this.grid[j+1][i].imgPos){
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

  bindEvents(){
    this.$el.on("click", "li", (e => {
      if (this.$firstClick){
        this.matches = undefined;
        this.$secondClick = e.currentTarget;
        console.log("second click")
        console.log(this.$secondClick);
        this.checkSwap();
      } else {
        this.$firstClick = e.currentTarget;
        console.log("first click")
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

  getColor(){
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  }

  getImgPos(){
    return IMGPOS[Math.floor(Math.random() * IMGPOS.length)];
  }

  createCell(pos){
    return new Cell({pos, imgPos: this.getImgPos()});
  }

  swapCells(){
    const positions = this.getPos();
    const firstPos = positions.firstPos;
    const secondPos = positions.secondPos;

    [this.grid[firstPos[0]][firstPos[1]].imgPos,
    this.grid[secondPos[0]][secondPos[1]].imgPos] =
    [this.grid[secondPos[0]][secondPos[1]].imgPos,
    this.grid[firstPos[0]][firstPos[1]].imgPos];
  }

  checkSwap(){
    if(this.isValidPos()){
      console.log("valid pos")
      this.swapCells();
      if(this.findHorizontalMatch().concat(this.findVerticalMatch()).length > 0){
        console.log("move will destroy")
        this.removeCell(true);
        setTimeout(() => {this.removeCell();}, 3000);
      } else {
        console.log("invalid move")
        this.swapCells();
      }
    }
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
    const $ul = $("<ul>");
    $ul.addClass("cells-list");

    for(let i = 0; i < this.grid.length; i++){
      for(let j = 0; j < this.grid.length; j++){
        let cell = this.grid[i][j];
        let $li = $("<li>");
        $li.attr({'id': `${cell.pos[0]}-${cell.pos[1]}`});
        $li.css({
          "height": cell.height,
          "width": cell.width,
          "background": `url(${cell.src})`,
          "background-position": cell.imgPos
        });
        $ul.append($li);
      }
    }
    this.$el.append($ul);
  }


  isValidPos(){
    const firstPos = this.getPos().firstPos;
    const secondPos = this.getPos().secondPos;

    for(let i = 0; i < DIRECTIONS.length; i++){
      if(secondPos[0] === firstPos[0]+DIRECTIONS[i][0] &&
         secondPos[1] === firstPos[1]+DIRECTIONS[i][1]){
        return true;
      }
    }
    return false;
  }

}


module.exports = Board;
