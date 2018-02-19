import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Button, Modal, Icon, Header, Form } from 'semantic-ui-react';
import { wiktionarySearch } from './actions';

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

  handleCloseModal = () => this.setState({ openModal: false });

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
            <Header as='h2' icon>
              <Icon name='wikipedia' />
              Wiktionary
            </Header>
          </Modal.Header>
          <Modal.Content>

          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default connect(null, { wiktionarySearch })(Wiktionary);
