import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

  body {
    background: #FFF;
    color: #3a3a3a;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-size: 26px;
    background-color: #c515c5;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }
  
  button {
    cursor: pointer;
  }

  #main-container {
    padding: 0;
  }

  .d-mobile-none {
    @media only screen and (max-width: 720px) {
      display: none;
    }
  }

  .d-md-none {
    @media only screen and (min-width: 720px) {
      display: none;
    }
  }

  .align-txt-center {
    text-align: center;
  }

  .font-16 {
    font-size: 16px !important;
  }

  .font-18 {
    font-size: 18px !important;
  }

  .font-20 {
    font-size: 20px !important;
  }

  .font-22 {
    font-size: 22px !important;
  }

  .font-24 {
    font-size: 24px !important;
  }

  .font-26 {
    font-size: 26px !important;
  }

  .title-42 {
    font-size: 42px !important;
  }
`;
