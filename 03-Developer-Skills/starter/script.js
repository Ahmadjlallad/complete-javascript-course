// Remember, we're gonna use strict mode in all scripts now!
"use strict";

function swimmer({ name }) {
  return {
    swim: () => console.log(`${name} swim`),
  };
}
function swimmingMonsterCreator(name) {
  const monster = { name: name };
  return {
    ...monster,
    ...swimmer(monster),
  };
}
const obj = swimmingMonsterCreator("Monster");
console.log(obj);
obj.swim();
