import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Aux from './hoc/Aux/Aux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from './hoc/Layout/Layout';

const asyncLottery = asyncComponent(() => {
  return import('./containers/Lottery/Lottery');
});

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  render() {
    return (
      <Aux>
        <Layout>
          <Switch>
              <Route path="/" component={asyncLottery} />
            </Switch>
         </Layout>
      </Aux>
    );
  }
}

export default App;
