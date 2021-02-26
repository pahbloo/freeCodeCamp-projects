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

let code = document.getElementById("my-solution");
code.innerHTML = checkCashRegister.toString();

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

const tests = [
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
];

const testsList = document.getElementById("tests");

tests.forEach(({ text, code }) => {
  let p = document.createElement("p");

  p.innerHTML = (code ? "✔" : "❌") + " " + text;

  testsList.appendChild(p);
});
