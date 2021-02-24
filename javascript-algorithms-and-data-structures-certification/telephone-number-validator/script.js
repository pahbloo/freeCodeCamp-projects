function telephoneCheck(str) {
  const regex = new RegExp(
    "^1? ?" + //optional USA country code
      "(\\(\\d{3}\\)|\\d{3})" + // area code
      "[ -]?\\d{3}" + //first group
      "[ -]?\\d{4}$" //last group
  );
  return regex.test(str);
}

let code = document.getElementById("my-solution");
code.innerHTML = telephoneCheck.toString();

tests = [
  {
    text:
      '<code>telephoneCheck("555-555-5555")</code> should return a boolean.',
    code: typeof telephoneCheck("555-555-5555") === "boolean",
  },
  {
    text: '<code>telephoneCheck("1 555-555-5555")</code> should return true.',
    code: telephoneCheck("1 555-555-5555") === true,
  },
  {
    text: '<code>telephoneCheck("1 (555) 555-5555")</code> should return true.',
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
    text: '<code>telephoneCheck("(555)555-5555")</code> should return true.',
    code: telephoneCheck("(555)555-5555") === true,
  },
  {
    text: '<code>telephoneCheck("1(555)555-5555")</code> should return true.',
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
    text: '<code>telephoneCheck("1 555)555-5555")</code> should return false.',
    code: telephoneCheck("1 555)555-5555") === false,
  },
  {
    text: '<code>telephoneCheck("1 555 555 5555")</code> should return true.',
    code: telephoneCheck("1 555 555 5555") === true,
  },
  {
    text: '<code>telephoneCheck("1 456 789 4444")</code> should return true.',
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
    text: '<code>telephoneCheck("2 757 622-7382")</code> should return false.',
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
    text: '<code>telephoneCheck("(275)76227382")</code> should return false.',
    code: telephoneCheck("(275)76227382") === false,
  },
  {
    text: '<code>telephoneCheck("2(757)6227382")</code> should return false.',
    code: telephoneCheck("2(757)6227382") === false,
  },
  {
    text: '<code>telephoneCheck("2(757)622-7382")</code> should return false.',
    code: telephoneCheck("2(757)622-7382") === false,
  },
  {
    text: '<code>telephoneCheck("555)-555-5555")</code> should return false.',
    code: telephoneCheck("555)-555-5555") === false,
  },
  {
    text: '<code>telephoneCheck("(555-555-5555")</code> should return false.',
    code: telephoneCheck("(555-555-5555") === false,
  },
  {
    text:
      '<code>telephoneCheck("(555)5(55?)-5555")</code> should return false.',
    code: telephoneCheck("(555)5(55?)-5555") === false,
  },
];

testsList = document.getElementById("tests");

tests.forEach(({ text, code }) => {
  let p = document.createElement("p");

  p.innerHTML = (code ? "✔" : "❌") + " " + text;

  testsList.appendChild(p);
});
