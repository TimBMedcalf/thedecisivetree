import React, { useState } from 'react';
import CreateDecisionNode from '../components/TreeCreation/CreateDecisionNode';
import ShareModal from '../components/TreeCreation/ShareModal';

//This page will contain the create node functionality
//A user will type in the node sentence and decisions they want to use
//Once Entered a new decision node will be able to be entered
//Visually below a decision node wil be generated at level 0
//The user will then pick a word from the list of words from the previous level that will link to that decisionn
//If user repeats this until the nodes are filled out and set as completed
//if any words are not linked then user will not be able enter the next level

function CreateDecisions(props) {
  const [decisionTree, setDecisionTree] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  //Sets the decision into local storage, this will be replaced by setting it into mongodb
  const createDecisionTree = () => {
    if (decisionTree[decisionTree.length - 1].length === 0) {
      //remove last element if it empty
      let tempTree = decisionTree;
      tempTree.pop();
      setDecisionTree(tempTree);
      localStorage.setItem('decisionTree', JSON.stringify(tempTree));
    } else {
      localStorage.setItem('decisionTree', JSON.stringify(decisionTree));
    }
  };

  return (
    <div className='container-fluid'>
      {openModal && <ShareModal setIsOpen={setOpenModal} />}
      <div className='row'>
        <div className='col-md-6 offset-md-3 col-10 text-center'>
          <h2>Create your tree</h2>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-6 offset-md-3 col-10 tree-container'>
          <CreateDecisionNode
            nodeNum={0}
            decisionTree={decisionTree}
            setDecisionTree={setDecisionTree}
          />
          {decisionTree.map((decision, i) => (
            <CreateDecisionNode
              key={i}
              nodeNum={i + 1}
              decisionTree={decisionTree}
              setDecisionTree={setDecisionTree}
            />
          ))}
          {decisionTree.length > 0 && (
            <div>
              <button
                className='btn btn-primary'
                onClick={() => {
                  createDecisionTree();
                  setOpenModal(true);
                }}
              >
                Create your tree
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

CreateDecisions.propTypes = {};

export default CreateDecisions;
