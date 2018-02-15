import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from './scenes/home';
import Signin from './scenes/signin';
import Technical from './scenes/technical';
import DomainPage from './scenes/domain-page';
import LanguagePage from './scenes/language-page';

class App extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route path='/technical/language' component={LanguagePage} />
            <Route path='/technical/domain' component={DomainPage} />
            <Route path='/technical' component={Technical} />
            <Route path='/signin' component={Signin} />
            <Route path='/' component={Home} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
