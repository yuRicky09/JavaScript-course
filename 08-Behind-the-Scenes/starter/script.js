'use strict'; //在strict的模式下 function的scope是block scope (function也可當作是一個變數 因為它能得到一個值然後存放於一個容器中)
/*
function calcAge(birthYear) {
  const age = 2037 - birthYear;
  console.log(firstName); //  => leo 可以拿到 因為是定義在global varible

  function printAge() {
    const output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);
  }
  printAge(); // 可以順利印出 一樣遵循look up varible原則

  if (birthYear >= 1981 && birthYear <= 1996) {
    // 在子層內定義完全一樣的變數名  (完全沒問題 兩者可看做不同東西)
    const firstName = 'Steven';
    //  如果是賦予值的話就會更新原先的內容
    output = 'NEW! OUTPUT!!';

    var millenial = true;
    const str = `oh, and you're a millenial, ${firstName}`;
    console.log(str); //這邊會印出Steven 因為他在自己的scope內就找到了firstName這個變數，所以她不會往上找。

    function add(a, b) {
      return a + b;
    }
  }
  //console.log(add()); // 在strict下會噴錯
  // console.log(str);  => not define  因為str是存活在內層的block scope
  console.log(millenial); //可以印出來，因為var的scope是以function為單位
  return age;
}

const firstName = 'leo'; //有兩個同名的變數是完全沒問題的，只要他們定義在不同的scope，他們就是完全不相等的東西。我們寫function的參數(paramater)時也是相同道理，因為他們各自存在自己的scope所以可以重複
calcAge(1991);

*/
/* 
console.log(me); // => undefined  因為var會有hoisting變數提升的問題，var會有兩個階段 第一階段先瀏覽整個用var宣告的變數，並且給予undefined的值，第二階段才會附值與執行程式碼。
console.log(job); // =>  Uncaught ReferenceError: Cannot access 'job' before initialization   TDZ, let const在宣告前就使用時就會出現TDZ
console.log(year);

var me = 'leo';
const job = 'student';
let year = 1994;

const birthDay;

console.log(birthDay); // =>Uncaught SyntaxError: Missing initializer in const declaration  const跟let在宣告時就必須給予初始值 不然一樣會噴錯


*/

// console.log(addDecl(2, 5)); // =>5

// console.log(addExpr); // => Uncaught ReferenceError: Cannot access 'addExpr' before initialization
// // 因為匿名函數跟箭頭函數其實就是一個獲得值的函數然後存放在變數裡，而這變數是用const宣告 所以當然得會噴這錯誤訊息
// function addDecl(a, b) {
//   return a + b;
// }

// const addExpr = function (a, b) {
//   return a + b;
// };

// let addArrow = (a, b) => a + b;
// addArrow is not a function
// 因為let會有hoisting的問題 這時會變成 undefined(2,3) 想當然 undefined不是一個function
/*
const jonas = {
  firstName: 'Jonas',
  year: 1991,
  calcAge: function () {
    // console.log(this);
    console.log(2037 - this.year);

    // Solution 1
    // const self = this; // self or that
    // const isMillenial = function () {
    //   console.log(self);
    //   console.log(self.year >= 1981 && self.year <= 1996);
    // };

    // Solution 2
    const isMillenial = () => {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillenial();
  },

  greet: () => {
    console.log(this);
    console.log(`Hey ${this.firstName}`);
  },
};
jonas.greet();
jonas.calcAge();

*/

let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName);

const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};
