const mongoose = require('mongoose');

const decisionTreeSchema = new mongoose.Schema({
  tree: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('DecisionTree', decisionTreeSchema);
