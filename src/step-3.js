const { Transform } = require("stream");

class TransformStrategier extends Transform {
  constructor(fn) {
    super();
    this.fn = fn;
  }
  _transform(chunk, enc, cb) {
    cb(null, this.fn(chunk));
  }
}

const reverseStrategy = (chunk) =>
  chunk.toString().split("").reverse().join("");

const reverseStrategyWithA = (chunk) =>
  chunk
    .toString()
    .split('A')
    .reverse()
    .join("");

const reverser = new TransformStrategier(reverseStrategy);
const reverserA = new TransformStrategier(reverseStrategyWithA("A"));

process.stdin
  .pipe(reverser)
  .pipe(reverserA)
  .pipe(process.stdout);
