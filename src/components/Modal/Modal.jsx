import { useEffect } from 'react';

const Modal = ({ hideModal, selectedHit }) => {
  useEffect(() => {
    const handleEscClick = evt => {
      if (evt.code === 'Escape') {
        hideModal();
      }
    };

    document.addEventListener('keydown', handleEscClick);

    return () => {
      document.removeEventListener('keydown', handleEscClick);
    };
  }, [hideModal]);

  const { largeImageURL, tags } = selectedHit;

  return (
    <div className="Overlay">
      <div className="Modal">
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
};

export default Modal;
