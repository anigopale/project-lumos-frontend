import React, { Component } from 'react';
import NavBar from '../../common-components/navbar';
import Classroom from '../../classroom';

class ClassroomPage extends Component {
  state = { sidebar: false };
  render() {
    return (
      <div style={{ minHeight: '100vh'}}>
        <NavBar hamburger={true} sidebar={this.state.sidebar} getSideBar={(value) => this.setState({ sidebar: value })} />
        <Classroom sidebar={this.state.sidebar} {...this.props} getSideBar={(value) => this.setState({ sidebar: value })} />
      </div>
    )
  }
}

export default ClassroomPage;
