'use strict'; //在strict的模式下 function的scope是block scope (function也可當作是一個變數 因為它能得到一個值然後存放於一個容器中)

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

const array = [1, 1];
function fibonacci(n) {
  array = array.push(array[0] + array[1]);
  console.log(array);
}

fibonacci(100); // 可在畫面上印出小於 100 的數列
// 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89
