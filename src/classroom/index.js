import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Button, Container, Divider, Grid } from 'semantic-ui-react';
import { fetchResource } from './actions';
import Resource from './components/embed-resource';
import Wikipedia from './components/wikipedia-search';
import Wiktionary from './components/wiktionary-search';

class Classroom extends Component {

  componentDidMount() {
    this.props.fetchResource(this.props.match.params.resource_id);
  }
  componentDidUpdate() {

  }

  renderBody() {
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
    return <h1>Loading...</h1>
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
