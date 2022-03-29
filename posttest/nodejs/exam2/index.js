const express = require('express');
const oracledb = require('oracledb');
const port = 8080;
const dbConfig = {
  user: 'gosoft13',
  password: '12345678',
  connectString: '45.32.119.244:1521',
};

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('views'));
app.get('/', function (req, res) {
  res.render('register', { title: 'register' });
});

app.get('/register', function (req, res) {
  res.render('register', { title: 'register' });
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const saltRound = 10;

  const hash = bcrypt.hashSync(password, +saltRound);
  console.log(hash);

  const connection = await oracledb.getConnection(dbConfig);
  const result = await connection.execute(
    `
    INSERT INTO GOSOFT13."user"
    (USERNAME, PASSWORD)
    VALUES(:0, :1)
    `,
    [username, hash],
    { autoCommit: true }
  );

  res.render('register_completed', {
    title: 'register_completed',
    user: { id: result.lastRowid, username: username },
  });
});

app.get('/login', function (req, res) {
  res.render('login', { title: 'login' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const connection = await oracledb.getConnection(dbConfig);
  const { rows } = await connection.execute(
    `
    SELECT ID,USERNAME, PASSWORD
    FROM GOSOFT13."user"
    WHERE USERNAME = :0
    
    `,
    [username],
    {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    }
  );

  if (rows.length === 0) {
    res.render('login_completed', { title: 'login_completed' });
  } else {
    const match = await bcrypt.compare(password, rows[0].PASSWORD);
    if (match) {
      const accessToken = jwt.sign({ username: rows[0].USERNAME }, 'secret');

      // localStorage.setItem('accessToken', accessToken);

      res.render('profile', {
        title: 'profile',
        user: { id: rows[0].ID, username: rows[0].USERNAME },
      });
    } else {
      res.render('login_completed', {
        title: 'login_completed',
      });
    }
  }
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
  // localStorage.removeItem('accessToken');
  res.render('login', { title: 'login' });
});

app.get('/profile', function (req, res) {
  res.render('profile', { title: 'profile' });
});

async function checkConnection() {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    console.log('connected to database');
  } catch (err) {
    console.error(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
        console.log('close connection success');
      } catch (err) {
        console.error(err.message);
      }
    }
  }
}

app.listen(port, () => {
  checkConnection();
  console.log(`Listening at http://localhost:${port}`);
});
