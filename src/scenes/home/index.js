import React, { Component } from 'react';
import Nav from '../../common-components/navbar';
import { Segment } from 'semantic-ui-react';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Segment>
        <Nav />
        </Segment>
        home
      </div>
    )
  }
}
