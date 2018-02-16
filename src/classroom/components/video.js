import React, { Component } from 'react';
import { Embed } from 'semantic-ui-react';

export default class Video extends Component {

  renderEmbed() {

    if(this.props.video_id) {

      return (
        <Embed
          id={this.props.video_id}
          placeholder={`https://img.youtube.com/vi/${this.props.video_id}/hqdefault.jpg`}
          icon='youtube play'
          source='youtube'
          />
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderEmbed()}
      </div>
    )
  }
}
