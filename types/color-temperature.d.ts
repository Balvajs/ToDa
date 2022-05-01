declare module 'color-temperature' {
  type RGB = {
    red: number;
    green: number;
    blue: number;
  };

  // eslint-disable-next-line no-unused-vars
  export const colorTemperature2rgb: (kelvin: number) => RGB;
}
