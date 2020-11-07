/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const SearchBarForm = styled.form``;

const SearchBar = ({ handleSearch, handleInputChange, inputValue }) => (
  <SearchBarForm onSubmit={handleSearch}>
    <input
      type="text"
      placeholder="type name"
      value={inputValue}
      onChange={handleInputChange}
    />
    <button type="submit">Search</button>
  </SearchBarForm>
);

export default SearchBar;
