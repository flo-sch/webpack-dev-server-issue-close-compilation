import { Box, Heading, Paragraph, Themed } from 'theme-ui';

import Page from 'components/Page';

const HomeView = () => (
  <Page
    metadata={{
      description: 'This is our home page',
      title: 'Home page',
      lang: 'en'
    }}
  >
    <Box sx={{ maxWidth: 480, mx: 'auto' }}>
      <Heading as="h1">Hello World!</Heading>
      <Paragraph sx={{ mb: 's' }}>
        Exit webpack-dev-server (ctrl+c) process to reproduce the bug
      </Paragraph>
      <Themed.pre sx={{ p: 'm', textAlign: 'left', backgroundColor: 'black', color: 'white' }}>
        webpack 5.38.1 compiled [...]
        <br />
        ^C
        <br />
        99% end closing watch compilation
      </Themed.pre>
    </Box>
  </Page>
);

export default HomeView;
