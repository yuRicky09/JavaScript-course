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
      <p class="country__row"><span>ð«</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>ð£ï¸</span>${data.languages[0].name}</p>
      <p class="country__row"><span>ð°</span>${data.currencies[0].name}</p>
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
      <p class="country__row"><span>ð«</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>ð£ï¸</span>${data.languages[0].name}</p>
      <p class="country__row"><span>ð°</span>${data.currencies[0].name}</p>
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

  ä½ å¯è½ææ³è¦å¨request.send()åå åè®æ¸å»ç´æ¥å­æ¾è³æ
  ä½éæ¯è¡ä¸éç å çºè³æå¯è½éæ²è¢«fetchä¸ä¾ï¼æä»¥æåè¦å åç£è½äºä»¶ç¶è¼å®æå·è¡å¾é¢çcall back
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

ä½ æç¼ç¾ææååºç¾é åºä¸ä¸æ¨£
éæ¯å çº æåç£è½äºä»¶æ¯ç¨ç¶è®åå®ç¢æå°±åå¾é¢çcall backæä»¥åè¼å®çæåå·è¡
getCountryAndNeighbour('taiwan');
getCountryAndNeighbour('japan');
getCountryAndNeighbour('usa');


const getCountryAndNeighbour = function (country) {
const request = new XMLHttpRequest();
request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
request.send();
*/
// ä½¿ç¨ES6 æ°å¢çfetch() API ä¾æè³æ

// const request = fetch('https://restcountries.eu/rest/v2/name/taiwan');

const getCountryData = function (country) {
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response =>
      // ééè¦æ³¨æ.jsonéåmethodä¹æå¾å°ä¸åpromiseç©ä»¶ æä»¥æåè¦å¨ç¨.then()å»æ¥å¦æresolveçå¼ï¼ééä¸ç¨å¯«returnæ¯å çºæåç¨ç®­é ­å½æ¸
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
      console.log(`#{err}ð¥ð£ð£`);
      renderError(`Something went wrong ð£ð£ ${err.message}. Try again`);
    })
    .finally(() => {
      // ä¸ç®¡promiseè§£æå¦ä½é½æå·è¡
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
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating ð
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK ð
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
//       // ä¸ç®¡promiseè§£æå¦ä½é½æå·è¡
//       countriesContainer.style.opacity = 1;
//     });
// };

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

//* Build Promise

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lotter draw is happeningð§§');

  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve('You winð');
    } else {
      reject(new Error('You lost your money'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

const wait = function (seconds) {
  // å çºsetTimeoutä¸å¯è½æå¤±æ æä»¥æåçè³ä¸éè¦reject
  // ç¶å¾å çºæåä¹åªæ¯æ³è®å®å»¶é²??ç§å¾å·è¡èå·² æä»¥æåä¹ä¸éè¦resolveçå¼
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

// åæ¬geolocation ç¨call backçæ¹æ³å¯«çè©±å¦ä¸
navigator.geolocation.getCurrentPosition(
  position => console.log(position),
  err => console.log(err)
);

// promiseå

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // geolocationçåçæ¯ç²å¾ä½ç½®æå°±æå·è¡æåçcallback æä»¥æåå¯ä»¥çè§£çºç²å¾ä½ç½®æå·è¡çæåçcallbackèå¼æåè¦çresolve
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
//       // ä¸ç®¡promiseè§£æå¦ä½é½æå·è¡
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', whereAmI);

// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own ð

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that ð);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK ð
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
//! Async/await å°±æ¯ä¸åèçpromiseçèªæ³ç³è¡£(then)  è®ä½ å¯ä»¥åå¨å¯«åæ­¥çæ¹å¼èçéåæ­¥

// fnåå ä¸asyncåç¥è¦å·²éåæ­¥ä¾èç
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
    // await é¡§åæç¾© æç­å¾promise fulfill, fulfillå¾æå®assingå°è®æ¸ä¸­
    const res = await fetch(
      `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
    );
    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err}ð§¨`);
    renderError(`${err.message}`);

    // reject promise returned from async fn
    //! async fnä¸­ ç¶ç¼çerroræ éæ¯è¦æåæåºéåerror
    throw err;
  }
};

console.log('1: Will get location');
// async fnçreturnå¼æ°¸é ææ¯ä¸åpromiseç©ä»¶ æä»¥æåè¦æ¿å°æåæ³returnå¼çè©±å°±è¦ç¨.thenèç
whereAmI()
  .then(city => console.log(`2: ${city}`))
  .catch(err => console.error(`2: ${err.message}`))
  .finally(() => console.log('3: Finsihed getting location'));

// ä¸éä¸é¢éå¯«æ³éæ¯ä¸å¤ªå¥½ æ°èå¯«æ³æ··è
//!ä½è¦æ¹å¯«æå¨é½ç¨æ°å¯«æ³çè©±ææåé£é»æ¯awiatåªè½å¨ä½¿ç¨asyncééµå­çfnå§é¨ä¾ä½¿ç¨ æä»¥çºäºèçwhereAmIéfnå¾ä¸è½ç´æ¥æ¥ä¸await æåä½¿ç¨IIfE

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
    //* éå¯«æ³çä¼¼æ²åé¡ä½å¶å¯¦å¾ä¸åç éä¸åè³æä¸æè©²æ¯c1æå®åæc2åæc3 éä¸åå½¼æ­¤æ¯æ²ç½é£ç æè¦åææå
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
    //! Promsie.all() ä½¿ç¨ææ©çºç¶æå¤åéåæ­¥æä½ ä¸éäºéåæ­¥æä½äºç¸æ²éè¯ä¸éæåå¾é åºæå¯ä½¿ç¨ ä¸éè¦è¨ä½ä¸årejectçè©±å¨é½æè¢«reject
    // Promsie.all()çåæ¸çºarray ä¸æåå³ä¸åarray
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
4. Use a promise combinator function to actually get the images from the array ð
5. Add the 'parallel' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK ð
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
    //! è¨ä½async fnçåå³å¼å¿å®ææ¯promiseç©ä»¶, å¦ææåèªå·±å¯«returnå¼ï¼æ³è¦çreturnå¼ææ¯åpromiseçfulfillå¼è£¡
    const imgs = imgArr.map(img => createImage(img));
    console.log(imgs);
    //! Promise.allæ¥åå¤åéåæ­¥ä½æ¥­çpromise ä¸¦ä¸æåå³ä¸åarray åè¨­ææçpromiseé½æå éååå³çarrayå°±ææ¯ææææåpromiseçresolveå¼
    //! ééä¸å awaitå°±ä¸è¡äº å çºæåå¸ææ¯Promise.allå§çææéåæ­¥ä½æ¥­å®æå¾åå³ææresolveå¼å­å°dataè£¡ï¼æä»¥éè¦ç­å¾ã ä¸ç¶çè©±dataä¸ææ¯promiseçresolveå¼
    //! æ²await data = PromiseÂ {<pending>}  æawait data = [img, img, img]
    const data = await Promise.all(imgs);
    console.log(data);
    // parallel = å¹³è¡
    data.forEach(data => {
      console.log('123');
      data.classList.add('parallel');
    });
  } catch (err) {
    err.message;
  }
};

loadAll(imgArr);
