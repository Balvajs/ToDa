import { CircularProgress } from '@mui/material';
import dynamic from 'next/dynamic';
import { InView } from 'react-intersection-observer';
import styled from 'styled-components';

import { device } from '../lib/breakpoints';

const ReservationForm = dynamic(() => import('./reservation-form'), {
  loading: () => <CircularProgress />,
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

export function Reservation() {
  return (
    <InView rootMargin="100%" threshold={0}>
      {({ inView, ref }) => (
        <Container ref={ref}>
          <Grower />
          <Title>Rezervace</Title>
          {inView && <ReservationForm />}
        </Container>
      )}
    </InView>
  );
}
