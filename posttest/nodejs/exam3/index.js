const { google } = require('googleapis');
const axios = require('axios');
const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('views'));

const oauth2Client = new google.auth.OAuth2(
  '714811379547-1naf8kc882lgbkidbrglm17j2glm0tfa.apps.googleusercontent.com',
  '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',
  'http://localhost:8080/oauth2callback'
);

// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = ['https://www.googleapis.com/auth/drive.readonly'];

const authorizationUrl = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',

  // If you only need one scope you can pass it as a string
  scope: scopes,
});

oauth2Client.on('tokens', (tokens) => {
  if (tokens.refresh_token) {
    // store the refresh_token in your secure persistent database
    console.log(tokens.refresh_token);
  }
  console.log(tokens.access_token);
});

app.get('/', (req, res) => {
  res.redirect(authorizationUrl);
});

app.get('/oauth2callback', async (req, res) => {
  try {
    const { code } = req.query;

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const config = {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    };
    const result = await axios.get(
      'https://sheets.googleapis.com/v4/spreadsheets/1AFni2vxsK2xrXc2Pyuop2Ga6auXWtixzyJFzKhsJD6w/values/Sheet1!A1:E7',
      config
    );

    res.render('data', { data: result.data.values });
    // res.send(result.data.values.map((row) => row.join(', ')).join('\n'));
  } catch (error) {
    res.send(error);
  }
});

app.listen(8080);
