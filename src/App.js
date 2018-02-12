import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from './scenes/home';
import Signin from './scenes/signin';

class App extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route path='/signin' component={Signin} />
            <Route path='/' component={Home} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
