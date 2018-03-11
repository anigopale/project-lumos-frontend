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
    let { page_token, category_id } = this.props.match.params;
    let { courseType } = this.props;

    // push to 404, if category_id and page_token is invalid
    if(page_token < '1' || category_id < '1') {
        this.props.history.push('/404');
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
    let { courseType } = this.props;
    let course_type = '';
    if(courseType === 'domains' || courseType === 'languages') {
      course_type = 'knowledge-base';
    }
    if(courseType === 'random') {
      course_type = 'random';
    }
    if(courseType === 'soft_skills') {
      course_type = 'soft_skills';
    }

    return this.props.courses.results.map((course) => {
      return (
        <CourseItem course={course} courseType={course_type} />
      )
    })
  }


  renderPaginationButtons() {
    let previousPageToken = "1";
    let nextPageToken = "1";
    let url = "";
    let { category_id } = this.props.match.params;
    let { courseType } = this.props;

    // setting up url
    if(courseType === 'domains' || courseType === 'languages')
      url = `/technical/knowledge-base/${courseType}/${category_id}`;
    if(courseType === 'soft-skills')
      url = `/${courseType}/${category_id}`;
    if(courseType === 'random')
      url = `/technical/misc`;

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
    }


    return (
      <Button.Group>
        <Button
          disabled={!this.props.courses.previous}
          basic
          color='teal'
          as={Link}
          to={`${url}/${previousPageToken}`}
          >
          Prev
        </Button>
        <Button
          disabled={!this.props.courses.next}
          basic
          color='teal'
          as={Link}
          to={`${url}/${nextPageToken}`}
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
