import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alert, Card, Container, Heading, Link, Paragraph } from 'theme-ui';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null
    };
  }

  static getDerivedStateFromError(error) {
    return {
      error
    };
  }

  componentDidCatch(error, errorInfo) {
    /* eslint-disable-next-line no-console */
    console.error('Error catched by ErrorBoundary', error, errorInfo);
    const { onComponentDidCatch } = this.props;

    if (typeof onComponentDidCatch === 'function') {
      onComponentDidCatch(error, errorInfo);
    }
  }

  render() {
    const { children, invisibleOnCrash } = this.props;
    const { error } = this.state;

    if (error) {
      if (invisibleOnCrash) {
        return null;
      }

      return (
        <Container>
          <Card>
            <Heading as="h2">Oops...</Heading>
            <Paragraph>An internal error has occured.</Paragraph>
            <Alert variant="accent" size="medium">
              {error.message}
            </Alert>
            <Link as={RouterLink} to="/">
              Back to home page
            </Link>
          </Card>
        </Container>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  /** Regular React children: whichever you want to render */
  children: PropTypes.node,
  /** Should the error boundary show a feedback when an error is catched or not render anything (default: false) */
  invisibleOnCrash: PropTypes.bool,
  /** Custom callback function invoked when an error is catched (optional) */
  onComponentDidCatch: PropTypes.func
};

ErrorBoundary.defaultProps = {
  invisibleOnCrash: false
};

export default ErrorBoundary;
