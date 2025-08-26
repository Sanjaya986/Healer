
 // mobile menu toggle
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    menuBtn?.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

    // nav background on scroll
    const header = document.querySelector('header');
    const setHeaderBg = () => {
      if (window.scrollY > 8) {
        header.classList.add('bg-black/60');
      } else {
        header.classList.remove('bg-black/60');
      }
    };
    setHeaderBg();
    window.addEventListener('scroll', setHeaderBg);

    
// circle
(function () {
  const wrapper   = document.getElementById('circleWrapper');
  const textNode  = document.getElementById('textPath');
  const textEl    = document.getElementById('circleText');
  const pathEl    = document.getElementById('circlePath');

  // Base phrase (dot ke saath taaki join smooth ho)
  const PHRASE = '  VIEW PRESENTATION •';

  function fitCircleText() {
    if (!wrapper || !textNode || !textEl || !pathEl) return;

    // Container size
    const { width, height } = wrapper.getBoundingClientRect();
    const size = Math.min(width, height);

    // Small devices par text thoda bada; large par balanced
    // Clamp: min 10px, max 22px
    const fontPx = Math.max(10, Math.min(22, size * 0.11));
    textEl.style.fontSize = fontPx + 'px';

    // Path length = circumference => text exactly fit
    const pathLen = pathEl.getTotalLength();
    textNode.setAttribute('textLength', pathLen);
    textEl.setAttribute('lengthAdjust', 'spacing'); // spacing adjust karega

    // Approx char width estimate (thoda conservative)
    const approxCharW = fontPx * 0.62;
    const estCharsNeeded = Math.ceil(pathLen / approxCharW);

    // Kitni baar phrase repeat ho: +2 buffer for smooth wrap
    const reps = Math.max(2, Math.ceil(estCharsNeeded / PHRASE.length) + 2);
    textNode.textContent = PHRASE.repeat(reps).trim();

    // Optional: thoda letter-spacing tweak chhote screens par
    if (size < 360) {
      textEl.style.letterSpacing = '0.02em';
    } else if (size < 480) {
      textEl.style.letterSpacing = '0.015em';
    } else {
      textEl.style.letterSpacing = '0.01em';
    }
  }

  // Initial + on resize + on orientation change
  window.addEventListener('load', fitCircleText);
  window.addEventListener('resize', fitCircleText);
  window.addEventListener('orientationchange', fitCircleText);

  // In case fonts load late
  document.fonts && document.fonts.ready && document.fonts.ready.then(fitCircleText);
})();
//   hero section animation
document.addEventListener("DOMContentLoaded", () => {
    const hero = document.getElementById("heroSection");
    const heading = document.getElementById("heroHeading");
    const number = document.getElementById("statNumber");
    const text1 = document.getElementById("statText1");
    const text2 = document.getElementById("statText2");

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Trigger animations
            setTimeout(() => heading.classList.remove("opacity-0", "translate-y-8"), 200);
            setTimeout(() => number.classList.remove("opacity-0", "translate-y-8"), 500);
            setTimeout(() => text1.classList.remove("opacity-0", "translate-y-8"), 800);
            setTimeout(() => text2.classList.remove("opacity-0", "translate-y-8"), 1100);

            observer.unobserve(hero); // run only once
          }
        });
      },
      { threshold: 0.3 } // when 30% of hero section visible
    );

    observer.observe(hero);
  });

//   service cards
 document.addEventListener("DOMContentLoaded", () => {
    const serviceSection = document.getElementById("services");
    const heading = document.getElementById("servicesHeading");
    const cards = document.querySelectorAll(".service-card");
    const moreBtn = document.getElementById("moreServiceBtn");
    const extraCards = document.querySelectorAll(".extra-service");

    // 1️⃣ Scroll-trigger animation (desktop + mobile)
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => heading.classList.remove("opacity-0", "translate-y-8"), 200);

            cards.forEach((card, i) => {
              setTimeout(() => {
                card.classList.remove("opacity-0", "translate-y-8");
              }, (i + 1) * 300);
            });

            obs.unobserve(serviceSection);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(serviceSection);

    // 2️⃣ Mobile "More Services" click animation
    if (moreBtn) {
      moreBtn.addEventListener("click", e => {
        e.preventDefault();

        extraCards.forEach((card, i) => {
          setTimeout(() => {
            card.classList.remove("hidden"); // show card
            // trigger animation by forcing reflow
            card.offsetHeight;
            card.classList.remove("opacity-0", "translate-y-8");
          }, (i + 1) * 300);
        });

        // button upar chala jaye (Medical Care card ki jagah fix)
        moreBtn.classList.add("pointer-events-none", "opacity-70");
      });
    }
  });