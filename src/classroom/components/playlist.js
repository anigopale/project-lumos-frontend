import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { Button, Grid } from 'semantic-ui-react';
import Video from './video';
import List from './list';
import { fetchPlaylist } from '../actions';

class Playlist extends Component {
  state = { playlist_id: "" };

  componentDidMount() {
    let playlist_id = this.props.url.split('list=')[1];
    this.setState({ playlist_id });
  }

  render() {
    return (
      <div>
        <Grid>
          <Grid.Column width={4}>
            <Route path='/classroom/:resource_id/:playlist_id/:page_token/:video_id' component={List} />
          </Grid.Column>
          <Grid.Column width={12}>
            <Route
              path='/classroom/:resource_id/:playlist_id/:page_token/:video_id'
              component={Video}
              />
          </Grid.Column>
        </Grid>
        <Link to={`/classroom/${this.props.match.params.resource_id}/${this.state.playlist_id}/0/0`}>
          <Button>Start</Button>
        </Link>
      </div>
    )
  }
}

export default connect(null, { fetchPlaylist })(Playlist);
