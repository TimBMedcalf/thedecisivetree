import React, { useState } from 'react';
import CreateDecisionNode from '../components/TreeCreation/CreateDecisionNode';
import PropTypes from 'prop-types';

//This page will contain the create node functionality
//A user will type in the node sentence and decisions they want to use
//Once Entered a new decision node will be able to be entered
//Visually below a decision node wil be generated at level 0
//The user will then pick a word from the list of words from the previous level that will link to that decisionn
//If user repeats this until the nodes are filled out and set as completed
//if any words are not linked then user will not be able enter the next level

const userTree = [
  {
    sentence: 'Hello and welcome to my decision tree!',
    decisions: {
      words: ['welcome', 'decision', 'tree!'],
      pointers: [1, 2, 1]
    }
  },
  {
    sentence: 'This is test number 3!',
    decisions: {
      words: ['test', 'this', 'is'],
      pointers: [2, 0, 1]
    }
  },
  {
    sentence: 'This is test number 4',
    decision: {
      words: ['4']
    }
  }
];

function CreateDecisions(props) {
  const [decisionTree, setDecisionTree] = useState(userTree);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 col-10 text-center'>
          <h2>Create your tree</h2>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-6 offset-md-3 col-10 tree-container'>
          <CreateDecisionNode decisionTree={decisionTree} />
        </div>
      </div>
    </div>
  );
}

CreateDecisions.propTypes = {};

export default CreateDecisions;
