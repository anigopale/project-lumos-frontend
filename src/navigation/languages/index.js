import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLanguages } from './actions';

class Languages extends Component {
  componentDidMount() {
    this.props.fetchLanguages();
  }

  render() {
    return (
      <div>
        Languages...
      </div>
    )
  }
}

export default connect(null, { fetchLanguages })(Languages);
