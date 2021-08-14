'use strict';

// prettier-ignore

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout {
  data = new Date();
  id = (Date.now() + '').slice(-10);
  clicks = 0;

  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
    Workout.arrOfWorkouts.push(this);
  }
  _setDescription() {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.data.getMonth()]
    } ${this.data.getDay()}`;
  }
  click() {
    this.clicks++;
  }
}
Workout.arrOfWorkouts = [];
class Running extends Workout {
  type = `running`;
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }
  calcPace() {
    this.pace = this.duration / this.distance;
  }
}
class Cycling extends Workout {
  type = `cycling`;
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    this.speed = this.distance / this.duration;
  }
}

class app {
  #map;
  #mapEvent;
  #workout = [];

  constructor() {
    this._getPosition();

    form.addEventListener('submit', this._newWorkout.bind(this));

    inputType.addEventListener('change', this._toggleElevationField);

    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
  }

  _getPosition() {
    if (navigator.geolocation)
      //!  Vary Important stuff here
      //!  Vary Important stuff here
      // * here we need to bind this._loadMap.bind(this) to make
      // * the .this point to our class not to the function it self
      // * the reason is navigator.geolocation.getCurrentPosition function will call
      // * this._loadMap not us its like add event listener
      //!  Vary Important stuff here
      //!  Vary Important stuff here
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert(`We couldn't get your location`);
        }
      );
  }
  _loadMap(pos) {
    const { latitude, longitude } = pos.coords;

    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, 13);

    /* 
        // * Google Maps API key
          L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
          }).addTo(map);
        */

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    //   * on is the equivalent of the click event

    this.#map.on('click', this._showForm.bind(this));
    this._getLocalStorage();
  }
  _showForm(mapE) {
    form.classList.remove('hidden');
    inputDistance.focus();
    this.#mapEvent = mapE;
  }
  _hideForm() {
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }
  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }
  _newWorkout(e) {
    const validInputs = (...inputs) => {
      return inputs.every(input => isFinite(input));
    };

    const allPositive = (...inputs) => {
      return inputs.every(input => input > 0);
    };

    e.preventDefault();

    //  * get the values from the form

    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    let workout;
    // * if the type is running

    const { lat, lng } = this.#mapEvent.latlng;

    if (type === 'running') {
      const cadence = +inputCadence.value;

      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      ) {
        return alert('Distance must be a number');
      }
      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // * if the type is cycling

    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      if (
        !allPositive(distance, duration) ||
        !validInputs(distance, duration, elevation)
      )
        return alert('Distance must be a number');
      // create a new workout
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    this.#workout.push(workout);
    this._renderWorkoutMarker(workout);
    this._renderWorkOut(workout);
    form.querySelectorAll('input').forEach(node => {
      node.value = '';
    });
  }
  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          autoClose: false,
          closeOnClick: false,
          maxWidth: 250,
          minWidth: 50,
          className: `${workout.constructor.name.toLowerCase()}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }
  _renderWorkOut(workout) {
    let commonWorkoutHtml = `<li class="workout workout--${
      workout.type
    }" data-id="${workout.id}">
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
    </div>`;
    if (workout.type === 'running') {
      commonWorkoutHtml += `<div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workout.pace.toFixed(1)}</span>
      <span class="workout__unit">min/km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">🦶🏼</span>
      <span class="workout__value">${workout.cadence}</span>
      <span class="workout__unit">spm</span>
    </div>
  </li>`;
    }
    if (workout.type === 'cycling') {
      commonWorkoutHtml += `<div class="workout__details">
    <span class="workout__icon">⚡️</span>
    <span class="workout__value">${workout.speed.toFixed(1)}</span>
    <span class="workout__unit">km/h</span>
      </div>
      <div class="workout__details">
    <span class="workout__icon">⛰</span>
    <span class="workout__value">${workout.elevationGain}</span>
    <span class="workout__unit">m</span>
  </div>
</li>`;
    }
    form.insertAdjacentHTML('afterend', commonWorkoutHtml);
    this._hideForm();
    this._setLocalStorage();
  }
  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');
    if (!workoutEl) return;
    const workout = this.#workout.find(
      work => work.id === workoutEl.dataset.id
    );
    this.#map.setView(workout.coords, 13, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
    // workout.click();
  }
  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workout));
  }
  _getLocalStorage() {
    const workout = JSON.parse(localStorage.getItem('workouts'));
    if (!workout) return;
    this.#workout = workout;
    this.#workout.forEach(work => {
      this._renderWorkOut(work);
      this._renderWorkoutMarker(work);
    });
  }
}

// * map + geolocation

new app();

/*
const nunTest = new Running([5, 5], 10, 10, 10);
console.log(nunTest.constructor.name);
// * test
const nunC = new Cycling([-5, 5], 5, 6, 1);
const nunC2 = new Cycling([-5, 5], 5, 6, 1);
const nunC3 = new Cycling([-5, 5], 5, 6, 1);
console.log(nunTest);
console.log(nunC);
console.log(nunC3);
console.log(Workout.arrOfWorkouts[0] instanceof Cycling);
console.log(Workout.arrOfWorkouts);
*/
