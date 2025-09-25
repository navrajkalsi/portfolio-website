const user_url = "https://api.github.com/users/navrajkalsi",
  repos_url = `${user_url}/repos`,
  repo_order = [ // only change this to order the repos
    "server-c",
    "forexpy",
    ".dotfiles"
  ],
  repo_url_prefix = "https://api.github.com/repos/navrajkalsi",
  content_url_prefix = "https://raw.githubusercontent.com/navrajkalsi";

let github_repos, // will contain the repos from github in JSON
  nothing;

async function fetch_json(url) {
  const response = await fetch(url);
  return response.json();
};

// readme markdowns to html
function mark_to_html(markdown) {
  let parsed = marked.parse(markdown);
  return DOMPurify.sanitize(parsed);
};

// anything to deal with hero section
async function handle_hero() {
  // Avatar
  const user_json = await fetch_json(user_url);
  document.querySelector("img.avatar").src = await user_json.avatar_url;
}

// assigns global var github_repos to JSON object containing all public repos
async function fill_repos() {
  github_repos = await fetch(repos_url);
  github_repos = await github_repos.json();
}

// returns the default branch name of a repo, given the id from repos json
function get_default_branch(id) {
  for (repo of github_repos)
    if (repo.id === id)
      return repo.default_branch;
    else
      continue;
}

// creates i copies of last demo section, including the said section
function create_sections() {
  const sample_section = document.querySelectorAll("section")[1];

  // creating and appending new sections
  for (let i = 1; i < github_repos.length; i++) {
    const new_section = sample_section.cloneNode(true);
    document.getElementById("scroll-content").appendChild(new_section);
  }
}

// fills all the sections in order of the array declared on top
async function fill_sections() {
  const sections = document.querySelectorAll("section");

  for (let i = 0; i < repo_order.length; i++) {
    const section = sections[i + 1],
      demo_div = section.querySelector("div.demo"),
      readme_div = section.querySelector("div.readme"),
      repo = github_repos[i].name,
      branch = get_default_branch(github_repos[i].id);

    // setting repo name
    section.querySelector("div.title").firstElementChild.textContent = repo;

    // filling readme
    {
      const readme_response = await fetch(`${content_url_prefix}/${repo}/${branch}/README.md`);

      if (readme_response.status >= 400)
        readme_div.textContent = `An error occurred while fetching README for this repo: ${readme_response.status}`;
      else
        readme_div.textContent = mark_to_html(await readme_response.text());
    }


    // checking request status, if starts with 4xx or 5xx then deleting demo div
    {
      const gif_response = await fetch(`${content_url_prefix}/${repo}/${branch}/media/demo.gif`);

      // error
      if (gif_response.status >= 400)
        section.removeChild(demo_div);
      else
        demo_div.firstElementChild.src = `${content_url_prefix}/${repo}/${branch}/media/demo.gif`;
    }
  }
}

async function handle_sections() {
  // orders and removes repos not in repo_order
  github_repos = repo_order
    .map(repo => github_repos
      .find(github_repo => github_repo.name === repo))
    .filter(Boolean);

  // creating required number of sections & filling them
  create_sections();
  fill_sections();
}

document.addEventListener("DOMContentLoaded", () => {
  handle_hero();
  fill_repos().then(handle_sections);
});

