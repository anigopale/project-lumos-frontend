import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Segment, Grid, Divider, Header, Loader, Dimmer } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { fetchSoftSkills } from './actions';

class SoftSkills extends Component {
  componentDidMount() {
    this.props.fetchSoftSkills();
  }
  renderSoftSkills() {
    return this.props.softskills.map((skill) => {
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
            to={`/courses/domain/${skill.id}/0`}
            >
            {skill.domain_name}
          </Segment>
        </Grid.Column>
      )
    })
  }

  renderBody() {
    if(!this.props.softskills.length) {
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
        {this.renderSoftSkills()}
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
              Soft Skills
            </Header>
            <Divider />
            {this.renderBody()}
          </Segment>
        </Container>
      </div>
    )
  }
}

function mapStateToProps({ softskills }) {
  return { softskills };
}

export default connect(mapStateToProps, { fetchSoftSkills })(SoftSkills);
