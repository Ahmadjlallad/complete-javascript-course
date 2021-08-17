'use strict';
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, 
so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. 
This function returns a promise which creates a new image 
(use document.createElement('img')) and sets the .src attribute to the 
provided 
image path. When the image is done loading, append it to the DOM element 
with 
the 'images' class, and resolve the promise. The fulfilled value should be 
the 
image element itself. In case there is an error loading the image 
('error' event), 
reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Consume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds 
using the wait function we created earlier;
4. After the 2 seconds have passed, 
hide the current image 
(set display to 'none'), and load a second image 
(HINT: Use the image element returned by the createImage promise 
to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded,
 pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/
/*

let currImg;
const creatImage = function (imgUrl) {
  return fetch(imgUrl).then(imgResponse => {
    return new Promise((resolve, reject) => {
      currImg = document.createElement('img');
      currImg.src = imgUrl;
      if (imgResponse.status === 200) {
        currImg.addEventListener('load', () => {
          document.querySelector('.images').appendChild(currImg);
          return resolve(currImg);
        });
      } else
        throw reject(
          new Error(
            `image ${imgResponse.statusText} Code: ${imgResponse.status}`
          )
        );
    });
  });
};
const wite2 = witeTime => {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      return resolve((currImg.style.display = 'none'));
    }, witeTime * 1000);
  });
};
let ran = [];

const random = (min, max) => {
  const ranN = () => Math.floor(Math.random() * (max - min + 1)) + min;
  if (ran.includes(ranN())) return `f`;
  else return ranN();
};

creatImage(`/16-Asynchronous/starter/img/img-1.jpg`)
  .then(() => {
    return wite2(2);
  })
  .then(() => {
    return creatImage(`/16-Asynchronous/starter/img/img-2.jpg`).then(() => {
      return wite2(2);
    });
  })
  .then(() =>
    creatImage(`/16-Asynchronous/starter/img/img-3.jpg`).then(() => {
      return wite2(2);
    })
  )
  .finally(() => (currImg.style.display = 'block'));
// * Lovely challenge
*/
