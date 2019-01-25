const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const verificationController = require('./controllers/verification');

const messageWebhookController = require('./controllers/messageWebhook');

app.post('/', messageWebhookController);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', verificationController);
app.listen(3000, () => console.log('Webhook server is listening, port 3000'));
