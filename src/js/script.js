"use strict";
const intersectAni = function () {
  const sections = document.querySelectorAll("section");

  const sectionPic = document.querySelector(".section-picture");
  const sectionDesc = document.querySelector(".section-description");

  const fadeIn = function (entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.classList.remove("section--hide");

    if (entry.target === sectionPic) {
      sectionDesc.classList.remove("section--hide");
      secObs.unobserve(sectionDesc);
    }
    secObs.unobserve(entry.target);
  };

  const secObs = new IntersectionObserver(fadeIn, {
    root: null,
    threshold: 0.3,
  });

  sections.forEach((s) => {
    s.classList.add("section--hide");
    secObs.observe(s);
  });
};

const slider = function () {
  let windowWidth;

  console.log(windowWidth);
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dot = document.querySelector(".dots");

  let curSlide = 0,
    timer,
    pause;
  const maxSlides = slides.length;

  const createDots = function () {
    slides.forEach((_, i) => {
      dot.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-num="${i}">&nbsp;</button>`
      );
      console.log("hello");
    });
  };
  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };
  const activeDot = function (curSlide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((d) => d.classList.remove("dots__dot--active"));
    document
      .querySelector(`.dots__dot[data-num="${curSlide}"]`)
      .classList.add("dots__dot--active");
  };

  const timeSlide = function () {
    const timer = setInterval(function () {
      if (curSlide === maxSlides - 1) {
        curSlide = 0;
      } else {
        curSlide++;
      }

      goToSlide(curSlide);
      activeDot(curSlide);
    }, 3000);

    return timer;
  };

  const resetTime = function (sec) {
    if (pause) clearTimeout(pause);
    clearInterval(timer);
    pause = setTimeout(() => (timer = timeSlide()), sec * 1000);
    return pause;
  };

  const goToNext = function () {
    if (curSlide === maxSlides - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activeDot(curSlide);
    resetTime(3);
  };

  const goToPrev = function () {
    if (curSlide === 0) {
      curSlide = maxSlides - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activeDot(curSlide);
    resetTime(3);
  };

  const dotClick = function (e) {
    if (!e.target.closest(".dots__dot")) return;
    console.log("hello");
    const dotNum = +e.target.dataset.num;
    goToSlide(dotNum);
    activeDot(dotNum);
    resetTime(3);
  };
  const init = function () {
    createDots();
    goToSlide(0);
    activeDot(0);
    timer = timeSlide();
  };
  init();

  btnRight.addEventListener("click", goToNext);

  btnLeft.addEventListener("click", goToPrev);

  dot.addEventListener("click", dotClick);
  window.addEventListener("resize", function () {
    windowWidth = window.innerWidth;
    if (windowWidth < 1138) {
      clearInterval(timer);
      clearTimeout(pause);
      slides.forEach((s, i) => {
        s.style.transform = ``;
      });
    } else {
      goToSlide(0);

      activeDot(0);
      dot.innerHTML === "" && createDots();
      resetTime(3);
    }
  });
};

slider();
intersectAni();
