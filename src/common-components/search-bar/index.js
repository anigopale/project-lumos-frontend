import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Modal, Responsive, Icon, Popup } from 'semantic-ui-react';
import { fetchCourses } from './actions';

class SearchBar extends Component {
  state = { term: "", openModal: false };

  handleSearch = () => {
    if(this.state.term) {
      this.setState({ openModal: true });
      this.props.fetchCourses(this.state.term);
    }
  }

  handleCloseModal = () => {
    this.setState({ openModal: false, term: "" });
  }

  render() {
    return (
      <div>
        <Responsive minWidth='480'>
          <Form onSubmit={this.handleSearch}>
            <Input icon='search' onChange={(event) => {this.setState({ term: event.target.value })}} />
          </Form>
        </Responsive>
        <Responsive maxWidth='480'>
          <Popup
            trigger={<Icon name='search' />}
            on='click'
            content={
              <Form onSubmit={this.handleSearch}>
                <Input icon='search' onChange={(event) => {this.setState({ term: event.target.value })}} />
              </Form>
            }
            />
        </Responsive>

        <Modal
          open={this.state.openModal}
          onClose={this.handleCloseModal}
          >
          <Modal.Header>
            Results for "{this.state.term}":
          </Modal.Header>
          <Modal.Content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br /> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default connect(null, { fetchCourses })(SearchBar);
