import React, { Component } from 'react';
import NavBar from '../../common-components/navbar';
import Classroom from '../../classroom';

export default class ClassroomPage extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Classroom {...this.props} />
      </div>
    )
  }
}
