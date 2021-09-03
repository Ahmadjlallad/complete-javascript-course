let starWarsData = [
  {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    hair_color: "blond",
    skin_color: "fair",
    eye_color: "blue",
    birth_year: "19BBY",
    gender: "male",
  },
  {
    name: "C-3PO",
    height: "167",
    mass: "75",
    hair_color: "n/a",
    skin_color: "gold",
    eye_color: "yellow",
    birth_year: "112BBY",
    gender: "n/a",
  },
  {
    name: "R2-D2",
    height: "96",
    mass: "32",
    hair_color: "n/a",
    skin_color: "white, blue",
    eye_color: "red",
    birth_year: "33BBY",
    gender: "n/a",
  },
  {
    name: "Darth Vader",
    height: "202",
    mass: "136",
    hair_color: "none",
    skin_color: "white",
    eye_color: "yellow",
    birth_year: "41.9BBY",
    gender: "male",
  },
  {
    name: "Leia Organa",
    height: "150",
    mass: "49",
    hair_color: "brown",
    skin_color: "light",
    eye_color: "brown",
    birth_year: "19BBY",
    gender: "female",
  },
];

const returnNames = (arr) => {
  // Solution code here...
  return arr.reduce((acc, { name }) => {
    console.log(acc, name);
    return [...acc, name];
  }, []);
};

const reversedString = (str) => {
  // Solution code here...
  return [...str].reduce((acc, str, i, arr) => {
    console.log(acc, str);
    return [...acc, arr[arr.length - i - 1]].join("");
  }, "");
};

const characters = [
  {
    name: "Eddard",
    spouse: "Catelyn",
    children: ["Robb", "Sansa", "Arya", "Bran", "Rickon"],
    house: "Stark",
  },
  {
    name: "Jon",
    spouse: "Lysa",
    children: ["Robin"],
    house: "Arryn",
  },
  {
    name: "Cersei",
    spouse: "Robert",
    children: ["Joffrey", "Myrcella", "Tommen"],
    house: "Lannister",
  },
  {
    name: "Daenarys",
    spouse: "Khal Drogo",
    children: ["Drogon", "Rhaegal", "Viserion"],
    house: "Targaryen",
  },
  {
    name: "Mace",
    spouse: "Alerie",
    children: ["Margaery", "Loras"],
    house: "Tyrell",
  },
  {
    name: "Sansa",
    spouse: "Tyrion",
    house: "Stark",
  },
  {
    name: "Jon",
    spouse: null,
    house: "Snow",
  },
];

const countNumberOfChildren = (arr) => {
  // Solution code here...
  return arr.reduce((acc, { children }) => {
    return children?.length ? children.length + acc : acc;
  }, 0);
};
const calculateAverage = (arr) => {
  // Solution code here...
  const { count, sum } = arr.reduce(
    ({ count, sum }, num) => {
      console.log(count, sum);
      count = count + 1;
      sum = sum + num;
      return { count, sum };
    },
    { count: 0, sum: 0 }
  );
  return sum / count;
};
// console.log(calculateAverage([18, 290, 37, 4, 55, 16, 7, 85]));
const isPrime = (value) => {
  for (let i = 2; i < value; i++) {
    if (value % i === 0) {
      return false;
    }
  }
  return value > 1;
};

const countPrimeNumbers = (arr) => {
  // Solution code here...
  return arr.reduce((acc, num) => {
    return isPrime(num) ? acc + 1 : acc;
  }, 0);
};
// console.log(countPrimeNumbers([1, 2, 13, 64, 45, 56, 17, 8]));
// console.log(isPrime(6));
const snorlaxData = {
  stats: [
    {
      stat: {
        url: "https://pokeapi.co/api/v2/stat/5/",
        name: "special-defense",
      },
      effort: 2,
      baseStat: 110,
    },
    {
      stat: {
        url: "https://pokeapi.co/api/v2/stat/4/",
        name: "special-attack",
      },
      effort: 9,
      baseStat: 65,
    },
    {
      stat: {
        url: "https://pokeapi.co/api/v2/stat/6/",
        name: "speed",
      },
      effort: 5,
      baseStat: 30,
    },
  ],
  name: "snorlax",
  weight: 4600,
};

const extractStat = (statName, arr) => {
  // Solution code here...
  return arr.reduce((acc, AllStats) => {
    return (acc = (AllStats.stat.name === statName ? AllStats : null) || acc);
  }, {});
};
// console.log(extractStat("speed", snorlaxData.stats));

// .toStrictEqual({
//   stat: { url: "https://pokeapi.co/api/v2/stat/6/", name: "speed" },
//   effort: 5,
//   baseStat: 30,
// });
/*
const characters = [
  {
    name: "Eddard",
    spouse: "Catelyn",
    children: ["Robb", "Sansa", "Arya", "Bran", "Rickon"],
    house: "Stark",
  },
  {
    name: "Jon",
    spouse: "Lysa",
    children: ["Robin"],
    house: "Arryn",
  },
  {
    name: "Cersei",
    spouse: "Robert",
    children: ["Joffrey", "Myrcella", "Tommen"],
    house: "Lannister",
  },
  {
    name: "Daenarys",
    spouse: "Khal Drogo",
    children: ["Drogon", "Rhaegal", "Viserion"],
    house: "Targaryen",
  },
  {
    name: "Mace",
    spouse: "Alerie",
    children: ["Margaery", "Loras"],
    house: "Tyrell",
  },
  {
    name: "Sansa",
    spouse: "Tyrion",
    house: "Stark",
  },
  {
    name: "Jon",
    spouse: null,
    house: "Snow",
  },
];
*/
const extractChildren = (arr) => {
  // Solution code here...
  return arr
    .filter(({ name, children }) => children && name?.includes("a"))
    .reduce((acc, { children: childrenNames }, i) => {
      console.log(acc, childrenNames);
      console.log(i);
      return [acc, childrenNames].flat();
    }, []);
};
console.log(extractChildren(characters));
