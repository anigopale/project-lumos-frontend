import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Segment, Grid, Divider, Header, Loader, Dimmer, Pagination } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { fetchSoftSkills } from './actions';

class SoftSkills extends Component {
  state = { activePage: 1 };

  componentDidMount() {
    this.props.fetchSoftSkills();
  }

  handlePageChange = (e, { activePage }) => {
    this.setState({ activePage })
  }

  renderSoftSkills() {
    return this.props.softskills[this.state.activePage - 1].map((skill) => {
      return (
        <Grid.Column>
          <Segment
            textAlign='center'
            size='massive'
            color='teal'
            padded
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
          <Segment textAlign='center' basic>
            <Divider hidden />
            <Header as='h1' textAlign='center'>
              <Header sub>Browse courses by</Header>
              Soft Skills
            </Header>
            <Divider />
            {this.renderBody()}
            <Divider hidden />
            <Pagination
              defaultActivePage={1}
              totalPages={this.props.softskills.length}
              firstItem={null}
              lastItem={null}
              onPageChange={this.handlePageChange}
              />
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
