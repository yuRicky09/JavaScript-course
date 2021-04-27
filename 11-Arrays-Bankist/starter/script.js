'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//  加入sort參數 預設為false表示預設不排列
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  // 這邊先用slice在用sort是因為不想改動到原先的陣列,所以先用slice創造出一個新的陣列回來
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}</div>
        </div>
    `;
    //.insertAdjacentHTML (插入位置, 插入字串(html格式))
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const user = 'Steven Thomas Williams'; // how to be =>str

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, el) => acc + el, 0);
  labelBalance.textContent = `${acc.balance} €`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = interest;
};

const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLocaleLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
  return accs;
};

createUsername(accounts);

const upDateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// Event handler (login)
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  // 表單form元素裡的btn元素會有預設事件，如按下此按鈕就自動重整頁面
  // 所以我們這邊用.preventDefault來取消預設事件
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  // ?.跟.的差異在於 ?.去存取屬性時當沒這個屬性時不會噴錯只會回undefined
  // .如果沒有查到這個屬性會直接噴錯
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log('LOGIN');
  }
  // Display UI and message
  labelWelcome.textContent = `Welcome back, ${
    currentAccount.owner.split(' ')[0]
  }`;
  containerApp.style.opacity = 100;
  //Clear input fields
  inputCloseUsername.value = inputLoginPin.value = '';
  // .blur()會讓游標失去foucs  blur == 模糊
  inputLoginPin.blur();

  // UpdateUI
  upDateUI(currentAccount);
});

// transfer money 匯款
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    //Doing transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Update UI
    upDateUI(currentAccount);
  }
});

// loan貸款
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);

    // update UI
    upDateUI(currentAccount);
  }

  inputLoanAmount.value = '';
});

// 刪除帳戶

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    // findIndex跟indexof的差異在於findIndex可以給一個判斷狀況，
    // 他會挑出符合這個狀況的元素的index 而indexof只能給他一個確切的值他會去判斷有無在array裡
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // 刪除帳戶
    accounts.splice(index, 1);

    // hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  // 排序參數寫死不是正解，這樣在案就不會復原
  // displayMovements(currentAccount.movements, true);
  // 我們要設一個監聽者變數去看我們要排序還是不需要
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// let arr = ['a', 'b', 'c', 'd', 'e'];

// // array同樣有slice方法 切記slice會回傳一個新的array
// console.log(arr.slice(2));
// console.log(arr.slice(-1));
// console.log(arr.slice(2, 4));

// // splice 跟slice差在於會改變原本物件 跟結束參數就是當下指定的數字 不像slice實際上是指定數-1
// // 它會把想提取的部分從原先的物件抽出，所以想刪除原先物件裡的一些元素時很好用
// console.log(arr.splice(2)); // =>['c', 'd', 'e']
// console.log(arr); // => ['a', 'b']

// // REVERSE  會改變原物件
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());
// console.log(arr2); // =>["f", "g", "h", "i", "j"]

// // CONCAT 合併
// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]); //得到同樣解果

// // JOIN
// console.log(letters.join('-'));

// for of
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const [i, mov] of movements.entries()) {
//   if (mov > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${mov}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
//   }
// }

// console.log('-----------------------');
// //  forEach(現在迭帶的元素, 索引, 整個arr)  跟for of差異在於forEach不能break 必須完全迭帶完
// movements.forEach(function (mov, i, arr) {
//   if (mov > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${mov}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
//   }
// });

// // forEach也可以用來跑新的資料結構SET跟MAP

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

// const currenciesUniqe = new Set(['USD', 'GBP', 'EUR', 'EUR', 'USD']);

// //因為set沒有索引值 所以我們用_代表丟棄這個參數不用
// currenciesUniqe.forEach(function (value, _, map) {
//   console.log(`${value}: ${value}`);
// });

// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/* 
const checkDogs = function (dogsAll) {
  dogsAll.forEach(function (dog, i) {
    dog >= 3
      ? console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`)
      : console.log(`Dog number ${i + 1} is till a puppy`);
  });
};

const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];

const dogsJuliaCorrected = [...dogsJulia].slice(1, -1);
const dogsAll = dogsJuliaCorrected.concat(dogsKate);

checkDogs(dogsAll);
*/

// MAP method 與 foreach最大差別在 MAP會回傳一個新的陣列 forEach不會
// 另外map最終是得到一個新的陣列值，而forEach是在每次回圈都會做些事這對程式碼會有side effect
//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//const eurToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });
/*
const movementsUSD = movements.map(mov => mov * eurToUsd);

console.log(movements, movementsUSD);

const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescriptions);
*/

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// 滿足條件的true值會被丟進容器裡，false的則過濾掉
const deposit = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposit);

const depositFor = [];
for (const mov of movements) if (mov > 0) depositFor.push(mov);
console.log(depositFor);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

// reduce  reduce(fn(accumulator=累加器,現在的元素,index,arr), 累加器初始值)

const balance = movements.reduce(function (acc, el, i, arr) {
  console.log(`Iteration ${i}: ${acc}`);
  return acc + el;
}, 0);
console.log(balance);

let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

// Maximum value

const max = movements.reduce((acc, el) => {
  if (acc > el) return acc;
  else return el;
}, movements[0]);
console.log(max);

// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const calcAverageHumanAge = function (dogs) {
//   const humanAge = dogs.map(dog => {
//     if (dog <= 2) return dog * 2;
//     else return 16 + dog * 4;
//   });
//   const newHumamAge = humanAge.filter(humanAge => humanAge >= 18);
//   // console.log(
//   //   newHumamAge.reduce((acc, el) => acc + el, 0) / newHumamAge.length
//   // );
//   // (2+3) / 2 === 2 / 2 + 3 / 2
//   console.log(
//     newHumamAge.reduce((acc, el, i, arr) => acc + el / arr.length, 0)
//   );
// };

const calcAverageHumanAge = function (dogs) {
  const newHumamAge = dogs
    .map(dog => {
      if (dog <= 2) return dog * 2;
      else return 16 + dog * 4;
    })
    .filter(humanAge => humanAge >= 18)
    .reduce((acc, el, i, arr) => acc + el / arr.length, 0);
  console.log(newHumamAge);
};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

// find method
// find跟filter的差異在於 find只會抓出第一個符合狀況的true值元素 不是回傳陣列
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

// find的強大在於可以設定條件去抓陣列中唯一符合條件的物件
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

// flat 可以拆解巢狀式陣列 預設為拆解1層
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, 5, 6], 7, 8];
console.log(arrDeep.flat(2));

// 抓出所有金錢流動並且計算總合

const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

// map + flat === flatmap

const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance2);

// SORT  metho
//String

const owners = ['leo', 'yu', 'jack', 'kitty'];

// 會按照字母順序排列,並且會改變原先陣列
console.log(owners.sort());
console.log(owners);

// Number
// 不給sort帶任何參數的情況下會把數字轉成(不是真的轉)字串來排列

// sort()會依匿名函式的參數與回傳的值為精確的排序規則：
// 當回傳值為負數時，那麼前面的數放在前面
// 當回傳值為正整數，那麼後面的數在前面
// 當回傳值為零，保持不動。

// 升敘
movements.sort((a, b) => a - b);
console.log(movements);

// 降敘
movements.sort((a, b) => b - a);
console.log(movements);
