'use strict';
// 函數建構子就像是一個房子藍圖，我們透過這個藍圖建造出很多的房子
//! 函數建構子無法用arrow fn，因為arrow fn沒有自己的this
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;

  //! Never do this 別把fn寫在裡面，這樣每個新new出來的實體都會被掛載這個fn
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};

//* 對函數建構子使用key word之後，它到底為我們做了啥?
// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}
const leo = new Person('leo', 1994);
const jack = new Person('jack', 1993);

console.log(leo);
console.log(leo instanceof Person);

//* Prototypes
// 每個函數(包括函數建構子)都會有prototype屬性，而透過函數建構子建出來的物件們都能獲取建造出它們的函數建構子的prototype屬性上的所有methods,properties

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

leo.calcAge();
jack.calcAge();

console.log(leo.__proto__);
console.log(leo.__proto__ === Person.prototype); //=> true

console.log(Person.prototype.isPrototypeOf(leo)); //=> true
console.log(Person.prototype.isPrototypeOf(jack)); //=> true
console.log(Person.prototype.isPrototypeOf(Person)); //=> false
// 從上面可以證明藉由Person這個函數建構子所造出來的leo,jack物件的原型會是Person.prototype (Person原型)
// 不過Person的原型不是Person.prototype
//其實這屬姓名娶得滿困惑 我們實際上可以把.prototype想成.prototypeOfLinkObjects 它是連結再它身上的物件的原型

//* 就像前面提到的 我們也可以掛property再prototype上
Person.prototype.gender = 'man';
console.log(leo.gender);

console.log(leo.hasOwnProperty('firstName')); // true
console.log(leo.hasOwnProperty('man')); // false

const arr = [3, 4, 4, 5, 6, 7, 7, 8, 9, 0, 0];

Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());

// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

// const Car = function (speed, make) {
//   this.speed = speed;
//   this.make = make;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} going at ${this.speed} km/h`);
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.make} going at ${this.speed} km/h`);
// };

// const car1 = new Car(100, 'BMW');
// const car2 = new Car(105, 'Mercedes');

// car1.accelerate();
// car1.accelerate();

// car2.brake();
// car2.brake();

//ES6引進的classes寫法
//! 在JS中classes並不是真的像其他程式語言的classes 它只是一個語法糖衣
//! 在JS中classes其實就是一種特別的function型別
//! classes不會有hoisting 且會以strict mode執行環境下執行
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  //!特別的是只要不是寫在constructor裡面的話就是掛載於.prototype屬性上
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hi! ${this.firstName}`);
  }

  //! static method靜態方法， 靜態方法只能有類別使用不能給物件實體使用
  static hey() {
    console.log('hey! what up');
  }

  get age() {
    return 2037 - this.birthYear;
  }

  //! setter很常拿來當作設定驗證   例子:驗證有沒有輸拳名
  set fullName(name) {
    //!  下面這個_是慣例， 如果不加程式會衝突，因為會造成寫入再建構子寫入fullname屬性時會呼叫到這個setter fn,但這邊又寫一樣的話就會造成無窮迴圈
    if (name.includes(' ')) this._fullName = name;
    else alert(`Hey ${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }
  // 這樣做= PersonCl.hey = function () {
  //  console.log('hey! what up')
  //}
  // 因為不是寫在prototype上所以想當然它的實體無法繼承取用
}

const ricky = new PersonCl('ricky', 1994);
ricky.calcAge();
ricky.greet();
PersonCl.hey();
// ricky.hey(); // => ricky.hey is not a function
//* getter setter 有點難理解 先跳過
const account = {
  owner: 'leo',
  movements: [200, 530, 120, 720],

  get latest() {
    //! 用slice拿取最後一個,不過回傳值會是一個陣列所以我們用pop方法 pop() 方法會移除並回傳陣列的最後一個元素。 ps 這邊不用splice是因為會破壞原陣列
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};
//get 語法會將物件屬性，綁定到屬性被檢索時，所呼叫的函式。有時候想要透過特殊的函數回傳動態數值時可使用getter
console.log(account.latest);
//set
// account.latest(50); 直覺上可能會是這樣寫但不是，getter setter用法就像使用物件屬性一樣
account.latest = 50;
console.log(account.movements);

//* Object.create()  可以手動指定新產出的物件的原型要指向誰
//! Object.create(參數)跟函數建構子與classes最大差異在於Object.create()會建立一個object，並且新建立的object的原型(.__proto__)會指向當作Object.create()內的參數物件本身 (不是指向參數的.prototype)
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
steven.init('steven', 1998);
steven.calcAge();

console.log(steven.__proto__ === PersonProto);

// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

// const Car = function (speed, make) {
//   this.speed = speed;
//   this.make = make;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} going at ${this.speed} km/h`);
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.make} going at ${this.speed} km/h`);
// };

// const car1 = new Car(100, 'BMW');
// const car2 = new Car(105, 'Mercedes');

// car1.accelerate();
// car1.accelerate();

// car2.brake();
// car2.brake();

class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate = function () {
    this.speed += 10;
    console.log(`${this.make} going at ${this.speed} km/h`);
  };

  brake = function () {
    this.speed -= 5;
    console.log(`${this.make} going at ${this.speed} km/h`);
  };

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}
