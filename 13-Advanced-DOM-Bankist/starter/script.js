'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//這三個特殊元素不需要在加選取器就能選到
// documentElement 才是真正的整個頁面
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

/* 
NODE LIST VS.  HTML COLLECTION
用querySelectorAll選到後回傳的會是nodeList
而用getElementsByTagName 回傳的會是html collection
兩者差異在於當刪除掉node list內的元素時，node list不會即時更新而html collection則會
*/
// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');

// document.getElementById('section--1');

// const allBtns = document.getElementsByTagName('button');

// document.getElementsByClassName('btn');

// creating and inserting elements
//.insertAdjacentHTML
// const message = document.createElement('div');
// message.classList.add('cookie--message');
// message.innerHTML =
//   'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got It!</button> ';

// header.prepend(message);
// 因為每個DOM El 都是真實且獨一無二存在的，所以上面範例的話message這個dom el原本會被插在header元素的最前面(第一個子元素)， 但後面又寫了append，他會被改插在最後，而不是前後兩個地方都插入。

// 不過確實有複製dom元素的方法
// header.append(message.cloneNode(true));
// header.append(message);

// sibling
// header.before(message);
// header.after(message);

//Delete elements
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     // .remove()是近期才有的
//     message.remove();
// 以前的寫法 寫到父層再刪子層
// message.parentElement.removeChild(message);
// });

// Style
// 這樣寫會是inline-style寫法
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// 只能選到真的有寫在inline-style的樣式 寫在自定義class屬性內的無法拿到
// console.log(message.style.color);
// console.log(message.style.backgroundColor);

// 不過可以用 getComputedStyle 拿到
// console.log(getComputedStyle(message).color);

// parseFloat的第二個參數是代表要用十進位
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
// const logo = document.querySelector('.nav__logo');

// console.log(logo.alt);
// console.log(logo.className);
// logo.alt = 'Beautiful logo';

// 寫入attr
// logo.setAttribute('company', 'Bankist');

// 取的屬性的相對位置or絕對位置
// console.log(logo.src); // 決對位置
// console.log(logo.getAttribute('src')); // 相對位置

// Data attributes !!! 重要 常用在想再html裡存放data

// console.log(logo.dataset.versionNumber);

//Classes
// logo.classList.add('a', 'c');
// logo.classList.remove('a', 'c');
// logo.classList.toggle('a', 'c');
// logo.classList.contains('a', 'c'); // not includes

// Don't use
// logo.className = 'a' //會覆寫

//  ---------製作點擊按鈕滾動畫面的效果-------------
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

// 舊式作法 使用 getBoundingClientRect 此方法的回傳值為一個DOMrect，是包含完整元素的最小矩形，并且拥有left, top, right, bottom, x, y, width, 和 height这几个以像素为单位的只读属性用于描述整个边框。
//除了width 和 height 以外的属性是"相对于视图窗口"的"左上角"来计算的。

btnScrollTo.addEventListener('click', function (e) {
  // coord = 座標
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  // window.pageXOffset, window.pageYOffset 就會是相對於整個網頁的左上角(非viewport)與當前的滾動位置的距離
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  // 查詢現在視窗vp的高與寬
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  //Scrolling
  // 要正確滾動到想要的位置的話並須使用想跳轉點與視窗左上角的相對位置距離值 + 目前滾動點與網頁左上角的相對位置值
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth', // 製造滑順滾動的動畫
  // });

  // 最新瀏覽器支援的做法
  section1.scrollIntoView({ behavior: 'smooth' });
});

//---------------- Event:mouseenter 有點像是css的hover

const h1 = document.querySelector('h1');
const alertH1 = function () {
  alert('addEventListener: Great! You are reading the heading :D');
  // 只想觸發一次事件，之後想取消可以使用.removeEventListener
  // h1.removeEventListener('mouseenter', alertH1);
};

// h1.addEventListener('mouseenter', alertH1);

// 取消事件也可以拉出來使用 舉例:3秒後再取消事件
// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// 捕獲與冒泡
// 預設下 事件只會在冒泡階段被處理

// Math.floor() 函式會回傳小於等於所給數字的最大整數。
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log(e.target);
  console.log(this === e.currentTarget);
  console.log('Link');
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log(e.target);
  console.log('Links');
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log(e.target);
  console.log('Nav');
});
