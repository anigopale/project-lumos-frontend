import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Header, Container, Divider, Loader, Dimmer } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { fetchLanguages } from './actions';

class Languages extends Component {
  componentDidMount() {
    this.props.fetchLanguages();
  }

  renderLanguages() {
    return this.props.languages.map((language) => {
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
      <Grid columns={3} stretched stackable>
        {this.renderLanguages()}
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
              Language
            </Header>
            <Divider />
            {this.renderBody()}
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
