import React, { useState } from 'react';
import Typest from '../components/Typer/Typest';
import UserDecision from '../components/Typer/UserDecision';

function TheDecisionTree() {
  const [decisionText, setDecisionText] = useState('');

  //Gets the button value of the users decision
  const handleDecision = e => setDecisionText(e.target.innerHTML.trim());

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
        sentence: 1,
        words: ['4']
      }
    }
  ];

  return (
    <div className='container'>
      <section className='the-decision-tree typewritter'>
        <h2 className='typewriter-text'>
          <Typest
            sentences={[
              'Hello and welcome to my decision tree!',
              'Are you looking to store, search or sort data?'
            ]}
            decisions={{ sentence: 1, words: ['store', 'search', 'sort'] }}
            handleDecision={handleDecision}
          />
          <UserDecision
            decision={decisionText}
            decisions={['store', 'search', 'sort']}
          />
        </h2>
      </section>
    </div>
  );
}

export default TheDecisionTree;
