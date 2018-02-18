import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { Embed } from 'semantic-ui-react';

export default class Resource extends Component {

  state = { url: "" };

  componentDidMount() {
    if(this.props.url.includes('list=')) {
      let id = this.props.url.split('list=')[1];
      this.setState({ url: `https://www.youtube.com/embed/videoseries?list=${id}` });
    }
    else {
      let id = this.props.url.split('v=')[1];
      this.setState({ url: `https://www.youtube.com/embed/${id}` });
    }
  }

  renderEmbed() {
    if(this.state.url) {
      return (
        <Embed
          url={this.state.url}
          icon='youtube play'
          defaultActive={true}
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
