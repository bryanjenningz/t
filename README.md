# t
A simple function that verifies the arguments and return values of a function satisfy conditions.

## Examples

```javascript
const isNumber = arg => typeof arg === "number";

// The t(isNumber, isNumber, isNumber) part are the condition functions.
// The first 2 isNumber functions are for the 2 arguments.
// The last isNumber function is for the return value.
const add = t(isNumber, isNumber, isNumber)(
  (a, b) => a + b
);

console.log(add(1, 2)); // 3

// Throws an error because a string was passed in and isNumber("1") returns false.
console.log(add("1", 2)); 

// You can also write more complex conditions
// Here's a square-root function that only accepts positive numbers

const isPositive = x => isNumber(x) && x >= 0;

// We're saying that sqrt is a function that takes a positive number
// and returns a positive number.
const sqrt = t(isPositive, isPositive)(x => {
  const tolerance = 0.0000000001 * x;
  const isGoodEnough = guess => Math.abs(guess * guess - x) < tolerance;
  const improve = guess => isGoodEnough(guess) ? guess : improve((guess + x / guess) / 2);
  return improve(1);
});

console.log(sqrt(9)); // 3
console.log(sqrt(-9)); // throws error because -9 is not a positive number
```
