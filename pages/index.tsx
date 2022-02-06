import dynamic from 'next/dynamic';
import Head from 'next/head';
import { InView } from 'react-intersection-observer';
import styled, { css } from 'styled-components';

import { Cover } from '../components/cover';
import { Pricing } from '../components/pricing';
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
        <Section>
          <Cover />
        </Section>

        <Section>
          <InView rootMargin="-1px" threshold={0}>
            {({ inView, ref }) => (
              <Section ref={ref}>{inView && <Gallery />}</Section>
            )}
          </InView>
        </Section>

        <Section background="#303030">
          <Pricing />
        </Section>

        <Section>
          <Reservation />
        </Section>
      </Main>
    </>
  );
}
