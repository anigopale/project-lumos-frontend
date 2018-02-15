import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { Button, Grid, Segment, Input } from 'semantic-ui-react';
import Video from './video';
import List from './list';
import { fetchPlaylist } from '../actions';

class Playlist extends Component {


  componentDidMount() {

  }
  renderStartButton() {
    let { resource_id } = this.props.match.params;
    let playlist_id = this.props.resource.video_id.split('list=')[1];
    if(this.props.location.pathname === `/classroom/${resource_id}/`
      || this.props.location.pathname === `/classroom/${resource_id}`) {
      return (
        <div>
          <p>{this.props.resource.description}</p>
            <Link to={`/classroom/${this.props.match.params.resource_id}/${playlist_id}/0/0`}>
              <Button fluid>Start Course</Button>
            </Link>
        </div>
      )
    }

  }

  render() {
    return (
      <div>
        <Grid celled='internally' stackable>
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
            <Segment basic>
              <Input icon='wikipedia' fluid />
            </Segment>
            <Segment basic>
              <Input icon='wikipedia' fluid />
            </Segment>
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
