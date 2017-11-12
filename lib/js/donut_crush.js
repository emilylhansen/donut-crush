const Board = require("./board");

document.addEventListener("DOMContentLoaded", () => {

  const sound = new Howl({
    src: ['./audio/background_audio.webm', './audio/background_audio.mp3', './audio/background_audio.wav'],
    loop: true,
    volume: 0.5
  });

  $('.fa-music').on('click', () => {
    $('.fa-music').toggleClass('music-on');
    return $('.fa-music').hasClass('music-on') ? sound.play() : sound.pause();
  });

  const newGame = () => {
    const boardEl = $('.board');
    const board = new Board(boardEl);
    // board.timer();
  };

  const newGameButton = document.querySelector('.dash-game');
  newGameButton.onclick = newGame;


});
