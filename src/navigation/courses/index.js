import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Divider, Item, Header } from 'semantic-ui-react';
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
          </Item.Content>
        </Item>
      )
    })
  }

  render() {
    return (
      <div>
        <Container>
          <Divider hidden />
          <Header as='h1'>Courses</Header>
          <Divider />
          <Container text>
            <Item.Group divided>
              {this.renderCourses()}
            </Item.Group>
          </Container>
        </Container>
      </div>
    )
  }
}

function mapStateToProps({ courses }) {
  return { courses };
}

export default connect(mapStateToProps, { fetchCourses })(Courses);
