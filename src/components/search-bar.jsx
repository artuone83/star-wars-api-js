import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SearchBarForm = styled.form`
  width: 50%;
  display: flex;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  padding: 10px 20px;
  background: transparent;
  border-top: none;
  border-right: none;
  border-bottom: 2px solid white;
  border-left: none;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Big Shoulders Stencil Text', cursive;

  &:placeholder {
    color: white;
    opacity: 1;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background: ${({ theme: { color_pallet: { black } } }) => black};
  color: ${({ theme: { color_pallet: { ripeLemon } } }) => ripeLemon};
  border-radius: 4px;
  border: 1px solid ${({ theme: { color_pallet: { ripeLemon } } }) => ripeLemon};
  cursor: pointer;
  transition: 0.5s;
  font-family: 'Big Shoulders Stencil Text', cursive;

  &:hover {
    background: ${({ theme: { color_pallet: { ripeLemon } } }) => ripeLemon};
    color: ${({ theme: { color_pallet: { black } } }) => black};
  }
`;

const SearchBar = ({ handleSearch, handleInputChange, inputValue }) => (
  <SearchBarForm onSubmit={handleSearch}>
    <SearchInput
      type="text"
      placeholder="Name, Planet"
      value={inputValue}
      onChange={handleInputChange}
    />
    <SubmitButton type="submit">Search</SubmitButton>
  </SearchBarForm>
);

SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
};

export default SearchBar;
