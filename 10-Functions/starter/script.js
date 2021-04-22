'use strict';

const bookings = [];
//  預設參數的直可以是任何運算式
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  const booking = {
    // ES6寫法 當key: value 是一樣時的簡寫 ex name: name =>name
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);

const oneWord = function (str) {
  //  把所有空白字元換成空字元並轉小寫
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...other] = str.split(' ');
  return [first.toUpperCase(), ...other].join(' ');
};

const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  // function也有屬性 function.name會得到fn名
  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);
// 建立callback fn的一個好處，假設我今天要寫一個fn是賣咖啡，
//在能賣出咖啡前我可能要先買原料，做出咖啡後才能賣，
//這時我能把這兩個步驟抽出來建立成callback fn，
//當我需要賣咖啡時把這兩個callback當作參數丟進我賣咖啡的fn，
//我不用去記我怎麼買到原料，怎麼做出咖啡(反正當初建立就寫好了)，
//可以簡單化明確化我這個賣咖啡的fn

// return function

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');
// 先別管為啥可以拿到greeting這個參數 這是JS的閉包closure概念
greeterHey('Jonas'); // => Hey Jonas
greeterHey('Steven');

// greet('Hello')會得到一個fn 所以我可直接在呼叫他
greet('Hello')('Jonas'); // => Hello Jonas

const greetArr = greeting => name => console.log(`${greeting} ${name}`);

greetArr('Hey')('Jonas');

const jal = {
  name: 'jal',
  iataCode: 'JAL',
  bookings: [],
  book: function (flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.name} flight ${this.iataCode} ${flightNum}`
    );
    this.bookings.push({
      flight: `${this.iataCode}${flightNum}`,
      name: `${name}`,
    });
  },
};

jal.book(250, 'Hsu Yu');

const peach = {
  name: 'peach',
  iataCode: 'Peach',
  bookings: [],
};

const book = jal.book;

// book(23, 'Jack'); error 因為這時候this會變成undefined 沒人call他

// call method
book.call(peach, 23, 'Jack');
console.log(peach);

// apply method   參數要改戴陣列
const flightData = [583, 'Leo'];
book.apply(peach, flightData);
// but現在有展開運算子 所以apply就比較沒啥用
book.call(peach, ...flightData);

// bind method 可以直接綁一個fn產生出新的fn this會直接指向當初被綁的那個物件

const bookPeach = book.bind(peach);
bookPeach('EW23', 'jacky');
bookPeach('WQ22', 'Kitty');
console.log(peach.bookings);

// With Event listeners
jal.planes = 300;
jal.byuPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};
// !!!!  在event handler函數中，它的this永遠會指向handler函數所附著在的元素
// 所以這邊這個元素是button 它不是一個number 不能做加法因此出錯
// 解決方法 使用bind method去改變它的this指向
//不用call是因為我們這邊沒有要直接呼叫這個fn的意思
document
  .querySelector('.buy')
  .addEventListener('click', jal.byuPlane.bind(jal));

//Partial application = preseyt parameter 事先設參數

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

// 當不用指定this時 可以帶null當參數進去
const addJapanTax = addTax.bind(null, 0.15);

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addJapanTax2 = addTaxRate(0.23);
console.log(addJapanTax2(100));
console.log(addJapanTax2(23));

// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/
/*
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer: function () {
    const answer = Number(
      prompt(`What is your favourite programming language?
    0: JavaScript
    1: Python
    2: Rust
    3: C++
    (Write option number)`)
    );
    if (answer >= 0 && answer <= 3) {
      poll.answers[answer] += 1;
    }
    console.log(this.answers);
    this.displayResults();
    this.displayResults('string');
  },
  displayResults: function (type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else console.log(`Poll results are ${this.answers.join(', ')}`);
  },
};

const btnPoll = document.querySelector('.poll');
const pollEventBtn = poll.registerNewAnswer.bind(poll);
btnPoll.addEventListener('click', pollEventBtn);
poll.displayResults('string');
*/

// 立即呼叫function expression 只會執行一次 之後就不會再執行
// 方法: 先寫一個function expression且不存放於變數(此時會出錯)  這時候再用()包住function expression
// 然後再用小括號呼叫他
(function () {
  console.log(`This will never run again`);
})();

(() => console.log(`This will ALSO never run again`))();

//----------------

// closure 閉包是在某些情況下自動產生的 所以我們只是要去理解他
// 所謂的closures就是指一個再執行環境裡被封閉的環境變數(在創造出它的fn裡)，即使執行環境已結束，變數還是能存活。
// 也可以說closure給予一個function能夠去獲取它父層的function裡的所有變數，就算父層的function已經執行完畢(return完)
// 總之closure就是一個能確保function不會失去與跟他一樣出生環境的變數的連結
// 另一個理解方法 closure就像一個背包 function會打包所有生出它的出生環境裡的所有變數隨時帶著走
// !! 每個function都能夠去讀取它當時被創造出來的時候的執行環境的環境變數

const secureBooking = function () {
  let passemgerCount = 0;

  return function () {
    passemgerCount++;
    console.log(`${passemgerCount} passengers`);
  };
};

//  secureBooking() 會回傳一個fn 我們把它存在變數裡
const booker = secureBooking();

booker();
booker();
booker(); // =>3 passengers

// 用來查fn詳細資訊
console.dir(booker);

//Example 1

let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();

// re-assigning f fn
h();
f();
console.dir(f); // closure變成h();

//Example 2

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now borading all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);
};

boardPassengers(180, 3);
