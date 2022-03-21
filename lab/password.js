const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const bcrypt = require('bcryptjs');

// const password = 'pass123';
// var hashedPassword;

const checkPassword = (res, password) => {
  const realPassword = 'A123456$';

  bcrypt.genSalt(10, function (err, Salt) {
    // The bcrypt is used for encrypting password.
    bcrypt.hash(password, Salt, function (err, hash) {
      if (err) {
        return console.log('Cannot encrypt');
      }

      hashedPassword = hash;
      console.log(hash);

      bcrypt.compare(
        realPassword,
        hashedPassword,
        async function (err, isMatch) {
          if (isMatch) {
            console.log('Encrypted password is: ', password);
            console.log('Decrypted password is: ', hashedPassword);
            res.json({ result: 'login success' });
          }

          if (!isMatch) {
            // If password doesn't match the following
            // message will be sent
            console.log(hashedPassword + ' is not encryption of ' + password);
            res.status(403).send('Forbidden');
          }
        }
      );
    });
  });

  //   console.log(hashedPassword);
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post('/password', (req, res) => {
  const { password } = req.body;
  //   console.log(checkPassword(password));
  checkPassword(res, password);
});

app.listen(3000);
