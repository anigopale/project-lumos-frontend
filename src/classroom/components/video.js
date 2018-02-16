import React, { Component } from 'react';
import { Embed, Header, Divider } from 'semantic-ui-react';

export default class Video extends Component {

  renderEmbed() {

    if(this.props.video.id) {

      return (
        <div>
          <Embed
            id={this.props.video.id}
            placeholder={`https://img.youtube.com/vi/${this.props.video.id}/hqdefault.jpg`}
            icon='youtube play'
            source='youtube'
            />
          <Header as="h4">
            <span>
              {this.props.video.title}
            </span>
          </Header>

        </div>
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
