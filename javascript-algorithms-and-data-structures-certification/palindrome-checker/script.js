function palindrome(str) {
  let arr = str.toLowerCase().match(/[a-z0-9]/gi);

  // There is no need to continue checking
  // after the first half of the string
  return arr
    .slice(0, arr.length / 2)
    .every((letter, index) => letter === arr.slice(-1 - index)[0]);
}

let code = document.getElementById("my-solution");
code.innerHTML = palindrome.toString();

const tests = [
  {
    text: "<code>palindrome(&quot;eye&quot;)</code> should return a boolean.",
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
    text: "<code>palindrome(&quot;race car&quot;)</code> should return true.",
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
];

const testsList = document.getElementById("tests");

tests.forEach(({ text, code }) => {
  let p = document.createElement("p");

  p.innerHTML = (code ? "✔" : "❌") + " " + text;

  testsList.appendChild(p);
});
