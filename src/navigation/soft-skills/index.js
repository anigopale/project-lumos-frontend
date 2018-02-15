import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Segment, Grid, Divider, Header } from 'semantic-ui-react';
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
            to={`/courses/${skill.slug}/0`}
            >
            {skill.domain_name}
          </Segment>
        </Grid.Column>
      )
    })
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
            <Grid columns={3} stretched stackable>
              {this.renderSoftSkills()}
            </Grid>
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
