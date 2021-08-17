'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// * 244. Our First AJAX Call: XMLHttpRequest

// * old school one

const request = new XMLHttpRequest();

// * cors
// request.open('GET', 'https://restcountries.eu/rest/v2/all');
// * Api end === HTTP
const renderCountries = function (data, neighborClass = '') {
  const html = `
    <article class="country ${neighborClass}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${Math.round(
        +data.population / 1000000
      )}M</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
    </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};
// * my Experiments . . .
const chianContras = function (country) {
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      renderCountries(data[0]);

      const neighborsData = data[0].borders;
      //  * after experimenting with chian process if i want to handle
      //  * multiple promises at the same time i have to do in this way
      neighborsData.forEach(data => {
        fetch(`https://restcountries.eu/rest/v2/alpha/${data}`)
          .then(t => t.json())
          .then(neighborData => renderCountries(neighborData, 'neighbour'));
      });
      return data[0];
    });
};

// * ajax call country 1
const getCountryAndNeighborData = function (requestCountrySpecific) {
  const requestSpecific = new XMLHttpRequest();
  requestSpecific.open(
    'GET',
    `https://restcountries.eu/rest/v2/name/${requestCountrySpecific}`
  );
  requestSpecific.send();
  // * 246. Welcome to Callback Hell
  requestSpecific.addEventListener('load', function (e) {
    const [data] = JSON.parse(this.responseText);
    renderCountries(data);
    // * get neighbor data

    const neighbors = data.borders;
    if (!neighbors) return;
    neighbors.forEach(neighbor => {
      const neighborRequest = new XMLHttpRequest();
      neighborRequest.open(
        'GET',
        `https://restcountries.eu/rest/v2/alpha/${neighbor}`
      );
      neighborRequest.send();
      // * 246. Welcome to Callback Hell
      neighborRequest.addEventListener('load', function (e) {
        const neighborData = JSON.parse(this.responseText);
        renderCountries(neighborData, 'neighbour');
      });
    });
  });
};

// * 246. Welcome to Callback Hell

// getCountryAndNeighborData('jordan');
// getCountryAndNeighborData('qatar');
// getCountryAndNeighborData('usa');
// getCountryAndNeighborData('Turkey');
// getCountryAndNeighborData('china');
// getCountryAndNeighborData('japan');

// * 247. Promises and the Fetch API
// * 248. Consuming Promises
// * than will handle the fullfil promise with call back function
// * the only rejected promise will be lose connection
// * first way in pass a second argument to .then call back
// * second way is to add .catch at the end of the promise chain

// * 251. Throwing Errors Manually

// ! to do that we use ok promise/property
// ! throw new Error immediately rejected promise than go to catch method
const renderError = function (error) {
  countriesContainer.insertAdjacentText('beforeend', error);
};
const getJson = function (url, errorMes = 'Something went wrong 😥') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMes} ${response.status}.`);
    return response.json();
  });
};
const getContrData = function (params) {
  getJson(
    `https://restcountries.eu/rest/v2/name/${params}`,
    `country Not found`
  )
    .then(data => {
      renderCountries(data[0]);
      const neighborsData = data[0].borders[0];
      //   const neighborsData = `data[0].borders[0]`;
      if (!neighborsData) throw new Error('No neighbor found');
      return getJson(
        `https://restcountries.eu/rest/v2/alpha/${neighborsData}`,
        `country Not found`
      );
    })
    .then(neighborData => {
      renderCountries(neighborData, 'neighbour');
    })
    .catch(error => renderError(`Something went wrong 😥 ${error.message}.`))
    .finally((countriesContainer.style.opacity = '1'));
};

// const usa = getContrData('usa');

// * 250. Handling Rejected Promises when the user lose the connection
// getContrData('australia');
// btn.addEventListener('click', getContrData.bind(null, 'jordan'));

// * 255. Building a Simple Promise
//  * using a Promise Constructor
//  * it take one arguments one executer function as sone as a Promise run this function will run
//   * this executer function takes in 2 arguments one of resolved and the other of rejected
/*
const lotteryPromise = new Promise(function (resolve, reject) {
  if (Math.random() > 0.5) resolve('You WIN Congrats 🤠');
  // * calling resolve function will marked the promise as resolved
  else reject('You LOSE 😭'); // * calling reject function will marked the promise as rejected
});
lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));
*/
// * in this case its not asynchronous yet so we need to add a simple timer
/*
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery Draw !!!');
  setTimeout(function () {
    if (Math.random() > 0.5) resolve('You WIN Congrats 🤠');
    // * calling resolve function will marked the promise as resolved
    else reject(new Error('You LOSE 😭')); // * calling reject function will marked the promise as rejected
  }, 2000);
});
// lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));
*/
/*
// * Promisifing setTimeOut 
const wait = function (time) {
  return new Promise(function (resolve, _) {
    setTimeout(() => resolve(`${time} sec`), time * 1000);
    return time;
  });
};
let countTime = 0;
wait(1)
  .then(time => {
    countTime += Number.parseInt(time);
    console.log(`I am done after ${countTime} seconds`);
    return wait(1);
  })
  .then(time => {
    countTime += Number.parseInt(time);
    console.log(`I am done after ${countTime} seconds`);
    return wait(1);
  })
  .then(time => {
    countTime += Number.parseInt(time);
    console.log(`I am done after ${countTime} seconds`);
    return wait(1);
  })
  .then(time => {
    countTime += Number.parseInt(time);
    console.log(`I am done after ${countTime} seconds`);
    return wait(1);
  })
  .then(time => {
    countTime += Number.parseInt(time);
    console.log(`I am done after ${countTime} seconds`);
    return wait(1);
  })
  .then(time => {
    countTime += Number.parseInt(time);
    console.log(`I am done after ${countTime} seconds`);
    return wait(1);
  })
  .then(time => {
    countTime += Number.parseInt(time);
    console.log(`I am done after ${countTime} seconds`);
    return wait(1);
  });
*/
// *  256. Promisifing the Geolocation API
/*
navigator.geolocation.getCurrentPosition(
  pos => console.log(pos),
  err => console.log(`Please alow location to see your position scum bag`)
);

const getGeoData = function (params) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve(pos), reject(err));
  });

  // * same as above *
  // return new Promise((resolve, reject) => {
  //   navigator.geolocation.getCurrentPosition(
  //     pos => resolve(pos),
  //     err => reject(err)
  //   );
  // });
};
// getGeoData.then(pos => console.log(pos)).catch(err => console.log(err));
*/
// * 258. Consuming Promises with Async/Await

// * in this way we convert it to asynchronous function

// * Async/Await is syntactics sugar for Promise
const geoLoc = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      pos => resolve(pos),
      rej => reject(rej)
    );
  });
};
const whereAmI = async function () {
  try {
    const geoData = await geoLoc();
    const { latitude: lat, longitude: lang } = geoData.coords;

    const reversCoords = await fetch(
      `https://geocode.xyz/${lat},${lang}?geoit=json`
    );
    if (!reversCoords.ok) throw new Error(`wite BOY ${reversCoords.status}`);
    const jsonedReversCoords = await reversCoords.json();

    // ! inside async function we can use one or more await statement
    const res = await fetch(
      `https://restcountries.eu/rest/v2/name/${jsonedReversCoords.country}`
    );
    if (!res.ok)
      throw new Error(`Problem with getting the country ${res.status}`);
    const [jsonedRes] = await res.json();
    renderCountries(jsonedRes);
    countriesContainer.style.opacity = '1';
    // *  260. Returning Values from Async Functions
    return `you are in ${jsonedRes.capital}, ${jsonedRes.nativeName}`;
  } catch (err) {
    console.log(err);
    renderError(err);
    countriesContainer.style.opacity = '1';
    throw err;

    // * catch method has the access to what ever error happened in the try block or then in that case
  }
};
/*
//  * ifif instead of .then
console.log(`1: Will get your Location`);
(async function () {
  try {
    const myLocation = await whereAmI();
    console.log(`2: ${myLocation}`);
  } catch (err) {
    console.log(`2: ${err}`);
  }
  console.log(`3: Finished getting your Location`);
})();
*/
// * 262. Other Promise Combinators: race, allSettled and any + .all
const get3Country = async function (c1, c2, c3) {
  try {
    /*
   const [data1] = await getJson(`https://restcountries.eu/rest/v2/name/${c1}`)
   const [data2] = await getJson(`https://restcountries.eu/rest/v2/name/${c2}`)
   const [data3] = await getJson(`https://restcountries.eu/rest/v2/name/${c3}`)
   */
    // ** multiple promises in same time when the results of the second one don't depend on the first one
    const data = await Promise.all([
      getJson(`https://restcountries.eu/rest/v2/name/${c1}`),
      getJson(`https://restcountries.eu/rest/v2/name/${c2}`),
      getJson(`https://restcountries.eu/rest/v2/name/${c3}`),
    ]);
    data.flat(2).forEach(d => renderCountries(d));
    countriesContainer.style.opacity = '1';
  } catch (err) {
    console.error(err);
  }
};
get3Country('jordan', 'syria', 'egypt');
// * race first one fulfilled win the race
(async () => {
  const [res] = await Promise.race([
    getJson(`https://restcountries.eu/rest/v2/name/jordan`),
    getJson(`https://restcountries.eu/rest/v2/name/syria`),
    getJson(`https://restcountries.eu/rest/v2/name/egypt`),
  ]);
})();
// * usefully to stop the promise if took so long
const timeOut = function (sec) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error('timeout')), sec * 1000);
  });
};
Promise.race([
  getJson(`https://restcountries.eu/rest/v2/name/jordan`),
  timeOut(0.11),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// * Promise.allSettled
// *  return an array all promise that settled Promise.all short circuited of one promise reject but all settle never stop
Promise.allSettled([
  Promise.reject(3),
  Promise.resolve(1),
  Promise.resolve(2),
]).then(res => console.log(res));

// * Promise.any

//  * return the first settled Promise not rejected race rtarn

Promise.any([Promise.reject(3), Promise.resolve(1), Promise.resolve(2)]).then(
  res => console.log(res)
);
Promise.race([Promise.reject(3), Promise.resolve(1), Promise.resolve(2)]).then(
  res => console.log(res)
);
