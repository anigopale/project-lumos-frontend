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

  renderClass() {
    if(!this.props.resource.id) {
      return <h1>loading</h1>
    }
    return (
      <div>
        <h1>{this.props.resource.title}</h1>
        <h1>{this.props.resource.description}</h1>
        <a href={this.props.resource.url}>click here</a>
      </div>
    )
  }


  render() {
    return (
      <div>
        {this.renderClass()}
      </div>
    )
  }
}

function mapStateToProps({ resource }) {
  return { resource };
}

export default connect(mapStateToProps, { fetchResource })(Classroom);
