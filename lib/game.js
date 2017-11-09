const Board = require("./board");

class Game {
  constructor(){
    this.board = new Board();
    this.play = this.play.bind(this);
  }

  play(){
    this.board;
  }
}

module.exports = Game;
