# t
A simple function that verifies the arguments and return values of a function satisfy conditions.

## Examples

```javascript
const isNumber = arg => typeof arg === "number";
const add = t(isNumber, isNumber, isNumber)(
  (a, b) => a + b
);
console.log(add(1, 2)); // 3
console.log(add("1", 2)); // throws error because a string was passed in

// You can also write more complex conditions
// Here's a square-root function that only accepts positive numbers

const isPositive = x => isNumber(x) && x >= 0;
const sqrt = t(isPositive, isPositive)(x => {
  const tolerance = 0.0000000001 * x;
  const isGoodEnough = guess => Math.abs(guess * guess - x) < tolerance;
  const improve = guess => isGoodEnough(guess) ? guess : improve((guess + x / guess) / 2);
  return improve(1);
});

console.log(sqrt(9)); // 3
console.log(sqrt(-9)); // throws error because -9 is not a positive number
```
