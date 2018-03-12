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
import ClassroomPage from './scenes/classroom-page';
import KnowledgeBase from './scenes/knowledge-base';
import { RANDOM, DOMAINS, LANGUAGES, SOFT_SKILLS } from './common-services/course_types';

class App extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route exact path='/soft-skills' component={SoftSkillsPage} />
            <Route exact path='/soft-skills/:category_id/'
              render={props => <CoursesPage courseType={SOFT_SKILLS} {...props} />}
              />
            <Route exact path='/technical/knowledge-base/domains/:category_id/'
              render={props => <CoursesPage courseType={DOMAINS} {...props} />}
              />
            <Route exact path='/technical/knowledge-base/languages/:category_id/'
              render={props => <CoursesPage courseType={LANGUAGES} {...props} />}
              />
            <Route exact path='/technical/misc/'
              render={props => <CoursesPage courseType={RANDOM} {...props} />}
              />
            <Route exact path='/technical/knowledge-base' component={KnowledgeBase} />
            <Route exact path='/technical/knowledge-base/domains' component={DomainPage} />
            <Route exact path='/technical/knowledge-base/languages' component={LanguagePage} />
            <Route exact path='/technical' component={Technical} />
            <Route exact path='/signin' component={Signin} />
            <Route exact path='/' component={Home} />
            <Route exact path='/classroom/:course_type/:course_id' component={ClassroomPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
