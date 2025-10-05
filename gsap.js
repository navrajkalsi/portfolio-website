gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

const smoother = ScrollSmoother.create({
  wrapper: "#scroll-wrapper",
  content: "#scroll-content",
  smooth: 1,
  effects: true,
  smoothTouch: 0.1,
});

function snapToSection(section) {
  smoother.scrollTo(section, true);
}

// entry function
function setup_gsap() {
  const sections = gsap.utils.toArray("section");
  console.log(sections);

  ScrollTrigger.matchMedia({
    // for desktop (with snapping)
    "(hover: hover) and (pointer: fine)": function() {
      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          onEnter: () => snapToSection(section),
          onEnterBack: () => snapToSection(section)
        });
      });
    },

    // for mobile (no snapping)
    "(hover: none) and (pointer: coarse)": function() {
      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top center"
        });
      });
    }
  });

  const highlight_texts = document.querySelectorAll(".highlight-text");
  highlight_texts.forEach((elm, i) => {
    if (i === 0)
      return;

    ScrollTrigger.create({
      trigger: elm,
      start: "top center",
      toggleClass: { targets: elm, className: "underline" },
      once: false,
    });
  });

  gsap.from(".reveal-y", { opacity: 0, y: 100, duration: 0.5 });
  gsap.to(".scale-up", { opacity: 1, scale: 1, duration: 1, delay: 0.5 });
  gsap.from(".info", { opacity: 0, y: 100, duration: 0.75, delay: 1.5 });

  setTimeout(() => {
    document.querySelector(".highlight-text").classList.add("underline");
  }, 750);
};
