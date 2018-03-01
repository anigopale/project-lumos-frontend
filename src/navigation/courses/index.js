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
    this.props.deleteCourses();
    let { category, id, page_token } = this.props.match.params;
    let { course_type } = this.state;

    // push to 404, if category doesn't match 'domain' or 'language'
    if(category !== 'domain' && category !== 'language') {
      this.props.deleteCourses();
      this.props.history.push('/courses');
    }
    this.props.fetchCourses(category, id, page_token, course_type);
  }


  componentDidUpdate() {
    let { category, id, page_token } = this.props.match.params;

    // push to 404, if category doesn't match 'domain' or 'language'
    if(category !== 'domain' && category !== 'language') {
      //this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    let { category, id, page_token } = nextProps.match.params;
    let { course_type } = this.state;

    // erase and fetch data only either if id is same but category is different
    // or the id is different
    if(id === this.props.match.params.id) {
      if(category !== this.props.match.params.category) {
        this.props.deleteCourses();
        this.props.fetchCourses(category, id, page_token, course_type);
      }
    }
    else {
      this.props.deleteCourses();
      this.props.fetchCourses(category, id, page_token, course_type);
    }
  }

  handleDropdownChange = (e, { value }) => {
    let { category, id, page_token } = this.props.match.params;
    let { course_type } = this.state;
    if(value !== course_type) {
      this.props.history.push(`/courses/${category}/${id}/0`);
      this.props.deleteCourses();
      this.props.fetchCourses(category, id, page_token, value);
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

  openLink(course_type, url) {
    // open external link url
    if(course_type === 'link') {
      window.open(url);
    }
  }

  renderCourses() {
    return this.props.courses.results.map((course) => {
      let course_type = 'link';
      if(this.state.course_type === 'videos') {
        course_type = 'video';
      }
      return (
        <Item>
          <Item.Content>
            <Item.Header
              onClick={() => {this.openLink(course_type, course.link_url)}}
              as={Link}
              to={{
                pathname: `/classroom/${course_type}/${course.id}`,
                state: { fromCourses: true }
              }}
              >
              {course.title}
            </Item.Header>
            <Item.Meta>
              <span className='cinema'>skill level: {this.renderSkillLevel(course.skill_level)}</span>
            </Item.Meta>
            <Item.Description>{course.description}</Item.Description>
            <Item.Extra>
              <DomainLanguageLabels languages={course.languages} domains={course.domains} />
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
