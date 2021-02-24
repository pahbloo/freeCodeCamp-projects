function rot13(str) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const shift = 13;

  return str
    .split("")
    .map((char) => {
      const charIndex = alphabet.indexOf(char);
      return charIndex === -1
        ? char
        : charIndex >= shift
        ? alphabet[charIndex - shift]
        : alphabet[alphabet.length - shift + charIndex];
    })
    .join("");
}

let code = document.getElementById("my-solution");
code.innerHTML = rot13.toString();

const tests = [
  {
    text:
      "<code>rot13(&quot;SERR PBQR PNZC&quot;)</code> should decode to <code>FREE CODE CAMP</code>",
    code: rot13("SERR PBQR PNZC") === "FREE CODE CAMP",
  },
  {
    text:
      "<code>rot13(&quot;SERR CVMMN!&quot;)</code> should decode to <code>FREE PIZZA!</code>",
    code: rot13("SERR CVMMN!") === "FREE PIZZA!",
  },
  {
    text:
      "<code>rot13(&quot;SERR YBIR?&quot;)</code> should decode to <code>FREE LOVE?</code>",
    code: rot13("SERR YBIR?") === "FREE LOVE?",
  },
  {
    text:
      "<code>rot13(&quot;GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.&quot;)</code> should decode to <code>THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.</code>",
    code:
      rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.") ===
      "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.",
  },
];

const testsList = document.getElementById("tests");

tests.forEach(({ text, code }) => {
  let p = document.createElement("p");

  p.innerHTML = (code ? "✔" : "❌") + " " + text;

  testsList.appendChild(p);
});
