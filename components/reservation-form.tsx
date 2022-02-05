import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Rating, Typography, createTheme, ThemeProvider } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { gql } from 'apollo-server-micro';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled, { css } from 'styled-components';

import { device } from '../lib/breakpoints';

import { DatePicker } from './date-picker';
import { useBookTermMutation } from './reservation.generated';

import 'react-day-picker/style.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const FormCarousel = styled.form`
  width: 100vw;
  display: flex;
  align-items: flex-start;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  flex-grow: 1;

  @media ${device.md.min} {
    scroll-snap-type: none;
    justify-content: center;
    flex-grow: 0;
  }
`;

const FormSlide = styled.div`
  width: 100vw;
  padding: 0 1rem;
  scroll-snap-align: center;
  flex-shrink: 0;
  display: flex;
  justify-content: center;

  @media ${device.md.min} {
    width: auto;
  }
`;

const PersonalDataForm = styled.div`
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

const SubmitButton = styled(Button)`
  margin-top: 2rem;
`;

const getPersonsString = (persons: number) => {
  if (persons === 1) {
    return 'osoba';
  }
  if (persons >= 2 && persons <= 4) {
    return 'osoby';
  }
  return 'osob';
};

export type Values = {
  firstName: string;
  lastName: string;
  email: string;
  numberOfPersons: number;
  note: string;
};

// eslint-disable-next-line no-underscore-dangle, no-unused-vars
const _bookTermMutation = gql`
  mutation BookTerm($input: BookTermInput!) {
    bookTerm(input: $input) {
      ... on BookTermSuccess {
        booking {
          term {
            to
            from
          }
        }
      }
    }
  }
`;

function ReservationForm() {
  const [personsHover, setPersonsHover] = useState(-1);

  const [bookTerm] = useBookTermMutation();

  const { control, handleSubmit, getValues } = useForm<Values>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      numberOfPersons: 2,
      note: '',
    },
  });

  const onSubmit = (values: Values) =>
    bookTerm({
      variables: {
        input: {
          from: new Date().toISOString(),
          to: new Date().toISOString(),
          ...values,
        },
      },
    });

  const personsDisplay =
    personsHover !== -1 ? personsHover : getValues('numberOfPersons');

  return (
    <ThemeProvider theme={theme}>
      <FormCarousel onSubmit={handleSubmit(onSubmit)}>
        <FormSlide>
          <DatePicker />
        </FormSlide>
        <FormSlide>
          <PersonalDataForm>
            <FormRow>
              <Controller
                control={control}
                name="firstName"
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="standard"
                    label="Jméno"
                    fullWidth
                    required
                    autoComplete="given-name"
                  />
                )}
              />
              <RowSpacer />
              <Controller
                control={control}
                name="lastName"
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="standard"
                    label="Příjmení"
                    fullWidth
                    required
                    autoComplete="family-name"
                  />
                )}
              />
            </FormRow>
            <FormRow>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="standard"
                    type="email"
                    label="Email"
                    fullWidth
                    required
                    autoComplete="email"
                  />
                )}
              />
            </FormRow>
            <FormRow marginTop>
              <Controller
                control={control}
                name="numberOfPersons"
                render={({ field }) => (
                  <StyledRating
                    {...field}
                    defaultValue={2}
                    getLabelText={(value) =>
                      `${value} ${getPersonsString(value)}`
                    }
                    max={7}
                    icon={<PersonIcon fontSize="inherit" />}
                    emptyIcon={<PersonOutlineOutlinedIcon fontSize="inherit" />}
                    onChange={(_event, newValue) => {
                      if (newValue) {
                        field.onChange(newValue);
                      }
                    }}
                    onChangeActive={(_event, newHover) => {
                      setPersonsHover(newHover);
                    }}
                  />
                )}
              />
              <Typography marginLeft="1rem">
                {personsDisplay} {getPersonsString(personsDisplay)}
              </Typography>
            </FormRow>
            <FormRow>
              <Controller
                control={control}
                name="note"
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="standard"
                    multiline
                    label="Poznámka"
                    maxRows={4}
                    fullWidth
                  />
                )}
              />
            </FormRow>
            <SubmitButton type="submit" fullWidth>
              Odeslat
            </SubmitButton>
          </PersonalDataForm>
        </FormSlide>
      </FormCarousel>
    </ThemeProvider>
  );
}

export default ReservationForm;
