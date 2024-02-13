export default function isPalindromeNumber(num: number): boolean {
  var numString = num.toString();
  return numString.split("").reverse().join("") === numString;
};
