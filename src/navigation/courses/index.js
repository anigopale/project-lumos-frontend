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
  Dropdown,
  Breadcrumb
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { fetchCourses, deleteCourses } from './actions';
import Filters from './components/filters';
import CourseItem from '../../common-components/course-item';
import CourseBreadcrumbs from './components/course-breadcrumbs';

class Courses extends Component {

  componentDidMount() {
    this.props.deleteCourses();
    let { page_token, category_id } = this.props.match.params;
    let { courseType } = this.props;

    // push to 404, if category_id and page_token is invalid
    if(page_token < '1' || category_id < '1') {
        this.props.history.push('/404');
    }
    this.props.deleteCourses();
    this.props.fetchCourses(courseType, category_id, page_token);
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
    let { category_id, page_token } = nextProps.match.params;
    let { courseType } = nextProps;
    if(page_token < '1' || category_id < '1') {
        this.props.history.push('/404');
    }
    if(this.props.match.params !== nextProps.match.params) {
      // fetch data only if url parameters are different
      this.props.deleteCourses();
      this.props.fetchCourses(courseType, category_id, page_token);
    }
  }

  filterCourses = (filters) => {
    // filter courses using 'filters' props passed up by <Filters />
    let { category_id } = this.props.match.params;
    let { courseType } = this.props;

    this.props.deleteCourses();
    this.props.fetchCourses(courseType, category_id, 1, filters);
  }


  // renders fetched courses
  renderCourses() {
    return this.props.courses.results.map((course) => {
      let { course_type } = this.props.match.params;
      return (
        <CourseItem course={course} courseType={course_type} />
      )
    })
  }


  renderPaginationButtons() {
    let previousPageToken = "1";
    let nextPageToken = "1";
    let category_params = "";
    let { course_type, category, category_id } = this.props.match.params;

    if(this.props.courses.results.length) {
      // grabbing previous and next page number off of 'previous' and 'next' attribute
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
        {this.renderCourses()}
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
        <Divider hidden />
        <Container>
          <CourseBreadcrumbs courseType={this.props.courseType} categoryId={this.props.match.params.category_id} />
        </Container>
        <Divider hidden />
        <Container text>
          <Filters getFilters={this.filterCourses} urlParams={this.props.match.params} />
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
