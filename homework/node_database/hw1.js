const express = require('express');
const bodyParser = require('body-parser');

const oracledb = require('oracledb');
const dbConfig = {
  user: 'gosoft13',
  password: '12345678',
  connectString: '45.32.119.244:1521',
};
const app = express();
const port = 3000;

const getEmployee = async () => {
  const connection = await oracledb.getConnection(dbConfig);

  const result = await connection.execute(`SELECT * FROM EMPLOYEE`, [], {
    outFormat: oracledb.OUT_FORMAT_OBJECT,
  });

  return result.rows.map((r) => ({
    id: r.ID,
    firstName: r.FIRSTNAME,
    lastName: r.LASTNAME,
    employeeId: r.EMPLOYEEID,
    position: r.POSITION,
    telephone: r.TELEPHONE,
    email: r.EMAIL,
  }));
};

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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/employee', async (req, res) => {
  const result = await getEmployee();
  res.json({ result });
});

app.post('/employee', async (req, res) => {
  const { firstName, lastName, position, employeeId, telephone, email } =
    req.body;
  if (
    firstName === undefined ||
    lastName === undefined ||
    position === undefined ||
    employeeId === undefined ||
    telephone === undefined ||
    email === undefined
  ) {
    res.status(400).send('Bad Request');
  } else {
    const employee = await getEmployee();

    if (telephone) {
      if (employee.find((e) => e.telephone === telephone)) {
        res.status(400).send('Bad Request');
        return;
      }
    }

    if (email) {
      if (employee.find((e) => e.email === email)) {
        res.status(400).send('Bad Request');
        return;
      }
    }

    const connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `
      INSERT INTO GOSOFT13.EMPLOYEE
      (ID, FIRSTNAME, LASTNAME, EMPLOYEEID, "POSITION", TELEPHONE, EMAIL)
      VALUES( :1, :2, :3, :4, :5, :6, :7)
      
    `,
      [
        employee.length + 1,
        firstName,
        lastName,
        employeeId,
        position,
        telephone,
        email,
      ],
      { autoCommit: true }
    );

    const result = await getEmployee();

    res.status(201).json({ result });
  }
});

app.put('/employee/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, position, employeeId, telephone, email } =
      req.body;

    const employee = await getEmployee();
    const index = employee.findIndex((e) => e.id === +id);

    if (index === -1) {
      res.status(400).send('Bad Request');
    } else {
      if (firstName !== undefined || lastName !== undefined) {
        res.status(400).send('Bad Request');
      } else {
        const editEmployee = employee[index];

        if (telephone) {
          if (employee.find((e) => e.telephone === telephone)) {
            res.status(400).send('Bad Request');
            return;
          } else {
            editEmployee.telephone = telephone;
          }
        }

        if (email) {
          if (employee.find((e) => e.email === email)) {
            res.status(400).send('Bad Request');
            return;
          } else {
            editEmployee.email = email;
          }
        }

        if (position) editEmployee.position = position;
        if (employeeId) editEmployee.employeeId = employeeId;
        const connection = await oracledb.getConnection(dbConfig);

        await await connection.execute(
          `UPDATE EMPLOYEE SET 
            TELEPHONE = :1,
            EMAIL = :2,
            "POSITION" = :3,
            EMPLOYEEID = :4
          PRODUCT_NAME = :productName WHERE id = :5`,
          [
            editEmployee.telephone,
            editEmployee.email,
            editEmployee.position,
            editEmployee.employeeId,
            id,
          ],
          { autoCommit: true }
        );

        const employee = await getEmployee();

        res.status(200).json({ result: employee });
      }
    }
  } catch (error) {
    res.status(404).send('Not Found');
  }
});

app.delete('/employee/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await getEmployee();
    const index = employee.findIndex((e) => e.id === +id);
    if (index === -1) {
      res.status(400).send('Bad Request');
    } else {
      const connection = await oracledb.getConnection(dbConfig);
      await connection.execute(`DELETE FROM EMPLOYEE WHERE ID = :1`, [id], {
        autoCommit: true,
      });

      const employee = await getEmployee();
      res.json({ result: employee });
    }
  } catch (error) {
    res.status(404).send('Not Found');
  }
});

app.listen(port, () => {
  checkConnection();
  console.log(`Listening at http://localhost:${port}`);
});
