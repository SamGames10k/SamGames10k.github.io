// القائمة الجانبية
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  sidebar.classList.toggle('active');
});

// سلايدر الصور
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".slider-image");
  const sliderLink = document.getElementById("sliderLink");
  const dotsContainer = document.getElementById("sliderDots");
  let current = 0;

  // إنشاء النقاط
  images.forEach((img, i) => {
    const dot = document.createElement("div");
    dot.classList.add("slider-dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      current = i;
      showSlide(current);
    });
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".slider-dot");

  function showSlide(index) {
    images.forEach((img, i) => {
      img.classList.remove("active");
      dots[i].classList.remove("active");
      if (i === index) {
        img.classList.add("active");
        dots[i].classList.add("active");
        sliderLink.onclick = () => {
          window.open(img.getAttribute("data-link"), "_blank");
        };
      }
    });
  }

  showSlide(current);

  setInterval(() => {
    current = (current + 1) % images.length;
    showSlide(current);
  }, 3000);
});

// تبديل اللوغو تلقائيًا
let currentLogo = 0;
const logos = document.querySelectorAll('.logo-img');

setInterval(() => {
  logos[currentLogo].classList.remove('active');
  currentLogo = (currentLogo + 1) % logos.length;
  logos[currentLogo].classList.add('active');
}, 4000);

// البحث
const searchWrapper = document.querySelector(".search-wrapper");
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");

if (searchWrapper && searchBtn && searchInput) {
  searchBtn.addEventListener("click", function () {
    searchWrapper.classList.add("active");
    searchInput.focus();

    const query = searchInput.value.trim();
    if (query) {
      window.location.href = "/search?q=" + encodeURIComponent(query);}
  });

  document.addEventListener("click", function (e) {
    const clickedOutside = !searchWrapper.contains(e.target);
    const isEmpty = searchInput.value.trim() === "";

    if (clickedOutside && isEmpty) {
      searchWrapper.classList.remove("active");
    }
  });
}
