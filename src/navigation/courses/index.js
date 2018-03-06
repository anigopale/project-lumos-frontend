import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Divider,
  Item,
  Header,
  Button,
  Segment,
  Label,
  Loader,
  Dimmer,
  Dropdown
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { fetchCourses, deleteCourses } from './actions';
import CourseLabels from './components/course-labels';
//import Filters from './components/domain-language-labels';

class Courses extends Component {

  componentDidMount() {
    this.props.deleteCourses();
    let { course_type, page_token, category, category_id } = this.props.match.params;

    // push to 404, if category doesn't match 'domain' or 'language'
    if(course_type) {
      if(course_type !== 'knowledge-base' && course_type !== 'soft-skills' && course_type !== 'random') {
        this.props.history.push('/courses');
      }
    }
    this.props.fetchCourses(course_type, page_token, category, category_id);
  }


  componentDidUpdate() {
    let { course_type } = this.props.match.params;

    // push to 404, if category doesn't match 'domain' or 'language'
    if(course_type) {
      if(course_type !== 'knowledge-base' && course_type !== 'soft-skills' && course_type !== 'random') {
        this.props.history.push('/courses');
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    let { category, category_id, page_token, course_type } = nextProps.match.params;
    if(this.props.match.params !== nextProps.match.params) {
      this.props.deleteCourses();
      this.props.fetchCourses(course_type, page_token, category, category_id);
    }

  }

  renderSkillLevel(skill_level) {
    if(skill_level === 'BG') {
      return 'skill level: Beginner';
    }
    if(skill_level === 'IT') {
      return 'skill level: Intermediate'
    }
    if(skill_level === 'AD') {
      return 'skill level: Advanced'
    }
  }

  openLink(url, type) {
    // opens external link url in new tab
    if(type !== 'VI')
      window.open(url);
  }

  // renders fetched courses
  renderCourses() {
    return this.props.courses.results.map((course) => {
      let { course_type } = this.props.match.params;
      return (
        <Item>
          <Item.Content>
            <Item.Header
              onClick={() => {this.openLink(course.link_url, course.data_type)}}
              as={Link}
              to={{
                pathname: `/classroom/${course_type}/${course.id}`,
                state: { fromCourses: true }
              }}
              >
              {course.title}
            </Item.Header>
            <Item.Meta>
              <span>{this.renderSkillLevel(course.skill_level)}</span>
            </Item.Meta>
            <Item.Description>{course.description}</Item.Description>
            <Item.Extra>
              <CourseLabels languages={course.languages} domains={course.domains} softskills={course.soft_skill} />
            </Item.Extra>
          </Item.Content>
        </Item>
      )
    })
  }

  renderPaginationButtons() {
    let previousPageToken = "1";
    let nextPageToken = "1";
    let category_params = "";
    let { course_type, category, category_id } = this.props.match.params;

    if(this.props.courses.results.length) {

      if(this.props.courses.previous) {
        if(this.props.courses.previous.includes('page='))
          previousPageToken = this.props.courses.previous.split(/page=(.+)/)[1].charAt(0);
      }
      if(this.props.courses.next) {
        if(this.props.courses.next.includes('page='))
          nextPageToken = this.props.courses.next.split(/page=(.+)/)[1].charAt(0);
      }
      if(category && category_id) {
        category_params = `/${category}/${category_id}`;
      }
    }


    return (
      <Button.Group>
        <Button
          disabled={!this.props.courses.previous}
          basic
          color='teal'
          as={Link}
          to={`/courses/${course_type}/${previousPageToken}${category_params}`}
          >
          Prev
        </Button>
        <Button
          disabled={!this.props.courses.next}
          basic
          color='teal'
          as={Link}
          to={`/courses/${course_type}/${nextPageToken}${category_params}`}
          >
          Next
        </Button>
      </Button.Group>
    )
  }

  // renders loader or results
  renderBody() {
    if(!this.props.courses.results) {
      return (
        <Segment basic>
          <Dimmer inverted active>
            <Loader size='medium' />
          </Dimmer>
        </Segment>
      )
    }
    if(!this.props.courses.results.length) {
      return (
        <div>no results found</div>
      )
    }
    return (
      <div>
        <Segment>
          <Item.Group divided>
            {this.renderCourses()}
          </Item.Group>
        </Segment>
        <Divider />
        <Segment basic textAlign='center'>
          {this.renderPaginationButtons()}
        </Segment>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Container text>
          <Divider hidden />
          <Header as='h1'>Courses</Header>
          page {this.props.match.params.page_token}
          <Divider />
          {this.renderBody()}
        </Container>
      </div>
    )
  }
}

function mapStateToProps({ courses }) {
  return { courses };
}

export default connect(mapStateToProps, { fetchCourses, deleteCourses })(Courses);
