const Cell = require("./cell");
// const Howl = require("../../howler.js/dist/howler.min.js");
const Howl = require('howler');

const GRIDSIZE = 8;
const POINTS = 30;
const TIME = 1;
const IMGPOS = ["640px 625px",
                "570px 625px",
                "570px 680px",
                "502px 680px",
                "502px 626px"];
const EXPLOSION_SRC = "./lib/images/explosion.png";
const EXPLOSION_POS = ["699px 566px"];
const CELL_SRC = "./lib/images/donut-mini.png";
const DIRECTIONS = [[-1, 0], [0, 1], [1, 0], [0, -1]];

class Board {
  constructor($el){
    this.$el = $el;
    this.grid = this.fillGrid();
    this.$firstClick = undefined;
    this.$secondClick = undefined;
    this.matches = undefined;
    this.score = 0;
    this.moves = 0;
    this.endGame = false;

    this.createCell = this.createCell.bind(this);
    this.removeCell = this.removeCell.bind(this);
    this.swapCells = this.swapCells.bind(this);
    this.checkSwap = this.checkSwap.bind(this);
    this.isValidPos = this.isValidPos.bind(this);
    this.findVerticalMatch = this.findVerticalMatch.bind(this);
    this.findHorizontalMatch = this.findHorizontalMatch.bind(this);
    this.getVerticalMatch = this.getVerticalMatch.bind(this);
    this.noMatches = this.noMatches.bind(this);

    this.makeGrid = this.makeGrid.bind(this);
    this.fillGrid = this.fillGrid.bind(this);
    this.clearGrid = this.clearGrid.bind(this);

    this.resetClick = this.resetClick.bind(this);
    this.getPos = this.getPos.bind(this);
    this.getImgPos = this.getImgPos.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.updateMoves = this.updateMoves.bind(this);
    this.timer = this.timer.bind(this);
    this.displayResults = this.displayResults.bind(this);
    this.resetGame = this.resetGame.bind(this);

    this.sweetSound = this.sweetSound.bind(this);
    this.explosionSound = this.explosionSound.bind(this);
    this.deliciousSound = this.deliciousSound.bind(this);
    this.tastySound = this.tastySound.bind(this);
    this.randomSound = this.randomSound.bind(this);

    this.noMatches();
    this.bindEvents();
  }

  resetGame(){
    this.clearGrid();
    this.updateMoves();
    this.updateScore();
  }

  removeCell(explosion){
    this.matches = this.matches === undefined ?
    this.findHorizontalMatch().concat(this.findVerticalMatch()) :
    this.matches;

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

    if(!this.endGame){
      this.clearGrid();
      this.setupGrid();
    }

  }

  noMatches(i = 200){
    setTimeout(() => {
      this.matches = undefined
      this.removeCell(true);
      this.explosionSound();
      let sound = this.randomSound();
      sound === undefined ? undefined : sound();
      setTimeout(() => {
        this.removeCell();
        this.updateScore();
        this.resetClick();
        this.matches = undefined
        if(this.findHorizontalMatch().concat(this.findVerticalMatch()).length > 0){
          this.noMatches(600);
        }
      }, 600);
    }, i);
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
        this.checkSwap();
      } else {
        this.$firstClick = e.currentTarget;
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
      this.swapCells();
      if(this.findHorizontalMatch().concat(this.findVerticalMatch()).length > 0){
        if(!this.endGame){
          this.updateMoves();
          this.noMatches();
        }
      } else {
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
      if(this.endGame){
        // this.displayResults();
        // $(".cells-list").addClass("hide-start");
        break;
      }
      for(let j = 0; j < this.grid.length; j++){
        if(this.endGame){

          break;

        }
        let cell = this.grid[i][j];
        let $li = $(`<li>`);
        if(cell.src === "./lib/images/explosion.png") {
          $li.addClass("swapping-cell");
        } else {
          $li.removeClass("swapping-cell");
        }
        $li.attr({'id': `${cell.pos[0]}-${cell.pos[1]}`});
        $li.css({
          "height": cell.height,
          "width": cell.width,
          "background-image": `url(${cell.src})`,
          "background-position": cell.imgPos
        });
        $ul.append($li);
      }
    }
    this.$el.append($ul);

    if(this.endGame){
      this.displayResults();
    }
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

  updateScore(){
    if (this.matches !== undefined){
      for(let i = 0; i < this.matches.length; i++){
        this.score += this.matches[i].length * POINTS;
      }
    }
    document.getElementsByClassName("dash-score-text")[0].
    innerHTML = `Score: ${this.score}`;
  }

  updateMoves(){
    document.getElementsByClassName("dash-moves-text")[0].
    innerHTML = `Moves: ${this.moves ++}`;
  }

  timer(){
    let duration = TIME * 60;
    let minutes;
    let seconds;

    const timerInt = setInterval(() => {
      if (duration <= 0) {
        clearInterval(timerInt);
        this.endGame = true;
        this.displayResults();
        this.sweetSound();
      }
      minutes = Math.floor(duration / 60);
      seconds = duration % 60;

      let minText = minutes < 10 ? `0${minutes}` : minutes;
      let secText = seconds < 10 ? `0${seconds}` : seconds;

      document.getElementsByClassName("dash-time-text")[0].
      innerHTML = `Time: ${minText}:${secText}`;
      duration --;
    }, 1000);
  }

  displayResults(){
    this.clearGrid();
    let $div = $("<div>").addClass("results");
    let $h1 = $("<h1>").html("Sweet!");
    let $h3 = $("<h3>").html("Score:");
    let $div2 = $("<div>").addClass("results-div");
    let $h4 = $("<h4>").addClass("results-text").html(`${this.score}`);
    this.$el.append($div.append($h1).append($h3).append($div2.append($h4)));
  }

  sweetSound(){
    const sweet = new Howl.Howl({
      src: ['./audio/sweet.mp3'],
      volume: 0.5
    });
    sweet.play();
  }

  explosionSound(){
    const explosion = new Howl.Howl({
      src: ['./audio/explosion.mp3'],
      volume: 0.5
    });
    explosion.play();
  }

  tastySound(){
    const tasty = new Howl.Howl({
      src: ['./audio/tasty.mp3'],
      volume: 0.5
    });
    tasty.play();
  }

  deliciousSound(){
    const delicious = new Howl.Howl({
      src: ['./audio/delicious.mp3'],
      volume: 0.5
    });
    delicious.play();
  }

  randomSound(){
    const arr = [
      this.sweetSound,
      this.tastySound,
      this.deliciousSound
    ];

    return arr[Math.floor(Math.random() * 6)];
  }

}


module.exports = Board;
