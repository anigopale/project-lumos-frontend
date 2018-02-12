import React, { Component } from 'react';
import { connect } from 'react-redux';

class List extends Component {

  render() {
      return (
      <div>list</div>
    )
  }
}

function mapStateToProps({ playlist }) {
  return { playlist };
}

export default connect(mapStateToProps)(List);
