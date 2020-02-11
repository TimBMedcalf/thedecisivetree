import React from 'react';
import Modal from 'react-modal';

function ShareModal({ isOpen }) {
  return (
    <div>
      <Modal isOpen={isOpen} contentLabel='Example Modal'></Modal>
    </div>
  );
}

export default ShareModal;
