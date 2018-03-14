import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from '../../common-components/navbar';
import Courses from '../../navigation/courses';

export default class CoursesPage extends Component {
  state = { sidebar: false };

  render() {
    return (
      <div>
        <NavBar hamburger={true} getSideBar={(value) => this.setState({ sidebar: value })} />
        <Courses {...this.props} sidebar={this.state.sidebar} />
      </div>
    )
  }
}
