import ErrorBoundary from 'components/ErrorBoundary';
import GlobalStyle from 'components/GlobalStyle';
import ScrollToTop from 'components/ScrollToTop';
import Nav from 'components/Nav';
import AppRouter from 'router';

/**
 * Main Application component: implement layout components (Nav, Footer, banners etc.) and application router
 *
 * NOTE: As for the router, you are strongly advised to keep this component stateless.
 * This is a very high level, it needs to remain predictable.
 */
const App = () => (
  <ErrorBoundary>
    <GlobalStyle />
    <ErrorBoundary>
      <Nav />
    </ErrorBoundary>
    <ErrorBoundary>
      <ScrollToTop>
        <AppRouter />
      </ScrollToTop>
    </ErrorBoundary>
  </ErrorBoundary>
);

export default App;
