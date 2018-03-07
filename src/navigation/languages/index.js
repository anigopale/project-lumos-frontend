import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Header, Container, Divider, Loader, Dimmer, Menu, Card, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { fetchLanguages } from './actions';

class Languages extends Component {
  state = { activePage: 1 };

  componentDidMount() {
    this.props.fetchLanguages(this.state.activePage);
  }

  previousPage = () => {
    if(this.state.activePage > 1) {
      this.setState({ activePage: this.state.activePage - 1 })
      this.props.fetchLanguages(this.state.activePage - 1);
    }
  }

  nextPage = () => {
    if(this.state.activePage) {
      this.setState({ activePage: this.state.activePage + 1 });
      this.props.fetchLanguages(this.state.activePage + 1);
    }
  }

  renderPagination() {
    if(this.props.languages.count) {
      if(this.props.languages.count > this.props.languages.results.length)
        return (
          <Menu pagination>
            <Menu.Item
              onClick={this.previousPage}
              icon='angle left'
              disabled={!this.props.languages.previous}
              />
            <Menu.Item>
              {this.state.activePage}
            </Menu.Item>
            <Menu.Item
              onClick={this.nextPage}
              icon='angle right'
              disabled={!this.props.languages.next}
              />
          </Menu>
        )
    }
  }


  renderLanguages() {
    return this.props.languages.results.map((language) => {
      return (
        <Grid.Column>
          <Card
            as={Link}
            to={`/courses/knowledge-base/1/language/${language.id}`}
            fluid
            >
            <Image src={language.icon} alt='' />
            <Card.Content extra>
              {language.language_name}
            </Card.Content>
          </Card>
        </Grid.Column>
      )
    })
  }

  renderBody() {
    if(this.props.languages.count) {
      return (
        <Grid columns={3} stretched doubling centered padded relaxed='very'>
          {this.renderLanguages()}
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
          <Segment basic textAlign='center'>
            <Divider hidden />
            <Header as='h1' textAlign='center'>
              <Header sub>Browse courses by</Header>
              Languages
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

function mapStateToProps({ languages }) {
  return { languages };
}

export default connect(mapStateToProps, { fetchLanguages })(Languages);
