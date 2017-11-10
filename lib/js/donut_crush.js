const Board = require("./board");


// document.addEventListener("DOMContentLoaded", () => {
//   const board = new Board;
//   const boardEl = document.querySelector(".board").innerHTML = board.grid;
// });

$( () => {
  const boardEl = $('.board');
  new Board(boardEl);
});
