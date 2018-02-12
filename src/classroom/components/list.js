import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class List extends Component {

  renderList() {
    if(!this.props.playlist.videos) {
      return <div></div>
    }
    return this.props.playlist.videos.map(video => {
      let { resource_id, page_token } = this.props.match.params;
      return (
        <Link to={`/classroom/${resource_id}/${page_token}/${video.contentDetails.videoId}`}>
          <Segment>
            {video.snippet.title}
          </Segment>
        </Link>

      )
    })
  }

  render() {
      return (
      <div>
        {this.renderList()}
      </div>
    )
  }
}

function mapStateToProps({ playlist }) {
  return { playlist };
}

export default connect(mapStateToProps)(List);
