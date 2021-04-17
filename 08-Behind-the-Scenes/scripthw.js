// const array = [1, 1];
// function fibonacci() {
//   array = array.push(array[0] + array[1]);
//   console.log(array);
// }

// fibonacci(); // 可在畫面上印出小於 100 的數列
// // 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89
// const array1 = [1, 4, 9, 16];

// // pass a function to map
// const map1 = array1.map(x => x[] * 2);

// console.log(map1);
// // expected output: Array [2, 8, 18, 32]

// const array = [0, 1];

// function fib(n) {
//   for (i = 2; i < n; i++) {
//     const a = array[i - 1];
//     const b = array[i - 2];
//     array.push(a + b);
//     console.log(array);
//   }
// }
// fib(8);

// var foo = function () {
//   this.count++;
// };

// console.log((foo.count = 0));

// for (var i = 0; i < 5; i++) {
//   foo();
// }

// function fib(n) {
//   let [prev, current] = [0, 1];

//   while (current <= n) {
//     [prev, current] = [current, prev + current];
//   }

//   return [prev, current];
// }

// console.log(fib(10));
