const Board = require("./board");

document.addEventListener("DOMContentLoaded", () => {

  const sound = new Howl({
    src: ['./audio/background_audio.webm', './audio/background_audio.mp3', './audio/background_audio.wav'],
    autoplay: true,
    loop: true,
    volume: 0.5,
    onend: function() {
      console.log('Finished!');
    }
  });

  const soundButton = document.querySelector('.dash-music');
  soundButton.onclick = sound.pause();


  const newGame = () => {
    const boardEl = $('.board');
    const board = new Board(boardEl);
    board.timer();
  };

  const newGameButton = document.querySelector('.dash-game');
  newGameButton.onclick = newGame;


});
