import React, { Component } from 'react';
import { Slider } from 'react-semantic-ui-range';
import { Modal, Button } from 'semantic-ui-react';

export default class Feedback extends Component {
  state = { openModal: false, attr1: 0, attr3: 0, attr2: 0, attr4: 0 };

  attributes = [
    {
      name: 'Attribute 1',
      state: 'attr1'
    },
    {
      name: 'Attribute 2',
      state: 'attr2'
    },
    {
      name: 'Attribute 3',
      state: 'attr3'
    },
    {
      name: 'Attribute 4',
      state: 'attr4'
    },
  ];

  handleCloseModal = () => {
    this.setState({ openModal: false });
  }

  handleOpenModal = () => {
    this.setState({ openModal: true });
  }
  renderFeedbackSliders() {
    return this.attributes.map((attribute, index) => {
      return (
        <div>
          {attribute.name}: {this.state[attribute.state]}
          <Slider settings={{
            start: 0,
            min:0,
             max:5,
             step:1,
             onChange: (value) => {
               this.setState({[attribute.state]: value})
             }
            }} />
          <br />
        </div>
      )
    })
  }

  render() {
    return [
        <Button floated='right' onClick={this.handleOpenModal}>Feedback</Button>,
          <Modal
            open={this.state.openModal}
            onClose={this.handleCloseModal}
            >
            <Modal.Header>
              Feedback
            </Modal.Header>
            <Modal.Content>
              {this.renderFeedbackSliders()}
            </Modal.Content>
            <Modal.Actions>
             <Button color='blue' onClick={this.handleCloseModal}>
               Close
             </Button>
           </Modal.Actions>
          </Modal>
    ]
  }
}
