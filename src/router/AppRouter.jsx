import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';

const LoadableView = loadable((props) => import(`../views/${props.view}/index`));

const AppRouter = () => (
  <Switch>
    <Route exact path="/" render={(props) => <LoadableView {...props} view="HomeView" />} />
    <Route render={(props) => <LoadableView {...props} view="NotFoundView" />} />
  </Switch>
);

export default AppRouter;
