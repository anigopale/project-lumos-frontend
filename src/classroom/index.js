import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Button, Container, Divider, Grid, Loader, Dimmer, Icon } from 'semantic-ui-react';
import { fetchResource, deleteResource } from './actions';
import Resource from './components/embed-resource';
import Wikipedia from './components/wikipedia-search';
import Wiktionary from './components/wiktionary-search';
import { KNOWLEDGE_BASE, RANDOM, SOFT_SKILLS } from '../common-services/course_types';

class Classroom extends Component {

  componentDidMount() {
    let { course_type, course_id } = this.props.match.params;

    // push to 404, if course_type doesn't match these
    if(course_type !== KNOWLEDGE_BASE && course_type !== SOFT_SKILLS && course_type !== RANDOM) {
      this.props.history.push('/404');
    }
    if(this.props.course.id != course_id)
      this.props.fetchResource(course_id, course_type);
  }

  componentDidUpdate() {
    let { course_type, course_id } = this.props.match.params;

    // push to 404, if course_type doesn't match these
    if(course_type !== KNOWLEDGE_BASE && course_type !== SOFT_SKILLS && course_type !== RANDOM) {
      this.props.history.push('/404');
    }
  }

  componentWillReceiveProps(nextProps) {
    let { course_type, course_id } = nextProps.match.params;

    // push to 404, if course_type doesn't match these
    if(course_type !== KNOWLEDGE_BASE && course_type !== SOFT_SKILLS && course_type !== RANDOM) {
      this.props.history.push('/404');
    }
    if(this.props.match.params !== nextProps.match.params) {
      this.props.deleteResource();
      this.props.fetchResource(course_id, course_type);
    }

  }

  renderBackButton() {
    // check if location.state exists, as passed by Courses component
    // render back button only if user reaches Classroom through Courses page
    if(this.props.location.state) {
      let { fromCourses } = this.props.location.state;
      if(fromCourses)
      return (
        <Button
          onClick={() => this.props.history.goBack()}
          >
          <Icon name='left arrow' />
          Back to Courses
        </Button>

      )
    }
  }

  renderBody() {
    if(this.props.course.error) {
      return (
        <div>this.props.course.error</div>
      )
    }
    if(this.props.course.id) {
      // to check if course type is 'VI'(video) or not
      if(this.props.course.data_type === 'VI') {
        let type = 'yt_video';
        if(this.props.course.link_url.includes('vimeo')) {
          type = 'vimeo';
        }
        if(this.props.course.link_url.includes('list=')) {
          type='yt_playlist';
        }
        // passing url and type props to Resource
        return <Resource url={this.props.course.link_url} type={type} />
       }
      return (
        <div>
          <a href={this.props.course.link_url} target='_blank' rel='noopener'>
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
                  {this.renderBackButton()}
                  <h1>{this.props.course.title}</h1>
                  {this.renderBody()}
                  <br />
                  <p>{this.props.course.description}</p>
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

function mapStateToProps({ course }) {
  return { course };
}

export default connect(mapStateToProps, { fetchResource, deleteResource })(Classroom);
