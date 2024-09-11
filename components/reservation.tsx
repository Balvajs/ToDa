import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import { CircularProgress } from '@mui/material';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { InView } from 'react-intersection-observer';

import { device } from '../lib/breakpoints';

const ReservationForm = dynamic(() => import('./reservation-form'), {
  suspense: true,
});

const Container = styled.div`
  width: 100%;
  padding: 0 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${device.md.min} {
    height: 90%;
  }
`;

const Grower = styled.div`
  flex-grow: 1;

  @media ${device.md.min} {
    display: none;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-top: 0;
  margin-bottom: 2rem;

  @media ${device.md.min} {
    margin-bottom: 3rem;
  }
`;

const dayPickerGlobalStyle = css`
  .rdp-button:hover:not([disabled]),
  .rdp-button:active:not([disabled]),
  .rdp-button:focus:not([disabled]) {
    background: none !important;
    border-color: white !important;
  }

  .rdp-day_selected:not([disabled]),
  .rdp-day_selected:hover:not([disabled]),
  .rdp-day_selected:focus:not([disabled]) {
    background-color: #5c5c5c !important;
  }
`;

export function Reservation() {
  return (
    <InView rootMargin="100%" threshold={0}>
      {({ inView, ref }) => (
        <Container ref={ref}>
          <>
            <Global styles={dayPickerGlobalStyle} />
            <Grower />
            <Title>Rezervace</Title>
            <Suspense fallback={<CircularProgress />}>
              {inView && <ReservationForm />}
            </Suspense>
          </>
        </Container>
      )}
    </InView>
  );
}
