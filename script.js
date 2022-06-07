'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
///////////////////////////////////////
// Button scrolling
const section1 = document.querySelector('#section--1');
const btnScrollTo = document.querySelector('.btn--scroll-to');
btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});
///////////////////////////////////////
// Page navigation

const nav = document.querySelector('.nav__links');

nav.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
///////////////////////////////////////
// Tabbed component
const btnOperations = document.querySelectorAll('.operations__tab');
const contentOperations = document.querySelectorAll('.operations__content');
const tabContainer = document.querySelector('.operations__tab-container');
tabContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  btnOperations.forEach(btn => {
    btn.classList.remove('operations__tab--active');
  });
  contentOperations.forEach(content => {
    content.classList.remove('operations__content--active');
  });
  document
    .querySelector(`.operations__tab--${clicked.dataset.tab}`)
    .classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
///////////////////////////////////////
// Menu fade animation
const handler = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
};
nav.addEventListener('mouseover', handler.bind(0.5));
nav.addEventListener('mouseout', handler.bind(1));
///////////////////////////////////////
// Sticky navigation: Intersection Observer API
const navBar = document.querySelector('.nav');
const height = navBar.getBoundingClientRect().height;
const header = document.querySelector('.header');
const navStick = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    navBar.classList.add('sticky');
  } else {
    navBar.classList.remove('sticky');
  }
};
const observer = new IntersectionObserver(navStick, {
  root: null,
  threshold: 0,
  rootMargin: `-${height}px`,
});
observer.observe(header);
///////////////////////////////////////
// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('hidden');
  observerSection.unobserve(entry.target);
};
const observerSection = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(section => {
  section.classList.add('hidden');
  observerSection.observe(section);
});
//Lazy loading img
const imgs = document.querySelectorAll('img[data-src]');
const loadImg = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observerImg.unobserve(entry.target);
};
const observerImg = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});
imgs.forEach(img => {
  observerImg.observe(img);
});

///////////////////////////////////////
// Slider
const sliders = document.querySelectorAll('.slide');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
let curSlider = 0;
const slideTranslate = function (slider) {
  sliders.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slider)}%)`;
  });
};
slideTranslate(curSlider);

const nextSlide = () => {
  if (curSlider < sliders.length - 1) {
    curSlider++;
  } else {
    curSlider = 0;
  }
  dotsEffect(curSlider);

  slideTranslate(curSlider);
};

const preSlide = () => {
  if (curSlider !== 0) {
    curSlider--;
  } else {
    curSlider = sliders.length - 1;
  }
  slideTranslate(curSlider);
  dotsEffect(curSlider);
};
btnRight.addEventListener('click', nextSlide);

btnLeft.addEventListener('click', preSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') preSlide();
  if (e.key === 'ArrowRight') nextSlide();
});

//Add dots
const dotsContainer = document.querySelector('.dots');
sliders.forEach((_, i) => {
  dotsContainer.insertAdjacentHTML(
    'beforeend',
    `<button class='dots__dot' data-number=${i}></button>`
  );
});

const dotsEffect = function (slider) {
  document.querySelectorAll('.dots__dot').forEach(dot => {
    dot.classList.remove('dots__dot--active');
    if (dot.dataset.number == slider) {
      dot.classList.add('dots__dot--active');
    }
  });
};
dotsEffect(curSlider);

dotsContainer.addEventListener('click', function (e) {
  const slider = e.target;
  if (slider.classList.contains('dots__dot')) {
    slideTranslate(slider.dataset.number);
    dotsEffect(slider.dataset.number);
  }
});
