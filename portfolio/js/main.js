const slides = document.querySelectorAll(".slide");
const navPills = document.querySelectorAll(".nav-pill");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

let currentSlide = 0;

function showSlide(index) {
  currentSlide = index;

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === currentSlide);
  });

  navPills.forEach((pill, i) => {
    pill.classList.toggle("active", i === currentSlide);
  });
}

function goToNextSlide() {
  const nextSlide = (currentSlide + 1) % slides.length;
  showSlide(nextSlide);
}

function goToPreviousSlide() {
  const previousSlide =
    (currentSlide - 1 + slides.length) % slides.length;

  showSlide(previousSlide);
}

nextBtn.addEventListener("click", goToNextSlide);
prevBtn.addEventListener("click", goToPreviousSlide);

navPills.forEach((pill) => {
  pill.addEventListener("click", () => {
    const target = Number(pill.dataset.target);
    showSlide(target);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") goToNextSlide();
  if (event.key === "ArrowLeft") goToPreviousSlide();
});