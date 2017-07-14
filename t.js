const t = (...conditions) => {
  if (!conditions.every(cond => typeof cond === "function")) {
    throw new Error(
      `All conditions need to be functions, but you passed in: ${conditions}`
    );
  }

  return f => {
    if (typeof f !== "function") {
      throw new Error(
        `You need to pass in a function, but you passed in: ${JSON.stringify(f)}`
      );
    }

    return (...args) => {
      if (args.length !== conditions.length - 1) {
        throw new Error(
          `You passed in the wrong number of arguments to ${f.name || "a function"}. ` +
          `It was expecting ${conditions.length - 1} arguments, but you passed in ${args.length} arguments.`
        );
      }

      if (!args.every((arg, i) => conditions[i](arg))) {
        const stringArgs = args.map(arg =>
          typeof arg === "function" ? arg.toString() : JSON.stringify(arg)
        ).join(", ");

        throw new Error(
          `You passed in arguments to ${f.name || "a function"} that don't satisfy the conditions. ` +
          `Here are the arguments you passed in: ${stringArgs}. ` +
          `Here are the conditions that need to be satisfied: ${conditions.slice(0, -1)}.`
        );
      }

      const result = f(...args);

      if (!conditions[conditions.length - 1](result)) {
        throw new Error(
          `The result ${f.name || "a function"} returns does not satisfy the return condition. ` +
          `It returned ${typeof result === "function" ? result : JSON.stringify(result)}. ` +
          `Here is the condition it needs to satisfy: ${conditions[conditions.length - 1]}`
        );
      }

      return result;
    };
  };
};

// Example usage

const isNumber = arg => typeof arg === "number";
const add = t(isNumber, isNumber, isNumber)(
  (a, b) => a + b
);
console.log(add(1, 2)); // 3
// console.log(add("1", 2)); // throws error

// You can also write more complex conditions
// Here's a square-root function that only accepts positive numbers

const isPositive = x => x >= 0;
const sqrt = t(isPositive, isPositive)(x => {
  const tolerance = 0.0000000001 * x;
  const isGoodEnough = guess => Math.abs(guess * guess - x) < tolerance;
  const improve = guess => isGoodEnough(guess) ? guess : improve((guess + x / guess) / 2);
  return improve(1);
});

console.log(sqrt(9)); // 3
// console.log(sqrt(-9)); // throws error
