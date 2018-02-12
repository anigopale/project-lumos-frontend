import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import Video from './video';
import List from './list';
import { fetchPlaylist } from '../actions';

class Playlist extends Component {

  componentDidMount() {
    let playlist_id = this.props.url.split('list=')[1];
    this.props.fetchPlaylist(playlist_id);
  }

  render() {
    return (
      <div>
        <Link to={`/classroom/${this.props.match.params.resource_id}/0/0`}>
          <Button>Start</Button>
        </Link>
        <Route path='/classroom/:resource_id/:page_token' component={List} />
        <Route
          path='/classroom/:resource_id/:page_token/:video_id'
          component={Video}
          />
      </div>
    )
  }
}

export default connect(null, { fetchPlaylist })(Playlist);
