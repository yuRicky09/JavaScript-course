'use strict';
/*
console.log(document.querySelector('.message').textContent);

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

//  .value 可以用來讀取input欄位的值
console.log(document.querySelector('.guess').value);
document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/
//  addEventListener = 事件監聽者  後面接2個參數(1:事件要在怎樣的狀態,型別下發生when to do, 2:事件要發生出甚麼事 what to do)
//  function也可以是一個value 只要它是function expression

//  先定義一個我們遊戲通關要得到的變數

const secretNumber = Math.trunc(Math.random() * 20 + 1);
document.querySelector('.number').textContent = secretNumber;
let score = 20;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  // 這邊用!為了當user輸入0時(在JS 0 === false),會把false轉成true 這樣才能跑後面那段
  if (!guess) {
    document.querySelector('.message').textContent = '☠Not number';

    //  when player win
  } else if (guess === secretNumber) {
    document.querySelector('.message').textContent = '🎉Correct Number';
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    //  guess too hight
  } else if (guess > secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = '📈Too hight';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.score').textContent = 0;
      document.querySelector('.message').textContent = 'You lost the game!!!';
    }
    // guess too low
  } else if (guess < secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = '📉Too low';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.score').textContent = 0;
      document.querySelector('.message').textContent = 'You lost the game!!!';
    }
  }
});
