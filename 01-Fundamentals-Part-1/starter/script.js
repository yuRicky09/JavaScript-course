/*let js = 'amazing';
console.log("Jonas");
console.log(23);

let country = 'Taiwan';
let continent = "Asian";
let population = "23";

console.log(country);
console.log(continent);
console.log(population);
*/
/*
const now = 2037;
const ageLeo = now - 1994;
const ageYu = now - 1996;
console.log(ageLeo, ageYu);

console.log(ageLeo * 2, ageLeo / 2, 2 ** 3);

console.log('yu' + ' ' + 'leo');



let x = 10 + 5;
x += 10; // x = x + 10
x *= 4;
x++; // x = x + 1
x--;
console.log(x);
*/


/*
let marksWeights = 78, marksTall = 1.67;
let johnWeights = 92, johnTall = 1.95;

let bmi = marksWeights / marksTall ** 2;
console.log(bmi);
bmi = johnWeights / johnTall ** 2;
console.log(bmi);

marksWeights = 95, marksWeights = 1.88;
johnWeights = 85, johnTall = 1.76;
console.log(bmi = marksWeights / marksTall ** 2);
console.log(bmi = johnWeights / johnTall ** 2);
*/

/* 
const firstName = "HSU";
const lastName = "YU";
const age = 26;
const job = "engineer";

console.log(`${firstName} ${lastName} is ${age} years old!He job is ${job}.`)
//如何換行
console.log(`123456   
heyheyhey
comeon man!!
......`)

*/


// if elsi 判斷句


/*
const birthYear = 1990;
const yearNow = 2021;

if (yearNow - birthYear >= 30) {
  console.log(`你可以成為魔法師了👍`)
} else {
  console.log(`你是一個現充`)
}


const marksWeights = 78, marksTall = 1.67;
const johnWeights = 92, johnTall = 1.95;

const bmiMark = marksWeights / marksTall ** 2;
const bmiJohn = johnWeights / johnTall ** 2;

if (bmiMark > bmiJohn) {
  console.log(`Mark's BMI(${bmiMark}) is higher than John's BMI(${bmiJohn})!`)
} else {
  console.log(`John's BMI(${bmiJohn}) is higher than Mark's BMI(${bmiMark})!`)
}

*/

// type convertion 類型轉換

const birthYear = 1994
const age = "26"
console.log(String(birthYear), birthYear);
console.log(Number(age), age);


// type coercion 強制類型轉換
//在js中  當在做字串與數字的運算時。只有遇到"+"法時，會讓數字轉成字串 變成字串+字串 其他時候都會是字串轉成數字 變成數字跟數字的運算
console.log("I'm " + 26 + " years old!");  //數字26變成字串'26'
console.log('26' - '13' - '10');  // 得到數字3
console.log('25' * '2' - 5); //得到45
console.log(3 + 6 + 13 + '23'); //得到'2223'

let n = '1' + 1;
n += 10;
console.log(n); // n = 1110


// 5 falsy values: 0, "", undefined, null, NaN

let abc;
console.log(Boolean(0));
console.log(Boolean('hey'));
console.log(Boolean(''));
console.log(Boolean(abc));
console.log(Boolean({}));


const money = 0;

if (money) {
  console.log(`Don't spend it all!`)
} else {
  console.log('You should get a job!')
}

let height;
if (height) {
  console.log(`YAY! You height is defined!`)
} else {
  console.log(`You height is un defined!`)
}


// 比對運算子 == (loose 寬鬆的) vs === (strict 嚴格的)
// === 完全相等   左右兩邊的值必須連type也是一樣才會得到true 反之則得到false.  == 相較相等 左右兩邊為不同type的值時，js會先強制轉type在進行比較 opsite版本不等於  !=(loose 寬鬆的) vs  !== (strict 嚴格的)
// prompt 跳出視窗讓使用者輸入並把值(string)存起來

// const favourite = prompt("what is your favourite number?");

// if (favourite === 23) {
//   console.log("23 is a very nice number!")
// }

//上面的話 條件式會不成立 透過瀏覽器input給我們得值都會是字串 所以不相等 

/*
const favourite = Number(prompt("what is your favourite number?"));
if (favourite === 23) {
  console.log("23 is a very nice number!")
} else if (favourite === 19) {
  console.log("19 is also a very nice number!")
} else {
  console.log("why you don't like 23 or 19??")
} 19
*/

let dolphinsScore = (96 + 108 + 89) / 3;
let koakasScore = (88 + 91 + 110) / 3;

console.log(dolphinsScore, koakasScore)
if (dolphinsScore > koakasScore) {
  console.log("The winner is dolphins")
} else if (dolphinsScore < koakasScore) {
  console.log("The winner is koakas")
} else {
  console.log("Draw. There is no winner")
}

dolphinsScore = (97 + 112 + 101) / 3;
koakasScore = (109 + 95 + 123) / 3;
if (dolphinsScore > koakasScore && dolphinsScore >= 100) {
  console.log("The winner is dolphins")
} else if (koakasScore > dolphinsScore && koakasScore >= 100) {
  console.log("The winner is koakas")
} else if (dolphinsScore === koakasScore && (dolphinsScore && koakasScore) >= 100) {
  console.log("Draw. Both win")
} else {
  console.log("There is no winner")
}

dolphinsScore = (97 + 112 + 90) / 3;
koakasScore = (109 + 95 + 95) / 3;

console.log(dolphinsScore);
console.log(koakasScore);
if (dolphinsScore > koakasScore && dolphinsScore >= 100) {
  console.log("The winner is dolphins")
} else if (koakasScore > dolphinsScore && koakasScore >= 100) {
  console.log("The winner is koakas")
} else if (dolphinsScore === koakasScore && (dolphinsScore && koakasScore) >= 100) {
  console.log("Draw. Both win")
} else {
  console.log("There is no winner")
}