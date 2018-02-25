import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Header, Container, Divider, Loader, Dimmer, Pagination } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { fetchLanguages } from './actions';

class Languages extends Component {
  state = { activePage: 1 };

  componentDidMount() {
    this.props.fetchLanguages();
  }

  handlePageChange = (e, { activePage }) => {
    this.setState({ activePage })
  }

  renderPagination() {
    if(this.props.languages.length > 1 ) {
      return (
        <Pagination
          defaultActivePage={1}
          totalPages={this.props.languages.length}
          firstItem={null}
          lastItem={null}
          onPageChange={this.handlePageChange}
          />
      )
    }
  }

  renderLanguages() {
    return this.props.languages[this.state.activePage - 1].map((language) => {
      return (
        <Grid.Column>
          <Segment
            textAlign='center'
            size='massive'
            color='teal'
            padded
            as={Link}
            to={`/courses/language/${language.id}/0`}
            >
            {language.language_name}
          </Segment>
        </Grid.Column>
      )
    })
  }

  renderBody() {
    if(!this.props.languages.length) {
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
        {this.renderLanguages()}
      </Grid>
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
              Language
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
