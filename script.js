'use strict';

const translations = {
  ka: {
    noNumber: '⛔ შეიყვანე რიცხვი..!',
    correct: '🎉 სწორია!',
    tooHigh: '📈 მეტია...',
    tooLow: '📉 ნაკლებია...',
    lost: '💥 წააგე თამაში..',
    start: 'დაიწყე გამოცნობა...',
  },
  en: {
    noNumber: '⛔ No Number..!',
    correct: '🎉 Correct Number',
    tooHigh: '📈 Too high...',
    tooLow: '📉 Too low...',
    lost: '💥 You lost the game..',
    start: 'Start guessing...',
  },
};

const currentLang = document.documentElement.dataset.lang;
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const displayMessage = (message) => {
  document.querySelector('.message').textContent =
    translations[currentLang][message];
};

const displayScore = function (score) {
  document.querySelector('.score').textContent = score;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    displayMessage('noNumber');
  } else if (guess === secretNumber) {
    document.querySelector('.number').textContent = secretNumber;
    displayMessage('correct');
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? 'tooHigh' : 'tooLow');
      score--;
      displayScore(score);
    } else {
      displayMessage('lost');
      displayScore(0);
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  displayMessage('start');
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.guess').value = '';
  displayScore(score);
});
