import PropTypes from 'prop-types';
//STYLES
import { Img } from './ModalImage.styled';

export default function ModalImage({ modalImage }) {
  return <Img src={modalImage.url} alt={modalImage.alt} />;
}

ModalImage.propTypes = {
  modalImage: PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }),
};
