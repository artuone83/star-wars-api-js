/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledContainer = styled.div`
  max-width: 1150px;
  margin: 0 auto;
`;

const Container = ({ children }) => <StyledContainer>{children}</StyledContainer>;

Container.propTypes = {
  children: PropTypes.node,
};
export default Container;
