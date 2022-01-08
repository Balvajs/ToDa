import { Typography } from '@mui/material';
import csLocale from 'date-fns/locale/cs';
import dayjs from 'dayjs';
import { useState, useEffect, useCallback } from 'react';
import {
  DateRange,
  DayPicker,
  SelectRangeEventHandler,
} from 'react-day-picker';
import styled, { createGlobalStyle } from 'styled-components';

const Container = styled.div`
  min-width: 312px;
  min-height: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DayPickerGlobalStyle = createGlobalStyle`
  .rdp-button:hover:not([disabled]),
  .rdp-button:active:not([disabled]),
  .rdp-button:focus:not([disabled]) {
    background: none;
    border-color: white;
  }

  .rdp-day_selected:not([disabled]),
  .rdp-day_selected:hover:not([disabled]),
  .rdp-day_selected:focus:not([disabled]) {
      background-color: #5c5c5c;
  }
`;

const today = new Date();

export function DatePicker() {
  const [range, setRange] = useState<DateRange>();
  const [reservedDays, setReservedDays] = useState<
    Array<{ from: Date; to: Date }>
  >([]);

  useEffect(() => {
    fetch('/api/calendar', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((responseReserved: Array<{ start: string; end: string }>) =>
        setReservedDays(
          responseReserved.map(({ start, end }) => ({
            from: new Date(start),
            to: new Date(end),
          })),
        ),
      );
  }, []);

  const handleSelect = useCallback<SelectRangeEventHandler>(
    (newRange, selectedDay) => {
      if (!newRange || !newRange.from || !newRange.to) {
        return setRange(newRange);
      }

      const newFrom = newRange.from;
      const newTo = newRange.to;

      const isIntersectingReserved = reservedDays.some(
        ({ from, to }) =>
          (newFrom < from && newTo) > from || (newFrom < to && newTo > to),
      );

      if (isIntersectingReserved || newFrom === newTo) {
        return setRange({ from: selectedDay });
      }

      setRange(newRange);
    },
    [reservedDays],
  );

  return (
    <Container>
      <DayPickerGlobalStyle />
      <Typography>
        {!range?.from && 'Vyberte první den pobytu'}
        {range?.from && !range.to && 'Vyberte poslední den pobytu'}
        {range?.from && range.to && (
          <>
            {range.from.toLocaleDateString('cs')}
            {' - '}
            {range.to.toLocaleDateString('cs')}
          </>
        )}
      </Typography>
      <DayPicker
        locale={csLocale}
        mode="range"
        defaultMonth={today}
        selected={range}
        onSelect={handleSelect}
        disabled={reservedDays}
        fromDate={dayjs(today).add(1, 'day').toDate()}
      />
    </Container>
  );
}
