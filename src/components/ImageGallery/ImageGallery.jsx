import PropTypes from 'prop-types';
import { useState } from 'react';
//API
import { fetchImage } from 'services/images-api';
//COMPONENTS
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
//STYLES
import { Container, List, EmptyBox } from './ImageGallery.styled';
import { useEffect } from 'react';
//CONSTS
const IMAGES_QUANTITY = 12;

export default function ImageGallery({
  page,
  handlePage,
  imageName,
  onImageClick,
}) {
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [firstRecivedImage, setFirstRecivedImage] = useState(null);

  const handleButtonClick = () => {
    handlePage(prev => (prev += 1));
  };
  useEffect(() => {
    document.getElementById(firstRecivedImage)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [firstRecivedImage]);
  useEffect(() => {
    if (imageName === '') return;
    if (page === 1) setImages([]);
    setStatus('panding');
    fetchImage(imageName, page, IMAGES_QUANTITY)
      .then(res => {
        if (!res.total) return [];
        setTotalPages(Math.ceil(res.total / IMAGES_QUANTITY));
        setFirstRecivedImage(res.hits[0].id);
        return res.hits.map(({ id, webformatURL, largeImageURL, tags }) => ({
          id,
          webformatURL,
          largeImageURL,
          tags,
        }));
      })
      .then(res => {
        if (page !== 1) {
          setImages(prev => [...prev, ...res]);
        } else {
          setImages(res);
        }
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [imageName, page]);

  if (status === 'panding')
    return (
      <Container>
        <Loader imagesQuantity={IMAGES_QUANTITY} />
      </Container>
    );
  if (status === 'resolved') {
    return (
      <Container>
        <List>
          {images.map(image => {
            return (
              <ImageGalleryItem
                key={image.id}
                image={image}
                onImageClick={onImageClick}
              />
            );
          })}
        </List>
        {images.length ? (
          <Button
            isDisabled={page === totalPages}
            onLoadMoreClick={handleButtonClick}
          />
        ) : (
          <EmptyBox>Oops, Nothing Found!</EmptyBox>
        )}
      </Container>
    );
  }
  if (status === 'rejected') return <EmptyBox>{error}</EmptyBox>;
}

ImageGallery.propTypes = {
  imageName: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  handlePage: PropTypes.func.isRequired,
};
