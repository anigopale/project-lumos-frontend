import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Input, Icon, Segment, Button, Container } from 'semantic-ui-react';
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
      if(this.props.resource.type === 'video') {
        return <VideoResource url={this.props.resource.url} />
      }
      if(this.props.resource.type === 'playlist') {
        return <Playlist url={this.props.resource.url} {...this.props} />
      }
      return (
        <a href={this.props.resource.url}>
          <Button size='massive'>Click here</Button>
        </a>
      )
    }
    return <h1>Loading...</h1>
  }


  render() {
    return (
      <Container>
        <Grid>
          <Grid.Column width={12}>
            <Segment>
              {this.renderBody()}
              <h1>{this.props.resource.title}</h1>
              <p>{this.props.resource.description}</p>
            </Segment>
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
      </Container>
    )
  }
}

function mapStateToProps({ resource }) {
  return { resource };
}

export default connect(mapStateToProps, { fetchResource })(Classroom);
