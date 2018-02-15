import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Divider, Item, Header, Button, Segment, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { fetchCourses } from './actions';

class Courses extends Component {
  componentDidMount() {
    let { category, page_token } = this.props.match.params;
    this.props.fetchCourses(category, page_token);
  }
  componentDidUpdate() {
    let { category, page_token } = this.props.match.params;
    this.props.fetchCourses(category, page_token);
  }

  renderDomainLabels(domains) {
    return domains.map((domain) => {
      return <Label>{domain.domain_name}</Label>
    })
  }
  renderLanguageLabels(languages) {
    return languages.map((language) => {
      return <Label>{language.language_name}</Label>
    })
  }


  renderCourses() {
    if(!this.props.courses.page_token) {
      return <h1>Loading...</h1>
    }
    return this.props.courses.items.map((course) => {
      return (
        <Item as={Link} to={`/classroom/${course.id}`}>
          <Item.Content>
            <Item.Header as='a'>{course.title}</Item.Header>
            <Item.Meta>
              <span className='cinema'>skill level: {course.skill_level}</span>
            </Item.Meta>
            <Item.Description>{course.description}</Item.Description>
            <Item.Extra>
              {this.renderDomainLabels(course.domains)}
              {this.renderLanguageLabels(course.languages)}
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

  render() {
    return (
      <div>
        <Container text>
          <Divider hidden />
          <Header as='h1'>Courses</Header>
          <Divider />
          <Segment>
            <Item.Group divided>
              {this.renderCourses()}
            </Item.Group>
          </Segment>
          <Divider />
          <Segment basic textAlign='center'>
            {this.renderPaginationButtons()}
          </Segment>
        </Container>
      </div>
    )
  }
}

function mapStateToProps({ courses }) {
  return { courses };
}

export default connect(mapStateToProps, { fetchCourses })(Courses);
