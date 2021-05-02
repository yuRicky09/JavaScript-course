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

const Car = function (speed, make) {
  this.speed = speed;
  this.make = make;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} going at ${this.speed} km/h`);
};

const car1 = new Car(100, 'BMW');
const car2 = new Car(105, 'Mercedes');

car1.accelerate();
car1.accelerate();

car2.brake();
car2.brake();

//ES6引進的classes寫法
//! 在JS中classes並不是真的像其他程式語言的classes 它只是一個語法糖衣
//! 在JS中classes其實就是一種特別的function型別

class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  //!特別的是只要不是寫在constructor裡面的話就是掛載於.prototype屬性上
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hi! ${this.firstName}`);
  }
}

const ricky = new PersonCl('ricky', 1994);
ricky.calcAge();
ricky.greet();
