const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

// * Object.freeze prevent the modification of the object but not deep freeze

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});
const getLimit = user => spendingLimits?.[user] ?? 0;

const addExpense = function (
  state,
  spendingLimits,
  value,
  description,
  user = 'jonas'
) {
  const cleanUser = user.toLowerCase();
  // * let limits = spendingLimits[user] ? spendingLimits[user] : 0;
  return value <= spendingLimits?.[cleanUser]
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};

const newBudget = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(
  newBudget,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');

const checkExpenses = function (state, limits) {
  return state.map(entry => {
    return entry.value < -limits[entry.user]
      ? { ...entry, flag: 'limit' }
      : entry;
  });
};
console.log(checkExpenses(newBudget2, spendingLimits));

const logBigExpenses = function (state, limit) {
  const bigExpenses = state
    .filter(entry => {
      return entry.value <= -limit;
    })
    .map(entry => `${entry.description.slice(-2)}`)
    .join(' / ');
  console.log(bigExpenses);
};
logBigExpenses(budget, 1000);
