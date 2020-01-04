import React, { useState } from 'react';
import useInterval from '../lib/UseInterval';

function Typest({ sentences, repeating }) {
  const [text, setText] = useState('');
  const [isDeleting, setDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [loopIndex, setLoopIndex] = useState(0);

  const handleTyping = () => {
    //Checks if has finished all the sentences and is set not to repeat
    if (loopIndex >= sentences.length && !repeating) return;

    //Keeps track of current sentence
    const currentSentence = sentences[loopIndex];

    if (isDeleting) {
      //Remove the last letter from the sentence
      setText(currentSentence.substring(0, text.length - 1));
      setTypingSpeed(30);
    } else {
      //Add the last letter to the sentence
      setText(currentSentence.substring(0, text.length + 1));
      setTypingSpeed(150);
    }

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

  return (
    <div>
      <span>{text}</span>
      <span id='cursor'></span>
    </div>
  );
}

export default Typest;
