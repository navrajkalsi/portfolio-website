const profile_readme = "https://raw.githubusercontent.com/navrajkalsi/navrajkalsi/main/README.md",
  user_url = "https://api.github.com/users/navrajkalsi",
  repos_url = `${user_url}/repos`,
  repo_order = [ // only change this to order the repos
    "server-c",
    "forexpy",
    ".dotfiles"
  ],
  repo_url_prefix = "https://api.github.com/repos/navrajkalsi";

async function fetch_url(url) {
  const response = await fetch(url);
  return response;
};

async function fetch_url_json(url) {
  const response = await fetch_url(url);
  return response.json();
};

// readme markdowns to html
function mark_to_html(markdown) {
  let parsed = marked.parse(markdown);
  return DOMPurify.sanitize(parsed);
};

document.addEventListener("DOMContentLoaded", () => {
  handle_hero();
  get_repos();
});

async function handle_hero() {
  // Avatar
  const user_json = await fetch_url_json(user_url);
  document.querySelector("img.avatar").src = await user_json.avatar_url;

  // Profile README
  // const readme = await fetch_url(profile_readme);
  // document.querySelector(".info-text").innerHTML = mark_to_html(await readme.text());
}

async function get_repos() {
  const repos_response = await fetch_url(repos_url);
  const repos_json = await repos_response.json();
  console.log(repos_json);
  let repos_text = "";
  for (repo of repos_json) {
    repos_text += "\n";
    repos_text += repo.name;
  }
}

