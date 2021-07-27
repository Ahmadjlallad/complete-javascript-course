"use strict";
const imgDice = document.querySelector(".dice");
const randomDice = (min = 1, max = 6) =>
  Math.floor(Math.random() * (max - min + 1) + min);
let rollDicePlayer0 = [];
let rollDicePlayer1 = [];
const score = document.querySelectorAll(".score");
score[0].textContent = 0;
score[1].textContent = 0;
const myBtn = document.querySelectorAll(".btn");
const currentScore = document.querySelectorAll(".current-score");
const player = document.querySelectorAll(".player");
for (let i = 0; i < myBtn.length; i++) {
  myBtn[i].addEventListener("click", (e) => {
    diceRenderAndRollDiceBtnFunctions(e.target.classList[1]);
    handleHoldBtn(e.target.classList[1]);
    handleNewGame(e.target.classList[1]);
  });
}
let currentScoreArray = [];

function diceRenderAndRollDiceBtnFunctions(e) {
  if (e === `btn--roll`) {
    let dice = randomDice();
    if (dice !== 1) {
      console.log(rollDicePlayer0);
      console.log(rollDicePlayer1);
      activePlayer()[0] === 0
        ? rollDicePlayer0.push(dice)
        : rollDicePlayer1.push(dice);
      imgDice.src = `/07-Pig-Game/starter/dice-${dice}.png`;
      currentScoreArray.push(dice);
      currentScore[activePlayer()[0]].textContent = currentScoreArray.reduce(
        (first, second) => first + second,
        0
      );
    } else {
      activePlayer()[0] === 0
        ? (rollDicePlayer0 = [Number.parseInt(score[0].textContent)])
        : (rollDicePlayer1 = [Number.parseInt(score[1].textContent)]);
      imgDice.src = `/07-Pig-Game/starter/dice-${dice}.png`;
      currentScoreArray = [];
      currentScore[activePlayer()[0]].textContent = 0;
      handleTogglePlayers();
    }
  }
}
function handleHoldBtn(e) {
  if (e === `btn--hold`) {
    handleGameOver();
    currentScoreArray = [];
    if (activePlayer()[0] === 0) {
      score[0].textContent = rollDicePlayer0.reduce(
        (total, first) => total + first,
        0
      );
      currentScore[activePlayer()[0]].textContent = 0;
      handleTogglePlayers();
    } else {
      score[1].textContent = rollDicePlayer1.reduce(
        (total, first) => total + first,
        0
      );
      currentScore[activePlayer()[0]].textContent = 0;
      handleTogglePlayers();
    }
  }
}
function activePlayer() {
  for (let i = 0; i < player.length; i++) {
    if (player[i].classList.contains(`player--active`)) {
      return [i, i === 0 ? 1 : 0];
    }
  }
}
function handleTogglePlayers() {
  let toggleClasses = activePlayer();
  player[toggleClasses[0]].classList.remove(`player--active`);
  player[toggleClasses[1]].classList.add(`player--active`);
}
function handleGameOver() {
  if (rollDicePlayer0.reduce((total, first) => total + first, 0) >= 100) {
    player[0].classList.add(`player--winner`);
  } else if (
    rollDicePlayer1.reduce((total, first) => total + first, 0) >= 100
  ) {
    player[1].classList.add(`player--winner`);
  }
}
function handleNewGame(e) {
  if (e === `btn--new`) {
    currentScoreArray = [];
    currentScore[0].textContent = 0;
    currentScore[1].textContent = 0;
    score[0].textContent = 0;
    score[1].textContent = 0;
    rollDicePlayer0 = [];
    rollDicePlayer1 = [];
    currentScore[0].textContent = 0;
    currentScore[1].textContent = 0;
    imgDice.src = `/07-Pig-Game/starter/dice-1.png`;
    player[0].classList.remove(`player--winner`);
    player[0].classList.add(`player--active`);
    player[1].classList.remove(`player--winner`);
    player[1].classList.remove(`player--active`);
  }
}
