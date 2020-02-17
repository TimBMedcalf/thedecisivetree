require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const DecisionTree = require('./models/decisiontree');

const app = express();
const port = 8080;

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Database'));
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/:id', async (req, res) => {
  try {
    const DecisionTree = await DecisionTree.find(req.id);
    res.json(DecisionTree);
  } catch {
    res.sendStatus(500);
  }
});

app.post('/', async (req, res) => {
  const decisionTree = new DecisionTree({
    tree: req.body
  });
  try {
    const newDecisionTree = await decisionTree.save();
    res.status(201).json(newDecisionTree);
  } catch (err) {
    res.sendStatus(400);
  }
});
