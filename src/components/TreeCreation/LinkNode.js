import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function LinkNode({ decisionTree, setDecisionTree, nodeNum }) {
  //Link up nodes
  const [previousNode, setPreviousNode] = useState(0); // Select which node to get the words from
  const [previousNodeWords, setPreviousNodeWords] = useState([]); // gets the previous words from a node
  const [linkFromWords, setLinkFromWords] = useState([]); // select which words from a specific nodes to link from
  const [previousLinkedSetence, setPreviousLinkedSetence] = useState(-1);
  const [decisionTreeNodes, setDecisionTreeNodes] = useState([]);

  /**
   *
   * @param {event} e takes in the decision words from the selected node then points the previous node to the node your are selecting it on
   */
  const handlePreviousWords = e => {
    const words = e.map(word => word.value);
    setLinkFromWords(words);
    let tempTree = decisionTree;

    tempTree[nodeNum] = decisionTree[previousNode].decisions.filter(
      (decision, i) => {
        if (decision.word === words[i]) {
          console.log(words[i]);

          decision.linkTo = nodeNum;
        }
      }
    );

    setDecisionTree([...tempTree]);
  };

  // Gets the tree sentences and formats them to choose from the select
  const formatDecisionTreeSentences = () => {
    if (decisionTree) {
      const nodes = decisionTree.map((decision, i) => ({
        value: i,
        label: `${i}: ${decision.sentence}`
      }));
      setDecisionTreeNodes(nodes);
    }
  };

  useEffect(() => {
    formatDecisionTreeSentences();
  }, [decisionTree]);

  const handlePreviousNode = e => {
    const nodeIndex = parseInt(e.value);

    handleCurrentDisabledSentence(nodeIndex);
    setPreviousNode(nodeIndex);
    handleSentenceWords(nodeIndex);

    // Disable the node that has been selected to stop multi links from nodes, this bubbles up state
    setDecisionTreeNodes(() => {
      let tempDecisionTree = decisionTreeNodes;
      tempDecisionTree[nodeIndex].isDisabled = true;
      return tempDecisionTree;
    });
  };

  /**
   * Set the options for the user to choose the words to link from
   * @param {Number} nodeIndex
   */
  const handleSentenceWords = nodeIndex => {
    if (typeof decisionTree[nodeIndex].decisions !== 'undefined') {
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
