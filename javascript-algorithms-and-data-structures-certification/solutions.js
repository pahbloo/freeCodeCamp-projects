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

export { palindrome, convertToRoman, rot13, telephoneCheck, checkCashRegister };
