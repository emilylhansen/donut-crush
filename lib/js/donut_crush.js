const Board = require("./board");

document.addEventListener("DOMContentLoaded", () => {

  const sound = new Howl({
    src: ['./audio/background_audio.webm', './audio/background_audio.mp3', './audio/background_audio.wav'],
    autoplay: true,
    loop: true,
    volume: 0.5
  });

  const soundButton = document.querySelector('.dash-music');
  sound.pause();
  // const dashMusicId = sound.play();
  // soundButton.onclick =  sound.playing(dashMusicId) ? sound.pause(dashMusicId) : sound.play(dashMusicId);



  const newGame = () => {
    const boardEl = $('.board');
    const board = new Board(boardEl);
    board.timer();
  };

  const newGameButton = document.querySelector('.dash-game');
  newGameButton.onclick = newGame;


});
