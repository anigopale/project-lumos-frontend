import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Divider, Item, Header, Button, Segment, Label, Loader, Dimmer } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { fetchCourses } from './actions';
import DomainLanguageLabels from './components/domain-language-labels';

class Courses extends Component {
  componentDidMount() {
    let { type, id, page_token } = this.props.match.params;
    this.props.fetchCourses(type, id, page_token);
  }
  componentDidUpdate() {

  }

  renderCourses() {
    return this.props.courses.data.map((course) => {
      let course_type = 'external';
      if(course.video_url) {
        course_type = 'video'
      }
      return (
        <Item as={Link} to={`/classroom/${course_type}/${course.id}`}>
          <Item.Content>
            <Item.Header as='a'>{course.title}</Item.Header>
            <Item.Meta>
              <span className='cinema'>skill level: {course.skill_level}</span>
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

export default connect(mapStateToProps, { fetchCourses })(Courses);
