import React, { Component } from 'react';
import { Input, Button } from 'semantic-ui-react';

export default class WikipediaSearch extends Component {
  render() {
    return (
      <div>
        <Input
          icon='wikipedia'
          iconPosition='left'
          placeholder='Search Wikipedia'
          action={<Button icon='search' />}
          />
      </div>
    )
  }
}
