import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Segment, Transition } from 'semantic-ui-react';
import { postRating } from './actions';
import styled from 'styled-components';

const StyledRange = styled.div`
input[type=range] {
height: 25px;
-webkit-appearance: none;
margin: 10px 0;
width: 100%;
}
input[type=range]:focus {
outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
width: 100%;
height: 5px;
cursor: pointer;
animate: 0.2s;
box-shadow: 0px 0px 0px #000000;
background: grey;
border-radius: 1px;
border: 0px solid #000000;
}
input[type=range]::-webkit-slider-thumb {
box-shadow: 0px 0px 0px #000000;
border: 1px solid #00AA8D;
height: 18px;
width: 18px;
border-radius: 25px;
background: white;
cursor: pointer;
-webkit-appearance: none;
margin-top: -7px;
}
input[type=range]:focus::-webkit-slider-runnable-track {
background: #00AA8D;
}
input[type=range]::-moz-range-track {
width: 100%;
height: 5px;
cursor: pointer;
animate: 0.2s;
box-shadow: 0px 0px 0px #000000;
background: #2497E3;
border-radius: 1px;
border: 0px solid #000000;
}
input[type=range]::-moz-range-thumb {
box-shadow: 0px 0px 0px #000000;
border: 1px solid #2497E3;
height: 18px;
width: 18px;
border-radius: 25px;
background: #A1D0FF;
cursor: pointer;
}
input[type=range]::-ms-track {
width: 100%;
height: 5px;
cursor: pointer;
animate: 0.2s;
background: transparent;
border-color: transparent;
color: transparent;
}
input[type=range]::-ms-fill-lower {
background: #2497E3;
border: 0px solid #000000;
border-radius: 2px;
box-shadow: 0px 0px 0px #000000;
}
input[type=range]::-ms-fill-upper {
background: #2497E3;
border: 0px solid #000000;
border-radius: 2px;
box-shadow: 0px 0px 0px #000000;
}
input[type=range]::-ms-thumb {
margin-top: 1px;
box-shadow: 0px 0px 0px #000000;
border: 1px solid #2497E3;
height: 18px;
width: 18px;
border-radius: 25px;
background: #A1D0FF;
cursor: pointer;
}
input[type=range]:focus::-ms-fill-lower {
background: #2497E3;
}
input[type=range]:focus::-ms-fill-upper {
background: #2497E3;
}
`;

class Feedback extends Component {
  state = { openModal: false, rated: false, attribute_1: 1, attribute_2: 1, attribute_3: 1, attribute_4: 1 };

  attributes = [
    {
      name: 'Attribute 1',
      state: 'attribute_1'
    },
    {
      name: 'Attribute 2',
      state: 'attribute_2'
    },
    {
      name: 'Attribute 3',
      state: 'attribute_3'
    },
    {
      name: 'Attribute 4',
      state: 'attribute_4'
    },
  ];

  handleSubmit = () => {
    let { attribute_1, attribute_2, attribute_3, attribute_4 } = this.state;
    let { course_type, course_id } = this.props.urlParams;
    let { path } = this.props;

    this.setState({ rated: true });
    this.props.postRating(course_id, course_type, { attribute_1, attribute_2, attribute_3, attribute_4 }, path);
  }

  handleCloseModal = () => {
    this.setState({ openModal: false, attribute_1: 1, attribute_2: 1, attribute_3: 1, attribute_4: 1, rated: false  });
  }

  handleOpenModal = () => {
    this.setState({ openModal: true });
  }
  renderFeedbackSliders() {
    if(this.state.rated) {
      return (
        <div>thank you for rating</div>
      )
    }
    return this.attributes.map((attribute, index) => {
      return (
        <StyledRange>
          {attribute.name}: {this.state[attribute.state]}
          <input
            type='range'
            min={1}
            max={5}
            step={1}
            onChange={(event) => {this.setState({ [attribute.state]: event.target.value })}}
            value={this.state[attribute.state]}
            />
          <br />
        </StyledRange>
      )
    })
  }

  renderModalBody() {
    if(this.state.rated) {
      return (
        <Segment basic textAlign='center'>
          <h1>
            thank you for rating
          </h1>
        </Segment>
      )
    }

    return [
      <Modal.Header>
        {this.props.courseTitle}
      </Modal.Header>,
      <Modal.Content>
        {this.renderFeedbackSliders()}
      </Modal.Content>,
      <Modal.Actions>
        <Button onClick={this.handleCloseModal}>
          Close
        </Button>
        <Button color='green' onClick={this.handleSubmit}>Submit</Button>
     </Modal.Actions>
    ]
  }

  render() {
    return [
        <Button floated='right' onClick={this.handleOpenModal}>Rate</Button>,
        <Transition visible={this.state.openModal} animation='fade down' duration={500}>
          <Modal
            basic={this.state.rated}
            open={this.state.openModal}
            onClose={this.handleCloseModal}
            >
            {this.renderModalBody()}
          </Modal>
        </Transition>
    ]
  }
}


export default connect(null, { postRating })(Feedback);
