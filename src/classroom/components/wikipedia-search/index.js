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
  Dimmer,
  Divider,
  Container
} from 'semantic-ui-react';
import { wikipediaSearch, emptyReducer } from './actions';

class Wikipedia extends Component {
  state = { term: "", openModal: false };

  handleSearch = () => {
    if(this.state.term) {
      this.props.wikipediaSearch(this.state.term);
      this.setState({ openModal: true });
    }
  }
  handleCloseModal = () => {
    this.setState({ openModal: false });
    this.props.emptyReducer();
  }



  render() {
    console.log(this.props.wikipediaData);
    return (
      <div>
        <Form onSubmit={this.handleSearch}>
          <Input
            onChange={(event) => {this.setState({ term: event.target.value })}}
            icon='wikipedia'
            iconPosition='left'
            placeholder='Search Wikipedia'
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
                  Wikipedia
                </Header>
            </Container>
            </Modal.Header>
            <Modal.Content>
              <Container text>
                <h3>{`Search: ${this.state.term}`}</h3>
                <Divider />

              </Container>
            </Modal.Content>
          </Modal>
      </div>
    )
  }
}

function mapStateToProps({ wikipediaData }) {
  return { wikipediaData };
}

export default connect(mapStateToProps, { wikipediaSearch, emptyReducer })(Wikipedia);
