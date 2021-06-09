import { Global } from '@emotion/react';

const GlobalStyle = (props) => (
  <Global
    {...props}
    styles={{
      // HTML layout
      body: {
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale'
      },
      '#root': {
        minHeight: '100vh'
      },
      // HTML components
      a: {
        cursor: 'pointer'
      },
      button: {
        cursor: 'pointer',
        '&:disabled': {
          cursor: 'not-allowed'
        }
      }
    }}
  />
);

export default GlobalStyle;
