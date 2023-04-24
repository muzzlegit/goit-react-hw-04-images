import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
//ICONS
import { MdImageSearch } from 'react-icons/md';
//STYLS
import { Header, Input, Button } from './Searchbar.styled';

export default function Searchbar({ handlePage, onSubmit }) {
  const [query, setQuery] = useState('');

  const handleQuery = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.warn('🦄 Wow so easy!');
      return;
    }
    handlePage(1);
    onSubmit(query.trim());
  };

  return (
    <Header>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleQuery}
        />
      </form>
      <Button type="submit" onClick={handleSubmit}>
        <MdImageSearch size="24px" />
      </Button>
    </Header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handlePage: PropTypes.func.isRequired,
};
