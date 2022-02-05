import Image from 'next/image';
import styled from 'styled-components';

import cover from '../public/cover.jpeg';

// const appear = keyframes`
//   from {
//     opacity: 0;
//     transform: translateX(-50%) translateY(-20%);
//   }

//   to {
//     opacity: 1;
//     transform: translateX(-50%) translateY(0);
//   }
// `;

// const Title = styled.h1<{ canAppear: boolean }>`
//   position: absolute;
//   left: 50%;
//   bottom: 50%;
//   font-weight: 300;
//   font-size: 2.8rem;
//   margin: 0;
//   z-index: 1;
//   text-align: right;
//   transform: translateX(-50%) translateY(-20%);
//   opacity: 0;

//   ${({ canAppear }) =>
//     canAppear &&
//     css`
//       animation: ${appear} 2s ease-out;
//       animation-iteration-count: 1;
//       animation-fill-mode: forwards;
//       animation-delay: 1s;
//     `}

//   @media ${device.md.min} {
//     bottom: 45%;
//     font-size: 4rem;
//   }

//   @media ${device.xl.min} {
//     font-size: 5.5rem;
//   }

//   @media ${device.xxl.min} {
//     bottom: 45%;
//   }
// `;

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

export function Cover() {
  // const [coverImageLoaded, setCoverImageLoaded] = useState(false);

  //   const handleCoverImageLoadingComplete = useCallback(
  //     () => setCoverImageLoaded(true),
  //     [],
  //   );

  return (
    <>
      <Overlay />
      <Image
        src={cover}
        layout="fill"
        objectFit="cover"
        priority
        //  onLoadingComplete={handleCoverImageLoadingComplete}
        quality={50}
      />
      {/* <Title canAppear={coverImageLoaded}>
        Apartmán
        <br />
        ToDa
      </Title> */}
    </>
  );
}
