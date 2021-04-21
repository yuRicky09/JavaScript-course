'use strict';

const bookings = [];
//  預設參數的直可以是任何運算式
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  const booking = {
    // ES6寫法 當key: value 是一樣時的簡寫 ex name: name =>name
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
