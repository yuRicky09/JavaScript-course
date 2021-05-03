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
  // countriesContainer.style.opacity = 1;
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
      // 這邊要注意.json這個method也會回傳一個promise物件 所以我們要在用.then()去接如果resolve的值
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

btn.addEventListener('click', function () {
  getCountryData('usa');
});
