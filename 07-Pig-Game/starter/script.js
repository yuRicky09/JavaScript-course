'use strict';
// selecting elements
// 兩種選取方法  getElementById的執行效能會稍微快一點點 但原則上還是建議用querySelector呈現一致性
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions 設定遊戲初始狀態
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// Rolling dice functionality  執行甩骰
btnRoll.addEventListener('click', function () {
  // 點時，要產生一個隨機1~6的數字
  const dice = Math.trunc(Math.random() * 6) + 1;
  console.log(dice);
  // 點時，把原先hidden的圖片秀出來
  diceEl.classList.remove('hidden');
  // 按照對應的隨機數字顯示相對應的圖片  .src method 可以讓我們為有src屬性的標籤建立他的src值
  diceEl.src = `dice-${dice}.png`;
});
