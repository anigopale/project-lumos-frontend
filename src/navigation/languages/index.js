import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Header, Container, Divider } from 'semantic-ui-react';
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
          <Segment textAlign='center' size='massive' color='teal' inverted padded basic>
            {language.language_name}
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
              Language
            </Header>
            <Divider />
            <Grid columns={3} stretched stackable>
              {this.renderLanguages()}
            </Grid>
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
