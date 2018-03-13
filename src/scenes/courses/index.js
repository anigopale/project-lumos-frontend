import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from '../../common-components/navbar';
import Courses from '../../navigation/courses';

export default class CoursesPage extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Courses {...this.props} />
      </div>
    )
  }
}
