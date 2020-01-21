import React from 'react';
import PropTypes from 'prop-types';

//This page will contain the create node functionality
//A user will type in the node sentence and decisions they want to use
//Once Entered a new decision node will be able to be entered
//Visually below a decision node wil be generated at level 0
//The user will then pick a word from the list of words from the previous level that will link to that decisionn
//If user repeats this until the nodes are filled out and set as completed
//if any words are not linked then user will not be able enter the next level

function CreateDecisions(props) {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-6 col-12'>
          <h2>Create your tree</h2>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-6 offset-md-3 col-10 tree-container'></div>
      </div>
    </div>
  );
}

CreateDecisions.propTypes = {};

export default CreateDecisions;