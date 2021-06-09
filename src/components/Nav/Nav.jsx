import { Container, Flex, NavLink } from 'theme-ui';
import { Link as RouterLink } from 'react-router-dom';

const Nav = (props) => (
  <Flex
    as="nav"
    sx={{
      position: 'relative',
      backgroundColor: 'primary',
      color: 'white',
      zIndex: 'high'
    }}
    {...props}
  >
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: ['space-between', 'flex-start']
      }}
    >
      <NavLink
        as={(props) => <RouterLink {...props} to="/" />}
        variant="nav"
        sx={{ display: 'inline-flex' }}
      >
        Home
      </NavLink>
    </Container>
  </Flex>
);

export default Nav;
