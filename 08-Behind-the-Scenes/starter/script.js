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
    const firstName = 'Steven';
    var millenial = true;
    const str = `oh, and you're a millenial, ${firstName}`;
    console.log(str);

    function add(a, b) {
      return a + b;
    }
  }
  //console.log(add()); // 在strict下會噴錯
  // console.log(str);  => not define  因為str是存活在內層的block scope
  console.log(millenial); //可以印出來，因為var的scope是以function為單位
  return age;
}

const firstName = 'leo';
calcAge(1991);
