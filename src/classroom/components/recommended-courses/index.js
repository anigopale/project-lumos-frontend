import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Icon, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class RecommendedCourses extends Component {

  // passing false "getSideBar" value as props
  handleClick = () => {
    this.props.collapseSidebar(false);
  }

  renderCoursesList = (courses, courseType) => {
    return courses.map(item => {
      return (
        <Link to={`/classroom/${courseType}/${item.id}`} onClick={this.handleClick}>
          <Segment>
            <Icon name='caret right' />
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
      else if(recommendedType === 'Related'){
        return (
          <Segment.Group>
            <Segment className='card-header'>{recommendedType}</Segment>
            <Segment>
              We don't seem to have any similar resources.
              <Divider />
              Hope you liked our site!
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
