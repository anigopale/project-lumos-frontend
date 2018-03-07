import React, { Component } from 'react';
import NavBar from '../../common-components/navbar';
import Classroom from '../../classroom';

class ClassroomPage extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Classroom {...this.props} />
      </div>
    )
  }
}

export default ClassroomPage;
