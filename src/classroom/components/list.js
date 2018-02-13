import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Button } from 'semantic-ui-react';
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
      let { resource_id, page_token, playlist_id } = this.props.match.params;
      return (
        <Link to={`/classroom/${resource_id}/${playlist_id}/${page_token}/${video.contentDetails.videoId}`}>
          <Segment>
            {video.snippet.title}
          </Segment>
        </Link>

      )
    })
  }

  renderPaginationButtons() {
    return (
      <div>
        <Button.Group fluid>
          <Link
            to={`/classroom/${this.props.match.params.resource_id}/${this.props.match.params.playlist_id}/${this.props.playlist.previous_page}/${this.props.match.params.video_id}`}
            >
            <Button>prev</Button>
          </Link>
          <Link
            to={`/classroom/${this.props.match.params.resource_id}/${this.props.match.params.playlist_id}/${this.props.playlist.next_page}/${this.props.match.params.video_id}`}
            >
            <Button>next</Button>
          </Link>
        </Button.Group>
      </div>
    )
  }

  render() {
      return (
      <div>
        {this.renderPaginationButtons()}
        {this.renderList()}
      </div>
    )
  }
}

function mapStateToProps({ playlist }) {
  return { playlist };
}

export default connect(mapStateToProps, { fetchPlaylist })(List);
