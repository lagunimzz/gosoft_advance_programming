const http = require('http');

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Thanawat Leetrakulnamchai\n${new Date()}`);
  })
  .listen(2337, '127.0.0.1');
