import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Typest from '../components/Typer/Typest';

function TheDecisionTree(props) {
  const [decisionText, setDecisionText] = useState('');
  const [decisionTree, setDecisionTree] = useState([]);
  const [decisionIndex, setDecisionIndex] = useState(0);
  const [usersDecisions, setUserDecisions] = useState([]);
  const [complete, setComplete] = useState(false);

  const [noTreeSelected, setNoTreeSelected] = useState(false);

  //Gets the button value of the users decision
  const handleDecision = e => {
    const decision = e.target.innerHTML.trim();
    const nextNode = e.target.getAttribute('link-to');
    setDecisionText(decision);
    setUserDecisions([...usersDecisions, decision]);

    //Increments the level of the decision tree the user is on

    if (decisionTree[decisionIndex].decisions.length) {
      if (nextNode !== null) {
        setDecisionIndex(nextNode);
      } else {
        setComplete(true);
      }
    }
  };

  useEffect(() => {
    getDecisionTree
      .then(tree => {
        setDecisionTree(tree);
      })
      .catch(err => {
        console.log(err);
        setNoTreeSelected(true);
      });
  }, []);

  const getDecisionTree = new Promise((resolve, reject) => {
    if (typeof props.location !== 'undefined') {
      axios
        .get(props.location.pathname)
        .then(res => {
          if (res.data) {
            const tree = JSON.parse(res.data);
            tree.length
              ? resolve(tree)
              : reject('Data was found but is not a tree');
          }
        })
        .catch(err => {
          console.log(err);
          reject('No decision tree found');
        });
    } else {
      reject('No url id for a tree selected');
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
            </div>
          )}
        </h2>

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
        {noTreeSelected && (
          <div className='no-tree-found'>
            <h2>No decision tree found, would you like to make one?</h2>
            <Link class='btn primary-button' to='/create'>
              Create tree
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

export default TheDecisionTree;
