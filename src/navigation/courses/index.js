import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCourses } from './actions';

class Courses extends Component {
  componentDidMount() {
    let { category, page_token } = this.props.match.params;
    this.props.fetchCourses(category, page_token);
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}

export default connect(null, { fetchCourses })(Courses);
