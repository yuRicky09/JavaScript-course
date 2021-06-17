// Importing module
import { addToCart, totalPrice as tp } from './shoppingCart.js';
// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
//!當使用打包工具後 路徑就只要寫想引入的東西就好
import cloneDeep from 'lodash-es';
//! babel是會把ES6的語法寫成ES5 但ES6新增的功能feature就很難改寫 這時候就要用Polyfills
//! Polyfills = 寫法方定義新功能   這就是core-js在做的是
import 'core-js/stable';
import 'regenerator-runtime';
console.log('importing module');
addToCart('bread', 5);
console.log(tp);

const state = {
  cart: [
    {
      product: 'bread',
      quantity: 5,
    },
    {
      product: 'pizza',
      quantity: 5,
    },
  ],
  user: { loggedIn: true },
};

// Object.assign({}, 複製對象) 只會是淺層複製
const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateClone);
console.log(stateDeepClone);

class Person {
  greet = 'hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.greet}, ${this.name}`);
  }
}

const john = new Person('john');

// console.log(cart.find(el => el.quantity >= 2));
Promise.resolve('Test').then(x => console.log(x));
