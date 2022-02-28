const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const employee = require('./employee.json');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/employee', (req, res) => {
  res.json({ result: employee });
});

app.post('/employee', (req, res) => {
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
    employee.push({
      id: employee.length + 1,
      firstName,
      lastName,
      position,
      employeeId,
      telephone,
      email,
    });
    res.status(201).json({ result: employee });
  }
});

app.put('/employee/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, position, employeeId, telephone, email } =
      req.body;
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

        res.status(200).json({ result: employee });
      }
    }
  } catch (error) {
    res.status(404).send('Not Found');
  }
});

app.delete('/employee/:id', (req, res) => {
  try {
    const { id } = req.params;
    const index = employee.findIndex((e) => e.id === +id);
    if (index === -1) {
      res.status(400).send('Bad Request');
    } else {
      employee.splice(index, 1);
      res.json({ result: employee });
    }
  } catch (error) {
    res.status(404).send('Not Found');
  }
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
