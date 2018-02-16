import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Button, Item, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { fetchPlaylist } from '../actions';

class List extends Component {

  handleClick = (page_token) => {
    this.props.fetchPlaylist(this.props.playlist_id, page_token);
  }

  renderList() {
    if(!this.props.playlist.videos) {
      return <div></div>
    }
    return this.props.playlist.videos.map(video => {
      return (
          <Item onClick={() => {this.props.selectedVideo(video.contentDetails.videoId)}} as='a'>
            <Item.Image size='tiny' src={video.snippet.thumbnails.high.url} />
            <Item.Content verticalAlign='top'>
              <Header sub>{video.snippet.title}</Header>
            </Item.Content>
          </Item>
      )
    })
  }

  renderPaginationButtons() {
    if(!this.props.playlist.videos) {
      return <div></div>
    }
    return (
      <div>
        <Button.Group fluid>
          <Button
            basic
            color='teal'
            disabled={this.props.playlist.previous_page === '0'}
            onClick={() => this.handleClick(this.props.playlist.previous_page)}
            >
            prev
          </Button>
          <Button
            basic
            color='teal'
            disabled={this.props.playlist.next_page === '0'}
            onClick={() => this.handleClick(this.props.playlist.next_page)}
            >
            next
          </Button>
        </Button.Group>
      </div>
    )
  }

  render() {
      return (
      <div>
        <Segment basic>
          {this.renderPaginationButtons()}
          <Item.Group divided unstackable>
            {this.renderList()}
          </Item.Group>
        </Segment>
      </div>
    )
  }
}

function mapStateToProps({ playlist }) {
  return { playlist };
}

export default connect(mapStateToProps, { fetchPlaylist })(List);
