import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Segment } from 'semantic-ui-react';
import { fetchDomains } from './actions';

class Domains extends Component {
  componentDidMount() {
    this.props.fetchDomains();
  }

  render() {
    return (
      <div>
        <Container>
          <Segment basic>

          </Segment>
        </Container>
      </div>
    )
  }
}

export default connect(null, { fetchDomains })(Domains);
