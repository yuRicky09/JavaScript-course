'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
/*
物件的解構賦值

const o = {p: 42, q: true};
const {p, q} = o;

console.log(p); // 42
console.log(q); // true

navigator.geolocation是瀏覽器提供的API 可以使用getCurrentPosition method
getCurrentPosition((參數1:當成功獲得位置後要執行的callback fn), (參數2:當位置獲取失敗後要執行的callback fn) )
*/
let map, mapEvent;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;

      const coords = [latitude, longitude];
      console.log(latitude, longitude);
      console.log(
        `https://www.google.com.tw/maps/@${latitude},${longitude},13z/data=!4m2!7m1!2e1?hl=zh-TW`
      );
      // 這邊這個L是一個namespace leaflet幫我在這個namespace裡提供了很多method
      // 透過L這個namespace的map method產出一個map插入在dom id為map的地方
      map = L.map('map').setView(coords, 13);

      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      map.on('click', function (mapE) {
        mapEvent = mapE;
        form.classList.remove('hidden');
        // .focus會讓游標直接聚焦到那個元素上
        inputDistance.focus();
      });

      // L.marker([lat, lng]).addTo(map).bindPopup('Work Out!').openPopup();
    },
    function () {
      alert('Could not get your position');
    }
  );
}

//  submit form 提交表單後的事件
form.addEventListener('submit', function (e) {
  e.preventDefault();

  //clear input fields
  inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value =
    '';

  //display marker
  console.log(mapEvent);
  // 這邊的scope裡雖然沒有定義mapEvent,但可以在全域變數找到，並且我們在上面的.on監聽事件裡有把這個全域變數賦值 所以這邊的mapEvent能吃到那個值
  const { lat, lng } = mapEvent.latlng;
  console.log(lat, lng);
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    .setPopupContent('Work Out!!')
    .openPopup();
});

inputType.addEventListener('change'),
  function () {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  };
