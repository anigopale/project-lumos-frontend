import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from '../../common-components/navbar';
import Courses from '../../navigation/courses';

export default class CoursesPage extends Component {
  state = { sidebar: false };

  render() {
    return (
      <div>
        <NavBar
          urlParams={this.props.match.params}
          hamburger={true} sidebar={this.state.sidebar}
          getSideBar={(value) => this.setState({ sidebar: value })}
          />
        <Courses
          sidebar={this.state.sidebar}
          {...this.props}
          getSideBar={(value) => this.setState({ sidebar: value })}
          />
      </div>
    )
  }
}
