import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Button, Modal, Icon, Header, Form, Loader, Segment, Dimmer, Container } from 'semantic-ui-react';
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

  renderMeanings(meanings) {
    return meanings.map((meaning) => {
      return <li>{meaning}</li>
    })
  }

  renderContent() {
    if(this.props.wiktionaryData.error) {
      return (
        <div>no meaning found</div>
      )
    }
    if(this.props.wiktionaryData.term_meaning) {
     return Object.keys(this.props.wiktionaryData.term_meaning).map((key => {
       return (
         <div>
           <Header>{key}</Header>
           <ul>
             {this.renderMeanings(this.props.wiktionaryData.term_meaning[key])}
           </ul>
         </div>
       )
     }))


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
