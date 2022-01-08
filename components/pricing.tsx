import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-top: 0;
`;

export function Pricing() {
  return (
    <Container>
      <div>
        <Title>Ceník</Title>
        <h3>Zimní sezóna (1.1. - 31.3.)</h3>
        <p>2 200,- Kč/noc</p>
        <h3>Létní sezóna (30.6. - 30.8.)</h3>
        <p>2 000,- Kč/noc</p>
        <h3>Mimo sezónu</h3>
        <p>1 700,- Kč/noc</p>
      </div>
    </Container>
  );
}
