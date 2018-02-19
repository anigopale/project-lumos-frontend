import React, { Component } from 'react';
import { Input, Button } from 'semantic-ui-react';

export default class WiktionarySearch extends Component {
  render() {
    return (
      <div>
        <Input
          icon='wikipedia'
          iconPosition='left'
          placeholder='Search Wiktionary'
          action={<Button icon='search' />}
          />
      </div>
    )
  }
}
