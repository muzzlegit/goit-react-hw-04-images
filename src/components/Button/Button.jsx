import PropTypes from 'prop-types';
//STYLES
import { ButtonComponent } from './Button.styled';

export default function Button({ onLoadMoreClick, isDisabled }) {
  return (
    <ButtonComponent
      type="button"
      onClick={onLoadMoreClick}
      disabled={isDisabled}
    >
      Load More
    </ButtonComponent>
  );
}

Button.propTypes = {
  onLoadMoreClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};
