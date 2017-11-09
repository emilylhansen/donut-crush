const Cell = require("./cell");

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
