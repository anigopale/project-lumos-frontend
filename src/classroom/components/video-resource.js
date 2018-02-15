import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Embed, Grid, Input, Segment } from 'semantic-ui-react';

class VideoResource extends Component {
  state = { video_id: "" }
  componentDidMount() {
    let video_id = this.props.url.split('v=')[1];
    this.setState({ video_id });
  }

  render() {
    return (
      <Grid stackable celled='internally' columns='equal'>
        <Grid.Column></Grid.Column>
        <Grid.Column width={8}>
          <Embed
            id={this.state.video_id}
            placeholder={`https://img.youtube.com/vi/${this.state.video_id}/0.jpg`}
            source='youtube'
            />
          <h1>{this.props.resource.title}</h1>
        </Grid.Column>
        <Grid.Column>
          <Segment basic>
            <Input icon='wikipedia' fluid />
          </Segment>
          <Segment basic>
            <Input icon='wikipedia' fluid />
          </Segment>
        </Grid.Column>
    </Grid>
    )
  }
}

function mapStateToProps({ resource }) {
  return { resource };
}

export default connect(mapStateToProps)(VideoResource);
