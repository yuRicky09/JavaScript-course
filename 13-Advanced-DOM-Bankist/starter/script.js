'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');

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

//*  ---------製作點擊按鈕滾動畫面的效果-------------
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

  /////////////////////////////////////////////////////////////////
  //* Scrolling
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

////////////////////////////////////////////////////////////////
//* Page navigation

// 方法一 不過這效能不佳 因為會在每個元素上都加上這個callback fn
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     拿herf屬性的值  這邊會得到錨點id
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

//**方法二  把事件加在他們共同的父元素上 效能較好!!!!
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // 使用e.target去配對我們實際上想選擇到的DOM元素
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//* Tabbed component  tab(標籤)

tabsContainer.addEventListener('click', function (e) {
  //! 因btn內還有span元素 我們希望點到span or btn都能選到btn 故用closest
  const clicked = e.target.closest('.operations__tab');

  //!  Guard clause 因為整個父層都在監聽 如果這時候點到btn以外的範圍因為找不到.operations__tab類名的父元素，會回傳null回來 所以此時clicked會變成null 對null執行方法想當然 噴錯
  //! 所以這邊下個if防衛機制， not null === true  直接return不執行後面的程式碼
  if (!clicked) return;

  //! 慣用作法 先移掉所有同名元素的class，在位個別的對象加class
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  //** Activate(啟用) content area
  document;
  tabsContent.forEach(el => el.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//* Menu fade animation
//  mouseover跟mouseenter很相似 差異只在於mouseover有冒泡 mouseenter沒有
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });

    logo.style.opacity = this;
  }
};

//!用bind改寫 bind會複製叫他的function並且把帶入的第一個參數當作this
//!並且回傳這個function 所以我們下面做法可以得到一個被改變this的handleHover
nav.addEventListener('mouseover', handleHover.bind(0.5));
// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });
nav.addEventListener('mouseout', handleHover.bind(1));
// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

//* sticky navigation
//* 作法一
// window可以使用scroll事件
// 可以理解成當捲動的Y值 > 所選目標物與vp距離值的時候就讓nav固定住
//! 不過scroll事件效能不好不建議用，因為每次滾動都會執行某些事。
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// window.addEventListener('scroll', function () {
// console.log(window.scrollY);

// if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
// else nav.classList.remove('sticky');
// });
//* intersectionObserver API  intersecting= 相交
//! 這個callback可以理解為當觀察目標進入觀察器的鏡頭內時要執行啥fn
//! entries = 觀察器要觀察的所有目標
// const obsCallback = function (entries, observer) {
// entries.forEach(entry => {
// console.log(entry);
// });
// };
//! 這個option可以理解為要如何設定觀察器的鏡頭
// const obsOptions = {
// root: null, // 預設null的話代表視窗(viewport)就是觀察器的鏡頭
// threshold: 0.1, // threshold === 門檻 臨界點,只觀察目標出現在鏡頭裡的多少%時就執行callback
// };
// ! 建立一個觀察器 IntersectionObserver要兩個參數(callback, option)
// const observer = new IntersectionObserver(obsCallback, obsOptions);
//! 使用這個觀察器的.observe觀察??目標
// observer.observe(section1);
//* 作法二

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0, // 獵物在viewport裡佔0%時執行callback
  rootMargin: `-${navHeight}px`, // 擴大或縮小觀察器的鏡頭範圍
});
headerObserver.observe(header);
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

//---------------- Event:mouseenter 有點像是css的hover

// const h1 = document.querySelector('h1');
// const alertH1 = function () {
// alert('addEventListener: Great! You are reading the heading :D');
// 只想觸發一次事件，之後想取消可以使用.removeEventListener
// h1.removeEventListener('mouseenter', alertH1);
// };

//  h1.addEventListener('mouseenter', alertH1);

// 取消事件也可以拉出來使用 舉例:3秒後再取消事件
// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

//  捕獲與冒泡
//  預設下 事件只會在冒泡階段被處理

//  Math.floor() 函式會回傳小於等於所給數字的最大整數。
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log(e.target);
//   console.log(this === e.currentTarget);
//   console.log('Link');
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log(e.target);
//   console.log('Links');
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log(e.target);
//   console.log('Nav');
// });

// ---------------------DOM traversing(遍歷)

// Going downwards: child 向下找子層
// querySelector不只能作用於document也能用在任何element上
// const h1 = document.querySelector('h1');
// 這樣選的話就只會選到h1標籤內層裡帶有.highlight類名的元素
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes); // 選所有子節點 text comment也都是一種節點的型態
// console.log(h1.children); // 選子元素
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// Going upwards: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);
//
//! 可以想像為querySelector的反向版本 用來選取最近的父層!! 很常用!
//! 如果帶入的參數名是自己的話(沒有其他父層就這個名子)就會選到自己
// console.log(h1.closest('.header'));

// Going sideways: siblings
// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// ** 找出所有兄弟層元素的方法
// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
// if (el !== h1) el.style.transform = 'scale(0.5)';
// });
