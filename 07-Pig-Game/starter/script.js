'use strict';
// selecting elements
// 兩種選取方法  getElementById的執行效能會稍微快一點點 但原則上還是建議用querySelector呈現一致性
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
// Starting conditions 設定遊戲初始狀態
// 不能宣告在事件function內 不然每點擊一次就會歸零
let currentScore, activePlayer, score, playing;

const init = function () {
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  activePlayer = 0;
  score = [0, 0];
  currentScore = 0;
  playing = true;
  diceEl.classList.add('hidden');
};

init();
// switch player
const switchPlayer = function () {
  // switch play and reset currentScore to 0;
  // 他甩到1時 activePlay是不是0 如果是0則會轉到1 反之
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;

  // document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
  // document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
  //  用toggle改寫 .toggle(???)  = 當有???的class就移除掉??? 沒有???的class時就增加???
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality  執行甩骰
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 點時，要產生一個隨機1~6的數字
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    // 點時，把原先hidden的圖片秀出來
    diceEl.classList.remove('hidden');
    // 按照對應的隨機數字顯示相對應的圖片  .src method 可以讓我們為有src屬性的標籤建立他的src值
    diceEl.src = `dice-${dice}.png`;

    // 3. check for rolled 1 當甩到1時
    if (dice !== 1) {
      currentScore += dice;
      // 改用變數帶入 讓我們能隨時依據現在玩家是誰來決定加到誰的現在得分
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
      // current0El.textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //  當點選時能儲存現在得分到得分
    score[activePlayer] += currentScore;
    //  並且把得分秀出
    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];

    //  判斷按下hold時有無達成勝利條件
    if (score[activePlayer] >= 20) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
      diceEl.classList.add('hidden');
    } else {
      // 並且換成下一個玩家
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
