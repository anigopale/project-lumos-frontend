import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Button, Container, Divider, Grid, Loader, Dimmer, Icon, Sidebar, Responsive, Label } from 'semantic-ui-react';
import { fetchResource, deleteResource } from './actions';
import Resource from './components/embed-resource';
import Wikipedia from './components/wikipedia-search';
import Wiktionary from './components/wiktionary-search';
import Ratings from './components/ratings';
import { KNOWLEDGE_BASE, RANDOM, SOFT_SKILLS } from '../common-services/course_types';
import styled from 'styled-components';

const StyledRelatedSidebar = styled.div`
  position: fixed;
  top: 80px;
  bottom: 0px;
  overflow-y: auto;
  width: 25%;
  z-index: 2 !important;
  visibility: visible;
  @media only screen and (max-width: 768px) {
    visibility: hidden;
  }
  .related-title {

  }

`;
const StyledRightSidebar = styled.div`
  position: fixed;
  top: 80px;
  right: 0px;
  bottom: 0px;
  overflow-y: auto;
  width: 25%;
  z-index: 2 !important;
  visibility: visible;
  @media only screen and (max-width: 768px) {
    visibility: hidden;
  }

`;

const MobileSidebar = styled.div`
  position: fixed;
  top: 50px;
  bottom: 0px;
  overflow-y: auto;
  width: 100%;
  z-index: 2 !important;

button {
  position: fixed;
  top: 10px;
  right: 0px;
}
`;


class Classroom extends Component {
  state = { visible: false };

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
  componentWillUnmount() {
    this.props.deleteResource();
  }

  toggleSideBar = () => {
    this.props.getSideBar(false);
    document.body.style = 'overflow-y: auto';
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
      <Loader active />
    )
  }



  render() {
    return (
      <div>


        <Sidebar as='div' visible={this.props.sidebar} animation='overlay' style={{ width: '100%', backgroundColor: '#eeeeee' }}>
          <MobileSidebar>
            <Button icon='remove' basic color='teal' onClick={this.toggleSideBar} />
              <Segment.Group>
                <Segment basic inverted color='teal'>Related</Segment>
                <Segment>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Segment>
              </Segment.Group>
              <Segment.Group>
                <Segment basic inverted color='teal'>Prerequisites</Segment>
                <Segment>
                  <Label>resource name</Label>
                  <Label>resource name</Label>
                  <Label>resource name</Label>
                </Segment>
              </Segment.Group>
            </MobileSidebar>
        </Sidebar>



        <Grid stackable>
          <Grid.Column width={4}>
            <StyledRelatedSidebar>
              <Segment.Group>
                <Segment basic inverted color='teal'>Related</Segment>
                <Segment>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Segment>
              </Segment.Group>
            </StyledRelatedSidebar>
          </Grid.Column>
          <Grid.Column computer={8}>
            <Segment basic>
              {this.renderBackButton()}
              <h2>{this.props.course.title}</h2>
              {this.renderBody()}
              <br />
              <p>{this.props.course.description}</p>
              <Ratings />
            </Segment>

          </Grid.Column>
          <Grid.Column width={4} only='computer tablet'>
            <StyledRightSidebar>
              <Segment.Group>
                <Segment basic inverted color='teal'>
                  Wikipedia:
                </Segment>
                <Segment>
                  <Wikipedia />
                </Segment>
              </Segment.Group>
              <Segment.Group>
                <Segment basic inverted color='teal'>
                  Wiktionary:
                </Segment>
                <Segment>
                  <Wiktionary />
                </Segment>
              </Segment.Group>
              <Segment.Group>
                <Segment basic inverted color='teal'>Prerequisites</Segment>
                <Segment>
                  <Label>resource name</Label>
                  <Label>resource name</Label>
                  <Label>resource name</Label>
                </Segment>
              </Segment.Group>
            </StyledRightSidebar>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps({ course }) {
  return { course };
}

export default connect(mapStateToProps, { fetchResource, deleteResource })(Classroom);
