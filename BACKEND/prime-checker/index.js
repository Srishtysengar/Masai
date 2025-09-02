const isPrime = require("./isPrime");

const numbers = [2, 10, 17, 21, 29];

numbers.forEach((num) => {
  if (typeof num !== "number") {
    console.log(`${num} is not a valid number.`);
  } else if (isPrime(num)) {
    console.log(`${num} is a prime number.`);
  } else {
    console.log(`${num} is not a prime number.`);
  }
});