import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Rating, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import csLocale from 'date-fns/locale/cs';
import { useEffect, useState } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import styled, { css } from 'styled-components';

import 'react-day-picker/style.css';

const Container = styled.div`
  width: 100%;
  padding: 0 10px;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormCarousel = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-top: 0;
  margin-bottom: 1rem;
`;

const Form = styled.div`
  width: 100%;
  max-width: 400px;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormRow = styled.div<{ marginTop?: boolean }>`
  width: 100%;
  display: flex;
  margin-bottom: 1rem;
  ${({ marginTop }) =>
    marginTop &&
    css`
      margin-top: 1rem;
    `}
`;

const RowSpacer = styled.div`
  width: 1.5rem;
  flex-shrink: 0;
`;

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#cccccc',
  },
  '& .MuiRating-iconHover': {
    color: '#ffffff',
  },
});

const today = new Date();

const getPersonsString = (persons: number) => {
  if (persons === 1) {
    return 'osoba';
  }
  if (persons >= 2 && persons <= 4) {
    return 'osoby';
  }
  return 'osob';
};

export function Reservation() {
  const [range, setRange] = useState<DateRange>();
  const [reservedDays, setReservedDays] = useState<
    Array<{ start: string; end: string }>
  >([]);
  const [persons, setPersons] = useState(2);
  const [personsHover, setPersonsHover] = useState(-1);
  const personsDisplay = personsHover !== -1 ? personsHover : persons;

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
      <Title>Rezervace</Title>
      <FormCarousel>
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
        <Form>
          <FormRow>
            <TextField variant="standard" label="Jméno" fullWidth required />
            <RowSpacer />
            <TextField variant="standard" label="Příjmení" fullWidth required />
          </FormRow>
          <FormRow>
            <TextField
              variant="standard"
              type="email"
              label="Email"
              fullWidth
              required
            />
          </FormRow>
          <FormRow marginTop>
            <StyledRating
              name="customized-color"
              defaultValue={2}
              getLabelText={(value) =>
                `${value} Heart${value !== 1 ? 's' : ''}`
              }
              max={7}
              icon={<PersonIcon fontSize="inherit" />}
              emptyIcon={<PersonOutlineOutlinedIcon fontSize="inherit" />}
              onChange={(_event, newValue) => {
                if (newValue) {
                  setPersons(newValue);
                }
              }}
              onChangeActive={(_event, newHover) => {
                setPersonsHover(newHover);
              }}
            />
            <Typography marginLeft="1rem">
              {personsDisplay} {getPersonsString(personsDisplay)}
            </Typography>
          </FormRow>
          <FormRow>
            <TextField
              variant="standard"
              multiline
              label="Poznámka"
              maxRows={4}
              fullWidth
            />
          </FormRow>
        </Form>
      </FormCarousel>
    </Container>
  );
}
