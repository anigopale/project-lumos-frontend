import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Segment, Grid, Divider, Header, Loader, Dimmer, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { fetchSoftSkills } from './actions';

class SoftSkills extends Component {
  state = { activePage: 1 };

  componentDidMount() {
    this.props.fetchSoftSkills();
  }

  handlePageChange = (activePage) => {
    this.setState({ activePage })
  }

  previousPage = () => {
    if(this.state.activePage > 1) {
      this.setState({ activePage: this.state.activePage - 1 })
    }
  }

  nextPage = () => {
    if(this.state.activePage < this.props.softskills.length) {
      this.setState({ activePage: this.state.activePage + 1 })
    }
  }

  renderPageNumbers() {
    return this.props.softskills.map((domain, index) => {
      return (
        <Menu.Item
          onClick={() => {this.handlePageChange(index + 1)}}
          active={this.state.activePage === index + 1}
          >
          {index + 1}
        </Menu.Item>
      )
    })
  }

  renderPagination() {
    if(this.props.softskills.length > 1 ) {
      return (
        <Menu pagination>
          <Menu.Item onClick={this.previousPage} icon='angle left'></Menu.Item>
          {this.renderPageNumbers()}
          <Menu.Item onClick={this.nextPage} icon='angle right'></Menu.Item>
        </Menu>
      )
    }
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
      <Grid columns={3} stretched stackable centered>
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
            {this.renderPagination()}
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