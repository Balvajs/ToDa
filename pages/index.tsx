import dynamic from 'next/dynamic';
import Head from 'next/head';
import { InView } from 'react-intersection-observer';
import styled, { css } from 'styled-components';

import { Cover } from '../components/cover';
import { Pricing } from '../components/pricing';
import { Reservation } from '../components/reservation';

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
