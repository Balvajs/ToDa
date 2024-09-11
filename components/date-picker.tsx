import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import csLocale from 'date-fns/locale/cs';
import dayjs from 'dayjs';
import { useState, useEffect, useCallback } from 'react';
import {
  DateRange,
  DayPicker,
  SelectRangeEventHandler,
} from 'react-day-picker';

const Container = styled.div`
  min-width: 312px;
  min-height: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const today = new Date();

type Props = {
  // eslint-disable-next-line no-unused-vars
  onDateRangeChange: (dateRange: DateRange | undefined) => void;
  disabled: boolean;
};

export function DatePicker({ onDateRangeChange, disabled }: Props) {
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

  const handleDateRangeChange = useCallback(
    (dateRange: DateRange | undefined) => {
      setRange(dateRange);
      onDateRangeChange(dateRange);
    },
    [onDateRangeChange],
  );

  const handleSelect = useCallback<SelectRangeEventHandler>(
    (newRange, selectedDay) => {
      if (disabled) {
        return;
      }

      if (!newRange || !newRange.from || !newRange.to) {
        return handleDateRangeChange(newRange);
      }

      const newFrom = newRange.from;
      const newTo = newRange.to;

      const isIntersectingReserved = reservedDays.some(
        ({ from, to }) =>
          (newFrom < from && newTo) > from || (newFrom < to && newTo > to),
      );

      if (isIntersectingReserved || newFrom === newTo) {
        return handleDateRangeChange({ from: selectedDay });
      }

      handleDateRangeChange(newRange);
    },
    [reservedDays, disabled],
  );

  return (
    <Container>
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
