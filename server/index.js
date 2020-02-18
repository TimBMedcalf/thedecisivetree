require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const DecisionTree = require('./models/decisiontree');
const uniqid = require('uniqid');

const app = express();
const port = 8080;

app.use(bodyParser.json());

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Database'));
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/:urlId', async (req, res) => {
  try {
    const DecisionTree = await DecisionTree.find({ urlId: req.urlId });
    res.json(DecisionTree);
  } catch {
    res.sendStatus(404);
  }
});

app.post('/', async (req, res) => {
  let tree = JSON.stringify(req.body);

  const decisionTree = new DecisionTree({
    tree: tree,
    urlId: uniqid()
  });
  try {
    console.log(decisionTree);
    const newDecisionTree = await decisionTree.save();
    res.status(201).json(newDecisionTree);
  } catch (err) {
    res.sendStatus(400);
  }
});
