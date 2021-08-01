/*
// Destructuring Arrays
const arrayToDistract = [1, 2, 3, 4, 5, 6, 7, 8, [9, 10]];
let [b, a, c, d, e, f, g, h, [i, j]] = arrayToDistract;
console.log(a, b, c, d, e, f, g, h, i, j);
[a, b, c, d] = arrayToDistract;
console.log(a, b, c, d);
console.log(a, b, c, d, e, f, g, h, i, j);
// we can assign default values to the destructuring
[a, b, c = 10, d = 20] = [5, 4];
console.log(a, b, c, d);
// handy way to do it just by using destructuring
*/

/*
// Destructuring Objects
*/
const person = {
  userName: 'Ahmad Jallad',
  age: 24,
  hobby: ['video Games', 'reading', 'programing'],
  study: 'B.S in Power Electric',
  Pc: {
    casa: 'zigMaTech',
    Gpu: 'Rx580 Form Amd',
    cpu: 'Ryzen 5 3400g',
    ram: '16GB',
    external: {
      mouse: 'Razer Viper Wireless',
      kyeBoard: 'Logitech G400',
      headSets: 'Logitech G400',
    },
    games: {
      LOL: 'League of Legends',
      CS: 'Counter-Strike',
      Apex: 'Apex Legends',
      PUBG: 'PUBG',
      FortNite: 'Fortnite',
    },
    programs: {
      browser: 'Chrome',
      editor: 'Sublime',
      IDE: 'Visual Studio Code',
      terminal: 'Cmder',
    },
  },

  // function in side object and destructuring in the function argument
  thisIsMyPc: function ({ userName, age, Pc }) {
    console.log(
      `This is ${userName},My age ${age},My lovely PC ${JSON.stringify(Pc)}`
    );
  },
  myParts: function ({
    myCpu = `Intel Dual core`,
    myRam = `8GB`,
    myHdd = `500GB`,
    myGpu = `internal`,
  }) {
    console.log(myCpu);
    console.log(
      `My parts are cpu: ${myCpu}, ram: ${myRam}, hdd: ${myHdd}, gpu: ${myGpu}`
    );
  },
  spreadOperatorExample: function (argument1, argument2, argument3) {
    console.log(
      `This is an example about Spread Operator using ${argument1}, ${argument2} And ${argument3}`
    );
  },
}; /*
// Normal way
const { userName, age, hobby, study, Pc } = person;
console.log(userName, age, hobby, study, Pc);
// add Names different from original names
const { userName: user, age: userAge, hobby: userHobby } = person;
console.log('Names different', user, userAge, userHobby);
// Destructuring with default values
const { lastName = '', Pc: pcSpecs = {} } = person;
console.log('default value', lastName, pcSpecs);
// here we Don't have lastName property so
// we give lastName default value and in cases
// mutable vars
let mutableA = 11,
  mutableB = 12,
  mutableC = 13;
const opj = { mutableA: 1, mutableB: 3, mutableC: 15 };
({ mutableA, mutableB, mutableC } = opj);
console.log('mutable vars', mutableA, mutableB, mutableC);
// wrap it with ({}=objects) not {}=objects this way we don't get error
// nested objects
const {
  Pc: {
    external: { mouse: userMouse, headSets: userHeadSets },
  },
} = person;
console.log('Nested Destructuring', userMouse, userHeadSets);
// so the trick is to to track the objects from the start Pc => external => mouse
// I can't say person => mouse because it's not a property of person
// function in side object and destructuring in the function argument
person.thisIsMyPc({
  userName: 'Emad Abbas',
  age: 25,
  Pc: { cpu: 'Ryzen 5 3400g', ram: '16GB', casa: 'zigMaTech' },
});
JSON.stringify;
person.myParts({
  myCpu: 'Ryzen 5 3400g',
});
// destructuring objects End
*/

/*

// The Spread Operator (...)
const jallad = ['Ahmad', 'Ibrahim', 'Mohammad', 'Ayham', 'Roaa'];
const newJallad = [...jallad, 'Ammar', 'Zaher'];
// jallad = [...jallad, 'Ammar', 'Zaher'];
console.log(newJallad);
console.log(jallad);
// ... is used to spread an array unpack it and into the function arguments
const newHobby = ['online Shopping', 'video Shout', ...person.hobby];
console.log(newHobby);
// Spread Operator (...) and thing with ',' aka 'commas'
// Iterables arrays, strings, Maps, Sets, Not objects
// error
// console.log(`${...jallad}`);
//  => this is not a place that expect multiple
// operates spread  with ","
// usually we use it with built arrays and pass arguments to the function
person.spreadOperatorExample(...newJallad);
const newPerson = { maker: 'spread Operator', ...person, Nois: 69 };
newPerson.userName = ' spread Operator';
newPerson.hobby = newHobby;
console.log(`This is a newPerson Object $ :`, newPerson);
console.log(`This is a person Object $ :`, person);
// End of the Spread Operator (...)
*/

// Rest Pattern and Parameters
// same as Spread Operator (...) but it's opused a spread operator
/*
const jallad = ['Ahmad', 'Ibrahim', 'Mohammad', 'Ayham', 'Roaa'];
const newJallad = [...jallad, 'Ammar', 'Zaher', ...['Ashraf', 'Amin']];
// Rest Pattern اسحب الي بضل
const [first, second, third, ...rest] = newJallad;
console.log(first, second, third, rest);
// its take all the items in the array that the items didn't get
// destructuring from the array
const [F, , , , Fiv, ...rests] = newJallad;
console.log(F, Fiv, rests);
// it doesn't include the skipped items
const { games, ...others } = person.Pc;
console.log(games, others);
// Don't forget ... return array always
function add(...params) {
  console.log(...params);
  console.log(params.reduce((a, b) => a + b, 0));
}
add(1, 2, 3, 4, 5);
add([1, 2, 3, 4, 5]);
*/
// shout circuit is 3 || "ahmad" if the first is true than return the first

/*

// else return the second
console.log(3 || 'ahmad');
console.log('' || 'ahmad');
console.log(true || 'ahmad');
console.log(undefined || null);
// return truthy value
// && returns the last truthy value but if all values are truthy then return the last
//  but if one of the values are falsey then return the first falsey value
console.log(true && 'ahmad' && null && 'ahmad');
*/

// The Nullish Coalescing Operator (??) ES 2020

// almost the same as || but it's used to check if the value is null or undefined

// nullish just null and undefined
/*
const nullish = null ?? 'ahmad';
console.log(nullish);
*/
/*
// for of loop
const jallad = ['Ahmad', 'Ibrahim', 'Mohammad', 'Ayham', 'Roaa'];
const newJallad = [...jallad, 'Ammar', 'Zaher'];

for (const [i, name] of newJallad.entries()) {
  console.log(`My Name is ${name} and I am number ${i} in the Array`);
}

// .entries() just make a array of [index, value]
console.log(...newJallad.entries());
// to get the index for the item you can use .entries() that use destructuring [i, name]
*/

// Optional Chaining (?.)

/*
const emptyArray = [];
if (person.Pc?.cpu) person.Pc.cpu = '20';
console.log(person.Pc?.cpu ?? 'ahmad');
console.log(emptyArray?.[0] ?? 'ahmad');
// it like if return false if it undefined or null immediately
// we can check if it's not undefined or null by using ?.
*/

// Looping Objects: Object Keys, Values, and Entries

/*
console.log(Object.keys(person.Pc));
for (key of Object.keys(person.Pc)) {
  console.log(key);
}
console.log(`---------value----------`);
console.log(Object.values(person.Pc));
for (key of Object.values(person.Pc)) {
  console.log(key);
}

console.log(`---------entries----------`);
console.log(Object.entries(person.Pc));
for (const [partsName, game] of Object.entries(person.Pc)) {
  if (typeof game === 'object')
    for (const a of Object.entries(game))
      console.table(
        `This is the key : ${partsName}, This is The second Object key : ${a[0]}, This is the value : ${a[1]}`
      );
  else
    console.table(
      `This is the key : ${partsName}, This is the value : ${game}`
    );
}
*/
/*

    Study sets from the sets section in script.js

*/
// replace All is a function that replace all the values in the array
/*
const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';

console.log(announcement.replace('door', 'gate'));
console.log(announcement.replaceAll('door', 'gate'));
console.log(announcement.replace(/door/g, 'gate'));
const testArabic = 'بسم الله الرحمن الرحيم';
console.log(testArabic.toLowerCase());
console.log(testArabic.toUpperCase());
console.log('JONAS Schmedtmann'.toLowerCase().split(' '));
// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);
console.log(normalizedEmail.includes('hello'));
function test(params) {
  console.log(params);
  params.forEach(([key, value]) =>
    console.log(
      `this is the ${key} `,
      typeof value === 'function'
        ? `this is a ${typeof value}`
        : [typeof value, value]
    )
  );
}
test(Object.entries(person));
// Name Capitalizer
function capitalize(string) {
  const newNamesArray = string.split(' ');
  const pushNames = [];
  console.log(string.split(' '));
  for (const [i, names] of newNamesArray.entries()) {
    // newNamesArray[i] = names[0].toUpperCase() + names.slice(1);
    // pushNames.push(newNamesArray[i].replace(names[0], names[0].toUpperCase()));
    newNamesArray[i] = newNamesArray[i].replace(
      names[0],
      names[0].toUpperCase()
    );
  }
  // return pushNames.join(' - ');
  return newNamesArray.join(' - ');
}
console.log(capitalize('ahmad ibrahim jallad'));
console.log(capitalize('emad fowas'));
//
const maskNumbers = numbers => {
  const str = numbers + '';
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};
console.log(maskNumbers(65423423423498489));
*/
