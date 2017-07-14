# t
A simple function that verifies the arguments and return values of a function satisfy conditions.

## Examples

Let's say you have a function called `add` and you want to make sure its 2 arguments are both numbers and you want to make sure that its return value is also a number. Here's how you would do that.

```javascript
const isNumber = arg => typeof arg === "number";

const add = t(isNumber, isNumber, isNumber)(
  (a, b) => a + b
);

console.log(add(1, 2)); // 3

console.log(add("1", 2)); // throws an error because "1" is a string, not a number
```

The cool thing about using condition functions is that you can compose them and create more complex condition functions.

Here's a square-root function that accepts a positive number and returns a positive number.

```javascript
const isPositive = x => x >= 0;
const isInt = x => x % 1 === 0;
const isPositiveInt = x => isPositive(x) && isInt(x);

const sqrt = t(isPositiveInt, isPositive)(x => {
  const tolerance = 0.0000000001 * x;
  const isGoodEnough = guess => Math.abs(guess * guess - x) < tolerance;
  const improve = guess => isGoodEnough(guess) ? guess : improve((guess + x / guess) / 2);
  return improve(1);
});

console.log(sqrt(9)); // 3
console.log(sqrt(-9)); // throws error because -9 is not positive
console.log(sqrt(1.01)); // throws error because 1.01 is not an integer
```

You can even use your functions as condition functions to other functions (this example is probably not very practical, but it's definitely cool to think about how you can make your arguments and return values satisfy some interesting conditions).

```javascript
const hasIntSqrt = x => isInt(sqrt(x));
const square = t(isInt, hasIntSqrt)(
  x => x * x
);

console.log(square(4)); // 16
```
