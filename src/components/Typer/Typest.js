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
    if (typeof props.decisions.sentence !== 'number') return;

    //Provided from user to tell which sentence to add the buttons to
    const i = props.decisions.sentence;
    const wordsToBeFound = props.decisions.words;

    //Split the sentence into words
    let decisionWords = props.sentences[i].split(' ');

    //Create a table where each key is the word, if too memory usage too high swap to hashes
    let words = {};
    wordsToBeFound.forEach(word => {
      words[word] = word;
    });

    //If the word matches the table created above then create a button if not create span
    return decisionWords.map((word, i) => {
      if (words.hasOwnProperty(word)) {
        return (
          <button
            key={`button-${i}`}
            className='decision-btn'
            onClick={props.handleDecision}
          >
            {` ${word} `}
          </button>
        );
      } else {
        return (
          <span key={`span-${i}`} className='decision-text'>
            {` ${word} `}
          </span>
        );
      }
    });
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
  sentences: PropTypes.array.isRequired,
  decisions: PropTypes.object
};

export default Typest;