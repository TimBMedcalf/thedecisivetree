import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function CreateDecisionNode({ decisionTree }) {
  const [sentence, setSentence] = useState('');
  const [potentialDecisions, setPotentialDecisions] = useState([]);
  const [decisionNodes, setDecisionNodes] = useState([]);
  const [previousNode, setPreviousNode] = useState(0);
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
    setPotentialDecisions(words);
  };

  const handleDecisions = e => setDecisions(e);

  const handleDecisionTree = () => {
    if (decisionTree) {
      const nodes = decisionTree.map((node, i) => ({
        value: i,
        label: `${i}: ${node.sentences[0]}`
      }));
      console.log(`called: ${decisionTree}`);
      // const otherNodeWords = decisionTree.decisions.words.map(word => ({
      //   value: word,
      //   label: word
      // }));

      setDecisionNodes(nodes);
    }
  };

  const handlePreviousNode = e => {
    setPreviousNode(parseInt(e));
  };

  useEffect(() => {
    handleDecisionTree();
  }, [decisionTree]);

  return (
    <div className='create-decision-node'>
      <div className='sentence'>
        <input
          placeholder='Create your decision sentence'
          type='text'
          value={sentence}
          onChange={handleSentence}
        />
        <Select
          isMulti
          name='decisions'
          options={potentialDecisions}
          onChange={handleDecisions}
          placeholder='Select your decision words...'
          className='basic-multi-select'
          classNamePrefix='select'
        />
      </div>

      <div className='decisions'>
        <Select
          name='decisions'
          options={decisionNodes}
          onChange={handlePreviousNode}
          placeholder='Select a node to link from...'
          className='basic-multi-select'
          classNamePrefix='select'
        />
        <Select
          isMulti
          name='decisions'
          options={potentialDecisions}
          onChange={handleDecisions}
          placeholder='Select what word links to here...'
          className='basic-multi-select'
          classNamePrefix='select'
        />
      </div>
    </div>
  );
}

export default CreateDecisionNode;
