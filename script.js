'use strict';
const body = document.querySelector('body');
const checkBtn = document.querySelector('.check');
const guessBox = document.querySelector('.guess');
const message = document.querySelector('.message');
//div for secret number
const myNumber = document.querySelector('.number');
const score = document.querySelector('.score');
const highscore = document.querySelector('.highscore');
//again button
const again = document.querySelector('.again');

//score at start of every game
let scoreValue = 20;

//will store the random number
let secretNumber;

//function to update score
function newScore(status) {

  if (scoreValue <= 1 && status === "wrong") {
    message.textContent = "☹️ You lost the game";
    myNumber.textContent = secretNumber;
    checkBtn.disabled = true;
    guessBox.disabled = true;
  }
    
  if (status === "wrong" && scoreValue != 0) {
    scoreValue -= 1;
     
  } else if (status === "right") {
    myNumber.textContent = secretNumber;
    scoreValue += 1;
    if (highscore.textContent < scoreValue) {
      localStorage.setItem('highscore', scoreValue);
      highscore.textContent = scoreValue;
    }
  }
  score.textContent = scoreValue;
}

//function to reset the game
function reset() {
  body.style.backgroundColor = '#222'; 

  message.textContent = 'Start guessing...';

  scoreValue = 20;
  score.textContent = scoreValue;

  highscore.textContent = localStorage.getItem('highscore')

  secretNumber = Math.trunc(Math.random() * 20) + 1;
  myNumber.textContent = "?";

  guessBox.disabled = false;
  guessBox.value = '';

  checkBtn.disabled = false;
  
}

//start the game
reset()


checkBtn.addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    message.textContent = "⛔ No number!";
  } else if (guess === secretNumber){
    message.textContent = "🎉 Correct Number!";
    body.style.backgroundColor = '#60b347'; 
    checkBtn.disabled = true;
    guessBox.disabled = true;
    newScore("right")
  } else if (guess > secretNumber) {
    message.textContent = "📈 Too High";
    newScore("wrong")
  } else if (guess < secretNumber) {
    message.textContent = "📉 Too Low";
    newScore("wrong")
  }
 
})


//restart the game
again.addEventListener('click', function () {
  reset()
})