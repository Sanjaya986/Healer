// navigation ka service li
document.addEventListener("DOMContentLoaded", () => {
  const servicesBtn = document.getElementById("servicesBtn");
  const servicesDropdown = document.getElementById("servicesDropdown");

  // Click se toggle
  servicesBtn.addEventListener("click", (e) => {
    e.preventDefault();
    servicesDropdown.classList.toggle("hidden");
  });

  // Agar bahar click kare to close ho jaye
  document.addEventListener("click", (e) => {
    if (!servicesBtn.contains(e.target) && !servicesDropdown.contains(e.target)) {
      servicesDropdown.classList.add("hidden");
    }
  });
});
 
///new page open animation
// ============= NAV LINK EXIT ANIMATION =============
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", function(e) {
    const targetUrl = this.getAttribute("href");

    // Current file name normalize karo
    let currentPath = window.location.pathname.split("/").pop() || "index.html";

    // Agar Home pe ho aur Home link click hua → kuch mat karo
    if (
      (currentPath === "index.html" || currentPath === "") &&
      (targetUrl === "index.html" || targetUrl === "/" || targetUrl === "#" || targetUrl === "")
    ) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    const page = document.body;

    // Shrink + fade-out (poora page gayab)
    page.classList.add(
      "opacity-0",
      "scale-75",
      "transition",
      "duration-700",
      "ease-in-out"
    );

    // Redirect with delay
    setTimeout(() => {
      window.location.href = targetUrl;
    }, 700);
  });
});

// ============= ENTRY ANIMATION (NEW PAGE) =============
window.addEventListener("DOMContentLoaded", () => {
  const page = document.body;

  // Start hidden + small
  page.classList.add("opacity-0", "scale-90");

  setTimeout(() => {
    // Animate to full size + visible
    page.classList.add("transition", "duration-700", "ease-out");
    page.classList.remove("opacity-0", "scale-90");
    page.classList.add("opacity-100", "scale-100");
  }, 50);
});








 // mobile menu toggle
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    menuBtn?.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

    // Close menu when clicked outside
  document.addEventListener("click", (e) => {
    if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
      mobileMenu.classList.add("hidden");
    }
  });
  
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
  // 👉 Mobile "More Services" animation
  const moreBtn = document.getElementById("moreServiceBtn");
  const extraCards = document.querySelectorAll(".extra-service");

  if (moreBtn) {
    moreBtn.addEventListener("click", e => {
      e.preventDefault();
      extraCards.forEach((card, i) => {
        setTimeout(() => {
          card.classList.remove("hidden");
          card.classList.add("opacity-0", "translate-y-8");
          void card.offsetWidth;
          card.classList.remove("opacity-0", "translate-y-8");
        }, i * 400);
      });
      moreBtn.classList.add("pointer-events-none", "opacity-70");
    });
  }

  // 👉 Desktop 3-card slider
  const slider = document.getElementById("servicesSlider");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (slider) {
    const totalCards = slider.children.length;
    let currentIndex = 0; // current first card index
    const visibleCards = 3; // ek row me 3 dikhte hain

    function updateSlider() {
      const cardWidthPercent = 100 / visibleCards; // har card ka width % me
      const translateX = -(currentIndex * cardWidthPercent);
      slider.style.transform = `translateX(${translateX}%)`;
    }

    nextBtn.addEventListener("click", () => {
      if (currentIndex < totalCards - visibleCards) {
        currentIndex++;
        updateSlider();
      }
    });

    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });

    updateSlider();
  }
});






//  about us section
document.addEventListener("DOMContentLoaded", () => {
  const aboutSection = document.getElementById("aboutSection");
  const aboutCards = document.querySelectorAll(".about-card");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate each card ek-ek karke
          aboutCards.forEach((card, i) => {
            setTimeout(() => {
              card.classList.remove("opacity-0", "translate-y-10");
            }, i * 400); // har card ke beech 400ms ka delay
          });

          obs.unobserve(aboutSection); // ek hi baar chale
        }
      });
    },
    { threshold: 0.3 } // section 30% visible hote hi trigger hoga
  );

  observer.observe(aboutSection);
});

//  smart control section
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".feature-card");

    // Scroll animation (mobile + desktop)
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }, i * 300);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    cards.forEach(card => observer.observe(card));

    // Desktop hover animation
    if (window.innerWidth >= 768) {
      cards.forEach(card => {
        card.classList.add("transition", "duration-300");
        card.addEventListener("mouseenter", () => {
          card.classList.add("-translate-y-2", "shadow-lg");
        });
        card.addEventListener("mouseleave", () => {
          card.classList.remove("-translate-y-2", "shadow-lg");
        });
      });
    }
  });
 /// meet with doctor section
 document.addEventListener("DOMContentLoaded", () => {
    const meetSection = document.getElementById("meetDoctor");
    const meetHeading = document.getElementById("meetHeading");
    const meetBtn = document.getElementById("meetBtn");

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              meetHeading.classList.remove("opacity-0", "translate-y-10");
            }, 200);
            setTimeout(() => {
              meetBtn.classList.remove("opacity-0", "translate-y-10");
            }, 600);

            obs.unobserve(meetSection);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(meetSection);
  });

  // PATIENT SAY
  document.addEventListener("DOMContentLoaded", () => {
  // Scroll-triggered animation for heading + desktop cards
  const section = document.getElementById("patientsSay");
  const sub = document.getElementById("patientsSub");
  const heading = document.getElementById("patientsHeading");
  const cards = document.querySelectorAll(".testimonial-card");

  if (section) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Headings
            setTimeout(() => sub?.classList.remove("opacity-0", "translate-y-8"), 200);
            setTimeout(() => heading?.classList.remove("opacity-0", "translate-y-8"), 500);
            // Desktop cards (stagger)
            cards.forEach((card, i) => {
              setTimeout(() => card.classList.remove("opacity-0", "translate-y-8"), 800 + i * 300);
            });
            obs.unobserve(section);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(section);
  }

 // Mobile slider (only visible on < md)
const slider = document.getElementById("patientsSlider");
const prevBtn = document.getElementById("prevSlide");
const nextBtn = document.getElementById("nextSlide");
let currentIndex = 0;

function updateSlider() {
  if (!slider) return;
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;

  // 👉 button state update
  if (currentIndex === 0) {
    prevBtn.disabled = true;
    prevBtn.classList.add("opacity-40", "cursor-not-allowed");
  } else {
    prevBtn.disabled = false;
    prevBtn.classList.remove("opacity-40", "cursor-not-allowed");
  }
 }

 if (nextBtn && prevBtn && slider) {
   const total = slider.children.length;

   nextBtn.addEventListener("click", () => {
     if (currentIndex < total - 1) {
      currentIndex++;
      updateSlider();
     }
   });

   prevBtn.addEventListener("click", () => {
     if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
     }
  });

  // 👉 Swipe / Touch support
  let startX = 0;
  let isSwiping = false;

  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
  });

  slider.addEventListener("touchmove", (e) => {
    if (!isSwiping) return;
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;

    if (diff > 50 && currentIndex < total - 1) {
      // swipe left → next
      currentIndex++;
      updateSlider();
      isSwiping = false;
    } else if (diff < -50 && currentIndex > 0) {
      // swipe right → prev
      currentIndex--;
      updateSlider();
      isSwiping = false;
    }
  });

  slider.addEventListener("touchend", () => {
    isSwiping = false;
  });

  // initial state
  updateSlider();
 }

});

// Scroll animation trigger
  document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll(".reveal");

    function checkScroll() {
      reveals.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.remove("opacity-0", "translate-y-10");
          el.classList.add("opacity-100", "translate-y-0");
        }
      });
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll();
  });