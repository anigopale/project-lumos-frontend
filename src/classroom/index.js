import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchResource } from './actions';

class Classroom extends Component {
  componentDidMount() {
    this.props.fetchResource(this.props.match.params.resource_id);
  }
  componentDidUpdate() {
    this.props.fetchResource(this.props.match.params.resource_id);
  }

  render() {
    return (
      <div>
        classroom app
      </div>
    )
  }
}

export default connect(null, { fetchResource })(Classroom);
