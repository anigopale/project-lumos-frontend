import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { Embed } from 'semantic-ui-react';

export default class Resource extends Component {

  state = { url: "" };

  componentDidMount() {
    let { type, url } = this.props;
    this.setEmbedUrl(type, url);
  }
  componentWillReceiveProps(nextProps) {
    let { type, url } = nextProps;
    this.setEmbedUrl(type, url);
  }

  setEmbedUrl(type, url) {
    if(type === 'vimeo') {
      let id = url.split('/').slice(-1)[0].split('?')[0];
      this.setState({ url: `https://player.vimeo.com/video/${id}`});
    }
    else if(type === 'yt_playlist') {
      let id = url.split('list=')[1];
      this.setState({ url: `https://www.youtube.com/embed/videoseries?list=${id}` });

    }
    else {
      let id = url.split('v=')[1];
      this.setState({ url: `https://www.youtube.com/embed/${id}` });
    }
  }

  renderEmbed() {
    if(this.state.url) {
      return (
        <Embed
          iframe={{
            allowFullScreen: true
          }}
          url={this.state.url}
          icon='youtube play'
          active={true}
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
