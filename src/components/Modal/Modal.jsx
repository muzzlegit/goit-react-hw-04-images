import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
//STYLES
import { Backdrop, Content } from './Modal.styled';
//CoNSTS
const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onCloseModal, children }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleKeydown(event) {
    if (event.code === 'Escape') {
      onCloseModal();
    }
  }
  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onCloseModal();
    }
  };

  return createPortal(
    <Backdrop onClick={handleBackdropClick}>
      <Content>{children}</Content>
    </Backdrop>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.element,
  onCloseModal: PropTypes.func.isRequired,
};
