const express = require('express');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'admin',
  database: 'db',
});

const app = express();
connection.connect();
app.set('view engine', 'ejs');
app.use(express.static('views'));
app.get('/', function (req, res) {
  res.render('index', { title: 'index' });
});
app.get('/employee', function async(req, res) {
  connection.query(
    `SELECT employee.id,firstname,lastname,job_name
     FROM employee
     LEFT JOIN job ON employee.job_id = job.id
     `,
    function (error, results, fields) {
      if (error) throw error;
      res.render('employee', {
        title: 'employee',
        employee: results.map((r) => {
          return { ...r, image_name: `./img/${r.job_name}.jpg` };
        }),
      });
    }
  );
});
app.get('/job-no-one/:job_id', function (req, res) {
  const { job_id } = req.params;
  connection.query(
    `SELECT id,job_name FROM job WHERE id = ${job_id}`,

    function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      res.render('job', {
        title: 'job',
        job: results[0],
      });
    }
  );
});
app.listen(8080);
