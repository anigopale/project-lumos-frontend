import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from './scenes/home';
import Signin from './scenes/signin';
import Technical from './scenes/technical';
import DomainPage from './scenes/domain-page';
import LanguagePage from './scenes/language-page';
import CoursesPage from './scenes/courses';
import SoftSkillsPage from './scenes/soft-skills-page';
import NotFoundPage from './scenes/not-found-page';

class App extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route exact path='/soft-skills' component={SoftSkillsPage} />
            <Route exact path='/courses/:type/:id/:page_token' component={CoursesPage} />
            <Route exact path='/technical/language' component={LanguagePage} />
            <Route exact path='/technical/domain' component={DomainPage} />
            <Route exact path='/technical' component={Technical} />
            <Route exact path='/signin' component={Signin} />
            <Route exact path='/' component={Home} />
            <Route component={NotFoundPage} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
