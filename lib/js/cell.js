

const DEFAULTS = {
  HEIGHT: 50,
  WIDTH: 50,
  SRC: "./lib/images/donut-mini.png"
};

class Cell {
  constructor(options = {}){
    this.height = DEFAULTS.HEIGHT;
    this.width = DEFAULTS.WIDTH;
    this.pos = options.pos;
    this.src = DEFAULTS.SRC;
    this.imgPos = options.imgPos;
  }
}

module.exports = Cell;
