import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Segment, Grid, Divider, Header, Dimmer, Loader, Menu, Card, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { fetchDomains, deleteDomains } from './actions';

class Domains extends Component {
  state = { activePage: 1 };

  componentDidMount() {
    this.props.fetchDomains(this.state.activePage);
  }

  handlePageChange = (activePage) => {
    this.setState({ activePage })
  }

  previousPage = () => {
    if(this.state.activePage > 1) {
      this.setState({ activePage: this.state.activePage - 1 })
      this.props.deleteDomains();
      this.props.fetchDomains(this.state.activePage - 1);
    }
  }

  nextPage = () => {
    if(this.state.activePage) {
      this.setState({ activePage: this.state.activePage + 1 });
      this.props.deleteDomains();
      this.props.fetchDomains(this.state.activePage + 1);
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
    if(this.props.domains.count) {
      if(this.props.domains.results.length < this.props.domains.count ) {
        return (
          <Menu pagination>
            <Menu.Item
              onClick={this.previousPage}
              icon='angle left'
              disabled={!this.props.domains.previous}
              />
            <Menu.Item>
              {this.state.activePage}
            </Menu.Item>
            <Menu.Item
              onClick={this.nextPage}
              icon='angle right'
              disabled={!this.props.domains.next}
              />
          </Menu>
        )
      }
    }
  }

  renderDomains() {
    return this.props.domains.results.map((domain) => {
      return (
        <Grid.Column>
          <Card
            as={Link}
            to={`/technical/knowledge-base/domains/${domain.id}/`}
            fluid
            >
            <Image src={domain.icon} alt='' />
            <Card.Content extra>
              {domain.domain_name}
            </Card.Content>
          </Card>
        </Grid.Column>
      )
    })
  }

  renderBody() {
    if(this.props.error) {
      this.props.history.push('/404');
      return;
    }
    if(this.props.domains.count) {
      return (
        <Grid columns={3} stretched doubling centered padded relaxed='very'>
          {this.renderDomains()}
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
    return (
      <div>
        <Container>
          <Segment textAlign='center' basic>
            <Divider hidden />
            <Header as='h1' textAlign='center'>
              <Header sub>Browse courses by</Header>
              Domains
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

export default connect(mapStateToProps, { fetchDomains, deleteDomains })(Domains);
