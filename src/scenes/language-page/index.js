import React, { Component } from 'react';
import NavBar from '../../common-components/navbar';
import Languages from '../../navigation/languages';

export default class LanguagePage extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Languages />
      </div>
    )
  }
}
