

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
