const slides = document.querySelectorAll(".slideshow-container__slide");
const dots = document.querySelectorAll(".slideshow-container__navigator");
const prevAction = document.querySelector(".slideshow-container__action-prev");
const nextAction = document.querySelector(".slideshow-container__action-next");
// const slides = document.querySelectorAll()

// add event listner on each dot
dots.forEach((d, dIdx) =>
  d.addEventListener("click", () => changeSlideByIndex(dIdx + 1))
);
// prevAction.addEventListener("click", () => changeSlideByOffset(-1));
// nextAction.addEventListener("click", () => changeSlideByOffset(+1));

let slideIndex = 1;
changeSlideByIndex(slideIndex);

// Next/previous controls
function changeSlideByOffset(n) {
  changeSlideByIndex(slideIndex + n);
}

function changeSlideByIndex(n) {
  slideIndex = n;

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (let i = 0; i < slides.length; i++) {
    // if not included inlcude disp none class
    !slides[i].className.includes("dui-util-disp-none")
      ? (slides[i].className += " dui-util-disp-none")
      : null;
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(
      " slideshow-container__navigator--active",
      ""
    );
  }
  // slides[slideIndex - 1].style.display = "block";
  slides[slideIndex - 1].className = slides[
    slideIndex - 1
  ].className.replaceAll(" dui-util-disp-none", "");
  dots[slideIndex - 1].className += " slideshow-container__navigator--active";
}

export { changeSlideByOffset };
