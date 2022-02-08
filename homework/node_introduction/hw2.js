const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));
const http = require('http');

const swap = (arr) => {
  const result = [];
  for (let index = 0; index < arr.length; index += 2) {
    result.push(arr[index + 1], arr[index]);
  }
  return result;
};

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`${swap(alphabet).join(' ')}`);
  })
  .listen(2337, '127.0.0.1');
