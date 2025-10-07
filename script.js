const socials = {
  "github": "https://www.github.com/navrajkalsi",
  "linkedin": "https://linkedin.com/in/navrajkalsi",
  "reddit": "https://reddit.com/u/navrajkalsi",
  "twitter": "https://twitter.com/navrajkalsi",
  "email": "mailto:navrajkalsi.com"
};

function visit_url(url) {
  window.open(url, "_blank");
}

document.addEventListener("DOMContentLoaded", async () => {
  // await to create secitons before animating
  await handle_github();
  setup_gsap();
  animate_background();
});

window.onload = async () => {
  document.getElementById("loader").classList.add("hidden");
  document.getElementById("scroll-content").classList.remove("hidden");
}
