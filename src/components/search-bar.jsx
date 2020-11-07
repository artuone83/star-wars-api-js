/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const SearchBarForm = styled.form``;

const SearchInput = styled.input`
  padding: 10px 20px;
  background: transparent;
  border-top: none;
  border-right: none;
  border-bottom: 2px solid white;
  border-left: none;
  min-width: 50%;
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
      placeholder="Name, Planet, Population"
      value={inputValue}
      onChange={handleInputChange}
    />
    <SubmitButton type="submit">Search</SubmitButton>
  </SearchBarForm>
);

export default SearchBar;
