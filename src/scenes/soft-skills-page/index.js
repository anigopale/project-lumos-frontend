import React, { Component } from 'react';
import NavBar from '../../common-components/navbar';
import SoftSkills from '../../navigation/soft-skills';

export default class SoftSkillsPage extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <SoftSkills />
      </div>
    )
  }
}
