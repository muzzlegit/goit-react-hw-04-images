import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
//COMPONENTS
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import ModalImage from './ModalImage/ModalImage';
//STYLES
import { Container } from './App.styled';

export default function App() {
  const [imageName, setImageName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [page, setPage] = useState(1);
  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  const onImageClick = (largeImageURL, tags) => {
    setModalContent({ url: largeImageURL, alt: tags });
    toggleModal();
  };

  return (
    <Container>
      <Searchbar onSubmit={setImageName} handlePage={setPage} />
      {showModal && (
        <Modal onCloseModal={toggleModal}>
          <ModalImage modalImage={modalContent} />
        </Modal>
      )}
      <ImageGallery
        onImageClick={onImageClick}
        page={page}
        handlePage={setPage}
        imageName={imageName}
      />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Container>
  );
}
