import { merge } from 'theme-ui';

import preset from '@theme-ui/preset-base';

const CustomTheme = merge(preset, {
  config: {
    useBorderBox: true,
    useColorSchemeMediaQuery: true,
    useRootStyles: true
  },
  breakpoints: ['640px', '1024px', '1440px', '1920px'],
  borderWidths: {
    fat: '4px',
    regular: '2px',
    hairline: '1px',
    borderless: '0px'
  },
  colors: {
    accent: 'rgba(255, 0, 110, 1)',
    secondary: 'rgba(5, 74, 145, 1)',
    primary: 'rgba(58, 134, 255, 1)',
    highlight: 'rgba(223, 230, 235, 1)',
    muted: 'rgba(164, 171, 179, 1)',
    background: 'rgba(255, 255, 255, 1)',
    text: 'rgba(0, 0, 0, 1)'
  },
  fonts: {
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace'
  },
  fontSizes: {
    body: '1rem',
    heading6: '1.25rem',
    heading5: '1.5rem',
    heading4: '1.75rem',
    heading3: '2.25rem',
    heading2: '3rem',
    heading1: '4rem'
  },
  fontWeights: {
    bold: 700,
    regular: 400,
    light: 300
  },
  letterSpacings: {
    body: '0em',
    headingL: '0.02em',
    headingXl: '0.05em'
  },
  lineHeights: {
    body: 1.5,
    heading: 1.35,
    headingL: 1.5,
    headingXl: 1.65
  },
  shadows: {
    deep: '3px 3px 3px rgba(196, 196, 196, 0.75)',
    medium: '0px 0px 5px rgba(0, 0, 0, 0.5)',
    soft: '0px 0px 5px rgba(196, 196, 196, 1)'
  },
  space: {
    xxl: '3rem',
    xl: '2rem',
    l: '1.5rem',
    m: '1rem',
    s: '0.75rem',
    xs: '0.5rem',
    xxs: '0.25rem'
  },
  radii: {
    rounded: '8px',
    light: '4px'
  },
  zIndices: {
    top: 1000,
    high: 100,
    focus: 10,
    base: 1
  },
  sizes: {
    container: 1280
  },
  layout: {
    container: {
      px: ['m', 'l'],
      textAlign: 'center'
    }
  },
  links: {
    nav: {
      px: 'm',
      py: 'm',
      cursor: 'pointer',
      transition: 'all 0.3s ease-out',
      '&:hover,&:active,&:focus': {
        color: 'inherit',
        textDecoration: 'underline'
      }
    }
  },
  text: {
    body: {
      variant: 'text.default',
      fontSize: 'body',
      letterSpacing: 'body',
      lineHeight: 'body'
    },
    ght: 'bold'
  },
  heading: {
    fontWeight: 'light',
    letterSpacing: 'headingL',
    lineHeight: 'heading',
    my: 'm'
  }
});

export default CustomTheme;
