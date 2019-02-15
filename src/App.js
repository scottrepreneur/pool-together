import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

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
      <div>
        <Layout>
          <Switch>
              <Route path="/" component={asyncLottery} />
            </Switch>
         </Layout>
      </div>
    );
  }
}

export default App;
