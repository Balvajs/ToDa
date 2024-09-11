import { css } from '@emotion/react';
import styled from '@emotion/styled';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

import jidelniStulDen from '../public/gallery/jidelni-stul-den.jpeg';
import koupelna from '../public/gallery/koupelna.jpeg';
import lozniceMalaOdOkna from '../public/gallery/loznice-mala-od-okna.jpeg';
import lozniceMala from '../public/gallery/loznice-mala.jpeg';
import loznicePuda from '../public/gallery/loznice-puda.jpeg';
import lozniceVelka from '../public/gallery/loznice-velka.jpeg';
import obyvaciPokojKrb from '../public/gallery/obyvaci-pokoj-krb.jpeg';
import obyvaciPokojKuchyne from '../public/gallery/obyvaci-pokoj-kuchyne.jpeg';
import schody from '../public/gallery/schody.jpeg';
import terasaDen from '../public/gallery/terasa-den.jpeg';
import vstupniDvere from '../public/gallery/vstupni-dvere.jpeg';

const gallery = [
  { src: obyvaciPokojKrb, alt: 'Obývací pokoj s krbem' },
  { src: obyvaciPokojKuchyne, alt: 'Obývací pokoj s kuchyní' },
  { src: schody, alt: 'Schody' },
  { src: lozniceVelka, alt: 'Ložnice velká' },
  { src: lozniceMala, alt: 'Ložnice malá' },
  { src: lozniceMalaOdOkna, alt: 'Ložnice malá' },
  { src: koupelna, alt: 'Koupelna' },
  { src: loznicePuda, alt: 'Ložnice na půdě' },
  { src: jidelniStulDen, alt: 'Jídelní stůl' },
  { src: terasaDen, alt: 'Terasa' },
  { src: vstupniDvere, alt: 'Vstupní dveře' },
] as const;

const Carousel = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
`;

const CarouselImage = styled.div`
  min-width: 45vw;
  max-width: 95vw;
  width: 75vh;
  height: calc(133.333vw - 6.666vw);
  max-height: 100%;
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
  position: relative;
  margin: 0 2.5vw;
  scroll-snap-align: center;
`;

const ArrowStrip = styled.div<{ hidden: boolean }>`
  width: 50px;
  height: 50px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  opacity: 1;
  transition: opacity 300ms ease;

  ${({ hidden }) =>
    hidden &&
    css`
      opacity: 0;
    `}
`;

function Gallery() {
  const imageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (imageRefs.current.length) {
      const observer = new IntersectionObserver(
        (entries) => {
          const indexesInView = entries
            .filter((entry) => entry.isIntersecting)
            .map((entry) =>
              parseInt(entry.target.getAttribute('data-index') || '', 10),
            );

          if (indexesInView.length > 1) {
            if (indexesInView[0] === 0) {
              setCurrentImageIndex(0);
            } else if (indexesInView.at(-1) === gallery.length - 1) {
              setCurrentImageIndex(gallery.length - 1);
            }
          } else if (indexesInView.length) {
            setCurrentImageIndex(indexesInView[0]);
          }
        },
        { threshold: 1 },
      );

      imageRefs.current.forEach((item) => item && observer.observe(item));
    }
  }, []);

  const handleNextArrowClick = useCallback(() => {
    imageRefs.current[currentImageIndex + 1]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
    });
    setCurrentImageIndex(currentImageIndex + 1);
  }, [currentImageIndex]);

  return (
    <Carousel>
      {gallery.map(({ src, alt }, index) => (
        <CarouselImage
          data-index={index}
          key={src.src}
          ref={(item) => {
            imageRefs.current.push(item);
          }}
        >
          <Image
            src={src}
            alt={alt}
            placeholder="blur"
            fill
            sizes="100vw"
            style={{
              objectFit: 'contain',
            }}
          />
        </CarouselImage>
      ))}
      <ArrowStrip
        onClick={handleNextArrowClick}
        hidden={currentImageIndex >= gallery.length - 1}
      >
        <ArrowForwardIosIcon fontSize="large" />
      </ArrowStrip>
    </Carousel>
  );
}

export default Gallery;
