import React, { useState } from 'react';
import Typest from '../components/Typer/Typest';
import UserDecision from '../components/Typer/UserDecision';

function Home() {
  const [decisionText, setDecisionText] = useState('');

  const handleDecision = e => setDecisionText(e.target.innerHTML.trim());

  return (
    <div className='container'>
      <section className='algopicker typewritter'>
        <h2 className='typewriter-text'>
          <Typest
            sentences={['Are you looking to store, search or sort data?']}
            decisions={{ sentence: 0, words: ['store', 'search', 'sort'] }}
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

export default Home;
