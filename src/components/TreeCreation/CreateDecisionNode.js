import React, { useState } from 'react';
import DecisionNode from './DecisionNode';
import Select from 'react-select';

function CreateDecisionNode() {
  const [sentence, setSentence] = useState('');
  const [decisions, setDecisions] = useState([]);

  /**
   * Takes in the sentence and splits it into words then returns the words as an array of
   * objects for the select to use
   */
  const handleSentence = e => {
    let sentence = e.target.value;
    setSentence(sentence);

    if (!sentence.includes(' ')) return;

    const words = sentence.split(' ').map(word => {
      return {
        value: word.toLowerCase(),
        label: word
      };
    });
    setDecisions(words);
  };

  return (
    <div className='create-decision-node'>
      <div className='sentence'>
        <input
          placeholder='Create your decision sentence'
          type='text'
          value={sentence}
          onChange={handleSentence}
        />
      </div>

      <div className='decisions'>
        <Select
          isMulti
          name='decisions'
          options={decisions}
          placeholder='Select your decision words'
          className='basic-multi-select'
          classNamePrefix='select'
        />
      </div>

      <div className='decision-nodes'>
        <DecisionNode />
      </div>
    </div>
  );
}

export default CreateDecisionNode;
