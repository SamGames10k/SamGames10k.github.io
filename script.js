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


/*الخانات كيتغيرو عشوائيا سلايدر ----------3------------ */

  
  document.addEventListener("DOMContentLoaded", () => {
    const boxes = [...document.querySelectorAll(".category-box")];

    const timeZoom = 1000;  // وقت رفع الزوم (ms)
    const timeHold = 1500;  // وقت البقاء مزوم
    const timeRest = 1500;  // وقت الراحة (scale 1)

    // وظيفة تعطي زوم لخانة مع التحكم في المدة
    function zoomBox(box) {
      return new Promise(resolve => {
        box.classList.add("auto-zoom");
        box.style.animationDuration = (timeZoom + timeHold + timeRest) / 1000 + "s";
        setTimeout(() => {
          box.classList.remove("auto-zoom");
          resolve();
        }, timeZoom + timeHold + timeRest);
      });
    }

    // تنفيذ تسلسل زوم واحد بعد الآخر بترتيب
    async function zoomSequential() {
      for (const box of boxes) {
        await zoomBox(box);
      }
    }

    // تنفيذ زوم لجميع الخانات بنفس الوقت مع تأخيرات عشوائية
    function zoomRandom() {
      boxes.forEach(box => box.classList.remove("auto-zoom"));
      boxes.forEach(box => {
        const delay = Math.random() * (timeZoom + timeHold + timeRest);
        setTimeout(() => {
          box.classList.add("auto-zoom");
          setTimeout(() => box.classList.remove("auto-zoom"), timeZoom + timeHold + timeRest);
        }, delay);
      });
    }

    // تنفيذ زوم متزامن لكل الخانات دفعة وحدة
    function zoomAll() {
      boxes.forEach(box => {
        box.classList.add("auto-zoom");
      });
      setTimeout(() => {
        boxes.forEach(box => box.classList.remove("auto-zoom"));
      }, timeZoom + timeHold + timeRest);
    }

    // تغيير الوضع كل مرة مع دورة مستمرة
    async function runLoop() {
      while (true) {
        const mode = Math.random();
        if (mode < 0.4) {
          // نمط عشوائي
          zoomRandom();
          await new Promise(r => setTimeout(r, 8000)); // مدة النمط العشوائي
        } else if (mode < 0.8) {
          // نمط تسلسلي
          await zoomSequential();
          await new Promise(r => setTimeout(r, 1000)); // فترة راحة بين التكرار
        } else {
          // نمط متزامن
          zoomAll();
          await new Promise(r => setTimeout(r, 5000)); // مدة النمط المتزامن
        }
      }
    }

    runLoop();
  });





/*شرارة*/
function createSpark(container) {
  const spark = document.createElement("span");
  spark.className = "spark";

  // نحسب عرض الخانة
  const containerWidth = container.clientWidth;

  // نحدد الهامش من الجهتين (تقدر تبدلو)
  const margin = 6.5;
  const usableWidth = containerWidth - margin * 2;

  // نحسب موقع عشوائي داخل المساحة المتاحة
  const randomLeft = Math.random() * usableWidth + margin;

  // نحول القيمة إلى نسبة مئوية باش تكون مرنة مع تغير حجم الخانة
  const leftPercent = (randomLeft / containerWidth) * 100;

  spark.style.left = `${leftPercent}%`;
  spark.style.animationDuration = (1.5 + Math.random()).toFixed(2) + "s";

  container.appendChild(spark);

  setTimeout(() => {
    spark.remove();
  }, 2000);
}

// نطبق على كل خانة
document.querySelectorAll(".category-box").forEach(box => {
  setInterval(() => {
    createSpark(box);
  }, 300 + Math.random() * 700); // شرارات متقطعة
});



  // عرض البنر إذا لم تكن هناك موافقة أو رفض
  window.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('cookie-banner');
    if (!localStorage.getItem('cookie-consent')) {
      banner.style.display = 'block';
    }

    document.getElementById('accept-cookies').onclick = () => {
      localStorage.setItem('cookie-consent', 'accepted');
      banner.style.display = 'none';

      // Google Analytics script
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', 'G-07SBG11V92', 'auto');
      ga('send', 'pageview');
    };

    document.getElementById('reject-cookies').onclick = () => {
      localStorage.setItem('cookie-consent', 'rejected');
      banner.style.display = 'none';
    };
  });
