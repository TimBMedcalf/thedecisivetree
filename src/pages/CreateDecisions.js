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

// const userTree = [
//   {
//     sentence: 'Hello and welcome to my decision tree!',
//     decisions: [
//       { word: 'welcome', linkTo: 1 },
//       { word: 'decision', linkto: 2 },
//       { word: 'tree', linkTo: 1 }
//     ]
//   },
//   {
//     sentence: 'This is test number 3!',
//     decisions: [
//       { word: 'test', linkTo: 2 },
//       { word: 'this', linkTo: 0 },
//       { word: 'link', linkTo: 1 }
//     ]
//   },
//   {
//     sentence: 'This is test number 4',
//     decisions: [[{ word: '4' }]]
//   }
// ];

function CreateDecisions(props) {
  const [decisionTree, setDecisionTree] = useState([{}]);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 col-10 text-center'>
          <h2>Create your tree</h2>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-6 offset-md-3 col-10 tree-container'>
          {decisionTree.map((decision, i) => (
            <CreateDecisionNode
              key={i}
              decisionTree={decisionTree}
              setDecisionTree={setDecisionTree}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

CreateDecisions.propTypes = {};

export default CreateDecisions;
