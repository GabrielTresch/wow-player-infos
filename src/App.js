import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Layout from './containers/LayoutContainer';
import routes from './config/Routes';

const history = createBrowserHistory();

const App = () => (
  <Router history={history}>
    <Layout>
      { routes }
    </Layout>
  </Router>
);

export default App;
