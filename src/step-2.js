const { Transform } = require("stream");

const reversefn = new Transform({
  transform(chunk, encoding, callback) {
    const reversed = chunk.toString().split("").reverse().join("");
    callback(null, reversed);
  },
});

const food = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Banana");
  }, 10000);
});

const reversefnA = new Transform({
  transform(chunk, encoding, callback) {
    const reversed = chunk.toString().split("A").reverse().join("");
    food.then((f) => {
      console.log("here is your food", f);
    });
    callback(null, reversed);
  },
});

process.stdin.pipe(reversefnA).pipe(reversefn).pipe(process.stdout);
