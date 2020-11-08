import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Message = styled.p`
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme: { color_pallet: { olivetone } } }) => olivetone};
  padding: 20px 50px;
  color: ${({ theme: { color_pallet: { black } } }) => black};
  font-weight: bold;
`;

const Toast = ({ isProcessing, noResults, noResidents }) => {
  let content;
  if (isProcessing) {
    content = 'Loading...';
  }
  if (noResults) {
    content = 'No match found';
  }
  if (noResidents) {
    content = 'No residents';
  }
  return content ? <Message>{content}</Message> : null;
};

Toast.propTypes = {
  isProcessing: PropTypes.bool.isRequired,
  noResults: PropTypes.bool.isRequired,
  noResidents: PropTypes.bool.isRequired,
};

export default Toast;
