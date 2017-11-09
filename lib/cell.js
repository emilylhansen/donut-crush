

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
