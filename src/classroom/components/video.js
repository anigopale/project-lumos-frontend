import React, { Component } from 'react';
import { Embed, Header, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';

class Video extends Component {
  renderEmbed() {
    if(this.props.activeVideo.id) {
      return (
        <div>
          <Embed
            id={this.props.activeVideo.id}
            placeholder={`https://img.youtube.com/vi/${this.props.activeVideo.id}/hqdefault.jpg`}
            icon='youtube play'
            source='youtube'
            defaultActive={true}
            />
          <Header as="h4">
            <span>
              {this.props.activeVideo.title}
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

function mapStateToProps({ activeVideo }) {
  return { activeVideo };
}

export default connect(mapStateToProps)(Video)
