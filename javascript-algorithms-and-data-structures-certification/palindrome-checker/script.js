function palindrome(str) {
  let arr = str.toLowerCase().match(/[a-z0-9]/gi);

  // There is no need to continue checking
  // after the first half of the string
  return arr
    .slice(0, arr.length / 2)
    .every((letter, index) => letter === arr.slice(-1 - index)[0]);
}

let code = document.getElementById("my-solution");
code.innerText = palindrome.toString();
