import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Segment, Grid, Divider, Header, Dimmer, Loader, Menu, Card, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { fetchDomains } from './actions';

class Domains extends Component {
  state = { activePage: 1 };

  componentDidMount() {
    this.props.fetchDomains();
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
    if(this.state.activePage < this.props.domains.length) {
      this.setState({ activePage: this.state.activePage + 1 })
    }
  }

  renderPageNumbers() {
    return this.props.domains.map((domain, index) => {
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
    if(this.props.domains.length > 1 ) {
      return (
        <Menu pagination>
          <Menu.Item onClick={this.previousPage} icon='angle left'></Menu.Item>
          {this.renderPageNumbers()}
          <Menu.Item onClick={this.nextPage} icon='angle right'></Menu.Item>
        </Menu>
      )
    }
  }

  renderDomains() {
    return this.props.domains[this.state.activePage - 1].map((domain) => {
      return (
        <Grid.Column>
          <Card
            as={Link}
            to={`/courses/domain/${domain.id}/0`}
            fluid
            >
            <Image src='https://cdn.dribbble.com/users/1643824/screenshots/3429154/untitled-4.gif' width='100%' height='100%' />
            <Card.Content extra>
              {domain.domain_name}
            </Card.Content>
          </Card>
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
      <Grid columns={3} stretched doubling centered padded relaxed='very'>
        {this.renderDomains()}
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
              Domain
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

function mapStateToProps({ domains }) {
  return { domains };
}

export default connect(mapStateToProps, { fetchDomains })(Domains);
