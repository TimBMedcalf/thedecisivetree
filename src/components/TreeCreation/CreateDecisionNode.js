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
  const [previousNode, setPreviousNode] = useState(0); // Select which node to get the words from
  const [previousNodeWords, setPreviousNodeWords] = useState([]); // gets the previous words from a node
  const [linkFromWords, setLinkFromWords] = useState([]); // select which words from a specific nodes to link from
  const [linksFrom, setLinksFrom] = useState(1); //holds how many links from nodes the user wants

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

    // Disable the node that has been selected to stop multi links from nodes
    setDecisionTreeNodes(() => {
      let tempDecisionTree = decisionTreeNodes;
      tempDecisionTree[nodeIndex].isDisabled = true;
      return tempDecisionTree;
    });

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

  const nodeLinks = () => {
    let nodeLinks = [];
    for (let i = 0; i < linksFrom; i++) {
      nodeLinks.push(
        <div className='link-node' key={`create-links-${i}`}>
          <Select
            key={`link-node-${i}`}
            name='decisions'
            options={decisionTreeNodes}
            onChange={handlePreviousNode}
            placeholder='Select a node to link from...'
            className='basic-multi-select'
            classNamePrefix='select'
          />
          <Select
            key={`link-words-${i}`}
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
    return nodeLinks;
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
        {nodeLinks()}
      </div>
      <div className='node-user-controls'>
        <button onClick={createNode} className='btn btn-primary create-node'>
          Create your decision
        </button>
        <button
          onClick={() => setLinksFrom(linksFrom + 1)}
          className='btn btn-primary add-link-node'
        >
          Add Node
        </button>
      </div>
    </div>
  );
}

export default CreateDecisionNode;
