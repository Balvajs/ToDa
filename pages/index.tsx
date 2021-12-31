import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';

import { device } from '../lib/breakpoints';
import cover from '../public/cover.webp';
import i1 from '../public/gallery/1.jpeg';
import i2 from '../public/gallery/2.jpeg';
import i3 from '../public/gallery/3.jpeg';
import i4 from '../public/gallery/4.jpeg';
import i5 from '../public/gallery/5.jpeg';
import i6 from '../public/gallery/6.jpeg';
import i7 from '../public/gallery/7.jpeg';

const Section = styled.section`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const Carousel = styled.section`
  min-width: 100vw;
  height: 100vh;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
`;

const CarouselImage = styled.div`
  width: 50vw;
  height: 100vh;
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
  position: relative;
`;

const Title = styled.h1`
  position: absolute;
  left: 4vw;
  top: 75vh;
  font-weight: 300;
  font-size: 3.5rem;
  margin: 0;
  z-index: 1;

  @media ${device.sm.min} {
    left: 10vw;
  }

  @media ${device.md.min} {
    left: 10vw;
    top: 70vh;
    font-size: 5rem;
  }

  @media ${device.xl.min} {
    font-size: 7rem;
  }

  @media ${device.xxl.min} {
    left: 6vw;
    top: 53vh;
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

export default function Home() {
  return (
    <div>
      <Head>
        <title>ToDa</title>
        <meta name="description" content="Apartman ToDa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Section>
          <Overlay />
          <Image src={cover} layout="fill" objectFit="cover" priority />
          <Title>
            Apartmán
            <br />
            ToDa
          </Title>
        </Section>
        <Carousel>
          <CarouselImage>
            <Image
              src={i1}
              layout="fill"
              objectFit="contain"
              placeholder="blur"
            />
          </CarouselImage>
          <CarouselImage>
            <Image
              src={i2}
              layout="fill"
              objectFit="contain"
              placeholder="blur"
            />
          </CarouselImage>
          <CarouselImage>
            <Image
              src={i3}
              layout="fill"
              objectFit="contain"
              placeholder="blur"
            />
          </CarouselImage>
          <CarouselImage>
            <Image
              src={i4}
              layout="fill"
              objectFit="contain"
              placeholder="blur"
            />
          </CarouselImage>
          <CarouselImage>
            <Image
              src={i5}
              layout="fill"
              objectFit="contain"
              placeholder="blur"
            />
          </CarouselImage>
          <CarouselImage>
            <Image
              src={i6}
              layout="fill"
              objectFit="contain"
              placeholder="blur"
            />
          </CarouselImage>
          <CarouselImage>
            <Image
              src={i7}
              layout="fill"
              objectFit="contain"
              placeholder="blur"
            />
          </CarouselImage>
        </Carousel>
      </main>
    </div>
  );
}
