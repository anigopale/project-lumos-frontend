import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Button, Container, Divider } from 'semantic-ui-react';
import { fetchResource } from './actions';
import VideoResource from './components/video-resource';
import Playlist from './components/playlist';

class Classroom extends Component {

  componentDidMount() {
    this.props.fetchResource(this.props.match.params.resource_id);
  }
  componentDidUpdate() {
    this.props.fetchResource(this.props.match.params.resource_id);
  }


  renderBody() {
    if(this.props.resource.id) {
      if(this.props.resource.video_id) {
        if(this.props.resource.video_id.includes('list=')) {
          return <Playlist {...this.props} />
        }
        return (
          <div>
            <VideoResource url={this.props.resource.video_id} />
          </div>
        )
      }

      return (
        <div>
          <a href={this.props.resource.link_url}>
            <Button size='massive'>Click here</Button>
          </a>
          <h1>{this.props.resource.title}</h1>
        </div>
      )
    }
    return <h1>Loading...</h1>
  }


  render() {
    return (
      <Container fluid>
        <Divider hidden />
          <Segment basic>
            {this.renderBody()}
          </Segment>
      </Container>
    )
  }
}

function mapStateToProps({ resource }) {
  return { resource };
}

export default connect(mapStateToProps, { fetchResource })(Classroom);
