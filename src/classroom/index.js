import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Button, Container, Divider, Grid, Loader, Dimmer } from 'semantic-ui-react';
import { fetchResource } from './actions';
import Resource from './components/embed-resource';
import Wikipedia from './components/wikipedia-search';
import Wiktionary from './components/wiktionary-search';

class Classroom extends Component {

  componentDidMount() {
    let { resource_type, resource_id } = this.props.match.params;

    // push to home, if resource_type doesn't match 'video' or 'external'
    if(resource_type !== 'video' && resource_type !== 'external') {
      this.props.history.push('/');
    }
    this.props.fetchResource(resource_id, resource_type);
  }

  componentDidUpdate() {
    let { resource_type, resource_id } = this.props.match.params;

    // push to home, if resource_type doesn't match 'video' or 'external'
    if(resource_type !== 'video' && resource_type !== 'external') {
      this.props.history.push('/');
    }
  }

  renderBody() {
    if(this.props.resource.error) {
      return (
        <div>this.props.resource.error</div>
      )
    }
    if(this.props.resource.id) {
      if(this.props.resource.video_url) {
        let type = 'yt_video';
        if(this.props.resource.video_url.includes('vimeo')) {
          type = 'vimeo';
        }
        if(this.props.resource.video_url.includes('list=')) {
          type='yt_playlist';
        }
        return <Resource url={this.props.resource.video_url} type={type} />
       }
      return (
        <div>
          <a href={this.props.resource.link_url} target='_blank' rel='noopener'>
            <Button size='massive' fluid>Go to course</Button>
          </a>
        </div>
      )
    }
    return (
      <Segment basic>
        <Dimmer inverted active>
          <Loader />
        </Dimmer>
      </Segment>
    )
  }



  render() {
    return (
      <Container fluid>
          <Segment basic>
              <Grid celled='internally' stackable>
                <Grid.Column width={4} only='computer tablet'>
                </Grid.Column>
                <Grid.Column width={8}>
                  <h1>{this.props.resource.title}</h1>
                  {this.renderBody()}
                </Grid.Column>
                <Grid.Column width={4} only='computer tablet'>
                  <Segment basic>
                    <Wikipedia />
                  </Segment>
                  <Segment basic>
                    <Wiktionary />
                  </Segment>
                </Grid.Column>
              </Grid>
          </Segment>
      </Container>
    )
  }
}

function mapStateToProps({ resource }) {
  return { resource };
}

export default connect(mapStateToProps, { fetchResource })(Classroom);
