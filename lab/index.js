const express = require('express');

const oracledb = require('oracledb');
// hr schema password
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// checkConnection asycn function
const dbConfig = {
  user: 'gosoft13',
  password: '12345678',
  connectString: '45.32.119.244:1521',
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

app.get('/product', async (req, res) => {
  let connection;

  try {
    const connection = await oracledb.getConnection(dbConfig);
    result = await connection.execute(`SELECT * FROM product`);
    res.send(result);
  } catch (err) {
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close(); // Put the connection back in the pool
      } catch (err) {
        throw err;
      }
    }
  }
});
app.post('/product', async (req, res) => {
  let connection;
  const { productCode, productName } = req.body;

  try {
    const connection = await oracledb.getConnection(dbConfig);
    result = await connection.execute(
      `
      INSERT INTO gosoft13.PRODUCT
      (PRODUCT_CODE, PRODUCT_NAME)
      VALUES(:productCode, :productName)
    `,
      [productCode, productName],
      { autoCommit: true }
    );
    res.send(result);
  } catch (err) {
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close(); // Put the connection back in the pool
      } catch (err) {
        throw err;
      }
    }
  }
});
app.put('/product/:productCode', async (req, res) => {
  let connection;
  const { productCode } = req.params;
  const { productName } = req.body;
  try {
    const connection = await oracledb.getConnection(dbConfig);
    result = await connection.execute(
      `UPDATE product SET PRODUCT_NAME = :productName WHERE PRODUCT_CODE = :productCode`,
      [productName, productCode],
      { autoCommit: true }
    );
    res.send(result);
  } catch (err) {
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close(); // Put the connection back in the pool
      } catch (err) {
        throw err;
      }
    }
  }
});
app.delete('/product/:productCode', async (req, res) => {
  let connection;
  const { productCode } = req.params;
  try {
    const connection = await oracledb.getConnection(dbConfig);
    result = await connection.execute(
      `DELETE FROM product WHERE PRODUCT_CODE = :productCode`,
      [productCode],
      { autoCommit: true }
    );
    res.send(result);
  } catch (err) {
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close(); // Put the connection back in the pool
      } catch (err) {
        throw err;
      }
    }
  }
});

app.listen(4000, checkConnection());
