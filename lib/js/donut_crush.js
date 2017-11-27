const Board = require("./board");

document.addEventListener("DOMContentLoaded", () => {

  const backgroundSound = new Howl({
    src: ['./audio/background_audio.webm', './audio/background_audio.mp3', './audio/background_audio.wav'],
    loop: true,
    volume: 0.5
  });

  $('.fa-music').on('click', () => {
    $('.fa-music').toggleClass('music-on');
    return $('.fa-music').hasClass('music-on') ? backgroundSound.play() : backgroundSound.pause();
  });

  const donutSound = new Howl({
    src: ['./audio/pop.mp3'],
    volume: 0.5
  });

  $('.board').on("mouseover", "li", (e => {
    donutSound.play();
  }));

  $('.board').off("mouseover", "li", (e => {
    donutSound().stop();
  }));

  const newGame = () => {
    const boardEl = $('.board');
    const board = new Board(boardEl);
    board.resetGame();
    board.timer();
  };

  const newGameButton = document.querySelector('.dash-game');
  newGameButton.onclick = newGame;


});
