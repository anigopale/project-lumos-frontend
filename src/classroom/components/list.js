import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Button, Item, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { fetchPlaylist } from '../actions';

class List extends Component {

  componentDidMount() {
    let { page_token, playlist_id } = this.props.match.params;
    console.log("list mounted", playlist_id, page_token);
    if(this.props.playlist.current_page !== page_token){
      if(page_token !== '0')
        this.props.fetchPlaylist(playlist_id, page_token);
      else
        this.props.fetchPlaylist(playlist_id);
    }
  }

  componentDidUpdate() {
    let { page_token, playlist_id } = this.props.match.params;
    console.log("list mounted", playlist_id, page_token);
    if(this.props.playlist.current_page !== page_token){
      if(page_token !== '0')
        this.props.fetchPlaylist(playlist_id, page_token);
    }
  }


  renderList() {
    if(!this.props.playlist.videos) {
      return <div></div>
    }
    return this.props.playlist.videos.map(video => {
      let { resource_id, page_token, playlist_id, video_id } = this.props.match.params;
      if(video.contentDetails.videoId === video_id) {
        return (
          <Item as={Link} to={`/classroom/${resource_id}/${playlist_id}/${page_token}/${video.contentDetails.videoId}`}>
              <Item.Image size='tiny' src={video.snippet.thumbnails.high.url} />
              <Item.Content verticalAlign='top'>
                <Header sub style={{ color: 'teal'}}>{video.snippet.title}</Header>
              </Item.Content>
            </Item>
        )
      }
      return (
          <Item as={Link} to={`/classroom/${resource_id}/${playlist_id}/${page_token}/${video.contentDetails.videoId}`}>
            <Item.Image size='tiny' src={video.snippet.thumbnails.high.url} />
            <Item.Content verticalAlign='top'>
              <Header sub>{video.snippet.title}</Header>
            </Item.Content>
          </Item>
      )
    })
  }

  renderPaginationButtons() {
    return (
      <div>
        <Button.Group fluid>
          <Button
            basic
            color='teal'
            as={Link}
            to={`/classroom/${this.props.match.params.resource_id}/${this.props.match.params.playlist_id}/${this.props.playlist.previous_page}/${this.props.match.params.video_id}`}
            disabled={this.props.playlist.previous_page === '0'}
            >
            prev
          </Button>
          <Button
            basic
            color='teal'
            as={Link}
            to={`/classroom/${this.props.match.params.resource_id}/${this.props.match.params.playlist_id}/${this.props.playlist.next_page}/${this.props.match.params.video_id}`}
            disabled={this.props.playlist.next_page === '0'}
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
