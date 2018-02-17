import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { Button, Grid, Segment, Input } from 'semantic-ui-react';
import Video from './video';
import List from './list';
import { fetchPlaylist } from '../actions';

class Playlist extends Component {

  state = { page_token: "", videoData: {}, playlist_id: "" };

  componentDidMount() {

  }

  handleClick = () => {
    let playlist_id = this.props.url.split('list=')[1];
    let initial_fetch = true;
    this.setState({ playlist_id });
    this.props.fetchPlaylist(playlist_id, this.state.page_token, initial_fetch);
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
          changePageToken={(token) => {this.setState({ page_token: token })}}
          selectedVideo={(videoData) => {this.setState({ videoData })}}
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
            <Video video={this.state.videoData} />
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
