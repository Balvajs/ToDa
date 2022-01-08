// import TextField from '@mui/material/TextField';
import csLocale from 'date-fns/locale/cs';
import { useEffect, useState } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import styled from 'styled-components';

import 'react-day-picker/style.css';

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
  margin-bottom: 4rem;
`;

const today = new Date();

export function Reservation() {
  const [range, setRange] = useState<DateRange>();
  const [reservedDays, setReservedDays] = useState<
    Array<{ start: string; end: string }>
  >([]);

  useEffect(() => {
    fetch('/api/calendar', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then(setReservedDays);
  }, []);

  return (
    <Container>
      <div>
        <Title>Rezervace</Title>
        {/* <TextField variant="standard" label="Jméno" /> */}
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
      </div>
    </Container>
  );
}
