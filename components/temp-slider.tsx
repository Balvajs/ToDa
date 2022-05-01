import { Slider, SliderProps, styled } from '@mui/material';
import { colorTemperature2rgb } from 'color-temperature';
import { useState } from 'react';

const TempereatureSlider = styled(Slider)(({ min, max }: SliderProps) => {
  const minTemp = colorTemperature2rgb(1e6 / (min || 153));
  const maxTemp = colorTemperature2rgb(1e6 / (max || 454));

  return {
    height: '20px',
    '& .MuiSlider-rail': {
      background: `linear-gradient(90deg, rgb(${minTemp.red}, ${minTemp.green}, ${minTemp.blue}) 0%, rgb(${maxTemp.red}, ${maxTemp.green}, ${maxTemp.blue}) 100%)`,
      opacity: 1,
      width: 'calc(100% + 20px)',
      left: '-10px',
    },
    '& .MuiSlider-track': {
      display: 'none',
    },
  };
});

type Props = {
  min: number;
  max: number;
  initialValue: number;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: number) => void;
};

export function TempSlider({ min, max, initialValue, onChange }: Props) {
  const [value, setValue] = useState(initialValue);

  return (
    <TempereatureSlider
      value={value}
      min={min}
      max={max}
      onChange={(_, newValue) => {
        setValue(newValue as number);
        onChange(newValue as number);
      }}
    />
  );
}
