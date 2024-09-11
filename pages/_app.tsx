import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Global, css } from '@emotion/react';
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { AppProps } from 'next/app';

const GlobalStyle = css`
  html,
  body {
    width: 100vw;
    height: 100%;
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    font-size: 16px;
    color: white;
    background-color: #222;
  }

  #__next {
    height: 100%;
  }
`;

const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps, ...rest }: AppProps) {
  return (
    <AppCacheProvider {...rest}>
      <ApolloProvider client={client}>
        <CssBaseline />
        <Global styles={GlobalStyle} />
        <Component {...pageProps} />
      </ApolloProvider>
    </AppCacheProvider>
  );
}

export default MyApp;
