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

