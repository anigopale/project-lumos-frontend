import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Segment, Grid, Divider, Header, Dimmer, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { fetchDomains } from './actions';

class Domains extends Component {
  componentDidMount() {
    this.props.fetchDomains();
  }
  renderDomains() {
    return this.props.domains.map((domain) => {
      return (
        <Grid.Column>
          <Segment
            textAlign='center'
            size='massive'
            color='teal'
            inverted
            padded
            basic
            as={Link}
            to={`/courses/domain/${domain.id}/0`}
            >
            {domain.domain_name}
          </Segment>
        </Grid.Column>
      )
    })
  }

  renderBody() {
    if(!this.props.domains.length) {
      return (
        <Segment basic>
          <Dimmer active inverted>
            <Loader size='medium' />
          </Dimmer>
        </Segment>
      )
    }
    return (
      <Grid columns={3} stretched stackable>
        {this.renderDomains()}
      </Grid>
    )
  }

  render() {
    return (
      <div>
        <Container>
          <Segment basic>
            <Divider hidden />
            <Header as='h1' textAlign='center'>
              <Header sub>Browse courses by</Header>
              Domain
            </Header>
            <Divider />
            {this.renderBody()}
          </Segment>
        </Container>
      </div>
    )
  }
}

function mapStateToProps({ domains }) {
  return { domains };
}

export default connect(mapStateToProps, { fetchDomains })(Domains);
