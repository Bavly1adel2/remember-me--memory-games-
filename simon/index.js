// Define game object
var game = {
  count: 0,
  possibilities: ['#green', '#blue', '#red', '#dark'],
  currentGame: [],
  player: [],
  sound: {
    blue: new Audio("duck-quack-112941.mp3"),
    red: new Audio("funny-meow-110120.mp3"),
    dark: new Audio("horse-neigh-shortened-84724.mp3"),
    green: new Audio("single-bark-of-a-dog-38780.mp3")
  },
  strict: false,
  previousMove: null // Track the previous move
};

// Clear game state
function clearGame() {
  game.currentGame = [];
  game.count = 0;
  game.previousMove = null; // Reset previous move
  addCount();
}

// Start a new game
function newGame() {
  clearGame();
}

// Toggle strict mode
function strict() {
  game.strict = !game.strict;
  var strictBtn = document.getElementById('strict');
  strictBtn.textContent = game.strict ? 'شغل الصعب' : 'اقفل الصعب';
  strictBtn.classList.toggle('btn-primary');
  strictBtn.classList.toggle('btn-danger');
  newGame();
}

// Show game moves
function showMoves() {
  var i = 0;
  var moves = setInterval(function() {
    playGame(game.currentGame[i]);
    i++;
    if (i >= game.currentGame.length) {
      clearInterval(moves);
    }
  }, 5000); // Adjusted to 1 second for faster gameplay
  clearPlayer();
}

// Play sound
function sound(name) {
  var audio;
  switch (name) {
    case '#green':
      audio = game.sound.green;
      break;
    case '#blue':
      audio = game.sound.blue;
      break;
    case '#red':
      audio = game.sound.red;
      break;
    case '#dark':
      audio = game.sound.dark;
      break;
  }
  if (audio) {
    audio.currentTime = 0; // Reset audio playhead
    audio.play();
  }
}

// Simulate button press
function playGame(field) {
  var elem = document.querySelector(field);
  elem.classList.add('hover');
  sound(field);
  setTimeout(function() {
    elem.classList.remove('hover');
  }, 500); // Adjusted to 0.5 seconds for faster gameplay
}

// Clear player's moves
function clearPlayer() {
  game.player = [];
}

// Add player's move
function addToPlayer(id) {
  var field = "#" + id;
  game.player.push(field);
  playerTurn(field);
}

// Check player's move
function playerTurn(field) {
  var correctImg = document.getElementById('correctImg');
  var incorrectImg = document.getElementById('incorrectImg');

  if (game.player[game.player.length - 1] !== game.currentGame[game.player.length - 1]) {
    incorrectImg.style.display = 'block';
    setTimeout(function() {
      incorrectImg.style.display = 'none';
    }, 500);

    if (game.strict) {
      newGame();
    } else {
      showMoves();
    }
  } else {
    sound(field);
    if (game.player.length === game.currentGame.length) {
      correctImg.style.display = 'block';
      setTimeout(function() {
        correctImg.style.display = 'none';
        if (game.count === 20) {
          setTimeout(function() {
            newGame();
          }, 2000);
        } else {
          nextLevel();
        }
      }, 500);
    }
  }
}

// Proceed to the next level
function nextLevel() {
  addCount();
}

// Generate a random move ensuring it's different from the previous move
function generateMove() {
  var newMove;
  do {
    newMove = game.possibilities[Math.floor(Math.random() * 4)];
  } while (newMove === game.previousMove);
  game.previousMove = newMove; // Update the previous move
  game.currentGame.push(newMove);
  showMoves();
}

// Increment count and display it
function addCount() {
  game.count++;
  var clickNumber = document.getElementById('clickNumber');
  clickNumber.textContent = game.count;
  clickNumber.classList.add('animated', 'fadeOutDown');
  setTimeout(function() {
    clickNumber.textContent = game.count;
    clickNumber.classList.remove('fadeOutDown');
    clickNumber.classList.add('fadeInDown');
  }, 400);
  generateMove();
}

// Start a new game
newGame();
