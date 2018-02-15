import React, { Component } from 'react';
import NavBar from '../../common-components/navbar';
import Domains from '../../navigation/domains';

export default class DomainPage extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Domains />
      </div>
    )
  }
}
