/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const SearchBarForm = styled.form``;

const SearchInput = styled.input`
  padding: 10px;
`;

const SubmitButton = styled.button`
  padding: 10px;
`;

const SearchBar = ({ handleSearch, handleInputChange, inputValue }) => (
  <SearchBarForm onSubmit={handleSearch}>
    <SearchInput
      type="text"
      placeholder="type name"
      value={inputValue}
      onChange={handleInputChange}
    />
    <SubmitButton type="submit">Search</SubmitButton>
  </SearchBarForm>
);

export default SearchBar;
