import { Container } from 'theme-ui';
import { StrictMode } from 'react';
import PropTypes from 'prop-types';

import Head from 'components/Head';
import ErrorBoundary from 'components/ErrorBoundary';

const Page = ({ metadata, ...props }) => (
  <ErrorBoundary>
    {metadata && (
      <ErrorBoundary invisibleOnCrash>
        <Head {...metadata} />
      </ErrorBoundary>
    )}
    <StrictMode>
      <ErrorBoundary>
        <Container sx={{ py: 's' }} {...props} />
      </ErrorBoundary>
    </StrictMode>
  </ErrorBoundary>
);

Page.propTypes = {
  /** Optional object of metadata forwarded to the <Head /> component */
  metadata: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.shape({
      alt: PropTypes.string,
      url: PropTypes.string,
      width: PropTypes.integer,
      height: PropTypes.integer
    }),
    lang: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string
  })
};

export default Page;
