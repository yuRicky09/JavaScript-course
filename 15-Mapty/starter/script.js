'use strict';
/*
物件的解構賦值

const o = {p: 42, q: true};
const {p, q} = o;

console.log(p); // 42
console.log(q); // true

navigator.geolocation是瀏覽器提供的API 可以使用getCurrentPosition method
getCurrentPosition((參數1:當成功獲得位置後要執行的callback fn), (參數2:當位置獲取失敗後要執行的callback fn) )
*/

// 變數scope問題 所以我們先讓這兩個變數變成全域變數供取用 先不賦值
// let map, mapEvent;

class Workout {
  date = new Date();
  // 通常id都會是靠第三方libary產生 這邊為了方便自己寫
  id = (Date.now() + '').slice(-10);
  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance; // in km
    this.duration = duration; // in min
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    // 字串也能用索引取
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(0)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calaPace();
    //! 寫在這邊是因為子層的obj才有type屬性，而子層又能使用寫在父層prototype上的方法 所以我們可以呼叫此方法 即使我們沒寫方法在這
    this._setDescription();
  }

  calaPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    //km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

const run1 = new Running([25, 121], 150, 200, 100);
console.log(run1);

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
class App {
  // 將map mapEvent設為這個實體的私有屬性
  #map;
  #mapEvent;
  #workout = [];
  constructor() {
    this._getPosition();
    //! 注意 監聽事件時this會指向成被綁定監聽的DOM元素 所以這時的this會變成form,但我們希望_newWorkout這個fn的this一樣指向這個new出來的obj 所以我們一樣用bind
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
  }

  _getPosition() {
    if (navigator.geolocation) {
      //! 這邊這個callback fn (this._loadMap)是當user提供位置成功後正常呼叫(所謂正常呼叫就是像callfn()這樣直接執行fn 所以這時候這個fn內的this關鍵字會是undefined )
      //! 這時候bind就很好用了 直接bind(this === 現在這個new出來的obj), 順帶一提bind的回傳值會是一個this被重新設定的fn
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position!');
        }
      );
    }
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];

    //  L = leaflet的namespace 命名空間：規範程式的範圍，使同名的變數或名稱不會互相干擾  將變數都宣告在命名空間裡避免命名衝突; 使用這裡面的變數或函式需加前綴
    this.#map = L.map('map').setView(coords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);
    //! 同上 監聽對象this指向問題
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }
  _toggleElevationField() {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();
    // ...inputs 這樣會讓接受的多個參數變成陣列
    const validInputs = (...inputs) =>
      inputs.every(input => Number.isFinite(input));
    const allPositive = (...inputs) => inputs.every(input => input > 0);
    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;
    // If workout running, create running obj
    if (type === 'running') {
      const cadence = +inputCadence.value;

      // check i data is valid
      if (
        //* */ !Number.isFinite(distance) ||
        //* */ !Number.isFinite(duration) ||
        //* */ !Number.isFinite(cadence)
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      ) {
        return alert('Inputs have to be positive numbers');
      }

      workout = new Running([lat, lng], distance, duration, cadence);
    }
    // If workout cycling, create cycling obj
    if (type === 'cycling') {
      const elevation = +inputElevation.value;

      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      ) {
        return alert('Inputs have to be positive numbers');
      }

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }
    // Add new workout to workout Array
    this.#workout.push(workout);
    console.log(this.#workout);
    // Render workout on map as marker
    this._renderWorkoutMarker(workout);
    // Render workout on list
    this._renderWorkout(workout);
    // hide form + clear input fields
    this._hideForm();
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout}">
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${
            workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
          }</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>
        `;

    if (workout.type === 'running') {
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.pace.toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${workout.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>
        `;
    }

    if (workout.type === 'cycling') {
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speed.toFixed(1)}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout.elevationGain}</span>
          <span class="workout__unit">m</span>
        </div>
      </li>
      `;
    }
    form.insertAdjacentHTML('afterend', html);
  }
}

const app = new App();
// 下面這樣寫也沒錯 建完app obj後就執行，不過我們想要讓這個方法在我們new出物件後就同時執行的話 那我們可以直接寫進constructor就好 這樣物件一new出來的時候就會同時執行
//app._getPosition();
