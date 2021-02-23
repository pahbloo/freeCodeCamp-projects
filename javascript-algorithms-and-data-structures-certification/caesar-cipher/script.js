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
