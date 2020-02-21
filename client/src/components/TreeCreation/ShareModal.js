import React, { useRef, useState } from 'react';

function ShareModal({ setIsOpen, url }) {
  const [copySuccess, setCopySuccess] = useState('Copy');
  const urlText = useRef(null);

  const copy = () => {
    urlText.current.select();

    document.execCommand('copy');
    setCopySuccess('Copied!');
  };

  return (
    <div className='share-modal'>
      <h2>You can share your tree with this link below!</h2>
      <input type='text' readOnly value={url} ref={urlText} />
      <div className='user-decision-buttons'>
        <button onClick={() => setIsOpen(false)} className='btn btn-danger'>
          Close
        </button>
        <button onClick={copy} className='btn btn-primary'>
          {copySuccess}
        </button>
      </div>
    </div>
  );
}

export default ShareModal;
