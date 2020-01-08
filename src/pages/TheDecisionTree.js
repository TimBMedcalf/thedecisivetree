import React, { useState } from 'react';
import Typest from '../components/Typer/Typest';
import UserDecision from '../components/Typer/UserDecision';

function TheDecisionTree() {
  const [decisionText, setDecisionText] = useState('');
  const [decisionIndex, setDecisionIndex] = useState(0);
  const [usersDecisions, setUserDecisions] = useState([]);

  //Gets the button value of the users decision
  const handleDecision = e => {
    const decision = e.target.innerHTML.trim()
    setDecisionText(decision);
    setUserDecisions([...usersDecisions, decision]);
    //Increments the level of the decision tree the user is on
    if (decisionIndex < userTree.length - 1) {
      setDecisionIndex(decisionIndex + 1);
    }
  };

  const userTree = [
    {
      sentences: [
        'Hello and welcome to my decision tree!',
        'Are you looking to store, search or sort data?'
      ],
      decisions: {
        sentence: 1,
        words: ['store', 'search', 'sort']
      }
    },
    {
      sentences: ['This is test number 3!'],
      decisions: {
        sentence: 0,
        words: ['test', 'this']
      }
    },
    {
      sentences: ['This is test number 4'],
      decisions: {
        sentence: 0,
        words: ['4']
      }
    },
  ];

  return (
    <div className='the-decision-tree'>
      <section className='typewritter'>
        <h2 className='typewriter-text'>
          <Typest
            key={`typer: ${decisionIndex}`}
            sentences={userTree[decisionIndex].sentences}
            decisions={userTree[decisionIndex].decisions}
            handleDecision={handleDecision}
          />
          <UserDecision
            key={decisionIndex}
            decision={decisionText}
            decisions={userTree[decisionIndex].decisions.words}
          />
        </h2>
      </section>
    </div>
  );
}

export default TheDecisionTree;
