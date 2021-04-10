// Remember, we're gonna use strict mode in all scripts now!
'use strict';
/*
const x = [1, 2, 3, 4, 5];

const phone = 'xxx-xxxxx';

const newPhone = phone.replace('x', x[1]);
console.log(newPhone);
*/

// Using Google, StackOverflow and MDN

// PROBLEM 1:
// We work for a company building a smart home thermometer. Our most recent task is this: "Given an array of temperatures of one day, calculate the temperature amplitude. Keep in mind that sometimes there might be a sensor error."

// const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

// 1) Understanding the problem
// - What is temp amplitude? Answer: difference between highest and lowest temp
// - How to compute max and min temperatures?
// - What's a sensor error? And what do do?

// 2) Breaking up into sub-problems
// - How to ignore errors?
// - Find max value in temp array
// - Find min value in temp array
// - Subtract min from max (amplitude) and return it

//  當要結合兩個array時 how to do?
/*
const aArray = [1, 2, 3];
const bArray = [4, 5, 6];

const cArray = aArray.concat(bArray);
console.log(cArray);

const measureKelvin = function () {
  const measurement = {
    type: 'temp',
    unit: 'celsius',
    value: Number(prompt('Degrees celsius')),
  };
  // console.table 可以把object的key與value以表單方式呈現
  console.table(measurement);
  debugger;
  const kelvin = measurement.value + 273;
  return kelvin;
};

console.log(measureKelvin());
*/

// Coding Challenge #1

/*
Given an array of forecasted maximum temperatures, the thermometer displays a string with these temperatures.

Example: [17, 21, 23] will print "... 17ºC in 1 days ... 21ºC in 2 days ... 23ºC in 3 days ..."

Create a function 'printForecast' which takes in an array 'arr' and logs a string like the above to the console.

Use the problem-solving framework: Understand the problem and break it up into sub-problems!

TEST DATA 1: [17, 21, 23]
TEST DATA 2: [12, 5, -5, 0, 4]
*/
//  1.要如何把陣列的每個元素一一印出來，並且轉成字串。
//  2.並且能同時印出美個元素的索引值+1

const temperatures = [17, 21, 23];
const temperatures2 = [12, 5, -5, 0, 4];
const printForecast = function (arr) {
  let str = '';
  for (let i = 0; i < arr.length; i++) {
    str = str + `... ${arr[i]}ºC in ${i + 1} days`;
  }
  console.log(str);
  //  Math.max 可以抓出最大值 詳細用法見MDN
  const mostHot = Math.max(...arr);
  console.log(`最熱天為${mostHot}ºC`);
};

printForecast(temperatures);
printForecast(temperatures2);
