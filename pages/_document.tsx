import {
  DocumentHeadTags,
  documentGetInitialProps,
} from '@mui/material-nextjs/v14-pagesRouter';
import type { DocumentHeadTagsProps } from '@mui/material-nextjs/v14-pagesRouter';
import { Head, Html, Main, NextScript } from 'next/document';
import type { DocumentProps, DocumentContext } from 'next/document';

export default function MyDocument(
  props: DocumentProps & DocumentHeadTagsProps,
) {
  return (
    <Html>
      <Head>
        <DocumentHeadTags {...props} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const finalProps = await documentGetInitialProps(ctx);
  return finalProps;
};
