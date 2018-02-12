import React, { Component } from 'react';
import { Embed } from 'semantic-ui-react';

export default class VideoResource extends Component {
  state = { video_id: "" }
  componentDidMount() {
    let video_id = this.props.url.split('v=')[1];
    this.setState({ video_id });
  }

  render() {
    return (

      <Embed
        id={this.state.video_id}
        placeholder={`https://img.youtube.com/vi/${this.state.video_id}/0.jpg`}
        source='youtube'
        />
    )
  }
}
