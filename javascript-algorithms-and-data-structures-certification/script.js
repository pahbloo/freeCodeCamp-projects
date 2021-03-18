function palindrome(str) {
  let arr = str.toLowerCase().match(/[a-z0-9]/gi);

  // There is no need to continue checking
  // after the first half of the string
  return arr
    .slice(0, arr.length / 2)
    .every((letter, index) => letter === arr.slice(-1 - index)[0]);
}

function convertToRoman(num) {
  if (num >= 4000) return;
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

function telephoneCheck(str) {
  const regex = new RegExp(
    "^1? ?" + //optional USA country code
      "(\\(\\d{3}\\)|\\d{3})" + // area code
      "[ -]?\\d{3}" + //first group
      "[ -]?\\d{4}$" //last group
  );
  return regex.test(str);
}

function checkCashRegister(price, cash, cid) {
  //To avoid rounding problems
  const times100 = (x) => Math.floor(100 * x);
  cash = times100(cash);
  price = times100(price);

  const values = {
    PENNY: 1,
    NICKEL: 5,
    DIME: 10,
    QUARTER: 25,
    ONE: 100,
    FIVE: 500,
    TEN: 1000,
    TWENTY: 2000,
    "ONE HUNDRED": 10000,
  };

  const registerCash = cid.reduce(
    (total, [, value]) => times100(value) + total,
    0
  );

  if (cash - price > registerCash)
    return {
      status: "INSUFFICIENT_FUNDS",
      change: [],
    };

  if (cash - price === registerCash)
    return {
      status: "CLOSED",
      change: cid,
    };

  let obj = cid.reduceRight(
    (obj, el) => {
      let unit = el[0];
      let value = values[unit];
      let amount = times100(el[1]);
      let remainder =
        cash -
        price -
        obj.change.reduce((given, [, value]) => given + value, 0);

      //There's no way to return the exact change
      if (unit === "PENNY" && remainder > amount)
        return {
          status: "INSUFFICIENT_FUNDS",
          change: [],
        };

      //All the change was given
      if (remainder <= 0) {
        return obj;
      }

      //There's no way to give this bill as change
      if (value > remainder) return obj;

      //Give all of this bill
      if (amount < remainder) {
        obj.change.push([el[0], times100(el[1])]);
        return obj;
      }

      obj.change.push([unit, Math.floor(remainder / value) * value]);
      return obj;
    },
    { status: "OPEN", change: [] }
  );

  obj.change = obj.change.map((el) => [el[0], el[1] / 100]);

  return obj;
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
    title: "Roman Numeral Converter",
    problem: `<p>Convert the given number into a roman numeral.</p>
      <p>
        All
        <a href="http://www.mathsisfun.com/roman-numerals.html">roman numerals</a>
        answers should be provided in upper-case.
      </p>`,
    solution: convertToRoman,
    tests: [
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
        text:
          "<code>convertToRoman(68)</code> should return &quot;LXVIII&quot;.",
        code: convertToRoman(68) === "LXVIII",
      },
      {
        text:
          "<code>convertToRoman(83)</code> should return &quot;LXXXIII&quot;.",
        code: convertToRoman(83) === "LXXXIII",
      },
      {
        text:
          "<code>convertToRoman(97)</code> should return &quot;XCVII&quot;.",
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
        text:
          "<code>convertToRoman(649)</code> should return &quot;DCXLIX&quot;.",
        code: convertToRoman(649) === "DCXLIX",
      },
      {
        text:
          "<code>convertToRoman(798)</code> should return &quot;DCCXCVIII&quot;.",
        code: convertToRoman(798) === "DCCXCVIII",
      },
      {
        text:
          "<code>convertToRoman(891)</code> should return &quot;DCCCXCI&quot;.",
        code: convertToRoman(891) === "DCCCXCI",
      },
      {
        text: "<code>convertToRoman(1000)</code> should return &quot;M&quot;.",
        code: convertToRoman(1000) === "M",
      },
      {
        text:
          "<code>convertToRoman(1004)</code> should return &quot;MIV&quot;.",
        code: convertToRoman(1004) === "MIV",
      },
      {
        text:
          "<code>convertToRoman(1006)</code> should return &quot;MVI&quot;.",
        code: convertToRoman(1006) === "MVI",
      },
      {
        text:
          "<code>convertToRoman(1023)</code> should return &quot;MXXIII&quot;.",
        code: convertToRoman(1023) === "MXXIII",
      },
      {
        text:
          "<code>convertToRoman(2014)</code> should return &quot;MMXIV&quot;.",
        code: convertToRoman(2014) === "MMXIV",
      },
      {
        text:
          "<code>convertToRoman(3999)</code> should return &quot;MMMCMXCIX&quot;.",
        code: convertToRoman(3999) === "MMMCMXCIX",
      },
    ],
  },
  "caesars-cipher": {
    title: "Caesars Cipher",
    problem: "",
    solution: rot13,
    tests: [],
  },
  "telephone-number-validator": {
    title: "Telephone Number Validator",
    problem: "",
    solution: telephoneCheck,
    tests: [],
  },
  "cash-register": {
    title: "Cash Register",
    problem: "",
    solution: checkCashRegister,
    tests: [],
  },
};

const id = (identifier) => document.getElementById(identifier);

let title = id("title");
let problem = id("problem");
let solution = id("my-solution");
let tests = id("tests");

const URLParams = new URL(document.location).searchParams;
let project = URLParams.get("p") || "palindrome-checker";

title.innerHTML = projects[project].title;
problem.innerHTML = projects[project].problem;
solution.innerHTML = projects[project].solution.toString();

projects[project].tests.forEach(({ text, code }) => {
  let p = document.createElement("p");
  p.innerHTML = `${code ? "✔" : "❌"} ${text}`;
  tests.appendChild(p);
});
