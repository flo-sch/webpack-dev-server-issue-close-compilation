import { hydrate, render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'theme-ui';
import { HelmetProvider } from 'react-helmet-async';

import config from './config';
import CustomTheme from './themes';
import App from './App';
import ApplicationContextProvider from './contexts';

const mountElement = document.querySelector('#root');

const launch = (renderOrHydrate, mountElement) =>
  renderOrHydrate(
    <BrowserRouter>
      <ThemeProvider theme={CustomTheme}>
        <HelmetProvider>
          <ApplicationContextProvider config={config}>
            <App />
          </ApplicationContextProvider>
        </HelmetProvider>
      </ThemeProvider>
    </BrowserRouter>,
    mountElement
  );

/**
 * Launch the app
 *
 * server-side scripts (either SSR methods or generators like `react-snap`)
 * will need to hydrate the application instead of rendering it
 */
if (mountElement.hasChildNodes()) {
  launch(hydrate, mountElement);
} else {
  launch(render, mountElement);
}
