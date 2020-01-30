import React, { useState } from 'react';
import Select from 'react-select';

function LinkNode({ decisionTreeNodes, decisionTree, setDecisionTreeNodes }) {
  //Link up nodes
  const [previousNode, setPreviousNode] = useState(0); // Select which node to get the words from
  const [previousNodeWords, setPreviousNodeWords] = useState([]); // gets the previous words from a node
  const [linkFromWords, setLinkFromWords] = useState([]); // select which words from a specific nodes to link from
  const [previousLinkedSetence, setPreviousLinkedSetence] = useState(-1);

  const handlePreviousWords = e => {
    const words = e.map(word => word.value);
    setLinkFromWords(words);
    // decisionTree[previousNode].decisions.filter((decision, i) => {
    //   if(decision.word === words[i]) {
    //     return decision.linkTo =
    //   }
    // })
  };

  const handlePreviousNode = e => {
    const nodeIndex = parseInt(e.value);

    handleCurrentDisabledSentence(nodeIndex);
    setPreviousNode(nodeIndex);

    // Disable the node that has been selected to stop multi links from nodes, this bubbles up state
    setDecisionTreeNodes(() => {
      let tempDecisionTree = decisionTreeNodes;
      tempDecisionTree[nodeIndex].isDisabled = true;
      return tempDecisionTree;
    });

    handleSentenceWords(nodeIndex);
  };

  /**
   * Set the options for the user to choose the words to link from
   * @param {Number} nodeIndex
   */
  const handleSentenceWords = nodeIndex => {
    if (typeof decisionTree[nodeIndex].decisions.words !== undefined) {
      setPreviousNodeWords(
        decisionTree[nodeIndex].decisions.map(decision => {
          return {
            value: decision.word,
            label: decision.word
          };
        })
      );
    }
  };

  /**
   * Enables the previously selected sentence
   * @param {Number} nodeIndex
   */
  const handleCurrentDisabledSentence = nodeIndex => {
    if (previousLinkedSetence !== -1) {
      setDecisionTreeNodes(() => {
        let tempDecisionTree = decisionTreeNodes;
        tempDecisionTree[previousLinkedSetence].isDisabled = false;
        return tempDecisionTree;
      });
    }
    setPreviousLinkedSetence(nodeIndex);
  };

  return (
    <div className='link-node'>
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
  );
}

export default LinkNode;
