import React, { Component } from 'react';
import { connect } from 'react-redux';
import Video from './video';
import { fetchPlaylist } from '../actions';

class Playlist extends Component {

  componentDidMount() {
    let playlist_id = this.props.url.split('list=')[1];
    this.props.fetchPlaylist(playlist_id);
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}

export default connect(null, { fetchPlaylist })(Playlist);
