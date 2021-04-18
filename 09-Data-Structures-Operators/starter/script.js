'use strict';
/* 
// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starertIndex, mainIndex) {
    return [this.starterMenu[starertIndex], this.mainMenu[mainIndex]];
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  orderDelivery: function ({
    starertIndex,
    mainIndex,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starertIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },
};

/*
// spread operator 展開運算子 ...

const arr = [3, 4, 5];
// 當我們想用一個原先的物件並加上新的值產生新的物件時 ES6前的寫法
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
//ES6後

const newArr = [1, 2, ...arr];
// newArr = [1, 2, arr] => [1, 2, [3 , 4, 5]] 這不是我們想要的 我們只是想要原先物件的值
console.log(newArr); //=> [1, 2, 3, 4, 5]
//解構賦值 (Destructuring assignment) 語法是一種 JavaScript 運算式，可以把陣列或物件中的資料解開擷取成為獨立變數。
const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

const { sat, ...weekdays } = restaurant.openingHours;
console.log(sat, weekdays);

/*
// 我們也能用obj當作function的參數 讓他去做解構
restaurant.orderDelivery({
  address: '景新街89巷',
  mainIndex: 2,
  starertIndex: 2,
});

// object的場合  { 想存取的屬性名} = 想獲得的資料來源物件
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);
// 獲取對應資料後更改成自己想要的屬性名
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];
// 上面這種unpack方法太沒效率

const [x, y, z] = arr;
console.log(x, y, z); // =>2,3,4

let [first, second] = restaurant.categories;
console.log(first, second);
//如果想要略過取後面那個，直接空一格給他就可
[first, , second] = restaurant.categories;
console.log(first, second);

// switching varible 調換變數

[second, first] = [first, second];
console.log(first, second);

const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

const nested = [2, 4, [5, 7]];
const [i, , j] = nested;

const [q, , [w, r]] = nested;
console.log(q, w, r);
*/

//  --- OR ---
//當遇值是truthy則回傳truthy值。 如果都是false 則回傳最後一個
// console.log(3 || 'John'); // => 3
// console.log('' || 5); // => 5
// console.log(undefined || null); // => null 如果全都是false 回傳最後一個
// console.log(null || 0 || 'hello' || 4); // => 'hello'

// 短路邏輯也很方便在為變數設預設值

// const luckyNumber = 10;
// const JackLuckyNumber = luckyNumber ? luckyNumber : 23;
// const YuLuckyNumber = luckyNumber || 23; //如果前面是有值的話就選用 沒有就用預設23 比三元運算方便

// --- AND ---
// 邏輯: 當遇到false就回傳false，因為AND的條件下要全部都是true才回執行程式，但因為已經遇到false了那就沒有必要看下去，故直接回傳false值
// console.log('' && 5); // =>''
// console.log(3 && 'Yu'); // => 'Yu'
// console.log(0 && ''); // => 0
// --- ?? ---
// 不過有些狀況中我們會希望0, '' 也是一個truthy值而不是false
// 這時就可以用 ?? 來判斷 ??中 只有nullish值(null,undefined)會判斷成false

// const guestNumber = 0;
// const todayGuest = guestNumber ?? 10;
// console.log(todayGuest); // =>0

// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/
/*
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },

  printGoals: function (...player) {
    console.log(`${player.length} goal were scored`);
  },
};

const [player1, player2] = game.players;
console.log(player1);
const [gk, ...fieldPlayers] = player1;
console.log(gk, fieldPlayers);

const allPlayers = [...player1, ...player2];
console.log(allPlayers);

const players1Final = [...player1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

// const { team1, x: draw, team2 } = game.odds;
const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);

game.printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
game.printGoals('Muller', 'Lewandowski');
game.printGoals(game.scored);
// console.log(team1 < team2);

team1 < team2 && console.log(`Team1 is more likely to win`);

*/

const openingHours = {
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starertIndex, mainIndex) {
    return [this.starterMenu[starertIndex], this.mainMenu[mainIndex]];
  },

  openingHours,

  orderDelivery: function ({
    starertIndex,
    mainIndex,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starertIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },
};

//  用間接方法去跑object迴圈
// 使用Object.days(要取得的物件key)得到一個array裡面都是object的key元素
const properties = Object.keys(openingHours);
console.log(properties); // => ['thu', 'fri', 'sat'];

let openStr = `We are open on ${properties.length} days: `;

for (const day of properties) {
  openStr += `${day}, `;
}
console.log(openStr);

//  使用Object.values
const values = Object.values(openingHours);
console.log(values);
// 使用Object.entries

const entries = Object.entries(openingHours);
console.log(entries);

for (const [day, { open, close }] of entries) {
  console.log(`On ${day}, We will open at ${open} and close at ${close}.`);
}

// 使用解構附值 讓兩個陣列的內容合併成一個新的陣列
// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

//  for迴圈 與for of迴圈
// for of迴圈可以不用讓我們像以往一樣要設conter的初始值 狀況等 寫起來較簡單
// before
// for (let i = 0; i < menu.length; i++) {
//   console.log(menu[i]);
// }
// after  結果會是一樣的
// for (const item of menu) console.log(item);

// 如果同時想要索引值時
// .entries() 可以回傳每個要迭帶的陣列內元素的索引+值形成一個新的陣列[index, value]
// for (const item of menu.entries()) console.log(item);
// [0, "Focaccia"]
// [1, "Bruschetta"]
// [2, "Garlic Bread"]
// [3, "Caprese Salad"]
// [4, "Pizza"]
// [5, "Pasta"]
// [6, "Risotto"]

//  盡然我們知道 .entries會回傳給我們一個陣列[index, value] 那我們就一樣能解構來取值
// for (const [i, el] of menu.entries()) {
//   console.log(`${i + 1}: ${el}`);
// }
// 1: Focaccia
// 2: Bruschetta
// 3: Garlic Bread
// 4: Caprese Salad
// 5: Pizza
// 6: Pasta
// 7: Risotto

// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};
// 1.
for (const [index, playerName] of game.scored.entries()) {
  console.log(`Goal ${index + 1}: ${playerName}`);
}

//2.

function calcAverage() {
  let totalOdds = 0;
  for (const odds of Object.values(game.odds)) {
    totalOdds += odds;
  }
  return totalOdds / Object.values(game.odds).length;
}
console.log(calcAverage());

//3.
for (const [winTeam, odds] of Object.entries(game.odds)) {
  // if ('team1' === winTeam) {
  //   console.log(`Odd of victory ${game.team1}: ${odds}`);
  // } else if ('team2' === winTeam) {
  //   console.log(` Odd of victory ${game.team2}: ${odds}`);
  // } else console.log(`Odd of draw: ${odds}`);
  // console.log(winTeam, odds);
  const teamStr = winTeam === 'x' ? 'draw' : `victory ${game[winTeam]}`;
  console.log(`Odd of ${teamStr}: ${odds}`);
}
// const scorers = {};
const scorers = {};
for (const player of game.scored) {
  console.log(player);
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
console.log(scorers);
