import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import LinkNode from './LinkNode';

function CreateDecisionNode({ decisionTree, setDecisionTree, nodeNum }) {
  //Decision Tree
  const [decisionTreeNodes, setDecisionTreeNodes] = useState([]);

  //Create your node
  const [currentNodeSentence, setCurrentNodeSentence] = useState('');
  const [potentialNodeDecisions, setPotentialNodeDecisions] = useState([]);
  const [currentNodeDecisions, setCurrentNodeDecisions] = useState([]);
  const [currNode, setCurrNode] = useState({});

  //Holds how many links have been added to the node
  const [linksFrom, setLinksFrom] = useState(0); //holds how many links from nodes the user wants

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

  //If decision tree changes then generate options for sentences
  useEffect(() => {
    getTreeSentences();
  }, [decisionTree]);

  //Generates link nodes according to the amount of times the user has added a link node
  const nodeLinks = () => {
    let nodeLinks = [];
    for (let i = 0; i < linksFrom; i++) {
      nodeLinks.push(
        <LinkNode
          key={i}
          setDecisionTreeNodes={setDecisionTreeNodes}
          decisionTreeNodes={decisionTreeNodes}
          decisionTree={decisionTree}
        />
      );
    }
    return nodeLinks;
  };

  //Creates decision node to appened to the tree
  const createNode = () => {
    let node = {
      sentence: currentNodeSentence,
      decisions: [
        currentNodeDecisions.map(decisionWord => ({ word: decisionWord }))
      ]
    };
    setCurrNode(node);
  };

  const updateDecisionTree = () => {
    if (decisionTree[nodeNum]) {
      let tempTree = decisionTree;
      tempTree[nodeNum] = currNode;
      setDecisionTree(tempTree);
    } else {
      setDecisionTree(...decisionTree, currNode);
    }
  };

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

      <div className='decisions'>{nodeLinks()}</div>
      <div className='node-user-controls'>
        {nodeNum !== decisionTree.length - 1 && (
          <button onClick={createNode} className='btn btn-primary create-node'>
            Create your decision
          </button>
        )}
        {nodeNum !== 0 && (
          <button
            onClick={() => setLinksFrom(linksFrom + 1)}
            className='btn btn-primary add-link-node'
          >
            Add Link Node
          </button>
        )}
      </div>
    </div>
  );
}

export default CreateDecisionNode;
