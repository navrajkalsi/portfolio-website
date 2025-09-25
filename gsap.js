gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

const smoother = ScrollSmoother.create({
  wrapper: "#scroll-wrapper",
  content: "#scroll-content",
  smooth: 1,
  effects: true,
  smoothTouch: 0.1,
});

const sections = gsap.utils.toArray("section");

sections.forEach((section, i) => {
  ScrollTrigger.create({
    trigger: section,
    start: "top center",
    onEnter: () => snapToSection(section),
    onEnterBack: () => snapToSection(section)
  });
});

function snapToSection(section) {
  smoother.scrollTo(section, true);
}

gsap.from(".reveal-y", { opacity: 0, y: 100, duration: 0.5 });
gsap.to(".scale-up", { opacity: 1, scale: 1, duration: 1, delay: 0.5 });
gsap.from(".info", { opacity: 0, y: 100, duration: 0.75, delay: 1.5 });

setTimeout(() => {
  document.querySelector(".highlight-text").classList.add("underline");
}, 750);
