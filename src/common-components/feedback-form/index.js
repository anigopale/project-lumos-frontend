import React, { Component } from 'react';
import { Modal, Button, Popup, Form } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledFeedbackForm = styled.div`
  .fixed-feedback-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 2 !important;
  }
`;

export default class FeedbackForm extends Component {

  state = { openModdal: false };

  handleCloseModal = () => {
    this.setState({ openModal: false });
  }

  handleOpenModal = () => {
    this.setState({ openModal: true });
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

        <Modal
          open={this.state.openModal}
          onClose={this.handleCloseModal}
          >
          <Modal.Header>
            Feedback
          </Modal.Header>
          <Modal.Content>
            <Form>
              <Form.TextArea label='your feedback' placeholder='' />
              <Form.Button>Submit</Form.Button>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color='blue' onClick={this.handleCloseModal}>
              Close
            </Button>
         </Modal.Actions>
        </Modal>
      </StyledFeedbackForm>
    )
  }
}
