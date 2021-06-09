import { Button, Card, Flex, Heading } from 'theme-ui';
import PropTypes from 'prop-types';

const WorkboxSkipWaitingPrompt = ({ onAccept, onReject }) => (
  <Card
    sx={{
      position: 'fixed',
      bottom: '1em',
      left: '50%',
      width: 320,
      zIndex: 'top',
      p: 's',
      transform: 'translate3d(-50%, 0, 0)',
      backgroundColor: 'white',
      color: 'text',
      borderRadius: 'rounded',
      boxShadow: 'medium'
    }}
  >
    <Heading as="h4" variant="heading" sx={{ mt: 0, mb: 's' }}>
      A new version is available
    </Heading>
    <Flex>
      <Button variant="primary" onClick={onAccept} sx={{ mr: 'xs' }}>
        Update
      </Button>
      <Button variant="secondary" onClick={onReject}>
        Not now
      </Button>
    </Flex>
  </Card>
);

WorkboxSkipWaitingPrompt.propTypes = {
  onAccept: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired
};

export default WorkboxSkipWaitingPrompt;
