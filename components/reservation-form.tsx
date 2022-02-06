import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Rating,
  Typography,
  createTheme,
  ThemeProvider,
  Button,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { gql } from 'apollo-server-micro';
import { useCallback, useRef, useState } from 'react';
import { DateRange } from 'react-day-picker';
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

const FormCarousel = styled.form<{ scrollEnabled: boolean }>`
  width: 100vw;
  display: flex;
  align-items: flex-start;
  ${({ scrollEnabled }) =>
    scrollEnabled
      ? css`
          overflow-x: scroll;
        `
      : css`
          overflow-x: hidden;
        `}
  scroll-snap-type: x mandatory;
  flex-grow: 1;

  @media ${device.md.min} {
    scroll-snap-type: none;
    justify-content: center;
    flex-grow: 0;
  }
`;

const ContinueButton = styled(Button)`
  @media ${device.md.min} {
    display: none;
  }
`;

const FormSlide = styled.div`
  width: 100vw;
  min-height: 425px;
  padding: 0 1rem;
  scroll-snap-align: center;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;

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

const SubmitButton = styled(LoadingButton)`
  margin-top: 2rem;
`;

const ErrorMessage = styled.p`
  max-width: 350px;
  color: ${theme.palette.error.main};
`;

const SuccessMessage = styled.p`
  color: ${theme.palette.success.main};
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

const bookTermMutation = gql`
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
// eslint-disable-next-line no-unused-expressions
bookTermMutation;

function ReservationForm() {
  const [dateRange, setDateRange] = useState<DateRange>();
  const [personsHover, setPersonsHover] = useState(-1);
  const [error, setError] = useState();
  const secondStepRef = useRef<HTMLDivElement>(null);

  const [bookTerm, { loading, data, reset }] = useBookTermMutation();

  const { control, handleSubmit, getValues } = useForm<Values>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      numberOfPersons: 2,
      note: '',
    },
  });

  const onSubmit = useCallback(
    (values: Values) => {
      if (dateRange?.from && dateRange.to) {
        setError(undefined);

        return bookTerm({
          variables: {
            input: {
              from: dateRange.from.toISOString(),
              to: dateRange.to.toISOString(),
              ...values,
            },
          },
        }).catch((newError) => {
          reset();
          setError(newError);
        });
      }
    },
    [dateRange, reset],
  );

  const personsDisplay =
    personsHover !== -1 ? personsHover : getValues('numberOfPersons');

  return (
    <ThemeProvider theme={theme}>
      <FormCarousel
        onSubmit={handleSubmit(onSubmit)}
        scrollEnabled={!!dateRange?.from && !!dateRange.to}
      >
        <FormSlide>
          <DatePicker onDateRangeChange={setDateRange} disabled={!!data} />
          <ContinueButton
            onClick={() =>
              secondStepRef.current?.scrollIntoView({ behavior: 'smooth' })
            }
            fullWidth
            disabled={!dateRange?.from || !dateRange.to}
          >
            Pokračovat
          </ContinueButton>
        </FormSlide>
        <FormSlide ref={secondStepRef}>
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
                    disabled={!!data}
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
                    disabled={!!data}
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
                    disabled={!!data}
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
                    disabled={!!data}
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
                    disabled={!!data}
                  />
                )}
              />
            </FormRow>
            {!data && (
              <SubmitButton type="submit" fullWidth loading={loading}>
                Odeslat
              </SubmitButton>
            )}
            {error && (
              <ErrorMessage>
                Něco se pokazilo.
                <br />
                Zkuste to znovu, nebo nás kontaktujte na{' '}
                {process.env.NEXT_PUBLIC_MAIL_RECEIVER}
              </ErrorMessage>
            )}
            {data && (
              <SuccessMessage>
                Rezervace úspěšně odelána.
                <br />
                Brzy se Vám ozveme.
              </SuccessMessage>
            )}
          </PersonalDataForm>
        </FormSlide>
      </FormCarousel>
    </ThemeProvider>
  );
}

export default ReservationForm;
