import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Button, Container, Divider, Grid, Loader, Dimmer, Icon, Sidebar, Responsive, Label } from 'semantic-ui-react';
import { fetchResource, deleteResource } from './actions';
import Resource from './components/embed-resource';
import Wikipedia from './components/wikipedia-search';
import Wiktionary from './components/wiktionary-search';
import Ratings from './components/ratings';
import Feedback from './components/feedback'
import { KNOWLEDGE_BASE, RANDOM, SOFT_SKILLS } from '../common-services/course_types';
import styled, { keyframes } from 'styled-components';

const LeftSideBar = styled.div`
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0px;
  bottom: 0px;
  height: 100vh;
  background-color: #eeeeee;
  width: 25%;
  overflow-y: auto;
  visibility: visible;
  @media only screen and (max-width: 768px) {
    visibility: hidden;
  }
`;

const RightSideBar = styled.div`
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0px;
  bottom: 0px;
  right: 0px;
  height: 100vh;
  background-color: #eeeeee;
  width: 25%;
  overflow-y: auto;
  visibility: visible;
  @media only screen and (max-width: 768px) {
    visibility: hidden;
  }
`;

const StyledRelatedSidebar = styled.div`
  position: fixed;
  top: 60px;
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
  top: 60px;
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
  padding-left: 10px;
  padding-right: 10px;

  position: fixed;
  top: 45px;
  bottom: 0px;
  overflow-y: auto;
  width: 100%;

i {
  position: fixed;
  top: 10px;
  right: 0px;
  z-index: 999 !important;
}
`;


class Classroom extends Component {
  state = { ratings: '' };

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
            <Icon name='remove circle' size='big' color='teal' onClick={this.toggleSideBar} />
              <Segment.Group>
                <Segment basic inverted color='teal'>Related</Segment>
                <Segment>
                  Python is an interpreted high-level programming language for general-purpose programming. Created by Guido van Rossum and first released in 1991, Python has a design philosophy that emphasizes code readability, and a syntax that allows programmers to express concepts in fewer lines of code,[26][27] notably using significant whitespace. It provides constructs that enable clear programming on both small and large scales.[28]

  Python features a dynamic type system and automatic memory management. It supports multiple programming paradigms, including object-oriented, imperative, functional and procedural, and has a large and comprehensive standard library.[29]

  Python interpreters are available for many operating systems. CPython, the reference implementation of Python, is open source software[30] and has a community-based development model, as do nearly all of its variant implementations. CPython is managed by the non-profit Python Software Foundation.</Segment>
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
            <LeftSideBar />
            <StyledRelatedSidebar>
              <Segment basic>
                <Segment.Group>
                  <Segment basic inverted color='teal'>Related</Segment>
                  <Segment>
                    Python is an interpreted high-level programming language for general-purpose programming. Created by Guido van Rossum and first released in 1991, Python has a design philosophy that emphasizes code readability, and a syntax that allows programmers to express concepts in fewer lines of code,[26][27] notably using significant whitespace. It provides constructs that enable clear programming on both small and large scales.[28]

                    Python features a dynamic type system and automatic memory management. It supports multiple programming paradigms, including object-oriented, imperative, functional and procedural, and has a large and comprehensive standard library.[29]

                    Python interpreters are available for many operating systems. CPython, the reference implementation of Python, is open source software[30] and has a community-based development model, as do nearly all of its variant implementations. CPython is managed by the non-profit Python Software Foundation.
                  </Segment>
                </Segment.Group>
              </Segment>
            </StyledRelatedSidebar>
          </Grid.Column>
          <Grid.Column computer={8}>
            <Segment basic>
              {this.renderBackButton()}
              <h2>{this.props.course.title}</h2>
              {this.renderBody()}
              <br />
              <p>{this.props.course.description}</p>
                <Button onClick={() => this.setState({ ratings: 'ratings-div' })}>Ratings</Button>
                <Feedback />
                <Ratings />
            </Segment>

          </Grid.Column>
          <Grid.Column width={4} only='computer tablet'>
            <RightSideBar />
            <StyledRightSidebar>
              <Segment basic>
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
              </Segment>
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
