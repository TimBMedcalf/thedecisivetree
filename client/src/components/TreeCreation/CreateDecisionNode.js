import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import LinkNode from './LinkNode';

function CreateDecisionNode({ decisionTree, setDecisionTree, nodeNum }) {
  //Create your node
  const [potentialNodeDecisions, setPotentialNodeDecisions] = useState([]);
  const [currNode, setCurrNode] = useState({});
  //Holds how many links have been added to the node
  const [linksFrom, setLinksFrom] = useState(0); //holds how many links from nodes the user wants

  /**
   * Takes in the sentence and splits it into words then returns the words as an array of
   * objects for the select to use
   */
  const handleSentence = e => {
    let sentence = e.target.value;

    if (!sentence === '') return;
    let potentialDecisions = [];

    sentence.split(' ').forEach(newWord => {
      let wordCount = 0;
      potentialDecisions.forEach(decision => {
        if (decision.label === newWord) {
          wordCount++;
        }
      });

      if (wordCount === 0) {
        potentialDecisions.push({
          value: newWord,
          label: newWord
        });
      } else {
        potentialDecisions.push({
          value: `${newWord}[${wordCount}]`,
          label: newWord
        });
      }
    });

    setPotentialNodeDecisions(potentialDecisions);

    setCurrNode({ ...currNode, sentence: sentence });
    let temp = decisionTree;
    temp[nodeNum] = {
      ...temp[nodeNum],
      sentence: sentence
    };
    setDecisionTree([...temp]);
  };

  //Generates link nodes according to the amount of times the user has added a link node
  const nodeLinks = () => {
    let nodeLinks = [];
    for (let i = 0; i < linksFrom; i++) {
      nodeLinks.push(
        <LinkNode
          key={i}
          decisionTree={decisionTree}
          nodeNum={nodeNum}
          setDecisionTree={setDecisionTree}
        />
      );
    }
    return nodeLinks;
  };

  const handleDecisions = e => {
    let temp = decisionTree;
    temp[nodeNum] = {
      ...temp[nodeNum],
      decisions: e.map(word => ({ word: word.value }))
    };

    setDecisionTree([...temp]);
  };

  return (
    <div className='create-decision-node'>
      <div className='sentence'>
        <h3>Create your decision node:</h3>
        <input
          placeholder='Create your decision sentence'
          type='text'
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

      <div className='decisions'>{nodeLinks()}</div>
      <div className='node-user-controls'>
        {nodeNum !== 0 && (
          <div className='link-buttons'>
            <button
              onClick={() => linksFrom > 0 && setLinksFrom(linksFrom - 1)}
              className='btn btn-danger add-link-node'
            >
              Remove Link
            </button>
            <button
              onClick={() => setLinksFrom(linksFrom + 1)}
              className='btn btn-primary add-link-node'
            >
              Add Link Node
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateDecisionNode;
