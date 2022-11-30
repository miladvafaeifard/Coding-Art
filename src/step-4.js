const { Transform } = require("stream");

const reverseFn = (fn, newParam) =>
  new Transform({
    transform(chunk, encoding, callback) {
      if (newParam) {
        console.log("hello welcome", newParam);
      }
      callback(null, fn(chunk));
    },
  });

const reverseStrategy = reverseFn((chunk) =>
  chunk.toString().split("").reverse().join("")
);

const reverseStrategyWithA = reverseFn(
  (chunk) => chunk.toString().split("A").reverse().join(""),
  "something"
);

process.stdin
  // .pipe(reverseStrategy)
  .pipe(reverseStrategyWithA)
  .pipe(process.stdout);
