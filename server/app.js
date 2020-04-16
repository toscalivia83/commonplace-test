const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

const jsonfile = require('jsonfile')
const answerFile = 'data.json'
const answerOptionsFile = 'options.json'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/answers', (req, res) => {
  jsonfile.readFile(answerFile)
  .then(obj => {
    res.json(obj);
  })
  .catch(err => {
    console.log("err", err);
    res.status(500)
    res.json(err);
  });
});

app.get('/api/options', (req, res) => {
  jsonfile.readFile(answerOptionsFile)
  .then(obj => {
    res.json({ options: obj });
    res.status(200);
  })
  .catch(err => {
    console.log("err", err);
    res.status(500)
    res.json(err);
  });
});

app.post('/api/answer', async (req, res) => {
  jsonfile.readFile(answerFile)
  .then(data => {
    jsonfile.writeFile(answerFile, data.concat(req.body))
  })
  .then(() => {
    res.status(201);
    res.send("sent");
  })
  .catch(err => {
    console.log("err", err);
    res.status(500)
    res.json(err);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));