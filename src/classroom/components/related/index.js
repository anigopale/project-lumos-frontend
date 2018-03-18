import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Loader } from 'semantic-ui-react';
import { fetchRelatedData } from './actions';

class Related extends Component {



  fetchRelated = () => {
    let data = [];
    let type = '';
    let { languages, soft_skill } = this.props.course;
    data = languages ? languages : soft_skill;
    type = languages ? 'languages' : 'soft_skill';
    if(data)
      this.props.fetchRelatedData(data[0], type);
  }

  renderData() {
    this.fetchRelated();
    let length = Object.keys(this.props.relatedData).length;
    if(length) {
      return Object.keys(this.props.relatedData).map((key => {
        return (
          <Segment>{key}</Segment>
        )
      }))
    }
    return (
      <Segment>Hope you liked our site</Segment>
    )
  }
  render() {
    return (
      <Segment.Group>
        <Segment color='teal' inverted>Related</Segment>
        <Segment>
          {this.renderData()}
        </Segment>
      </Segment.Group>
    )
  }
}

function mapStateToProps({ relatedData }) {
  return { relatedData };
}

export default connect(mapStateToProps, { fetchRelatedData })(Related);
