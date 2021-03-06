import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Button, Container, Divider, Grid, Loader, Dimmer, Icon, Sidebar, Responsive, Label, Transition} from 'semantic-ui-react';
import { fetchResource, deleteResource } from './actions';
import Resource from './components/embed-resource';
import Wikipedia from './components/wikipedia-search';
import Wiktionary from './components/wiktionary-search';
import Ratings from './components/ratings';
import Feedback from './components/feedback'
import Related from './components/related';
import { KNOWLEDGE_BASE, RANDOM, SOFT_SKILLS } from '../common-services/course_types';
import styled, { keyframes } from 'styled-components';
import { SIDEBAR_BACKGROUND, SITE_PRIMARY } from '../common-services/color-palette';

const StyledContent = styled.div`
  padding: 10px;
  button {
    background-color: green;
  }
  .ratings {
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  }
  .back-button {
    visibility: hidden;
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 2 !important;
  }
  styled-content-div {
    min-height: 100vh;
  }

  .courses-loader {
    position: relative !important;
    text-align: center !important;
    top 30vh !important;
  }

  @media only screen and (max-width: 768px) {
    padding: 0px;

    styled-content-div {
      min-height: '0vh';
    }
    .back-button {
      visibility: visible;
      position: fixed;
      bottom: 20px;
      left: 20px;
      z-index: 2 !important;
    }
  }
`;

const LeftSideBarBackground = styled.div`
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0px;
  bottom: 0px;
  height: 100vh;
  background-color: ${SIDEBAR_BACKGROUND};
  width: 25%;
  overflow-y: auto;
  visibility: visible;
  @media only screen and (max-width: 768px) {
    visibility: hidden;
  }
`;

const RightSideBarBackground = styled.div`
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0px;
  bottom: 0px;
  right: 0px;
  height: 100vh;
  background-color: ${SIDEBAR_BACKGROUND};
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
const StyledWikiSidebar = styled.div`
  position: fixed;
  top: 60px;
  right: 0px;
  bottom: 0px;
  overflow-y: auto;
  width: 25%;
  z-index: 2 !important;
  visibility: visible;

  .label {
    margin: 2px;
  }

  @media only screen and (max-width: 768px) {
    visibility: hidden;
  }

`;

const MobileSidebar = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;

  position: fixed;
  top: 45px;
  bottom: 0px;
  overflow-y: auto;
  width: 100%;

  i {
    color: ${SITE_PRIMARY};
    position: fixed;
    top: 10px;
    right: 0px;
    z-index: 999 !important;
  }
  .label {
    margin: 2px;
  }

`;

const StyledClassroom = styled.div`
  .card-header {
    background-color: ${SITE_PRIMARY} !important;
    color: white !important;
  }
  button {

    &:hover {
      color: #F5F5F5 !important;
      background-color: ${SITE_PRIMARY} !important;
    }
    &:active {
      color: #F5F5F5 !important;
      background-color: ${SITE_PRIMARY} !important;
    }
  }

`;

class Classroom extends Component {
  state = { ratings: false };

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

  renderRatingComponents() {
    return [
      <Feedback courseTitle={this.props.course.title} urlParams={this.props.match.params} path={this.props.location.pathname} />,
      <Transition visible={this.state.ratings} animation='fade down' duration={500}>
        <Segment className='ratings'>
          <Ratings ratings={this.props.course.ratings} />
        </Segment>
      </Transition>
    ]
  }

  renderBackButton() {
    // check if location.state exists, as passed by Courses component
    // render back button only if user reaches Classroom through Courses page
    if(this.props.location.state) {
      let { fromCourses } = this.props.location.state;
      if(fromCourses)
      return (
        <Button
          size='big'
          basic
          circular
          className='back-button'
          icon='left arrow'
          onClick={() => this.props.history.goBack()}
          />

      )
    }
  }

  renderBody() {
    if(this.props.course.error) {
      this.props.history.push('/400');
      return;
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
        return (
          <div>
            <Resource url={this.props.course.link_url} type={type} />
            <Divider />
            <Button onClick={() => this.setState({ ratings: !this.state.ratings })} color={this.state.ratings ? 'teal' : ''}>Ratings</Button>
            {this.renderRatingComponents()}
          </div>
        )
       }
      return (
        <div>
          <br />
          <p>{this.props.course.description}</p>
          <Segment clearing basic>
            <a href={this.props.course.link_url} target='_blank' rel='noopener'>
              <Button floated='right'>Go to Site <Icon name='right arrow' /></Button>
            </a>
          </Segment>
          <Divider />
          <Button onClick={() => this.setState({ ratings: !this.state.ratings })} color={this.state.ratings ? 'teal' : ''}>Ratings</Button>
          {this.renderRatingComponents()}
        </div>
      )
    }
    return (
      <Segment basic className='courses-loader'>
        <Loader active style={{ zIndex: -1 }} />
      </Segment>
    )
  }



  render() {
    return (
      <StyledClassroom>
        <Sidebar as='div' visible={this.props.sidebar} animation='overlay' style={{ width: '100%', backgroundColor: '#eeeeee' }}>
          <MobileSidebar>
            <Icon name='remove circle' size='big' onClick={this.toggleSideBar} />
              <Related course={this.props.course} />
              <Segment.Group>
                <Segment  style={{ backgroundColor: 'blue' }} className='card-header'>Prerequisites</Segment>
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
            <LeftSideBarBackground />
            <StyledRelatedSidebar>
              <Segment basic>
                <Related course={this.props.course} />
              </Segment>
            </StyledRelatedSidebar>
          </Grid.Column>
          <Grid.Column computer={8}>
            <StyledContent>
              <div className='styled-content-div'>
                <h2>{this.props.course.title}</h2>
                {this.renderBackButton()}
                {this.renderBody()}
              </div>
            </StyledContent>

          </Grid.Column>
          <Grid.Column width={4} only='computer tablet'>
            <RightSideBarBackground />
            <StyledWikiSidebar>
              <Segment basic>
                <Segment.Group>
                  <Segment className='card-header'>
                    Wikipedia
                  </Segment>
                  <Segment>
                    <Wikipedia />
                  </Segment>
                </Segment.Group>
                <Segment.Group>
                  <Segment className='card-header'>
                    Dictionary
                  </Segment>
                  <Segment>
                    <Wiktionary />
                  </Segment>
                </Segment.Group>
                <Segment.Group>
                  <Segment className='card-header'>Prerequisites</Segment>
                  <Segment>
                    <Label>resource name</Label>
                    <Label>resource name</Label>
                    <Label>resource name</Label>
                  </Segment>
                </Segment.Group>
              </Segment>
            </StyledWikiSidebar>
          </Grid.Column>
        </Grid>
      </StyledClassroom>
    )
  }
}

function mapStateToProps({ course }) {
  return { course };
}

export default connect(mapStateToProps, { fetchResource, deleteResource })(Classroom);
