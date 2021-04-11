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

document.querySelector('.check').addEventListener('click', function () {
  console.log(document.querySelector('.guess').value);
});
