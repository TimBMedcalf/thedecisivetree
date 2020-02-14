import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useInterval from '../../lib/UseInterval';

function Typest(props) {
  const [text, setText] = useState('');
  const [isDeleting, setDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [loopIndex, setLoopIndex] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleTyping = () => {
    //Checks if has finished all the sentences and is set not to repeat
    if (loopIndex >= props.sentences.length && !props.repeating) return;

    //Keeps track of current sentence
    const currentSentence = props.sentences[loopIndex];

    if (isDeleting) {
      //Remove the last letter from the sentence
      setText(currentSentence.substring(0, text.length - 1));
      setTypingSpeed(30);
    } else {
      //Add the last letter to the sentence
      setText(currentSentence.substring(0, text.length + 1));
      setTypingSpeed(50);
    }

    if (
      loopIndex === props.sentences.length - 1 &&
      currentSentence.length === text.length
    ) {
      setCompleted(true);
      return;
    }

    //Checks if the sentence is on the last sentence so the typer doesn't delete the last sentence
    if (!isDeleting && text === currentSentence) {
      //Let the sentence complete before starting delete
      setTimeout(() => setDeleting(true), 500);
    } else if (isDeleting && text === '') {
      setDeleting(false);
      //Go onto next sentence
      setLoopIndex(loopIndex + 1);
    }
  };

  useInterval(handleTyping, typingSpeed);

  const searchForWords = () => {
    if (typeof props.decisions === 'undefined') {
      props.setComplete(true);
      return text;
    }

    let sentenceToDisplay = [];
    let splitSentence = props.sentences[0].split(' ');

    splitSentence.forEach((word, i) => {
      let foundWord = false;
      let previousWordCounter = 0;
      let formattedword = '';
      let linkTo = 0;

      // Compares the word to the words that have been check to see if it has any duplicates
      splitSentence.slice(0, i).forEach(previouslyCheckedWords => {
        if (previouslyCheckedWords === word) {
          previousWordCounter++;
        }
      });

      // If the word has a duplicate then format the word to how the decisions are formatted to help search for the word in the decisions
      if (previousWordCounter !== 0) {
        formattedword = `${word}[${previousWordCounter}]`;
      }

      // Loop throough and check if either the formatted word or the word matches the current word in the sentence
      props.decisions.forEach(decision => {
        if (decision.word === word && formattedword === '') {
          foundWord = true;
          linkTo = decision.linkTo;
        } else if (formattedword === decision.word) {
          foundWord = true;
          linkTo = decision.linkTo;
        }
      });

      //If there are no matches then push a span onto the array
      if (foundWord === false) {
        sentenceToDisplay.push(
          <span key={`span-${i}`} className='decision-text'>
            {` ${word} `}
          </span>
        );
      }
      //If there are matches then push a button onto the array
      if (foundWord === true) {
        sentenceToDisplay.push(
          <button
            link-to={linkTo}
            key={`button-${i}`}
            className='decision-btn'
            onClick={props.handleDecision}
          >
            {` ${word} `}
          </button>
        );
      }
    });

    //Finally return the array with the elements
    return sentenceToDisplay;
  };

  return (
    <div className='typewritter'>
      <div className='typer'>
        <span>{completed ? searchForWords() : text}</span>
        <span id='cursor'></span>
      </div>
    </div>
  );
}

Typest.propTypes = {
  sentences: PropTypes.array.isRequired
};

export default Typest;
