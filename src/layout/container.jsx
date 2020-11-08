import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledContainer = styled.div`
  max-width: 1150px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Container = ({ children }) => <StyledContainer>{children}</StyledContainer>;

Container.propTypes = {
  children: PropTypes.node,
};
export default Container;
