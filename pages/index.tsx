import { css } from '@emotion/react';
import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { InView } from 'react-intersection-observer';

import { Cover } from '../components/cover';
import { Reservation } from '../components/reservation';
import ogCover from '../public/og-cover.jpeg';

const Gallery = dynamic(() => import('../components/gallery'));

const Main = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
`;

const Section = styled.section<{ background?: string }>`
  width: 100vw;
  height: 100%;
  position: relative;
  text-align: center;
  scroll-snap-align: start;
  flex-shrink: 0;

  ${({ background }) =>
    background &&
    css`
      background-color: ${background};
    `}
`;

const setUrlAnchor = (id?: string) =>
  window.history.replaceState(null, '', id ? `/#${id}` : '/');

export default function Home() {
  return (
    <>
      <Head>
        <title>ToDa</title>
        <meta name="description" content="Apartman ToDa" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content={ogCover.src} />
        <meta property="og:title" content="Apartmán ToDa" />
        <meta
          property="og:description"
          content="Apartmán v Příchovicích v Jizerských horách"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
      </Head>

      <Main>
        <InView threshold={1} onChange={(inView) => inView && setUrlAnchor()}>
          {({ ref }) => (
            <Section ref={ref}>
              <Cover />
            </Section>
          )}
        </InView>

        <InView
          threshold={1}
          onChange={(inView) => inView && setUrlAnchor('gallery')}
        >
          {({ ref: sectionRef }) => (
            <Section ref={sectionRef} id="gallery">
              <InView rootMargin="-1px" threshold={0}>
                {({ inView, ref }) => (
                  <Section ref={ref}>{inView && <Gallery />}</Section>
                )}
              </InView>
            </Section>
          )}
        </InView>

        <InView
          threshold={1}
          onChange={(inView) => inView && setUrlAnchor('reservation')}
        >
          {({ ref }) => (
            <Section ref={ref} id="reservation">
              <Reservation />
            </Section>
          )}
        </InView>
      </Main>
    </>
  );
}
