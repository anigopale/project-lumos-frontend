import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Loader } from 'semantic-ui-react';
import { fetchRelatedData } from './actions';

class Related extends Component {

  componentWillReceiveProps(nextProps) {
    if(nextProps.course.languages && nextProps.course !== this.props.course) {
      let { languages } = nextProps.course;
      this.props.fetchRelatedData(languages[0], 'languges');
    }
  }

  renderData() {
    if(this.props.relatedData) {
      let length = Object.keys(this.props.relatedData).length;
      if(length) {
        return Object.keys(this.props.relatedData).map((key => {
          return (
            <Segment>{key}</Segment>
          )
        }))
      }
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
