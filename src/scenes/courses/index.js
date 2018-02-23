import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NavBar from '../../common-components/navbar';
import Courses from '../../navigation/courses';

export default class CoursesPage extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Route exact path='/courses/:type/:id/:page_token' component={Courses} />
      </div>
    )
  }
}
