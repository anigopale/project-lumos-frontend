import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Segment, Grid, Divider, Header, Loader, Dimmer, Menu, Card, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import NavItem from '../../common-components/nav-item';
import { fetchSoftSkills, deleteSoftSkills } from './actions';

class SoftSkills extends Component {
  state = { activePage: 1 };

  componentDidMount() {
    this.props.fetchSoftSkills(this.state.activePage);
  }

  previousPage = () => {
    if(this.state.activePage > 1) {
      this.setState({ activePage: this.state.activePage - 1 });
      this.props.deleteSoftSkills();
      this.props.fetchSoftSkills(this.state.activePage - 1);
    }
  }

  nextPage = () => {
    if(this.state.activePage) {
      this.setState({ activePage: this.state.activePage + 1 });
      this.props.deleteSoftSkills();
      this.props.fetchSoftSkills(this.state.activePage + 1);
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
    if(this.props.softskills.count) {
      if(this.props.softskills.results.length < this.props.softskills.count ) {
        return (
          <Menu pagination>
            <Menu.Item
              onClick={this.previousPage}
              icon='angle left'
              disabled={!this.props.softskills.previous}
              />
            <Menu.Item>
              {this.state.activePage}
            </Menu.Item>
            <Menu.Item
              onClick={this.nextPage}
              icon='angle right'
              disabled={!this.props.softskills.next}
              />
          </Menu>
        )
      }
    }
  }

  renderSoftSkills() {
    return this.props.softskills.results.map((skill) => {
      let { id, soft_skill_category, slug, description, icon } = skill;
      let skillData = {
        id,
        slug,
        name: soft_skill_category,
        description,
        icon
      }
      let coursesPageUrl = `/soft-skills/${id}`;
      return (
        <Grid.Column>
          <NavItem data={skillData} coursesPageUrl={coursesPageUrl} />
        </Grid.Column>
      )
    })
  }

  renderBody() {
    if(this.props.softskills.error) {
      this.props.history.push('/404');
      return;
    }
    if(this.props.softskills.count) {
      return (
        <Grid columns={3} stretched doubling centered>
          {this.renderSoftSkills()}
        </Grid>
      )
    }
    return (
      <Segment basic>
        <Dimmer active inverted>
          <Loader size='medium' />
        </Dimmer>
      </Segment>
    )

  }

  render() {
    console.log(this.props.softskills);
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

export default connect(mapStateToProps, { fetchSoftSkills, deleteSoftSkills })(SoftSkills);
