gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

const smoother = ScrollSmoother.create({
  wrapper: "#scroll-wrapper",
  content: "#scroll-content",
  smooth: 1,
  effects: true,
  smoothTouch: 0.1,
}),
  timeline = gsap.timeline();

let scrollTriggers = [];

ScrollTrigger.config({
  limitCallbacks: true,
  ignoreMobileResize: true
});

function snapToSection(section) {
  smoother.scrollTo(section, true);
}

function snapServerSection() {
  // need to disable all scroll triggers before snapping as the snap will just snap the immediate next section
  for (let scrollTrigger of scrollTriggers)
    scrollTrigger.disable();

  snapToSection(document.getElementById("server-c"));

  // need timout, as snapping breaks cause the scrolltriggers kick in at the same time as the scroll is about to start
  for (let scrollTrigger of scrollTriggers)
    setTimeout(scrollTrigger.enable, 250);
}

// entry function
function setup_gsap() {
  const sections = gsap.utils.toArray("section");

  ScrollTrigger.matchMedia({
    // for desktop (with snapping)
    "(hover: hover) and (pointer: fine)": function() {
      sections.forEach((section) => {
        scrollTriggers.push(ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => snapToSection(section),
          onEnterBack: () => snapToSection(section)
        }));
      });
    },

    // for mobile (no snapping)
    "(hover: none) and (pointer: coarse)": function() {
      sections.forEach((section) => {
        scrollTriggers.push(ScrollTrigger.create({
          trigger: section,
          start: "top center"
        }));
      });
    }
  });

  const highlight_texts = document.querySelectorAll(".highlight-text");
  highlight_texts.forEach((elm, i) => {
    if (i === 0)
      return;

    scrollTriggers.push(ScrollTrigger.create({
      trigger: elm,
      start: "top center",
      end: "bottom top",
      toggleClass: { targets: elm, className: "underline" },
      once: false,
    }));
  });

  timeline.from(".reveal-y", { opacity: 0, y: 100, duration: 0.5 }, 0.25)
    .call(() => document.querySelector(".highlight-text").classList.add("underline"))
    .to(".scale-up", { opacity: 1, scale: 1, duration: 1 })
    .from(".info", { opacity: 0, y: 100, duration: 0.75 }, "-=0.25")
    .to("#background", { opacity: 1, duration: 0.75 }, "-=0.25")
    .to(".server-text", { opacity: 1, duration: 0.5 }, "-=0.25");
};
