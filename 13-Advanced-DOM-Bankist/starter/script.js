'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnSOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
// * navbar
const naveLinks = document.querySelectorAll('.nav__link');
const ulTagInNavTag = document.querySelector('.nav__links');
const nav = document.querySelector('.nav');
const h1 = document.querySelector('h1');
// * tabs
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContact = document.querySelectorAll('.operations__content');
const allSection = document.querySelectorAll('.section');
// * sliders
const slides = document.querySelectorAll('.slide');
const sliderBtnLeft = document.querySelector('.slider__btn--left');
const sliderBtnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

// * Open account Btn

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnSOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  e.preventDefault();
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
/*
const allSection = document.getElementsByTagName('section');
// return HTml collations that main it will update it self automatically
// if you delete any btn in the document, it will update it self automatically
console.log(allSection);
// querySelectorAll don't update it self
const sectionNodeList = document.querySelectorAll('.section');
console.log();
// creat an element
sectionNodeList.forEach((el, i) => {
  el.insertAdjacentHTML('afterbegin', `<h1 class="hidden">Test ${i}</h1>`);
});
const allSectionIterable = new Array(...allSection);
console.log(allSectionIterable);
allSectionIterable.forEach((el, i) => {
  console.log(el, i);
  el.insertAdjacentHTML(
    'beforeend',
    '<div class="btn hidden">' + (i + 1) + '</div>'
  );
});

// insert and creating element
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = `<p>This website uses cookies to ensure you get the best experience on our website.</p><button class='btn btn--close-cookie'>Got it</ button>`;
header.prepend(message);
header.append(message.cloneNode());
header.append(message.cloneNode(true));
*
// it append the element to the header one time the
// ! second time it will not append it bc it unique to append multiple times
// ! use .cloneNode(true)
// we can also use .after(element) to insert after the element
*/

// * scroll to element to the section
btnScrollTo.addEventListener('click', e => {
  e.preventDefault();
  const sectionScrollToCord = section1.getBoundingClientRect();
  // console.log(sectionScrollToCord);
  // * old way
  /*
  // window.scrollTo({
  //   left: sectionScrollToCord.x + window.pageXOffset,
  //   top: sectionScrollToCord.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  */
  // * moderne way to scroll
  section1.scrollIntoView({ behavior: 'smooth' });
});

// * lecture 186: Types of Events and Event Handlers
// ? events references form mdn https://developer.mozilla.org/en-US/docs/Web/Events

// * mouseenter and mouseleave events like event hover in css
/*
const h1 = document.querySelector('h1');
h1.addEventListener('mouseenter', e => {
  console.log(e.type);
  console.log(e.target);
  console.log(e.currentTarget);
  console.log(e.relatedTarget);
});

*/

/*

// * event pupping and capturing LC 188

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

//  * event capturing on nav than ul than a tags
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.href = '#';
  this.style.backgroundColor = randomColor();
  console.log(e.currentTarget === this);
  // we can stop the event propagation
  // or pupping phase
  // * e.stopPropagation();
  // ! but its not recommended
});

// * capturing to the parent element
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
});

// capturing to the parent element of ul and a tags
document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
});
// ! event pupping and capturing * Exists for historical reasons
// ! in the modern js pupping is the default
// ! capturing rarely used

*/

// * 189. Event Delegation: Implementing Page Navigation

// * old way
/*
naveLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});
*/
// * event delegation
// ! the idea here to incase the performance of the site
// * 1 - we add event listener to common parent element
// * 2 - determine what element originated the event
ulTagInNavTag.addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(e.target);
  /*
  // * ثابت على العنصر
  // * console.log(e.currentTarget);
  */

  /* 
  ! my way just use ? nullish check
   * document
   *  .querySelector(e.target.getAttribute('href'))
   * ?.scrollIntoView({ behavior: 'smooth' });
   */

  // * matching strategy
  if (
    e.target.classList.contains('nav__link') &&
    !e.target.classList.contains('btn--show-modal')
  ) {
    document
      .querySelector(e.target?.getAttribute('href'))
      ?.scrollIntoView({ behavior: 'smooth' });
  }
});
// * 190. DOM Traversing

/*
// * 1 - querySelector on the same element to get the children
// * No Mater how deep
const queryMethod = h1.querySelector('.highligh');

// * 2 - than we can h1.children to get all the children
console.log('childNodes', h1.childNodes);
console.log('children', h1.children);

// * 3 - selecting direct parent
console.log('parentNode', h1.parentNode);
console.log('parentElement', h1.parentElement);

// * 4 - get the closest parent that have the selected class
console.log('closest', h1.closest('.header'));
// ! it is like querySelector but get the closest parent
console.log("closest('h1')", h1.closest('h1'));
// ! in the case it will get it self

// * 5 - get sideways: sibling
console.log('previousElementSibling', h1.previousElementSibling);
console.log('nextElementSibling', h1.nextElementSibling);

// * most of the time we will use the element in it
console.log('previousSibling', h1.previousSibling);
console.log('nextSibling', h1.nextSibling);

// ! to get all siblings of the element
console.log('All siblings', h1.parentNode.children);

// * 6 - get the first and last element
console.log('firstElementChild', h1.firstElementChild);
console.log('lastElementChild', h1.lastElementChild);
*/

// * 191. Building a Tabbed Component
/**/

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // * guard case
  if (!clicked) return;

  // * delete active class from all tabs than add to
  // * the clicked tab
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  // * do the same for the content
  tabsContact.forEach(tabContent =>
    tabContent.classList.remove('operations__content--active')
  );
  //  * using the clicked tab dataset to get the content #
  // * than add the active class to it
  this.parentElement
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// * 192. Passing Arguments to Event Handlers

// * Menu fade animation

const handleHoverNav = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    // * idea here to get allows the top parent
    // * to make as robust as we can
    const sibling = link.closest('.nav').querySelectorAll('.nav__link');
    // console.log(sibling);
    const logo = link.closest('.nav').querySelector('img');
    // * fade animation
    sibling.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// don't Forget bind method
nav.addEventListener('mouseover', handleHoverNav.bind(0.3));
nav.addEventListener('mouseout', handleHoverNav.bind(1));

// * 193. Implementing a Sticky Navigation: The Scroll Event
// ? using js scroll event and not effetint and
// ? should be avoided
// ! bad
/*
const initialSectionCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function (e) 
{
  console.log(e);
  console.log(e);
  if (this.window.scrollY >= initialSectionCoords.top)
    nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}
);
*/

// * 194. A Better Way: The Intersection Observer API
/*
 * an api alow us to observe the
 * intersection of the element with/or the viewport
 */

// * to use intersection observer

// ! options will determine the intersection
/*

const obsOption = {
//  * target intersect the viewport
  * root: null,
//  * 10% or the threshold we specified from the just appeared to the observer
  * threshold: [0, 0.2],
};

// ! callback function will be called every time
// ! the element is in the viewport or intersection the other elements
const obsCallback = function (entries, observer) {
  // * entries are array of threshold
  entries.forEach(entry => {
    console.log(entry);
  });
};
const observer = new IntersectionObserver(obsCallback, obsOption);
observer.observe(section1);

*/

const headerObsOption = {
  root: null,
  threshold: 0,
  rootMargin: '-' + getComputedStyle(nav).height,
};

const headerObsCallBack = function (entries) {
  const [entre] = entries;
  if (!entre.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
  // * console.log(getComputedStyle(nav).height);
};

const headerObserver = new IntersectionObserver(
  headerObsCallBack,
  headerObsOption
);
headerObserver.observe(header);

// * 195. Revealing Elements on Scroll

const revelSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  // allSection.forEach(section => {
  //   if (section !== entry.target) section.classList.add('section--hidden');
  // });
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revelSection, {
  root: null,
  threshold: 0.15,
});
allSection.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// * 196. Lazy Loading Images
const imgTarget = document.querySelectorAll('img[data-src]');
const loadImg = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  // console.log(entry.target.src);
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTarget.forEach(img => imgObserver.observe(img));

// * 197. Building a Slider Component: Part 1

// ! my way
/*
const sliderReset = (slides, sing = 1) => {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${
      sing > 0 ? 100 * i : -100 * (slides.length - i)
    }%)`;
  });
};
sliderReset(slides);

const slideDirection = reverser => {
  for (const [i, slide] of slides.entries()) {
    if (i === slides.length - 1 && reverser > 0) return sliderReset(slides);
    if (
      Number.parseInt(
        slide.style.transform.toLowerCase().replaceAll(/[a-z]+\(/g, '')
      ) === 0
    ) {
      sliderReset([...slides].slice(i + reverser));
      sliderReset([...slides].slice(0, i + reverser), -1);
      break;
    }
  }
};

sliderBtnRight.addEventListener('click', slideDirection.bind(null, 1));
sliderBtnLeft.addEventListener('click', slideDirection.bind(null, -1));
*/
// * instructor way

const sliders = () => {
  const goToSlide = function (slideNum) {
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - slideNum)}%)`;
    });
  };
  let curSlide = 0;

  const dotCreator = () => {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  // Next slide
  const nextSlide = () => {
    if (curSlide === slides.length - 1) curSlide = 0;
    else curSlide++;
    goToSlide(curSlide);
    activeDot(curSlide);
  };

  // previous slide

  const prevSlide = () => {
    if (curSlide === 0) curSlide = slides.length - 1;
    else curSlide--;
    goToSlide(curSlide);
    activeDot(curSlide);
  };
  sliderBtnRight.addEventListener('click', nextSlide);
  sliderBtnLeft.addEventListener('click', prevSlide);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();
    e.key === 'ArrowLeft' && prevSlide();
  });

  // dotCreator function

  // active dot
  const activeDot = function (slideNum) {
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active');
    });

    document
      .querySelector(`.dots__dot[data-slide="${slideNum}"]`)
      .classList.add('dots__dot--active');
  };

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activeDot(slide);
    }
  });
  const sliderInit = () => {
    goToSlide(0);
    dotCreator();
    activeDot(0);
  };
  sliderInit();
};
sliders();
/// * 199. Lifecycle DOM Events

document.addEventListener('DOMContentLoaded', function () {
  // console.log('hi');
});
/*
// event fires when the initial HTML document 
// has been completely loaded and parsed, without waiting
// for stylesheets, images, and subframes to 
// finish loading.

! we don't have to use it when script tag in the end

*/
document.addEventListener('load', function (e) {
  console.log('after every thing has loaded', e);
});

// * appear whin the user about to exit the page
/*
window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = 'Are you sure you want to exit?';
});
*/

// * 200. Efficient Script Loading: defer and async
