'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// flat
const arr = [
  [`ahmad`, `moh`, `ayham`, `ibrahim`],
  [15, 56, 61],
  ['aa', 'b', 'd', 'd', 'a'],
  1,
  3,
  5,
];
// console.log(arr);
// one level deab by default 1 but we can change it
// console.log(arr.flat(2));
// map with flat
// console.log(
//   arr.flatMap((myName, i) => {
//     return [i, myName];
//   })
// );

// 100 Dice roles
// const dice100 = Array.from({ length: 100 }, () =>
//   Math.trunc(Math.trunc(Math.random() * (6 - 1 + 1) + 1))
// );
// console.log(dice100);
// console.log(dice100.reduce((acc, curr) => acc + curr, 0) / dice100.length);
// console.log(dice100.filter(one => one === 1).length);
// console.log(dice100.filter(two => two === 2).length);
// console.log(dice100.filter(three => three === 3).length);
// console.log(dice100.filter(four => four === 4).length);
// console.log(dice100.filter(five => five === 5).length);
// console.log(dice100.filter(six => six === 6).length);
// console.log(dice100.findIndex(six => six === 6));
/*
let accountss = {};
const sums = accounts
  .flatMap(move => move.movements)
  .reduce((acc, curr, i) => {
    if (curr > 0) {
      console.log(curr);
      if (accountss?.deposit) {
        accountss.deposit += curr;
      } else {
        accountss.deposit = curr;
      }
      console.log(accountss.deposit);
    } else {
      if (accountss?.width) {
        accountss.width += curr;
      } else {
        accountss.width = curr;
      }
    }
  }, 0);
console.log(accountss);

const { dep: dep = 0, width: width = 0 } = accounts
  .flatMap(move => move.movements)
  .reduce(
    (acc, curr) => {
      // curr > 0 ? (acc.dep += curr) : (acc.width += curr);
      acc[curr > 0 ? 'dep' : 'width'] += curr;
      return acc;
    },
    { dep: 0, width: 0 }
  );
console.log(dep, width);
*/
