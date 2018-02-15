import React, { Component } from 'react';
import { Embed } from 'semantic-ui-react';

export default class Video extends Component {

  renderEmbed() {
    let { video_id } = this.props.match.params;
    if(video_id === '0') {
      return (
        <Embed
          id={video_id}
          placeholder=""
          icon='youtube play'
          source='youtube'
          />
      )
    }
    return (
      <Embed
        id={video_id}
        placeholder={`https://img.youtube.com/vi/${video_id}/hqdefault.jpg`}
        icon='youtube play'
        source='youtube'
        />
    )
  }

  render() {
    return (
      <div>
        {this.renderEmbed()}
      </div>
    )
  }
}
