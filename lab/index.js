const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const product = require('./product.json');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/product', (req, res) => {
  res.json({ result: product });
});
app.post('/product', (req, res) => {
  const { productName, price } = req.body;
  product.push({ productCode: product.length + 1, productName, price });
  res.status(201).json({ result: product });
});

app.put('/product/:productCode', (req, res) => {
  try {
    const { productCode } = req.params;
    const { productName, price } = req.body;
    const index = product.findIndex((p) => p.productCode === productCode);

    product[index].productName = productName;
    product[index].price = price;

    res.status(200).json({ result: product });
  } catch (error) {
    res.status(404).send('Not Found');
  }
});

app.delete('/product/:productCode', (req, res) => {
  try {
    const { productCode } = req.params;
    const index = product.findIndex((p) => p.productCode === productCode);
    product.splice(index, 1);
    res.json({ result: product });
  } catch (error) {
    res.status(404).send('Not Found');
  }
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
