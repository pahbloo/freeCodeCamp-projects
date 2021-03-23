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

/*!
 * Check if two objects or arrays are equal
 * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Object|Array}  value  The first object or array to compare
 * @param  {Object|Array}  other  The second object or array to compare
 * @return {Boolean}              Returns true if they're equal
 */
var isEqual = function (value, other) {
  // Get the value type
  var type = Object.prototype.toString.call(value);

  // If the two objects are not the same type, return false
  if (type !== Object.prototype.toString.call(other)) return false;

  // If items are not an object or array, return false
  if (["[object Array]", "[object Object]"].indexOf(type) < 0) return false;

  // Compare the length of the length of the two items
  var valueLen =
    type === "[object Array]" ? value.length : Object.keys(value).length;
  var otherLen =
    type === "[object Array]" ? other.length : Object.keys(other).length;
  if (valueLen !== otherLen) return false;

  // Compare two items
  var compare = function (item1, item2) {
    // Get the object type
    var itemType = Object.prototype.toString.call(item1);

    // If an object or array, compare recursively
    if (["[object Array]", "[object Object]"].indexOf(itemType) >= 0) {
      if (!isEqual(item1, item2)) return false;
    }

    // Otherwise, do a simple comparison
    else {
      // If the two items are not the same type, return false
      if (itemType !== Object.prototype.toString.call(item2)) return false;

      // Else if it's a function, convert to a string and compare
      // Otherwise, just compare
      if (itemType === "[object Function]") {
        if (item1.toString() !== item2.toString()) return false;
      } else {
        if (item1 !== item2) return false;
      }
    }
  };

  // Compare properties
  if (type === "[object Array]") {
    for (var i = 0; i < valueLen; i++) {
      if (compare(value[i], other[i]) === false) return false;
    }
  } else {
    for (var key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        if (compare(value[key], other[key]) === false) return false;
      }
    }
  }

  // If nothing failed, return true
  return true;
};

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
    problem: `<p>
        One of the simplest and most widely known <dfn>ciphers</dfn> is a
        <dfn>Caesar cipher</dfn>, also known as a <dfn>shift cipher</dfn>. In a
        shift cipher the meanings of the letters are shifted by some set amount.
      </p>
      <p>
        A common modern use is the
        <a href="https://en.wikipedia.org/wiki/ROT13">ROT13</a> cipher, where the
        values of the letters are shifted by 13 places. Thus 'A' ↔ 'N', 'B' ↔ 'O'
        and so on.
      </p>
      <p>
        Write a function which takes a
        <a href="https://en.wikipedia.org/wiki/ROT13">ROT13</a> encoded string as
        input and returns a decoded string.
      </p>
      <p>
        All letters will be uppercase. Do not transform any non-alphabetic
        character (i.e. spaces, punctuation), but do pass them on.
      </p>`,
    solution: rot13,
    tests: [
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
    ],
  },
  "telephone-number-validator": {
    title: "Telephone Number Validator",
    problem: `<p>
        Return <code>true</code> if the passed string looks like a valid US phone
        number.
      </p>
      <p>
        The user may fill out the form field any way they choose as long as it has
        the format of a valid US number. The following are examples of valid
        formats for US numbers (refer to the tests below for other variants):
      </p>
      <blockquote>
        555-555-5555<br />(555)555-5555<br />(555) 555-5555<br />555 555 5555<br />5555555555<br />1
        555 555 5555
      </blockquote>
      <p>
        For this challenge you will be presented with a string such as
        <code>800-692-7753</code> or <code>8oo-six427676;laskdjf</code>. Your job
        is to validate or reject the US phone number based on any combination of
        the formats provided above. The area code is required. If the country code
        is provided, you must confirm that the country code is <code>1</code>.
        Return <code>true</code> if the string is a valid US phone number;
        otherwise return <code>false</code>.
      </p>`,
    solution: telephoneCheck,
    tests: [
      {
        text:
          '<code>telephoneCheck("555-555-5555")</code> should return a boolean.',
        code: typeof telephoneCheck("555-555-5555") === "boolean",
      },
      {
        text:
          '<code>telephoneCheck("1 555-555-5555")</code> should return true.',
        code: telephoneCheck("1 555-555-5555") === true,
      },
      {
        text:
          '<code>telephoneCheck("1 (555) 555-5555")</code> should return true.',
        code: telephoneCheck("1 (555) 555-5555") === true,
      },
      {
        text: '<code>telephoneCheck("5555555555")</code> should return true.',
        code: telephoneCheck("5555555555") === true,
      },
      {
        text: '<code>telephoneCheck("555-555-5555")</code> should return true.',
        code: telephoneCheck("555-555-5555") === true,
      },
      {
        text:
          '<code>telephoneCheck("(555)555-5555")</code> should return true.',
        code: telephoneCheck("(555)555-5555") === true,
      },
      {
        text:
          '<code>telephoneCheck("1(555)555-5555")</code> should return true.',
        code: telephoneCheck("1(555)555-5555") === true,
      },
      {
        text: '<code>telephoneCheck("555-5555")</code> should return false.',
        code: telephoneCheck("555-5555") === false,
      },
      {
        text: '<code>telephoneCheck("5555555")</code> should return false.',
        code: telephoneCheck("5555555") === false,
      },
      {
        text:
          '<code>telephoneCheck("1 555)555-5555")</code> should return false.',
        code: telephoneCheck("1 555)555-5555") === false,
      },
      {
        text:
          '<code>telephoneCheck("1 555 555 5555")</code> should return true.',
        code: telephoneCheck("1 555 555 5555") === true,
      },
      {
        text:
          '<code>telephoneCheck("1 456 789 4444")</code> should return true.',
        code: telephoneCheck("1 456 789 4444") === true,
      },
      {
        text:
          '<code>telephoneCheck("123**&amp;!!asdf#")</code> should return false.',
        code: telephoneCheck("123**&!!asdf#") === false,
      },
      {
        text: '<code>telephoneCheck("55555555")</code> should return false.',
        code: telephoneCheck("55555555") === false,
      },
      {
        text: '<code>telephoneCheck("(6054756961)")</code> should return false',
        code: telephoneCheck("(6054756961)") === false,
      },
      {
        text:
          '<code>telephoneCheck("2 (757) 622-7382")</code> should return false.',
        code: telephoneCheck("2 (757) 622-7382") === false,
      },
      {
        text:
          '<code>telephoneCheck("0 (757) 622-7382")</code> should return false.',
        code: telephoneCheck("0 (757) 622-7382") === false,
      },
      {
        text:
          '<code>telephoneCheck("-1 (757) 622-7382")</code> should return false.',
        code: telephoneCheck("-1 (757) 622-7382") === false,
      },
      {
        text:
          '<code>telephoneCheck("2 757 622-7382")</code> should return false.',
        code: telephoneCheck("2 757 622-7382") === false,
      },
      {
        text:
          '<code>telephoneCheck("10 (757) 622-7382")</code> should return false.',
        code: telephoneCheck("10 (757) 622-7382") === false,
      },
      {
        text: '<code>telephoneCheck("27576227382")</code> should return false.',
        code: telephoneCheck("27576227382") === false,
      },
      {
        text:
          '<code>telephoneCheck("(275)76227382")</code> should return false.',
        code: telephoneCheck("(275)76227382") === false,
      },
      {
        text:
          '<code>telephoneCheck("2(757)6227382")</code> should return false.',
        code: telephoneCheck("2(757)6227382") === false,
      },
      {
        text:
          '<code>telephoneCheck("2(757)622-7382")</code> should return false.',
        code: telephoneCheck("2(757)622-7382") === false,
      },
      {
        text:
          '<code>telephoneCheck("555)-555-5555")</code> should return false.',
        code: telephoneCheck("555)-555-5555") === false,
      },
      {
        text:
          '<code>telephoneCheck("(555-555-5555")</code> should return false.',
        code: telephoneCheck("(555-555-5555") === false,
      },
      {
        text:
          '<code>telephoneCheck("(555)5(55?)-5555")</code> should return false.',
        code: telephoneCheck("(555)5(55?)-5555") === false,
      },
    ],
  },
  "cash-register": {
    title: "Cash Register",
    problem: `<p>
        Design a cash register drawer function
        <code>checkCashRegister()</code> that accepts purchase price as the first
        argument (<code>price</code>), payment as the second argument
        (<code>cash</code>), and cash-in-drawer (<code>cid</code>) as the third
        argument.
      </p>
      <p><code>cid</code> is a 2D array listing available currency.</p>
      <p>
        The <code>checkCashRegister()</code> function should always return an
        object with a <code>status</code> key and a <code>change</code> key.
      </p>
      <p>
        Return <code>{status: "INSUFFICIENT_FUNDS", change: []}</code> if
        cash-in-drawer is less than the change due, or if you cannot return the
        exact change.
      </p>
      <p>
        Return <code>{status: "CLOSED", change: [...]}</code> with cash-in-drawer
        as the value for the key <code>change</code> if it is equal to the change
        due.
      </p>
      <p>
        Otherwise, return <code>{status: "OPEN", change: [...]}</code>, with the
        change due in coins and bills, sorted in highest to lowest order, as the
        value of the <code>change</code> key.
      </p>
      <table class="table table-striped">
        <tbody>
          <tr>
            <th>Currency Unit</th>
            <th>Amount</th>
          </tr>
          <tr>
            <td>Penny</td>
            <td>$0.01 (PENNY)</td>
          </tr>
          <tr>
            <td>Nickel</td>
            <td>$0.05 (NICKEL)</td>
          </tr>
          <tr>
            <td>Dime</td>
            <td>$0.1 (DIME)</td>
          </tr>
          <tr>
            <td>Quarter</td>
            <td>$0.25 (QUARTER)</td>
          </tr>
          <tr>
            <td>Dollar</td>
            <td>$1 (ONE)</td>
          </tr>
          <tr>
            <td>Five Dollars</td>
            <td>$5 (FIVE)</td>
          </tr>
          <tr>
            <td>Ten Dollars</td>
            <td>$10 (TEN)</td>
          </tr>
          <tr>
            <td>Twenty Dollars</td>
            <td>$20 (TWENTY)</td>
          </tr>
          <tr>
            <td>One-hundred Dollars</td>
            <td>$100 (ONE HUNDRED)</td>
          </tr>
        </tbody>
      </table>
      <p>See below for an example of a cash-in-drawer array:</p>
      <pre
        class="language-js"
      ><code class=" language-js"><span class="token punctuation">[</span>
  <span class="token punctuation">[</span><span class="token string">"PENNY"</span><span class="token punctuation">,</span> <span class="token number">1.01</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span><span class="token string">"NICKEL"</span><span class="token punctuation">,</span> <span class="token number">2.05</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span><span class="token string">"DIME"</span><span class="token punctuation">,</span> <span class="token number">3.1</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span><span class="token string">"QUARTER"</span><span class="token punctuation">,</span> <span class="token number">4.25</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span><span class="token string">"ONE"</span><span class="token punctuation">,</span> <span class="token number">90</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span><span class="token string">"FIVE"</span><span class="token punctuation">,</span> <span class="token number">55</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span><span class="token string">"TEN"</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span><span class="token string">"TWENTY"</span><span class="token punctuation">,</span> <span class="token number">60</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span><span class="token string">"ONE HUNDRED"</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">]</span>
<span class="token punctuation">]</span>
    </code></pre>`,
    solution: checkCashRegister,
    tests: [
      {
        text:
          '<code>checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])</code> should return an object.',
        code:
          Object.prototype.toString.call(
            checkCashRegister(19.5, 20, [
              ["PENNY", 1.01],
              ["NICKEL", 2.05],
              ["DIME", 3.1],
              ["QUARTER", 4.25],
              ["ONE", 90],
              ["FIVE", 55],
              ["TEN", 20],
              ["TWENTY", 60],
              ["ONE HUNDRED", 100],
            ])
          ) === "[object Object]",
      },
      {
        text:
          '<code>checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])</code> should return <code>{status: "OPEN", change: [["QUARTER", 0.5]]}</code>.',
        code: isEqual(
          checkCashRegister(19.5, 20, [
            ["PENNY", 1.01],
            ["NICKEL", 2.05],
            ["DIME", 3.1],
            ["QUARTER", 4.25],
            ["ONE", 90],
            ["FIVE", 55],
            ["TEN", 20],
            ["TWENTY", 60],
            ["ONE HUNDRED", 100],
          ]),
          { status: "OPEN", change: [["QUARTER", 0.5]] }
        ),
      },
      {
        text:
          '<code>checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])</code> should return <code>{status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}</code>.',
        code: isEqual(
          checkCashRegister(3.26, 100, [
            ["PENNY", 1.01],
            ["NICKEL", 2.05],
            ["DIME", 3.1],
            ["QUARTER", 4.25],
            ["ONE", 90],
            ["FIVE", 55],
            ["TEN", 20],
            ["TWENTY", 60],
            ["ONE HUNDRED", 100],
          ]),
          {
            status: "OPEN",
            change: [
              ["TWENTY", 60],
              ["TEN", 20],
              ["FIVE", 15],
              ["ONE", 1],
              ["QUARTER", 0.5],
              ["DIME", 0.2],
              ["PENNY", 0.04],
            ],
          }
        ),
      },
      {
        text:
          '<code>checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])</code> should return <code>{status: "INSUFFICIENT_FUNDS", change: []}</code>.',
        code: isEqual(
          checkCashRegister(19.5, 20, [
            ["PENNY", 0.01],
            ["NICKEL", 0],
            ["DIME", 0],
            ["QUARTER", 0],
            ["ONE", 0],
            ["FIVE", 0],
            ["TEN", 0],
            ["TWENTY", 0],
            ["ONE HUNDRED", 0],
          ]),
          { status: "INSUFFICIENT_FUNDS", change: [] }
        ),
      },
      {
        text:
          '<code>checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])</code> should return <code>{status: "INSUFFICIENT_FUNDS", change: []}</code>.',
        code: isEqual(
          checkCashRegister(19.5, 20, [
            ["PENNY", 0.01],
            ["NICKEL", 0],
            ["DIME", 0],
            ["QUARTER", 0],
            ["ONE", 1],
            ["FIVE", 0],
            ["TEN", 0],
            ["TWENTY", 0],
            ["ONE HUNDRED", 0],
          ]),
          { status: "INSUFFICIENT_FUNDS", change: [] }
        ),
      },
      {
        text:
          '<code>checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])</code> should return <code>{status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}</code>.',
        code: isEqual(
          checkCashRegister(19.5, 20, [
            ["PENNY", 0.5],
            ["NICKEL", 0],
            ["DIME", 0],
            ["QUARTER", 0],
            ["ONE", 0],
            ["FIVE", 0],
            ["TEN", 0],
            ["TWENTY", 0],
            ["ONE HUNDRED", 0],
          ]),
          {
            status: "CLOSED",
            change: [
              ["PENNY", 0.5],
              ["NICKEL", 0],
              ["DIME", 0],
              ["QUARTER", 0],
              ["ONE", 0],
              ["FIVE", 0],
              ["TEN", 0],
              ["TWENTY", 0],
              ["ONE HUNDRED", 0],
            ],
          }
        ),
      },
    ],
  },
};

const id = (identifier) => document.getElementById(identifier);

let title = id("title");
let problem = id("problem");
let solution = id("my-solution");
let tests = id("tests");

const URLParams = new URL(document.location).searchParams;
let project = URLParams.get("p") || "palindrome-checker";

function fillPage(project) {
  document.title = projects[project].title;
  title.innerHTML = projects[project].title;
  problem.innerHTML = projects[project].problem;
  solution.innerHTML = projects[project].solution.toString();
  tests.innerHTML = "";

  projects[project].tests.forEach(({ text, code }) => {
    let p = document.createElement("p");
    p.innerHTML = `${code ? "✔" : "❌"} ${text}`;
    tests.appendChild(p);
  });

  // eslint-disable-next-line no-undef
  microlight.reset();
}

history.replaceState({ p: project }, "", `?p=${project}`);
fillPage(project);

let nav = document.getElementsByTagName("nav")[0];
nav.addEventListener("click", (ev) => {
  ev.preventDefault();
  if (!Object.prototype.hasOwnProperty.call(ev.target.attributes, "href"))
    return;
  const pAttribute = ev.target.attributes.href.value;
  history.pushState({ p: pAttribute.slice(3) }, "", pAttribute);
  fillPage(history.state.p);
});

window.onpopstate = function (ev) {
  fillPage(ev.state.p);
};
