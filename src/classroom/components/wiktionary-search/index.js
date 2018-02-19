import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Input,
  Button,
  Modal,
  Icon,
  Header,
  Form,
  Loader,
  Segment,
  Dimmer,
  Container,
  List,
  Divider,
  Grid
} from 'semantic-ui-react';
import { wiktionarySearch, emptyReducer } from './actions';

class Wiktionary extends Component {
  state = { term: "", openModal: false };

  handleSearch = () => {
    if(this.state.term) {
      this.props.wiktionarySearch(this.state.term);
      this.setState({ openModal: true });
    }
  }
  handleSubmit = () => {
    if(this.state.term) {
      this.props.wiktionarySearch(this.state.term);
      this.setState({ openModal: true });
    }
  }

  handleCloseModal = () => {
    this.setState({ openModal: false });
    this.props.emptyReducer()
  }

  synonymSearch = (term) => {
    this.setState({ term })
    this.props.emptyReducer();
    this.props.wiktionarySearch(term);
  }

  renderMeanings(meanings) {
    return meanings.map((meaning) => {
      return <List.Item as='li'>{meaning}</List.Item>
    })
  }

  renderDictionary(data) {
    return Object.keys(data).map((key => {
      return (
        <div>
          <Divider hidden />
          <Header>{key}</Header>
          <List as='ul'>
            {this.renderMeanings(data[key])}
          </List>
        </div>
      )
    }))
  }

  renderSynonym(terms) {
    if(terms) {
      return terms.map((term) => {
        return (
          <List.Item as='a' onClick={() => {
              this.synonymSearch(term)
            }}>{term}</List.Item>
          )
        })
    }
  }

  renderContent() {
    if(this.props.wiktionaryData.error) {
      return (
        <div>no result found</div>
      )
    }
    if(this.props.wiktionaryData.term_meaning) {
     return (
       <div>
         {this.renderDictionary(this.props.wiktionaryData.term_meaning)}
         <Divider />
         <Grid columns={2}>
           <Grid.Column>
             <Header>Synonyms</Header>
             <List>
               {this.renderSynonym(this.props.wiktionaryData.term_synonym)}
             </List>
           </Grid.Column>
           <Grid.Column>
             <Header>Antonyms</Header>
             <List>
               {this.renderSynonym(this.props.wiktionaryData.term_antonym)}
             </List>
           </Grid.Column>
         </Grid>
       </div>
     )
    }

    return (
      <Dimmer active inverted>
        <Loader >Please Wait</Loader>
      </Dimmer>
    )
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Input
            type='text'
            onChange={(event) => {this.setState({ term: event.target.value })}}
            icon='wikipedia'
            iconPosition='left'
            placeholder='Search Wiktionary'
            action={<Button color='teal' icon='search' />}
            />
        </Form>
        <Modal
          open={this.state.openModal}
          onClose={this.handleCloseModal}
          >
          <Modal.Header>
            <Container text>
            <Header as='h2' icon>
              <Icon name='wikipedia' />
              Wiktionary
            </Header>
            </Container>
          </Modal.Header>

          <Modal.Content>
            <Container text>
              <Header as='h1'>{this.state.term}:</Header>
              {this.renderContent()}
            </Container>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps({ wiktionaryData }) {
  return { wiktionaryData };
}

export default connect(mapStateToProps, { wiktionarySearch, emptyReducer })(Wiktionary);
