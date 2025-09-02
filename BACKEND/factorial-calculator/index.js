const factorial = require("./factorial");

const values = [5, 7, 10, -3, "hello"];

values.forEach((val) => {
  const result = factorial(val);
  console.log(`Factorial of ${val} is: ${result}`);
});
