import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class RecommendedCourses extends Component {

  renderCoursesList(courses, courseType) {
    return courses.map(item => {
      return (
        <Link to={`/classroom/${courseType}/${item.id}`}>
          <Segment>
            {item.title}
          </Segment>
        </Link>
      )
    })
  }

  renderCourses() {
    let { courses, courseType, recommendedType } = this.props;

    if(courses) {
      if(courses.length) {
        return (
          <Segment.Group>
            <Segment className='card-header'>{recommendedType}</Segment>
            <Segment>
              {this.renderCoursesList(courses, courseType)}
            </Segment>
          </Segment.Group>
        )
      }
    }
  }

  render() {
    return (
      <div>
        {this.renderCourses()}
      </div>
    )
  }
}
