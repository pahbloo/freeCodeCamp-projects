function convertToRoman(num) {
  const roman = ` M MM MMM
 C CC CCC CD D DC DCC DCCC CM
 X XX XXX XL L LX LXX LXXX XC
 I II III IV V VI VII VIII IX`
    .split("\n")
    .map((el) => el.split(" "));

  return num
    .toString()
    .padStart(4, 0)
    .split("")
    .map((digit, index) => roman[index][digit])
    .join("");
}

let code = document.getElementById("my-solution");
code.innerHTML = convertToRoman.toString();

const tests = [
  {
    text: "<code>convertToRoman(2)</code> should return &quot;II&quot;.",
    code: convertToRoman(2) === "II",
  },
  {
    text: "<code>convertToRoman(3)</code> should return &quot;III&quot;.",
    code: convertToRoman(3) === "III",
  },
  {
    text: "<code>convertToRoman(4)</code> should return &quot;IV&quot;.",
    code: convertToRoman(4) === "IV",
  },
  {
    text: "<code>convertToRoman(5)</code> should return &quot;V&quot;.",
    code: convertToRoman(5) === "V",
  },
  {
    text: "<code>convertToRoman(9)</code> should return &quot;IX&quot;.",
    code: convertToRoman(9) === "IX",
  },
  {
    text: "<code>convertToRoman(12)</code> should return &quot;XII&quot;.",
    code: convertToRoman(12) === "XII",
  },
  {
    text: "<code>convertToRoman(16)</code> should return &quot;XVI&quot;.",
    code: convertToRoman(16) === "XVI",
  },
  {
    text: "<code>convertToRoman(29)</code> should return &quot;XXIX&quot;.",
    code: convertToRoman(29) === "XXIX",
  },
  {
    text: "<code>convertToRoman(44)</code> should return &quot;XLIV&quot;.",
    code: convertToRoman(44) === "XLIV",
  },
  {
    text: "<code>convertToRoman(45)</code> should return &quot;XLV&quot;.",
    code: convertToRoman(45) === "XLV",
  },
  {
    text: "<code>convertToRoman(68)</code> should return &quot;LXVIII&quot;.",
    code: convertToRoman(68) === "LXVIII",
  },
  {
    text: "<code>convertToRoman(83)</code> should return &quot;LXXXIII&quot;.",
    code: convertToRoman(83) === "LXXXIII",
  },
  {
    text: "<code>convertToRoman(97)</code> should return &quot;XCVII&quot;.",
    code: convertToRoman(97) === "XCVII",
  },
  {
    text: "<code>convertToRoman(99)</code> should return &quot;XCIX&quot;.",
    code: convertToRoman(99) === "XCIX",
  },
  {
    text: "<code>convertToRoman(400)</code> should return &quot;CD&quot;.",
    code: convertToRoman(400) === "CD",
  },
  {
    text: "<code>convertToRoman(500)</code> should return &quot;D&quot;.",
    code: convertToRoman(500) === "D",
  },
  {
    text: "<code>convertToRoman(501)</code> should return &quot;DI&quot;.",
    code: convertToRoman(501) === "DI",
  },
  {
    text: "<code>convertToRoman(649)</code> should return &quot;DCXLIX&quot;.",
    code: convertToRoman(649) === "DCXLIX",
  },
  {
    text:
      "<code>convertToRoman(798)</code> should return &quot;DCCXCVIII&quot;.",
    code: convertToRoman(798) === "DCCXCVIII",
  },
  {
    text: "<code>convertToRoman(891)</code> should return &quot;DCCCXCI&quot;.",
    code: convertToRoman(891) === "DCCCXCI",
  },
  {
    text: "<code>convertToRoman(1000)</code> should return &quot;M&quot;.",
    code: convertToRoman(1000) === "M",
  },
  {
    text: "<code>convertToRoman(1004)</code> should return &quot;MIV&quot;.",
    code: convertToRoman(1004) === "MIV",
  },
  {
    text: "<code>convertToRoman(1006)</code> should return &quot;MVI&quot;.",
    code: convertToRoman(1006) === "MVI",
  },
  {
    text: "<code>convertToRoman(1023)</code> should return &quot;MXXIII&quot;.",
    code: convertToRoman(1023) === "MXXIII",
  },
  {
    text: "<code>convertToRoman(2014)</code> should return &quot;MMXIV&quot;.",
    code: convertToRoman(2014) === "MMXIV",
  },
  {
    text:
      "<code>convertToRoman(3999)</code> should return &quot;MMMCMXCIX&quot;.",
    code: convertToRoman(3999) === "MMMCMXCIX",
  },
];

const testsList = document.getElementById("tests");

tests.forEach(({ text, code }) => {
  let p = document.createElement("p");

  p.innerHTML = (code ? "✔" : "❌") + " " + text;

  testsList.appendChild(p);
});
