'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('afterbegin', html);
  countriesContainer.style.opacity = 1;
};

///////////////////////////////////////
/*
const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('afterbegin', html);
  countriesContainer.style.opacity = 1;
};

AJAX call country 1
const getCountryAndNeighbour = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();

  你可能會想要在request.send()前加個變數去直接存放資料
  但這是行不通的 因為資料可能還沒被fetch下來，所以我們要加個監聽事件當載完時執行後面的call back
  request.addEventListener('load', function () {
    console.log(this.responseText);
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    Render country 1
    renderCountry(data);

    Get neughbour Country
    const [neighbour] = data.borders;

    if (!neighbour) return;

    AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);

      renderCountry(data2, 'neighbour');
    });
  });
};

你會發現有時候出現順序不一樣
這是因為 我們監聽事件是用當讀取完畢時就做後面的call back所以先載完的會先執行
getCountryAndNeighbour('taiwan');
getCountryAndNeighbour('japan');
getCountryAndNeighbour('usa');


const getCountryAndNeighbour = function (country) {
const request = new XMLHttpRequest();
request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
request.send();
*/
// 使用ES6 新增的fetch() API 來抓資料

// const request = fetch('https://restcountries.eu/rest/v2/name/taiwan');

const getCountryData = function (country) {
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response =>
      // 這邊要注意.json這個method也會得到一個promise物件 所以我們要在用.then()去接如果resolve的值，這邊不用寫return是因為我們用箭頭函數
      response.json()
    )
    .then(data => {
      console.log(data);
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      // Country 2
      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.log(`#{err}😥😣😣`);
      renderError(`Something went wrong 😣😣 ${err.message}. Try again`);
    })
    .finally(() => {
      // 不管promise解果如何都會執行
      countriesContainer.style.opacity = 1;
    });
};

// btn.addEventListener('click', function () {
//   getCountryData('usa');
// });

// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Problem with geocoding ${response.status}`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       const { city, country } = data;
//       console.log(`You are in ${city}, ${country}`);

//       return fetch(`https://restcountries.eu/rest/v2/name/${country}`);
//     })
//     .then(res => res.json())
//     .then(data => renderCountry(data[0]))
//     .catch(err =>
//       console.error(`Get something wrong! ${err.message}.Please try again!`)
//     )
//     .finally(() => {
//       // 不管promise解果如何都會執行
//       countriesContainer.style.opacity = 1;
//     });
// };

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

//* Build Promise

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lotter draw is happening🧧');

  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve('You win😍');
    } else {
      reject(new Error('You lost your money'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

const wait = function (seconds) {
  // 因為setTimeout不可能會失敗 所以我們甚至不需要reject
  // 然後因為我們也只是想讓它延遲??秒後執行而已 所以我們也不需要resolve的值
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('4 second passed');
  });

// 原本geolocation 用call back的方法寫的話如下
navigator.geolocation.getCurrentPosition(
  position => console.log(position),
  err => console.log(err)
);

// promise化

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // geolocation的原理是獲得位置時就會執行成功的callback 所以我們可以理解為獲得位置時執行的成功的callback舊式我們要的resolve
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// getPosition().then(pos => console.log(pos));

// const whereAmI = function () {
//   getPosition()
//     .then(position => {
//       console.log(position);
//       const { latitude: lat, longitude: lng } = position.coords;
//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Problem with geocoding ${response.status}`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       const { city, country } = data;
//       console.log(`You are in ${city}, ${country}`);

//       return fetch(`https://restcountries.eu/rest/v2/name/${country}`);
//     })
//     .then(res => res.json())
//     .then(data => renderCountry(data[0]))
//     .catch(err =>
//       console.error(`Get something wrong! ${err.message}.Please try again!`)
//     )
//     .finally(() => {
//       // 不管promise解果如何都會執行
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', whereAmI);

// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
// */
// const images = document.querySelector('.images');
// let img;
// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     img = document.createElement('img');
//     img.src = imgPath;
//     img.addEventListener('load', function () {
//       images.appendChild(img);
//       resolve(img);
//     });

//     img.addEventListener('error', function () {
//       reject(new Error('imgpath worng!'));
//     });
//   });
// };

// createImage('./img/img-1.jpg')
//   .then(img => {
//     return wait(2);
//   })
//   .then(() => {
//     img.style.display = 'none';
//     return createImage('./img/img-2.jpg');
//   })
//   .then(img => {
//     return wait(2);
//   })
//   .then(() => {
//     img.style.display = 'none';
//   })
//   .catch(err => console.error(err.message));

//* Async/await
//! Async/await 就是一個處理promise的語法糖衣(then)  讓你可以像在寫同步的方式處理非同步

// fn前加上async告知要已非同步來處理
const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) {
      throw new Error(`get Problem`);
    }
    const dataGeo = await resGeo.json();
    // await 顧名思義 會等待promise fulfill, fulfill後把它assing到變數中
    const res = await fetch(
      `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
    );
    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err}🧨`);
    renderError(`${err.message}`);

    // reject promise returned from async fn
    //! async fn中 當發生error時 還是要手動拋出這個error
    throw err;
  }
};

console.log('1: Will get location');
// async fn的return值永遠會是一個promise物件 所以我們要拿到我們想return值的話就要用.then處理
whereAmI()
  .then(city => console.log(`2: ${city}`))
  .catch(err => console.error(`2: ${err.message}`))
  .finally(() => console.log('3: Finsihed getting location'));

// 不過上面這寫法還是不太好 新舊寫法混著
//!但要改寫成全都用新寫法的話會有個難點是awiat只能在使用async關鍵字的fn內部來使用 所以為了處理whereAmI這fn後不能直接接上await 我們使用IIfE

(async function () {
  try {
    const res = await whereAmI();
    console.log(`2: ${res}`);
  } catch (err) {
    console.error(`2: ${err.message}`);
  }
  console.log('3: Finsihed getting location');
})();

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

const get3Countries = async function (c1, c2, c3) {
  try {
    //* 這寫法看似沒問題但其實很不合理 這三個資料不應該是c1抓完再抓c2再抓c3 這三個彼此是沒牽連的 應要同時抓取
    // const [data1] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c1}`
    // );
    // const [data2] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c2}`
    // );
    // const [data3] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c3}`
    // );
    // console.log([data1.capital], [data2.capital], [data3.capital]);
    //! Promsie.all() 使用時機為當有多個非同步操作 且這些非同步操作互相沒關聯不需有先後順序時可使用 不過要記住一個reject的話全都會被reject
    // Promsie.all()的參數為array 且會回傳一個array
    const data = Promise.all([
      getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
    ]);

    console.log((await data).map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};

// get3Countries('taiwan', 'usa', 'canada');

// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'parallel' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

const images = document.querySelector('.images');
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', function () {
      images.appendChild(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('imgpath worng!'));
    });
  });
};

// createImage('./img/img-1.jpg')
//   .then(img => {
//     return wait(2);
//   })
//   .then(() => {
//     img.style.display = 'none';
//     return createImage('./img/img-2.jpg');
//   })
//   .then(img => {
//     return wait(2);
//   })
//   .then(() => {
//     img.style.display = 'none';
//   })
//   .catch(err => console.error(err.message));

const loadNPause = async function () {
  try {
    const img1 = await createImage('./img/img-1.jpg');
    await wait(2);
    img1.style.display = 'none';
    const img2 = await createImage('./img/img-2.jpg');
    await wait(2);
    img2.style.display = 'none';
  } catch (err) {
    console.log(err.message);
  }
};

// loadNPause();

const imgArr = ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'];

const loadAll = async function (imgArr) {
  try {
    //! 記住async fn的回傳值必定會是promise物件, 如果我們自己寫return值，想要的return值會是再promise的fulfill值裡
    const imgs = imgArr.map(img => createImage(img));
    console.log(imgs);
    //! Promise.all接受多個非同步作業的promise 並且會回傳一個array 假設所有的promise都成功 這個回傳的array就會是有所有成功promise的resolve值
    //! 這邊不加await就不行了 因為我們希望是Promise.all內的所有非同步作業完成後回傳所有resolve值存到data裡，所以需要等待。 不然的話data不會是promise的resolve值
    //! 沒await data = Promise {<pending>}  有await data = [img, img, img]
    const data = await Promise.all(imgs);
    console.log(data);
    // parallel = 平行
    data.forEach(data => {
      console.log('123');
      data.classList.add('parallel');
    });
  } catch (err) {
    err.message;
  }
};

loadAll(imgArr);
