import { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    width: 100vw;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Roboto;
    font-size: 44px;
    overflow: hidden;
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalStyle>
      <Component {...pageProps} />
    </GlobalStyle>
  );
}

export default MyApp;
