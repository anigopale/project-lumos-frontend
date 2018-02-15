import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { Button, Grid, Segment } from 'semantic-ui-react';
import Video from './video';
import List from './list';
import { fetchPlaylist } from '../actions';

class Playlist extends Component {
  state = { playlist_id: "" };

  componentDidMount() {
    let playlist_id = this.props.url.split('list=')[1];
    this.setState({ playlist_id });
  }
  renderStartButton() {
    let { resource_id } = this.props.match.params;
    if(this.props.location.pathname === `/classroom/${resource_id}/`
      || this.props.location.pathname === `/classroom/${resource_id}`) {
      return (
        <Link to={`/classroom/${this.props.match.params.resource_id}/${this.state.playlist_id}/0/0`}>
          <Button fluid>Start</Button>
        </Link>
      )
    }

  }

  render() {
    return (
      <div>
        <Grid stackable celled='internally'>
          <Grid.Column width={4}>
            <Route path='/classroom/:resource_id/:playlist_id/:page_token/:video_id' component={List} />
          </Grid.Column>

          <Grid.Column width={8}>
            <Route
              path='/classroom/:resource_id/:playlist_id/:page_token/:video_id'
              component={Video}
              />
            <h1>{this.props.resource.title}</h1>
            {this.renderStartButton()}
          </Grid.Column>

          <Grid.Column width={4}>
          </Grid.Column>
        </Grid>

      </div>
    )
  }
}

function mapStateToProps({ resource }) {
  return { resource };
}

export default connect(mapStateToProps, { fetchPlaylist })(Playlist);
