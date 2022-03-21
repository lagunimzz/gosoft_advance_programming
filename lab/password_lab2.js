const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const JWT = require('jsonwebtoken');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const validate = (decoded) => {
  if (
    decoded.name === 'Thanawat Leetrakulnamchai' &&
    decoded.email === 'thanawatlee@gosoft.co.th'
  ) {
    return true;
  } else {
    return false;
  }
};

app.get('/', (req, res) => {
  const token = JWT.sign(
    {
      id: 1,
      name: 'Thanawat Leetrakulnamchai',
      email: 'thanawatlee@gosoft.co.th',
    },
    'mysecretKey',
    {
      expiresIn: '7d',
    }
  );

  // Gen token
  res.send({
    token: token,
  });
});

app.use((req, res, next) => {
  const bearer = req.headers.authorization.split(' ');

  if (bearer[0] === 'Bearer' && bearer.length === 2) {
    const token = bearer[1];

    if (validate(JWT.decode(token))) {
      res.locals.token = token;
      next();
    } else {
      res.send(403);
    }
  } else {
    res.send(403);
  }
});

app.get('/me', (req, res) => {
  res.send({ token: res.locals.token });
});

app.listen(3000);
