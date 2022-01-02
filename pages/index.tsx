import csLocale from 'date-fns/locale/cs';
import Head from 'next/head';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import styled, { css, keyframes } from 'styled-components';

import { device } from '../lib/breakpoints';
import cover from '../public/cover.webp';
import i1 from '../public/gallery/1.jpeg';
import i10 from '../public/gallery/10.jpeg';
import i11 from '../public/gallery/11.jpeg';
import i12 from '../public/gallery/12.jpeg';
import i13 from '../public/gallery/13.jpeg';
import i14 from '../public/gallery/14.jpeg';
import i15 from '../public/gallery/15.jpeg';
import i16 from '../public/gallery/16.jpeg';
import i17 from '../public/gallery/17.jpeg';
import i18 from '../public/gallery/18.jpeg';
import i19 from '../public/gallery/19.jpeg';
import i20 from '../public/gallery/20.jpeg';
import i22 from '../public/gallery/22.jpeg';
import i3 from '../public/gallery/3.jpeg';
import i4 from '../public/gallery/4.jpeg';
import i7 from '../public/gallery/7.jpeg';
import i8 from '../public/gallery/8.jpeg';
import i9 from '../public/gallery/9.jpeg';

import 'react-day-picker/style.css';

const gallery = [
  i1,
  i3,
  i4,
  i7,
  i8,
  i9,
  i10,
  i11,
  i12,
  i13,
  i14,
  i15,
  i16,
  i17,
  i18,
  i19,
  i20,
  i22,
];

const Main = styled.main`
  display: flex;
  flex-direction: column;
`;

const Section = styled.section<{ background?: string }>`
  width: 100vw;
  height: 100vh;
  position: relative;
  text-align: center;

  ${({ background }) =>
    background &&
    css`
      background: ${background};
    `}
`;

const Carousel = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
`;

const CarouselImage = styled.div`
  min-width: 45vw;
  max-width: 95vw;
  width: 75vh;
  height: 133.333vw;
  max-height: 100vh;
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
  position: relative;
  margin: 0 2.5vw;
`;

const appear = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-20%);
  }

  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
`;

const Title = styled.h1<{ canAppear: boolean }>`
  position: absolute;
  left: 50%;
  bottom: 50vh;
  font-weight: 300;
  font-size: 2.8rem;
  margin: 0;
  z-index: 1;
  text-align: right;
  transform: translateX(-50%) translateY(-20%);
  opacity: 0;

  ${({ canAppear }) =>
    canAppear &&
    css`
      animation: ${appear} 2s ease-out;
      animation-iteration-count: 1;
      animation-fill-mode: forwards;
      animation-delay: 1s;
    `}

  @media ${device.md.min} {
    bottom: 45vh;
    font-size: 4rem;
  }

  @media ${device.xl.min} {
    font-size: 5.5rem;
  }

  @media ${device.xxl.min} {
    bottom: 45vh;
  }
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.2;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
`;

const today = new Date();

export default function Home() {
  const [range, setRange] = useState<DateRange>();
  const [coverImageLoaded, setCoverImageLoaded] = useState(false);
  const [reservedDays, setReservedDays] = useState<
    Array<{ start: string; end: string }>
  >([]);

  const handleCoverImageLoadingComplete = useCallback(
    () => setCoverImageLoaded(true),
    [],
  );

  useEffect(() => {
    fetch('/api/calendar', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then(setReservedDays);
  }, []);

  return (
    <div>
      <Head>
        <title>ToDa</title>
        <meta name="description" content="Apartman ToDa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Section>
          <Overlay />
          <Image
            src={cover}
            layout="fill"
            objectFit="cover"
            priority
            onLoadingComplete={handleCoverImageLoadingComplete}
          />
          <Title canAppear={coverImageLoaded}>
            Apartmán
            <br />
            ToDa
          </Title>
        </Section>
        <Section>
          <Carousel>
            {gallery.map((src) => (
              <CarouselImage key={src.src}>
                <Image
                  src={src}
                  layout="fill"
                  objectFit="contain"
                  placeholder="blur"
                />
              </CarouselImage>
            ))}
          </Carousel>
        </Section>
        {/* <Section background="#303030">
          <h2>Ceník</h2>
          <h4>Zimní sezóna (1.1. - 31.3.)</h4>
          <p>99999$/noc</p>
          <h4>Létní sezóna (30.6. - 30.8.)</h4>
          <p>99999$/noc</p>
          <h4>Mimo sezónu</h4>
          <p>99999$/noc</p>
        </Section>
        <Section>
          <h2>Rezervace</h2>
          <DayPicker
            locale={csLocale}
            mode="range"
            defaultMonth={today}
            selected={range}
            onSelect={setRange}
            disabled={reservedDays.map(({ start, end }) => ({
              from: new Date(start),
              to: new Date(end),
            }))}
          />
        </Section> */}
      </Main>
    </div>
  );
}
