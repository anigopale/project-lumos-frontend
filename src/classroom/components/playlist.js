import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { Button, Grid, Segment, Input } from 'semantic-ui-react';
import Video from './video';
import List from './list';
import { fetchPlaylist } from '../actions';

class Playlist extends Component {

  state = { page_token: "", video_id: "", playlist_id: "" };

  handleClick = () => {
    let url = this.props.url.split('list=')[1];
    this.setState({ playlist_id: url })
    this.props.fetchPlaylist(url);
  }

  renderStartButton() {
    if(!this.state.playlist_id) {
      return (
        <div>
          <p>{this.props.resource.description}</p>
          <Button onClick={this.handleClick} fluid>Start Course</Button>
        </div>
      )
    }
  }

  renderList() {
    if(this.state.playlist_id) {
      return (
        <List
          playlist_id={this.state.playlist_id}
          selectedVideo={(video_id) => {this.setState({ video_id })}}
          />
      )
    }
  }

  render() {
    return (
      <div>
        <Grid celled='internally' stackable>
          <Grid.Column width={4}>
            {this.renderList()}
          </Grid.Column>

          <Grid.Column width={8}>
            <Video video_id={this.state.video_id} />
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


export default connect(null, { fetchPlaylist })(Playlist);
