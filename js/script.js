'use strict';

// ------------ VARIABLES ------------ //
const check = document.querySelector('.check');
const again = document.querySelector('.again');

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

// ------------ FUNCTIONS ------------ //
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
  document.querySelector('.message').style.color = 'var(--color-primary)';
};

const adjustNumberWidth = value =>
  (document.querySelector('.number').style.width = value);

const displayValue = (type, value) =>
  (document.querySelector(type).textContent = value);

const disableBtn = state => (check.disabled = state);

// ------------ EVENT LISTENER ------------ //
// THE CHECK BUTTON
check.addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  // IF THERE'S NO GUESS
  if (!guess) {
    displayMessage('⛔ No number has been entered, please choose a number!');

    // IF THE USER GUESS IS RIGHT
  } else if (guess === secretNumber) {
    // document.querySelector('.number').textContent = secretNumber;
    displayValue('.number', secretNumber);
    displayMessage('🎉 Correct Number, You win!');
    disableBtn(true);

    adjustNumberWidth('14rem');

    if (score > highscore) {
      highscore = score;
      //   document.querySelector('.highscore').textContent = highscore;
      displayValue('.highscore', highscore);
    }

    // IF THE USER GUESS IS WRONG
  } else if (guess !== secretNumber) {
    displayMessage(guess > secretNumber ? '📈 Too high' : '📉 Too low');

    // IMPLEMENTING THE SCORE
    if (score > 1) {
      score--;
      //   document.querySelector('.score').textContent = score;
      displayValue('.score', score);
    } else {
      score = 0;
      //   document.querySelector('.score').textContent = score;
      displayValue('.score', score);
      displayMessage('💥 You lost, please replay a new game!');
      disableBtn(true);
    }
  }
});

// THE AGAIN BUTTON
again.addEventListener('click', function () {
  // RESET SCORE AND SECRET NUMBER
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  // RESET THE USER INPUT
  document.querySelector('.guess').value = '';

  // RESET BTN
  disableBtn(false);

  // RESET UI
  //   document.querySelector('.number').textContent = '?';
  displayValue('.number', '?');
  adjustNumberWidth('7rem');
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.message').style.color = 'var(--color-gray)';
  displayValue('.score', score);
});
