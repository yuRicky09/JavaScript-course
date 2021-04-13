'use strict';

//  model !== model  modal window === 類似動態、警告視窗 user要先執行或關閉這個視窗後才能繼續執行頁面其他操作

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
//  如果要選到所有名子一樣的節點要用ALL 不然只會選到這第一個
const btnOpenModal = document.querySelectorAll('.show-modal');
//  同時選擇多的同名子的class存到變數後，再印出來會得到一個似陣列(一樣可用陣列的方法去操作)
console.log(btnOpenModal);
//  .classList方法會回傳類別名給呼叫他的這個物件所擁有的類別名稱(節點) 後面可以再加上add remove動態增減類別
const openModal = function () {
  console.log('button clicked');
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnOpenModal.length; i++) {
  btnOpenModal[i].addEventListener('click', openModal);
}

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// 想要新增當我們按下鍵盤Esc時也能關閉跳出視窗的效果
// 在整個document上增加監聽者
//  keydown = 按下鍵盤瞬間發生  press = 持續按下鍵盤時發生  keyup = 鬆開鍵盤時發生
//  我們要讓他能知道是按下啥鍵才能關閉，所以我們給這function 1個event事件參數去對照我們按下的鍵盤
document.addEventListener('keydown', function (e) {
  console.log(e.key);
  // 如果modal這個節點的class類別名稱沒有hidden而且按下的key是Escape的話 就執行關閉modal視窗
  if (!modal.classList.contains('hidden') && e.key === 'Escape') {
    closeModal();
  }
});
