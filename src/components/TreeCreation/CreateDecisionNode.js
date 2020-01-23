import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function CreateDecisionNode({ decisionTree }) {
  //Decision Tree
  const [decisionTreeNodes, setDecisionTreeNodes] = useState([]);

  //Create your node
  const [currentNodeSentence, setCurrentNodeSentence] = useState('');
  const [potentialNodeDecisions, setPotentialNodeDecisions] = useState([]);
  const [currentNodeDecisions, setCurrentNodeDecisions] = useState([]);
  const [currentNode, setCurrentNode] = useState({});

  //Link up nodes
  const [previousNode, setPreviousNode] = useState(0);
  const [previousNodeWords, setPreviousNodeWords] = useState([]);
  const [linkFromWords, setLinkFromWords] = useState([]);

  /**
   * Takes in the sentence and splits it into words then returns the words as an array of
   * objects for the select to use
   */
  const handleSentence = e => {
    let sentence = e.target.value;
    setCurrentNodeSentence(sentence);

    if (!sentence.includes(' ')) return;

    const words = sentence.split(' ').map(word => {
      return {
        value: word,
        label: word
      };
    });
    setPotentialNodeDecisions(words);
  };

  // Gets the tree sentences and formats them to choose from the select
  const getTreeSentences = () => {
    if (decisionTree) {
      const nodes = decisionTree.map((node, i) => ({
        value: i,
        label: `${i}: ${node.sentence}`
      }));

      setDecisionTreeNodes(nodes);
    }
  };

  useEffect(() => {
    getTreeSentences();
  }, [decisionTree]);

  const handlePreviousNode = e => {
    const nodeIndex = parseInt(e.value);
    setPreviousNode(nodeIndex);

    //Set the options for the user to choose the words to link from
    if (typeof decisionTree[nodeIndex].decisions.words !== undefined) {
      setPreviousNodeWords(
        decisionTree[nodeIndex].decisions.words.map(word => {
          return {
            value: word,
            label: word
          };
        })
      );
    }
  };

  //Creates decision node to appened to the tree
  const createNode = () => {
    setCurrentNode({
      sentence: currentNodeSentence,
      decisions: {
        words: currentNodeDecisions
      }
    });
  };

  const handlePreviousWords = e => setLinkFromWords(e.map(word => word.value));
  const handleDecisions = e =>
    setCurrentNodeDecisions(e.map(word => word.value));

  return (
    <div className='create-decision-node'>
      <div className='sentence'>
        <h3>Create your decision node:</h3>
        <input
          placeholder='Create your decision sentence'
          type='text'
          value={currentNodeSentence}
          onChange={handleSentence}
        />
        <Select
          isMulti
          name='decisions'
          options={potentialNodeDecisions}
          onChange={handleDecisions}
          placeholder='Select your decision words...'
          className='basic-multi-select'
          classNamePrefix='select'
        />
      </div>

      <div className='decisions'>
        <h3>Link your node:</h3>
        <Select
          name='decisions'
          options={decisionTreeNodes}
          onChange={handlePreviousNode}
          placeholder='Select a node to link from...'
          className='basic-multi-select'
          classNamePrefix='select'
        />
        <Select
          isMulti
          name='decisions'
          options={previousNodeWords}
          onChange={handlePreviousWords}
          placeholder='Select what word links to here...'
          className='basic-multi-select'
          classNamePrefix='select'
        />
      </div>
      <button onClick={createNode} className='btn btn-primary'>
        Create your decision
      </button>
    </div>
  );
}

export default CreateDecisionNode;
