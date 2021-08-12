'use strict';
//* 205. Constructor Functions and the new Operator
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};
const Bob = new Person('Bob', '1952');
/*
// 1. New {} is created when you use the new operator.
// 2. function is called, this key world will point to this {}
// 3. {} linked to prototype
// 4. function automatically returns {}
*/

const Ahmad = new Person('Ahmad', '1997');
/*
console.log(Bob);
console.log(Bob instanceof Person);
Ahmad.calcAge();
// * stipe # 3 will set up the prototype
console.log(Ahmad.__proto__);
Person.prototype.species = 'Human';
// ! but will not be in property of the object
// ! instead will be in the prototype
console.log(Ahmad.species);
console.dir('Person.prototype.constructor', Person.prototype.constructor);

// * 208. Prototypal Inheritance on Built-In Objects
// ! The prototype of top chian
console.log(Ahmad.__proto__.__proto__);
*/
// * 210. ES6 Classes
/*
//  ! just a syntactic sugar same as above constructor or prototype inductance

// ? class expression
const PersonCEX = class {};

// ? class declaration
*/
class PersonCD {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // ! every function will be a property of the class
  calcAge() {
    console.log(2037 - this.birthYear);
  }
  get agg() {
    return 2037 - this.birthYear;
  }
  // * when we need to set a property That already exists
  // * this way we can use the setter to set the property
  // * do it like this will change the original prototype name
  // * than we use get to reset the property
  // * this is an important concept
  set fullName(fullName) {
    if (fullName.includes(' ')) return (this._fullName = fullName);
    else return (this._fullName = prompt('plz enter your dull name'));
  }
  get fullName() {
    return this._fullName;
  }
}
/*
const jallad = new PersonCD('Ahmad Jallad', '1952');
// ! 1. class are not hoisted
// ! 2. class are first-class citizen
// ! 3. class are executed in strict mode

// * 211. Setters and Getters

const acc = {
  owner: 'Ahmad',
  mov: [200, 500, 3500],
  get latest() {
    return this.mov.slice(-1).pop();
  },
  set latest(move) {
    this.mov.push(move);
  },
};
console.log(acc.latest);
acc.latest = 1000;
console.log(acc.latest);
console.log('using get', jallad.agg);
console.log(jallad.fullName);
console.log(jallad.fullName);
*/
// * 212. Static Methods
// * like Array.from mean it should be used on the constructor
// * to add a static method to a class

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // ! every function will be a property of the class
  calcAge() {
    console.log(2037 - this.birthYear);
  }
  get agg() {
    return 2037 - this.birthYear;
  }
  // * when we need to set a property That already exists
  // * this way we can use the setter to set the property
  // * do it like this will change the original prototype name
  // * than we use get to reset the property
  // * this is an important concept
  set fullName(fullName) {
    if (fullName.includes(' ')) return (this._fullName = fullName);
    else return (this._fullName = prompt('plz enter your dull name'));
  }
  get fullName() {
    return this._fullName;
  }
  // to create a static method on class
  static hi() {
    console.log('Hi From Class');
  }
}
/*
Person.hi = function () {
  console.log('hi');
};
Person.hi();

// ! and its not inherited
PersonCl.hi();
*/

// * 213. Object.create

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
}; /*
const emad = Object.create(PersonProto);
emad.init('Emad', '1997');
emad.calcAge();
*/
// * 215. Inheritance Between "Classes": Constructor Functions
// *  using constructor function
const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

//  * linking the prototype

Student.prototype = Object.create(Person.prototype);

// * we do that to make the name of the constructor = name we want

Student.prototype.constructor = Student;

Student.prototype.introduce = function () {
  console.log(`My Name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', '1998', 'JavaScript');

/*
console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);
*/

// * mike.introduce();
// console.log(mike);
// * console.log(mike.__proto__.__proto__.__proto__);
// console.dir(Student.prototype.constructor);
// mike.calcAge();

// * 217. Inheritance Between "Classes": ES6 Classes

// * extends do the prototype inheritance

class StudentCl extends PersonCD {
  constructor(fullName, birthYear, course) {
    //** super() need to happen first
    super(fullName, birthYear); // * constructor function of the pearnt class
    this.course = course;
  }
  introduce() {
    console.log(`My Name is ${this.fullName} and I study ${this.course}`);
  }
  // * over riding the prototype
  calcAge() {
    console.log('Over ridded');
  }
}
const martha = new StudentCl('Martha Sead', 2005, 'JavaScript');

// * 218. Inheritance Between "Classes": Object.create

const StudentProto = Object.create(PersonProto);

StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};
StudentProto.introduce = function () {
  console.log(`My Name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', '2010', 'JavaScript');
/*
jay.introduce();
jay.calcAge();
console.log(jay);
*/

// * 219. Another Class Example +
// * + 220. Encapsulation: Protected Properties and Methods
/*
class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    // * we need to protect the property
    // * and till everyone will know the property is protected
    this._movements = [];

    this.local = navigator.language;
  }

  //  * this method are interactive with the object its also called API
  deposit(val) {
    this._movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }

  // * this is
  loneApprove() {
    return true;
  }

  reqLone(val) {
    if (this.loneApprove()) this.deposit(val);
  }

  getMov() {
    return this._movements;
  }

}
const acc1 = new Account('Jonas', 'EUR', 1111);
*/
// * we can update movements array using .push but its bad practice
// * add a method to the class is the best way

// * 221. Encapsulation: Private Class Fields and Methods
//  * Public Class Fields=propriety and Methods
//  * Private Class Fields=propriety and Methods
//  * and there are static methods

class Account {
  //  * 1.  Public Fields (instances)

  local = navigator.language;

  // * 2. Private Fields
  #movements = [];
  #pin;
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // * we need to protect the property
    // * and till everyone will know the property is protected
    // this.#movements = [];

    // this.local = navigator.language;
  }
  //  * 1.  Public Methods
  //  * this method are interactive with the object its also called API
  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  reqLone(val) {
    if (this.#loneApprove()) this.deposit(val);
    return this;
  }

  getMov() {
    return this.#movements;
  }
  // * propriety Methods
  #loneApprove() {
    return true;
  }
}
const acc1 = new Account('Jonas', 'EUR', 1111);
console.log(acc1.reqLone(100));
// * 222. Chaining Methods
// * to chain methods we have to return the this aka the object

console.log(acc1.deposit(100).withdraw(50).reqLone(10).reqLone(150).getMov());

class subAcc extends Account {
  constructor(owner, currency, pin, dadName) {
    super(owner, currency, pin);
    this.dadName = dadName;
  }
}
const ahmadSubAcc = new subAcc('Ahmad', 'JOD', 3201, 'Ibrahim');
console.log(ahmadSubAcc);
console.log(ahmadSubAcc.reqLone(100).withdraw(100).getMov());
