import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Divider, Item, Header, Button, Segment, Label, Loader, Dimmer, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { fetchCourses, deleteCourses } from './actions';
import DomainLanguageLabels from './components/domain-language-labels';

class Courses extends Component {
  state = { course_type: 'videos' };

  dropdownOptions = [
    {
      text: "Videos",
      value: "videos"
    },
    {
      text: "Links",
      value: "links"
    }
  ]

  componentDidMount() {
    let { category, id, page_token } = this.props.match.params;
    let { course_type } = this.state;

    // push to home, if category doesn't match 'domain' or 'language'
    if(category !== 'domain' && category !== 'language') {
      this.props.history.push('/courses');
    }
    this.props.fetchCourses(category, id, page_token, course_type);
  }


  componentDidUpdate() {
    let { category, id, page_token } = this.props.match.params;

    // push to home, if category doesn't match 'domain' or 'language'
    if(category !== 'domain' && category !== 'language') {
      //this.props.history.push('/');
    }
  }

  handleDropdownChange = (e, { value }) => {
    let { category, id, page_token } = this.props.match.params;
    let { course_type } = this.state;
    if(value !== course_type) {
      this.props.history.push(`/courses/${category}/${id}/0`);
      this.props.deleteCourses();
      this.props.fetchCourses(category, id, page_token, course_type);
      this.setState({ course_type: value });
    }
  }

  renderSkillLevel(skill_level) {
    if(skill_level === 'BG') {
      return 'Beginner';
    }
    if(skill_level === 'IT') {
      return 'Intermediate'
    }
    if(skill_level === 'AD') {
      return 'Advanced'
    }
  }

  renderCourses() {
    return this.props.courses.data.map((course) => {
      let course_type = 'link';
      if(this.state.course_type === 'videos') {
        course_type = 'video';
      }
      return (
        <Item
          as={Link}
          to={{
            pathname: `/classroom/${course_type}/${course.id}`,
            state: { fromCourses: true }
          }}
          >
          <Item.Content>
            <Item.Header as='a'>{course.title}</Item.Header>
            <Item.Meta>
              <span className='cinema'>skill level: {this.renderSkillLevel(course.skill_level)}</span>
            </Item.Meta>
            <Item.Description>{course.description}</Item.Description>
            <Item.Extra>
              <DomainLanguageLabels languages={course.languages_fk} domains={course.domains_fk} />
            </Item.Extra>
          </Item.Content>
        </Item>
      )
    })
  }

  renderPaginationButtons() {
    return (
      <Button.Group>
        <Button
          basic
          color='teal'
          as={Link}
          to={`${this.props.courses.previous_page}`}
          >
          Prev
        </Button>
        <Button
          basic
          color='teal'
          as={Link}
          to={`${this.props.courses.next_page}`}
          >
          Next
        </Button>
      </Button.Group>
    )
  }

  renderBody() {
    if(!this.props.courses.data) {
      return (
        <Segment basic>
          <Dimmer inverted active>
            <Loader size='medium' />
          </Dimmer>
        </Segment>
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
          <Dropdown
            selection
            options={this.dropdownOptions}
            onChange={this.handleDropdownChange}
            value={this.state.course_type}
            />
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
