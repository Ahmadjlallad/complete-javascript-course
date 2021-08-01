/* 
Write a program that receives a list of variable names
 written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted 
into the DOM (see code below), and conversion 
will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
first_name
Some_Variable 
calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/
let counter = 0;
const fromUnderScourerToCamailCase = converted => {
  counter++;
  const indexOf = [0];
  let convertedArray = converted;

  while (convertedArray.includes('_')) {
    indexOf.push(convertedArray.indexOf('_'));
    convertedArray = convertedArray.replace('_', '');
  }

  let arrayOfWords = [];

  for (const [i, number] of indexOf.entries()) {
    let test = convertedArray.slice(
      number,
      indexOf[i + 1] !== undefined ? indexOf[i + 1] : convertedArray.length
    );
    if (i ?? 0)
      arrayOfWords.push(
        test.slice(0, 1).toUpperCase() +
          test.slice(1, test.length - 1) +
          test[test.length - 1].toLowerCase()
      );
    else
      arrayOfWords.push(
        test.slice(0, 1).toLowerCase() +
          test.slice(1, test.length - 1) +
          test[test.length - 1].toLowerCase()
      );
  }
  let finalResult = arrayOfWords.join('');
  let spaceBetweenResult = Math.floor((finalResult.length * 10) / 9) - 10;
  finalResult = finalResult.padEnd(
    finalResult.length + 11 - spaceBetweenResult,
    ' '
  );
  console.log(finalResult.padEnd(finalResult.length + counter, '✅'));
};

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));
const myBtn = document.querySelector('button');
myBtn.addEventListener('click', () => {
  const textArea = document.querySelector('textarea');
  const textAreaConstant = textArea.value;
  textArea.textContent = '';
  fromUnderScourerToCamailCase(textAreaConstant);
});
