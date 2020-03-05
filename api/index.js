require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const sanitize = require('mongo-sanitize');
const DecisionTree = require('./models/decisiontree');
const uniqid = require('uniqid');

const app = express();
const port = 8080;

app.use(bodyParser.json());

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Database'));
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/:urlId', async (req, res) => {
  const urlId = sanitize(req.params.urlId);

  DecisionTree.findOne({ urlId: urlId }, (err, data) => {
    if (err) {
      res.sendStatus(500);
      console.error(err);
      return;
    } else if (data === null) {
      res.sendStatus(404);
      return;
    }

    data = data.toObject();
    if (data.hasOwnProperty('tree')) {
      res.json(data.tree);
    }
  });
});

app.post('/', async (req, res) => {
  let tree = JSON.stringify(req.body);
  tree = sanitize(tree);

  const decisionTree = new DecisionTree({
    tree: tree,
    urlId: uniqid()
  });
  try {
    const newDecisionTree = await decisionTree.save();
    res.status(201).json(newDecisionTree.urlId);
  } catch (err) {
    res.sendStatus(400);
  }
});
