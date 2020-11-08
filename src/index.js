import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { theme } from './consts/theme';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    font-family: 'Big Shoulders Stencil Text', cursive;
  }

  body {
    background: ${(props) => props.theme.color_pallet.black};
    color: white;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    list-style-type: none;
  }

  p {
    font-size: 1rem;
  }

  ::placeholder {
  color: white;
  opacity: 1;
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Big Shoulders Stencil Text', cursive;
}

:-ms-input-placeholder {
  color: white;
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Big Shoulders Stencil Text', cursive;
}

::-ms-input-placeholder {
  color: white;
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Big Shoulders Stencil Text', cursive;
}
`;

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
