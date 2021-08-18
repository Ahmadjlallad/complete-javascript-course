// *  268. Exporting and Importing in ES6 Modules
import rand from './shoppingCart.js';
import { addToCart as cart } from './shoppingCart.js';
// import * as All from './shoppingCart.js';
// * and all variables are live connection or not copied to the new module
/* 
* all using ` * ` 
console.log(All);
All.addToCart('brad', 5);
console.log(All.shippingCost);
console.log(All.cart);
cart('brad', 5);
console.log(rand(5));
*/
cart('a', 5);
// * 269. The Module Pattern

// * creat a new scope
// * IIFE and save that to a variable
const ShoppingCart2 = (() => {
  const cart = [];
  const shippingCart = 10;
  const totPrice = 237;
  const totQuantity = 23;

  const addToCart = (name, quantity) => {
    cart.push({ name, quantity });
    console.log(name, quantity);
  };

  const orderStock = (name, quantity) =>
    console.log(`${name} ${quantity} order from suppler`);
  return {
    addToCart,
    shippingCart,
    totPrice,
    totQuantity,
  };
})();

/* practice
// * The Module Pattern
ShoppingCart2.addToCart('PC', 1);
console.log(ShoppingCart2.totPrice);
console.dir(ShoppingCart2);
*/

// * 270. CommonJS Modules
//  ! the main resown to learn common Js is when npm and node implement modules
//  ! the ES6 wasn't released yet and all npm packages are written in common js

// * export.addToCart = function .......
// * const {addToCart}= require('./shoppingCart.js');
// CommonJS Modules syntax
import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
// import cloneDeep from 'lodash';
const state = {
  cart: [
    {
      product: 'bread',
      quantity: 2,
    },
    {
      product: 'pizza',
      quantity: 2,
    },
  ],
  user: { loggedIn: true },
};

// * not deep clone
const stateClone = Object.assign({}, state);
// * deep clone
const stateClone2 = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateClone);
console.log(stateClone2);
/*
const ahmad = 5 & 3;
console.log(ahmad);
console.log(0b0101 & 0b0011);
console.log(1001 & 0xff);
*/
// 3 decimal to binary 1 0

// using parcel
if (module.hot) module.hot.accept();
console.log(state.cart.find(el => el.product === 'bread'));
import 'core-js/stable';
import 'regenerator-runtime/runtime';
const newTimer = time => {
  return new Promise((resolved, rejected) => {
    if (time > 5) throw rejected(new Error('to match time'));
    else {
      return setTimeout(() => {
        console.log('new timer');
        resolved();
      }, time * 1000);
    }
  });
};
// newTimer(1)
//   .then(() => console.log('hi'))
//   .catch(err => console.log(err));
// newTimer(6)
//   .then(() => console.log('hi'))
//   .catch(err => console.error(err));
// console.log(void 0 == '0');
// void (function iife() {
//   console.log('Executed!');
// })();
