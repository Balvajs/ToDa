import { Slider, styled } from '@mui/material';
import { useState } from 'react';

const BrightSlider = styled(Slider)(() => {
  return {
    height: '20px',
    '& .MuiSlider-rail': {
      background: `linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 100%)`,
      opacity: 1,
      width: 'calc(100% + 20px)',
      left: '-10px',
    },
    '& .MuiSlider-track': {
      display: 'none',
    },
  };
}) as typeof Slider;

type Props = {
  initialValue: number;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: number) => void;
};

export function BrigthnessSlider({ initialValue, onChange }: Props) {
  const [value, setValue] = useState(initialValue);

  return (
    <BrightSlider
      value={value}
      min={50}
      max={254}
      onChange={(_, newValue) => {
        setValue(newValue as number);
        onChange(newValue as number);
      }}
    />
  );
}
