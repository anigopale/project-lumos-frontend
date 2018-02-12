import React, { Component } from 'react';
import { Embed } from 'semantic-ui-react';

export default class Video extends Component {

  render() {
    return (

      <Embed
        id={this.props.match.params.video_id}
        placeholder={`https://img.youtube.com/vi/${this.props.match.params.video_id}/0.jpg`}
        source='youtube'
        />
    )
  }
}
