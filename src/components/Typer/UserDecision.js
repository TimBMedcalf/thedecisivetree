import React, { useState } from 'react';
import PropTypes from 'prop-types';

function UserDecision(props) {
  const [decisionText, setDecisionText] = useState('');

  return (
    <form className='user-input'>
      <input className='typewriter-input' type='text' value={props.decision} />
    </form>
  );
}

UserDecision.propTypes = {};

export default UserDecision;
