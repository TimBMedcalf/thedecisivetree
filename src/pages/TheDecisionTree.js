import React, { useState, useEffect } from 'react';
import Typest from '../components/Typer/Typest';
import UserDecision from '../components/Typer/UserDecision';

function TheDecisionTree() {
  const [decisionText, setDecisionText] = useState('');
  const [decisionTree, setDecisionTree] = useState([]);
  const [decisionIndex, setDecisionIndex] = useState(0);
  const [usersDecisions, setUserDecisions] = useState([]);
  const [complete, setComplete] = useState(false);

  //Gets the button value of the users decision
  const handleDecision = e => {
    const decision = e.target.innerHTML.trim();
    setDecisionText(decision);
    setUserDecisions([...usersDecisions, decision]);

    //Increments the level of the decision tree the user is on

    if (decisionTree[decisionIndex].decisions.length) {
      let nextDecision = findNextDecision(decision);
      if (nextDecision !== null) {
        setDecisionIndex(nextDecision);
      } else {
        setComplete(true);
      }
    }
  };

  const findNextDecision = decisionWord => {
    //Get the index of the word then use that index to find where the next node is with the pointers
    let nextDecision = decisionTree[decisionIndex].decisions.filter(
      decision => decisionWord === decision.word && decision.linkTo
    );
    if (nextDecision.length === 0) return null;
    return nextDecision[0].linkTo;
  };

  useEffect(() => {
    getDecisionTree
      .then(tree => {
        setDecisionTree(tree);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const getDecisionTree = new Promise((resolve, rejecet) => {
    let tempTree = localStorage.getItem('decisionTree');
    tempTree = JSON.parse(tempTree);

    if (tempTree.length !== 0) {
      resolve(tempTree);
    } else {
      rejecet('No decision tree found');
    }
  });

  return (
    <div className='the-decision-tree'>
      <section className='typewritter'>
        <h2 className='typewriter-text'>
          {decisionTree.length > 0 && (
            <div>
              <Typest
                key={`typer: ${decisionIndex}`}
                sentences={[decisionTree[decisionIndex].sentence]}
                decisions={decisionTree[decisionIndex].decisions}
                handleDecision={handleDecision}
                setComplete={setComplete}
              />
              {!complete && (
                <UserDecision
                  key={decisionIndex}
                  decision={decisionText}
                  decisions={decisionTree[decisionIndex].decisions}
                />
              )}
            </div>
          )}
          {complete && (
            <div className='completion'>
              <button
                onClick={() => {
                  setDecisionIndex(0);
                  setComplete(false);
                }}
                className='btn btn-primary'
              >
                Restart
              </button>
            </div>
          )}
        </h2>
      </section>
    </div>
  );
}

export default TheDecisionTree;
