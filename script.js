// Keep the footer year current.
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.textContent = isOpen ? "Close" : "Menu";
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.textContent = "Menu";
    });
  });
}

// Reveal sections as they enter the viewport, with a safe fallback.
const revealElements = document.querySelectorAll(".reveal, .reveal-delay");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion) {
  revealElements.forEach((el) => el.classList.add("is-visible"));
} else if ("IntersectionObserver" in window) {
  let frameId = null;
  const pendingElements = new Set();

  const flushVisibleElements = () => {
    pendingElements.forEach((el) => el.classList.add("is-visible"));
    pendingElements.clear();
    frameId = null;
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        pendingElements.add(entry.target);
        observer.unobserve(entry.target);

        if (frameId === null) {
          frameId = window.requestAnimationFrame(flushVisibleElements);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealElements.forEach((el) => {
    observer.observe(el);
  });
} else {
  revealElements.forEach((el) => el.classList.add("is-visible"));
}
