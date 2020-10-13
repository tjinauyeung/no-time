import { createGlobalStyle } from "styled-components";

const Styles = createGlobalStyle`
  *,
  *:after,
  *:before {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    font-family: 'IBM Plex Sans', sans-serif;
    color: #fff;
    background: #212529;
  }

  body {
    margin: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    font-weight: 400;
  }
`;

export default Styles;
