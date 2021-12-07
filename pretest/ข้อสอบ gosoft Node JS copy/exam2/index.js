const express = require('express');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'lastmile-auroracluster-dev-rds.cluster-ckyenaczt10p.ap-southeast-1.rds.amazonaws.com',
  user: 'admin',
  password: 't2kxOr3OtgfqV5PzR8EK',
  database: 'lastmile-report',
});
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
connection.connect();
app.set('view engine', 'ejs');
app.use(express.static('views'));
app.get('/', function (req, res) {
  res.render('register', { title: 'register' });
});

app.get('/register', function (req, res) {
  res.render('register', { title: 'register' });
});

app.post('/register', function (req, res) {
  const { username, password } = req.body;
  const saltRound = 10;

  const hash = bcrypt.hashSync(password, +saltRound);
  console.log(hash);

  const sql = `INSERT INTO user (username, password) VALUES ('${username}', '${hash}')`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.render('register_completed', {
      title: 'register_completed',
      user: { id: result.insertId, username: username },
    });
  });
});

app.get('/login', function (req, res) {
  res.render('login', { title: 'login' });
});

app.post('/login', function (req, res) {
  const { username, password } = req.body;

  const sql = `SELECT id,username,password FROM user WHERE username = '${username}'`;

  connection.query(sql, async function (err, result) {
    if (err) throw err;
    if (result.length === 0) {
      res.render('login_completed', { title: 'login_completed' });
    } else {
      const match = await bcrypt.compare(password, result[0].password);
      if (match) {
        const accessToken = jwt.sign(
          { username: result[0].username },
          'secret'
        );

        // localStorage.setItem('accessToken', accessToken);

        res.render('profile', {
          title: 'profile',
          user: { id: result[0].id, username: result[0].username },
        });
      } else {
        res.render('login_completed', {
          title: 'login_completed',
        });
      }
    }
  });
});

app.use(function (req, res, next) {
  console.log('in middle');
  const decoded = jwt.verify(localStorage.getItem('accessToken'), 'secret');
  if (!decoded) {
    res.render('login');
  } else {
    next();
  }
});

app.get('/logout', function (req, res) {
  //   localStorage.removeItem('accessToken');
  res.render('login', { title: 'login' });
});

app.get('/profile', function (req, res) {
  res.render('profile', { title: 'profile' });
});
app.listen(8080);
