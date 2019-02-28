import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Aux from './hoc/Aux/Aux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from './hoc/Layout/Layout';

const asyncLottery = asyncComponent(() => {
  return import('./containers/Lottery/Lottery');
});

const asyncEnter = asyncComponent(() => {
  return import('./containers/Enter/Enter');
});

const asyncEntries = asyncComponent(() => {
  return import('./containers/Entries/Entries');
});

const asyncManage = asyncComponent(() => {
  return import('./containers/Manage/Manage');
});

const asyncCreate = asyncComponent(() => {
  return import('./containers/Create/Create');
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
            <Route path="/enter" component={asyncEnter} />
            <Route path="/entries" component={asyncEntries} />
            <Route path="/manage" component={asyncManage} />
            <Route path="/create" component={asyncCreate} />
            <Route path="/" component={asyncLottery} />
          </Switch>
         </Layout>
      </Aux>
    );
  }
}

export default App;
