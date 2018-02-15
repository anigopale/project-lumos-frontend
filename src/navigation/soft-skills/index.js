import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSoftSkills } from './actions';

class SoftSkills extends Component {
  componentDidMount() {
    this.props.fetchSoftSkills();
  }
  render() {
    return (
      <div>

      </div>
    )
  }
}

function mapStateToProps({ softskills }) {
  return { softskills };
}

export default connect(mapStateToProps, { fetchSoftSkills })(SoftSkills);
