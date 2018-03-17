import React, { Component } from 'react';
import { Segment, Progress, Label } from 'semantic-ui-react';

export default class Ratings extends Component {
  render() {
    return (
      <div>
        Attribute name:<Progress percent='20' size='small' />
        Attribute name:<Progress percent='20' size='small' />
        Attribute name:<Progress percent='20' size='small' />
        Attribute name:<Progress percent='20' size='small' />
      </div>
    )
  }
}
