import microlight from "./microlight.js";
import projects from "./projects.js";

const id = (identifier) => document.getElementById(identifier);

let title = id("title");
let problem = id("problem");
let solution = id("my-solution");
let tests = id("tests");

function fillPage(project) {
  const projObj = projects[project];
  document.title = projObj.title;
  title.innerHTML = projObj.title;
  problem.innerHTML = projObj.problem;
  solution.innerHTML = projObj.solution.toString();
  tests.innerHTML = projObj.tests
    .map(({ text, code }) => `<p>${code ? "✔" : "❌"} ${text}</p>`)
    .join("");

  microlight.reset();
}

// on first-load
const URLParams = new URL(document.location).searchParams;
let project = URLParams.get("p") || "palindrome-checker";
history.replaceState({ p: project }, "", `?p=${project}`);
fillPage(project);

// on navigation
let nav = document.getElementsByTagName("nav")[0];
nav.addEventListener("click", (ev) => {
  ev.preventDefault();
  if (!Object.prototype.hasOwnProperty.call(ev.target.attributes, "href"))
    return;
  const pAttribute = ev.target.attributes.href.value;
  history.pushState({ p: pAttribute.slice(3) }, "", pAttribute);
  fillPage(history.state.p);
});

// on clicking 'back'
window.onpopstate = function (ev) {
  fillPage(ev.state.p);
};

console.log("hello");
