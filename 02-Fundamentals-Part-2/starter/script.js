// strict mode 嚴謹模式 可以讓我們寫出更靠普、牢固的code
// 這個模式下 js會阻止我們寫出一些不靠普的code，而且當發生錯誤時會提醒我們
'use strict';

function fruitProcessor(apples, oranges) {
  const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
  return juice;
}

let appleOrangeJuice = fruitProcessor(5, 0);
console.log(appleOrangeJuice);

appleOrangeJuice = fruitProcessor(5, 3);
console.log(appleOrangeJuice);

const num = Number('23');
console.log(num);

/* Funtion declaration vs Function expression 
差異在於
1.陳述式可以把function內容寫在呼叫function的語句後也能正常執行
2.陳述式被定義完後就無法從記憶體中刪除，而運算式回隨著執行結束or變數遭刪除後而從記憶體當中刪除
*/
// Function declaration  函式陳述式
function calcAge1(birthYear) {
  return 2037 - birthYear;
}

const age1 = calcAge1(1994);

//  Function expression 函式運算式

const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
}

const age2 = calcAge2(1994);

console.log(age1, age2);

// Arrow function === 也是一種function expression 
//  寫法快速簡單 多用於當函式能用一行就寫完時
// 因為得到的也是一個值 所以可以直接放入變數裡
const calcAge3 = birthYear => 2037 - birthYear;
const age3 = calcAge3(1991);
console.log(age3);
// 但其實多行時也能使用 但就會有點失去他的本意(快速 不用寫return等)

const yearsUntilRetirement = (birthYear, firstName) => {
  const age = 2037 - birthYear;
  const retirement = 65;
  return `${firstName} retires in ${retirement - age} years`;
}

console.log(yearsUntilRetirement(1994, 'YU'));
console.log(yearsUntilRetirement(1900, 'jack'));


//  函式內呼叫函式  
//  建立一個切水果機 把水果切片

function fruitCutPieces(fruit) {
  return fruit * 4;
}

function fruitProcessor(apples, oranges) {
  const applePieces = fruitCutPieces(apples);
  const orangePieces = fruitCutPieces(oranges);
  const juice = `Juice with ${applePieces} piece of apples and ${orangePieces} piece of oranges.`;
  return juice;
}

console.log(fruitProcessor(4, 5));