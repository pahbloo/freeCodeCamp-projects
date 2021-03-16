function palindrome(str) {
  let arr = str.toLowerCase().match(/[a-z0-9]/gi);

  // There is no need to continue checking
  // after the first half of the string
  return arr
    .slice(0, arr.length / 2)
    .every((letter, index) => letter === arr.slice(-1 - index)[0]);
}

const projects = {
  "palindrome-checker": {
    title: "Palindrome Checker",
    problem: `<p>
        Return <code>true</code> if the given string is a palindrome. Otherwise,
        return <code>false</code>.
      </p>
      <p>
        A <dfn>palindrome</dfn> is a word or sentence that's spelled the same way
        both forward and backward, ignoring punctuation, case, and spacing.
      </p>
      <p>
        <strong>Note:</strong> You'll need to remove
        <strong>all non-alphanumeric characters</strong> (punctuation, spaces and
        symbols) and turn everything into the same case (lower or upper case) in
        order to check for palindromes.
      </p>
      <p>
        We'll pass strings with varying formats, such as <code>"racecar"</code>,
        <code>"RaceCar"</code>, and <code>"race CAR"</code> among others.
      </p>
      <p>
        We'll also pass strings with special symbols, such as
        <code>"2A3*3a2"</code>, <code>"2A3 3a2"</code>, and
        <code>"2_A3*3#A2"</code>.
      </p>`,
    solution: palindrome,
    tests: [
      {
        text:
          "<code>palindrome(&quot;eye&quot;)</code> should return a boolean.",
        code: typeof palindrome("eye") === "boolean",
      },
      {
        text: "<code>palindrome(&quot;eye&quot;)</code> should return true.",
        code: palindrome("eye") === true,
      },
      {
        text: "<code>palindrome(&quot;_eye&quot;)</code> should return true.",
        code: palindrome("_eye") === true,
      },
      {
        text:
          "<code>palindrome(&quot;race car&quot;)</code> should return true.",
        code: palindrome("race car") === true,
      },
      {
        text:
          "<code>palindrome(&quot;not a palindrome&quot;)</code> should return false.",
        code: palindrome("not a palindrome") === false,
      },
      {
        text:
          "<code>palindrome(&quot;A man, a plan, a canal. Panama&quot;)</code> should return true.",
        code: palindrome("A man, a plan, a canal. Panama") === true,
      },
      {
        text:
          "<code>palindrome(&quot;never odd or even&quot;)</code> should return true.",
        code: palindrome("never odd or even") === true,
      },
      {
        text: "<code>palindrome(&quot;nope&quot;)</code> should return false.",
        code: palindrome("nope") === false,
      },
      {
        text:
          "<code>palindrome(&quot;almostomla&quot;)</code> should return false.",
        code: palindrome("almostomla") === false,
      },
      {
        text:
          "<code>palindrome(&quot;My age is 0, 0 si ega ym.&quot;)</code> should return true.",
        code: palindrome("My age is 0, 0 si ega ym.") === true,
      },
      {
        text:
          "<code>palindrome(&quot;1 eye for of 1 eye.&quot;)</code> should return false.",
        code: palindrome("1 eye for of 1 eye.") === false,
      },
      {
        text:
          "<code>palindrome(&quot;0_0 (: /- :) 0-0&quot;)</code> should return true.",
        code: palindrome("0_0 (: /- :) 0-0") === true,
      },
      {
        text:
          "<code>palindrome(&quot;five|_/|four&quot;)</code> should return false.",
        code: palindrome("five|_/|four") === false,
      },
    ],
  },
  "roman-numeral-converter": {
    title: "",
    problem: "",
    solution: "",
    tests: [],
  },
  "caesar-cipher": { title: "", problem: "", solution: "", tests: [] },
  "telephone-number-validator": {
    title: "",
    problem: "",
    solution: "",
    tests: [],
  },
  "cash-register": { title: "", problem: "", solution: "", tests: [] },
};

function id(identifier) {
  return document.getElementById(identifier);
}
let title = id("title");
let problem = id("problem");
let solution = id("my-solution");
let tests = id("tests");

let project = "palindrome-checker";

title.innerHTML = projects[project].title;
problem.innerHTML = projects[project].problem;
solution.innerHTML = projects[project].solution.toString();

projects[project].tests.forEach(({ text, code }) => {
  let p = document.createElement("p");

  p.innerHTML = (code ? "✔" : "❌") + " " + text;

  tests.appendChild(p);
});
