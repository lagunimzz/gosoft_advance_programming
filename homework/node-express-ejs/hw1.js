const express = require('express');
const { solve24 } = require('./solve24');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/number', (req, res) => {
  const { number_array } = req.body;

  if (number_array.some((n) => n > 9 || n < 1)) {
    res.send(403).send({ message: 'found number greater than 9' });
  } else {
    const result = solve24(number_array.join(''));
    res.send({ result });
  }
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
