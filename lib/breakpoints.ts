const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

export const device = Object.entries(breakpoints).reduce(
  (acc, [breakpoint, width]) => ({
    ...acc,
    [breakpoint]: {
      min: `(min-width: ${width}px)`,
      max: `(max-width: ${width - 0.02}px)`,
    },
  }),
  {} as {
    /** 0px */
    xs: {
      min: string;
      max: string;
    };
    /** 576px */
    sm: {
      min: string;
      max: string;
    };
    /** 768px */
    md: {
      min: string;
      max: string;
    };
    /** 992px */
    lg: {
      min: string;
      max: string;
    };
    /** 1200px */
    xl: {
      min: string;
      max: string;
    };
    /** 1400px */
    xxl: {
      min: string;
      max: string;
    };
  },
);
