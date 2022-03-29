const express = require('express');
const bodyParser = require('body-parser');
const port = 8080;
const oracledb = require('oracledb');

const dbConfig = {
  user: 'gosoft13',
  password: '12345678',
  connectString: '45.32.119.244:1521',
};

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('views'));

app.get('/', function (req, res) {
  res.render('index', { title: 'index' });
});

app.get('/employee', async (req, res) => {
  const connection = await oracledb.getConnection(dbConfig);
  const { rows } = await connection.execute(
    `
    SELECT e."id", "firstname", "lastname", "job_id", "job_name"
    FROM GOSOFT13."employee" e
    LEFT JOIN "job" j 
    ON j."id"  = e."id" 
    `,
    [],
    {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    }
  );

  res.render('employee', {
    title: 'employee',
    employee: rows.map((r) => {
      return { ...r, image_name: `./img/${r.job_name}.jpg` };
    }),
  });
});

app.get('/job-no-one/:job_id', async (req, res) => {
  const { job_id } = req.params;
  console.log(job_id);
  const connection = await oracledb.getConnection(dbConfig);
  const { rows } = await connection.execute(
    `
      SELECT "id", "job_name", "salary"
      FROM GOSOFT13."job"
      WHERE "id" = :job_id
    `,
    [job_id],
    {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    }
  );

  res.render('job', {
    title: 'job',
    job: rows[0],
  });
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
