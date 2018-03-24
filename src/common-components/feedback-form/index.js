import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Popup, Form, Segment, Transition } from 'semantic-ui-react';
import styled from 'styled-components';
import { postFeedback } from './actions';

const StyledFeedbackForm = styled.div`
  .fixed-feedback-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 2 !important;
  }
`;

class FeedbackForm extends Component {

  state = { openModal: false, text: '', posted: false };

  handleCloseModal = () => {
    this.setState({ openModal: false, posted: false, text: '' });
  }

  handleOpenModal = () => {
    this.setState({ openModal: true });
  }

  handleSubmit = () => {
    let { text } = this.state;
    if(text) {
      this.setState({ posted: true });
      this.props.postFeedback(text);
    }
  }

  renderModalBody() {
    if(this.state.posted) {
      return (
        <Segment basic textAlign='center'>
          <h1>
            thank you for your feedback
          </h1>
        </Segment>
      )
    }
    return [
      <Modal.Header>
        Feedback
      </Modal.Header>,
      <Modal.Content>
        <Form>
          <Form.TextArea
            label='your feedback'
            onChange={(event) => this.setState({ text: event.target.value })}
            value={this.state.text}
            />
          <Form.Button onClick={this.handleSubmit}>Submit</Form.Button>
        </Form>
      </Modal.Content>,
      <Modal.Actions>
        <Button color='blue' onClick={this.handleCloseModal}>
          Close
        </Button>
     </Modal.Actions>
    ]
  }

  render() {
    return (
      <StyledFeedbackForm>
        <Popup
          trigger={
            <Button
              basic
              circular
              icon='talk'
              size='big'
              className='fixed-feedback-button'
              onClick={this.handleOpenModal}
              />
          }
          content='give us your feedback'
          position='left'
          basic
          />
        <Transition visible={this.state.openModal} animation='fade down' duration={500}>
          <Modal
            basic={this.state.posted}
            open={this.state.openModal}
            onClose={this.handleCloseModal}
            >
            {this.renderModalBody()}
          </Modal>
        </Transition>
      </StyledFeedbackForm>
    )
  }
}

export default connect(null, { postFeedback })(FeedbackForm);
