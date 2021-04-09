// strict mode 嚴謹模式 可以讓我們寫出更靠普、牢固的code
// 這個模式下 js會阻止我們寫出一些不靠普的code，而且當發生錯誤時會提醒我們
'use strict';
/*
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
/*
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
*/

// Coding Challenge #1

/*
Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new gymnastics discipline, which works differently.
Each team competes 3 times, and then the average of the 3 scores is calculated (so one average score per team).
A team ONLY wins if it has at least DOUBLE the average score of the other team. Otherwise, no team wins!

1. Create an arrow function 'calcAverage' to calculate the average of 3 scores
2. Use the function to calculate the average for both teams
3. Create a function 'checkWinner' that takes the average score of each team as parameters ('avgDolhins' and 'avgKoalas'), and then logs the winner to the console, together with the victory points, according to the rule above. Example: "Koalas win (30 vs. 13)".
4. Use the 'checkWinner' function to determine the winner for both DATA 1 and DATA 2.
5. Ignore draws this time.

TEST DATA 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49
TEST DATA 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27

HINT: To calculate average of 3 values, add them all together and divide by 3
HINT: To check if number A is at least double number B, check for A >= 2 * B. Apply this to the team's average scores 😉

GOOD LUCK 😀
*/

// const calcAverage = (score1, score2, score3) => {
//   return (score1 + score2 + score3) / 3;
// }

/*
const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;



let avgDolphins = calcAverage(44, 23, 71);
let avgKoalas = calcAverage(65, 54, 49);

function checkWinner(avgDolphins, avgKoalas) {
  if (avgDolphins >= avgKoalas * 2) {
    console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`);
  }
  else if (avgKoalas >= avgDolphins * 2)
    console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})`);
  else
    console.log(`Nobody win!!`);
}

checkWinner(avgDolphins, avgKoalas);


avgDolphins = calcAverage(85, 54, 41);
avgKoalas = calcAverage(22, 23, 42);

checkWinner(avgDolphins, avgKoalas);

*/

// 學習Array
/*

const friends = ['Yu', 'Jack', 'Leo'];

console.log(friends[0], friends[2]);

console.log(friends.length);
console.log(friends[friends.length - 1]);

friends[2] = 'Jay';
console.log(friends);

const calcAge = function (birthYear) {
  return 2037 - birthYear;
}

const years = [1994, 2005, 1997, 2002, 2007];

const age1 = calcAge(years[0]);
const age2 = calcAge(years[3]);
const age3 = calcAge(years[years.length - 1]);

const ages = [age1, age2, age3];
console.log(ages); 

*/
// array method

// Add elements

const friends = ['Yu', 'Jack', 'Leo'];

// 最後面加1個元素
friends.push('Kitty');
console.log(friends);

// 最前面加1個元素
friends.unshift('John');


//  Remove element

// 移最後一個
friends.pop();
console.log(friends);

// 如果想要捕捉移掉的元素 就命名一個變數來存取

const poped = friends.pop();
console.log(poped);
console.log(friends);

// 移最前一個
friends.shift();
console.log(friends);

// 查詢元素位置
// 當沒查到時會回傳-1
console.log(friends.indexOf('Yu'));

// ES6新增的方法 includes() 用來查詢資料內是否有該元素 會回傳布林值

console.log(friends.includes('Yu'));
console.log(friends.includes('12'));

friends.push('Ricky');

if (friends.includes('Ricky')) {
  console.log(`You have a friend called Ricky`);
}

// Coding Challenge #2

/*
Steven is still building his tip calculator, using the same rules as before: Tip 15% of the bill if the bill value is between 50 and 300, and if the value is different, the tip is 20%.

1. Write a function 'calcTip' that takes any bill value as an input and returns the corresponding tip, calculated based on the rules above (you can check out the code from first tip calculator challenge if you need to). Use the function type you like the most. Test the function using a bill value of 100.
2. And now let's use arrays! So create an array 'bills' containing the test data below.
3. Create an array 'tips' containing the tip value for each bill, calculated from the function you created before.
4. BONUS: Create an array 'total' containing the total values, so the bill + tip.

TEST DATA: 125, 555 and 44

HINT: Remember that an array needs a value in each position, and that value can actually be the returned value of a function! So you can just call a function as array values (so don't store the tip values in separate variables first, but right in the new array) 😉

GOOD LUCK 😀
*/

/*
function calcTip(bill) {
  if (bill >= 50 && bill <= 300) {
    return bill * 0.15;
  } else
    return bill * 0.2;
}
*/
//  用三元運算
// const calcTip = function (bill) {
//   return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
// }

// arrow function    
//  const calcTip = (bill) => bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;


/*
const bills = [125, 555, 44];
const tip1 = calcTip(125);
const tip2 = calcTip(555);
const tip3 = calcTip(44);

const tips = [tip1, tip2, tip3]
console.log(tips);
*/

// 上面的寫法會要多定義很多變數 不推
// const bills = [125, 555, 44];
// const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];

// console.log(bills, tips);
// const total = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];
// console.log(total);

/*

//  object

const yu = {
  firstName: 'Yu',
  lastName: 'HSU',
  age: 2037-2011,
  job: 'teacher',
  friends: ['Jack', 'Peter', 'Steven']
}
//  object 與 array 最大不同在於 object不在意元素排列的順序 他是用key去取值

// object有兩種取值方始   .的話必須是object確實存在的屬性才能取到後面的值 []的話可以用透過expression得到的值來取
console.log(yu.firstName);
console.log(yu['lastName']);

const nameKey = 'Name';

console.log(yu['first' + nameKey]);
console.log(yu[`first${nameKey}`]);


//  prompt 可以跳出視窗讓使用者輸入內容並且可把輸入的內容存到變數裡

const interestedIn = prompt(`What do you want to know about YU? Choose between firstname........others`)

//console.log(yu.interestedIn); // undefined
// console.log(yu[interestedIn]); // teacher


// if (yu[interestedIn]) {
//   console.log(yu[interestedIn]);
// }else {
//   console.log(`Wrong request!`)
// }0
console.log(`${yu.firstName} has ${yu.friends.length} friends, and his best friend is called ${yu.friends[0]}`
);
*/


const yu = {
  firstName: 'Yu',
  lastName: 'HSU',
  birthYear: 1994,
  job: 'teacher',
  friends: ['Jack', 'Peter', 'Steven'],
  hasDriverLicense: true,
  
  // calcAge: function (birthYear) {
  //   return 2037 - birthYear;
  // }
  
  // calcAge: function() {
  //   return 2037 - this.birthYear;
  // }

  calcAge: function() {
    this.age = 2037 - this.birthYear;
    return this.age
  },

  getSummary: function() {
    return `${this.firstName} is a ${this.calcAge()} year old teacher,and he has ${yu.hasDriverLicense ? 'a': 'no'} driver's license.`
  }
}


console.log(yu.calcAge());
// console.log(yu['calcAge'](yu.birthYear));
console.log(yu.age);

// challenge

console.log(yu.getSummary())