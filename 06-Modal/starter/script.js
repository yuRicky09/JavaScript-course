'use strict';

//  modal !== model  modal window === 類似動態、警告視窗 user要先執行或關閉這個視窗後才能繼續執行頁面其他操作

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
//  如果要選到所有名子一樣的節點要用ALL 不然只會選到這第一個
const btnOpenModal = document.querySelectorAll('.show-modal');
//  同時選擇多的同名子的class存到變數後，再印出來會得到一個似陣列(一樣可用陣列的方法去操作)
console.log(btnOpenModal);

for (let i = 0; i < btnOpenModal.length; i++)
  console.log(btnOpenModal[i].textContent);
