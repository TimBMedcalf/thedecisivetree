import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function UserDecision({ decision, decisions }) {
  const [decisionText, setDecisionText] = useState('');
  const [foundDecision, setFoundDecision] = useState('');
  const [finalDescision, setFinalDescision] = useState('');

  useEffect(() => {
    setDecisionText(decision);
    setFoundDecision('');
  }, [decision]);

  const handleDecisionText = e => {
    //Filters words out that dont contain what the user input
    const searchedDesicions = decisions.filter(decision =>
      decision.word.toLowerCase().includes(e.target.value.toLowerCase())
    );
    //Used for clearing the autocomplete
    if (searchedDesicions.length) {
      setFoundDecision(searchedDesicions[0].word);
    } else {
      setFoundDecision('');
    }

    setDecisionText(e.target.value);
  };

  // Check user input to finish the auto complete
  const handleKeyPress = e => {
    if (e.keyCode === 9 || e.keyCode === 13) {
      setDecisionText(foundDecision);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setFinalDescision(e.target[0].value.trim());
  };

  return (
    <form className='user-input' onSubmit={handleSubmit}>
      <input
        className='typewriter-input'
        type='text'
        value={decisionText}
        onKeyDown={handleKeyPress}
        onChange={handleDecisionText}
      />
      <input
        value={foundDecision}
        className='autocomplete'
        type='text'
        disabled
      />
    </form>
  );
}

UserDecision.propTypes = {};

export default UserDecision;
