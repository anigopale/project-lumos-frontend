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
  Breadcrumb,
  Visibility,
  Grid
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { fetchCourses, deleteCourses, fetchMoreCourses } from './actions';
import Filters from './components/filters';
import CourseItem from '../../common-components/course-item';
import CourseBreadcrumbs from './components/course-breadcrumbs';
import { DOMAINS, LANGUAGES, SOFT_SKILLS, KNOWLEDGE_BASE, RANDOM } from '../../common-services/course_types';
import styled, {keyframes} from 'styled-components';

const showSideBar = keyframes`
0% {
  transform: translateX(-100%);
}
100% {
  transform: translateX(0);
}
`;
const hideSideBar = keyframes`
0% {
  transform: translateX(0%);
}
100% {
  transform: translateX(-100%);
}
`;

const StyledFilter = styled.div`
  position: fixed;
  top: 80px;
  bottom: 20px;
  overflow-y: auto;
  width: 250px;
  z-index: 2 !important;

  @media only screen and (max-width: 600px) {
    animation: .5s ease-out 0s 1 ${props => {
      if(props.sidebar == null)
        return '';
      if(props.sidebar)
        return `${showSideBar}`
      else
        return `${hideSideBar}`
    }};;
    .menu {
      padding: 20px;
    }
    position: fixed;
    top: 50px;
    bottom: 0px;
    left: -1px;
    overflow-y: auto;
    width: 100%;
    transform: ${props => props.sidebar ? 'translateX(0%)' : 'translateX(-100%)'};
  }
`;
const StyledContent = styled.div`
  position: relative;
  margin-left: 300px;
  padding-left: 10px;
  @media only screen and (max-width: 600px) {
    margin-left: 0;
  }
  body {
    overflow-y: hidden !important;
  }
`;


class Courses extends Component {

  componentDidMount() {
    let { category_id } = this.props.match.params;
    let { courseType } = this.props;

    // push to 404, if category_id
    if(category_id < '1') {
        this.props.history.push('/404');
    }
    this.props.fetchCourses(courseType, category_id, 1);
  }


  componentDidUpdate() {
    let { category_id } = this.props.match.params;
    let { courseType } = this.props;

    // push to 404, if category_id and page_token is invalid
    if(category_id < '1') {
        this.props.history.push('/404');
    }
  }

  componentWillReceiveProps(nextProps) {
    let { category_id } = nextProps.match.params;
    let { courseType } = nextProps;
    if(category_id < '1') {
        this.props.history.push('/404');
    }
    if(this.props.match.params.category_id !== category_id
      || this.props.courseType !== courseType) {
      // fetch data only if url parameters and courseType props are different
      this.props.deleteCourses();
      this.props.fetchCourses(courseType, category_id, 1);
    }
  }

  componentWillUnmount() {
    this.props.deleteCourses();
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
    if(courseType === DOMAINS || courseType === LANGUAGES) {
      course_type = KNOWLEDGE_BASE;
    }
    if(courseType === RANDOM) {
      course_type = RANDOM;
    }
    if(courseType === SOFT_SKILLS) {
      course_type = SOFT_SKILLS;
    }

    return this.props.courses.results.map((course) => {
      return (
        <CourseItem course={course} courseType={course_type} fromCourses={true} />
      )
    })
  }

  handleVisibilityUpdate = (calculations) => {
    // auto fetch next page data once load more button is visible
    if(calculations.bottomVisible) {
      this.props.fetchMoreCourses(this.props.courses.next);
    }
  }

  handleLoadMoreClick = () => {
    // fetch next page data on 'load more' button click
    this.props.fetchMoreCourses(this.props.courses.next);
  }

  renderPaginationButtons() {
    if(this.props.courses.next) {
      if(this.props.courses.loading) {
        return (
            <Dimmer inverted active>
              <Loader size='medium' />
            </Dimmer>
        )
      }
      return (
        <Visibility onUpdate={(e, { calculations }) => {this.handleVisibilityUpdate(calculations)}}>
          <Divider hidden />
        </Visibility>
      )
    }
  }

  // renders loader or results
  renderBody() {
    if(this.props.courses.error) {
      // can be pushed to any error page if response status isn't 200
      this.props.history.push('/404');
      return;
    }
    if(!this.props.courses.results) {
      return (
        <Segment basic>
          <Loader active style={{ zIndex: -1 }} />
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
          <StyledFilter sidebar={this.props.sidebar}>
            <Filters getFilters={this.filterCourses} urlParams={this.props.match.params} />
          </StyledFilter>
          <StyledContent>
            <CourseBreadcrumbs courseType={this.props.courseType} categoryId={this.props.match.params.category_id} />
              <Divider hidden />
            {this.renderBody()}
          </StyledContent>

        </Container>
      </div>
    )
  }
}

function mapStateToProps({ courses }) {
  return { courses };
}

export default connect(mapStateToProps, { fetchCourses, deleteCourses, fetchMoreCourses })(Courses);
