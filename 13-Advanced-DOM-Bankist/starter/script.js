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
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

/* 
NODE LIST VS.  HTML COLLECTION
用querySelectorAll選到後回傳的會是nodeList
而用getElementsByTagName 回傳的會是html collection
兩者差異在於當刪除掉node list內的元素時，node list不會即時更新而html collection則會
*/
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');

document.getElementById('section--1');

const allBtns = document.getElementsByTagName('button');

document.getElementsByClassName('btn');

// creating and inserting elements
//.insertAdjacentHTML
const message = document.createElement('div');
message.classList.add('cookie--message');
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got It!</button> ';

// header.prepend(message);
// 因為每個DOM El 都是真實且獨一無二存在的，所以上面範例的話message這個dom el原本會被插在header元素的最前面(第一個子元素)， 但後面又寫了append，他會被改插在最後，而不是前後兩個地方都插入。

// 不過確實有複製dom元素的方法
// header.append(message.cloneNode(true));
header.append(message);

// sibling
// header.before(message);
// header.after(message);

//Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // .remove()是近期才有的
    message.remove();
    // 以前的寫法 寫到父層再刪子層
    // message.parentElement.removeChild(message);
  });

// Style
// 這樣寫會是inline-style寫法
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// 只能選到真的有寫在inline-style的樣式 寫在自定義class屬性內的無法拿到
console.log(message.style.color);
console.log(message.style.backgroundColor);

// 不過可以用 getComputedStyle 拿到
console.log(getComputedStyle(message).color);

// parseFloat的第二個參數是代表要用十進位
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector('.nav__logo');

console.log(logo.alt);
console.log(logo.className);
logo.alt = 'Beautiful logo';

// 寫入attr
logo.setAttribute('company', 'Bankist');

// 取的屬性的相對位置or絕對位置
console.log(logo.src); // 決對位置
console.log(logo.getAttribute('src')); // 相對位置

// Data attributes !!! 重要 常用在想再html裡存放data

console.log(logo.dataset.versionNumber);

//Classes
logo.classList.add('a', 'c');
logo.classList.remove('a', 'c');
logo.classList.toggle('a', 'c');
logo.classList.contains('a', 'c'); // not includes

// Don't use
// logo.className = 'a' //會覆寫
