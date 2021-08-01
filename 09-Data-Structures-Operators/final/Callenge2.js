// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/
let scorers = {};
const gameChallenge = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
  scorers,
};

// 1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
console.log(` -------------1------------`);
for (const [i, iterator] of gameChallenge.scored.entries()) {
  console.log(`Goal ${i + 1}: ${iterator}`);
}
console.log(` -------------2------------`);
// 2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
let odds = 0;
const oddsValueArray = Object.values(gameChallenge.odds);
for (const [i, iterator] of oddsValueArray.entries()) {
  odds += iterator;
  if (i === oddsValueArray.length - 1)
    console.log(`Odd of victory : ${odds / oddsValueArray.length}`);
}
console.log(` -------------3------------`);
// 3. Print the 3 odds to the console,
// but in a nice formatted way, exactly like this:
// Odd of victory Bayern Munich: 1.33
// Odd of draw: 3.25
// Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly
// from the game object, don't hardcode them (except for "draw"). HINT: N
// ote how the odds and the game objects have the same property names 😉
const teams = [gameChallenge.team1, gameChallenge.team2];
for (let i = 0; i < teams.length; i++) {
  console.log(`Team: ${teams[i]}`);
  for (const iterator of Object.entries(gameChallenge.odds)) {
    if (iterator[0] === 'x')
      console.log(`Odd of draw ${teams[i]}: ${iterator[1]}`);
    else
      console.log(
        `Odd of ${iterator[0] === `team1` ? 'victory' : 'lose'} ${teams[i]}: ${
          iterator[1]
        }`
      );
  }
}
/*
BONUS: Create an object called 'scorers' which contains the names of the players who scored as 
properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

for (const iterator of gameChallenge.scored) {
  if (iterator === `Lewandowski`) scorers[iterator] = 2;
  else scorers[iterator] = 1;
}
console.log(scorers);
console.log(gameChallenge);
