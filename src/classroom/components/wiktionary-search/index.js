import React, { Component } from 'react';
import { Input, Button, Modal, Icon, Header, Form } from 'semantic-ui-react';

export default class WiktionarySearch extends Component {
  state = { term: "", openModal: false };

  handleSearch = () => {
    if(this.state.term) {
      this.setState({ openModal: true });
    }
  }
  handleCloseModal = () => this.setState({ openModal: false });

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSearch}>
          <Input
            onChange={(event) => {this.setState({ term: event.target.value })}}
            icon='wikipedia'
            iconPosition='left'
            placeholder='Search Wiktionary'
            action={<Button onClick={this.handleSearch} color='teal' icon='search' />}
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
            <h3>{this.state.term}</h3>
            <br />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}
