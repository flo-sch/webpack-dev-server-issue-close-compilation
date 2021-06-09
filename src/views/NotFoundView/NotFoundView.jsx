import { Heading, Link, Paragraph } from 'theme-ui';
import { Link as RouterLink } from 'react-router-dom';

import Page from 'components/Page';

const NotFoundView = () => (
  <Page
    metadata={{
      title: 'Page not found',
      description: 'The page you are looking for does not exist.',
      prerenderStatusCode: 404
    }}
  >
    <Heading as="h1">Page not found</Heading>
    <Paragraph>The page you are looking for does not exist.</Paragraph>
    <Link as={(props) => <RouterLink {...props} to="/" />}>Back to home page</Link>
  </Page>
);

export default NotFoundView;
