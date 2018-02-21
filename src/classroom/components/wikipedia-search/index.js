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
  Container,
  List
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
    this.setState({ openModal: false, term: "" });
    this.props.emptyReducer();
  }

  linkSearch = (term) => {
    this.setState({ term })
    this.props.emptyReducer();
    this.props.wikipediaSearch(term);
  }

  renderLinks(links, related) {
    return Object.keys(links).map((key => {
      return (
        <List.Item onClick={() => {this.linkSearch(key)}} as='a'>
          <List.Icon name='search' />
          <List.Content>{key}</List.Content>
        </List.Item>
      )
    }))
  }

  renderContent() {
    if(this.props.wikipediaData.error) {
      return (
        <div>{this.props.wikipediaData.error}</div>
      )
    }

    if(this.props.wikipediaData.wiki_term) {
      let { related_terms } = this.props.wikipediaData;
      if(this.props.wikipediaData.detailed_data) {
        let { title, url } = this.props.wikipediaData.detailed_data;
        let { summary_content } = this.props.wikipediaData.summary_data;
        return (
          <div>
            <Header>{title}</Header>
            <p style={{ textAlign: 'justify' }}>
              {summary_content}
            </p>
            <a href={url}>
              [Full Article
              <Icon name='external' />]
            </a>
            <Header>Related:</Header>
            <List>
              {this.renderLinks(related_terms, true)}
            </List>
          </div>
        )
      }
      return (
        <div>
          <h3>{`Search: ${this.state.term}`}</h3>
          <Divider />
          <Header>Disambiguation:</Header>
          <List>
            {this.renderLinks(this.props.wikipediaData.summary_data.other_links)}
          </List>
          <Divider hidden />
          <Header>Related:</Header>
          <List>
            {this.renderLinks(related_terms, true)}
          </List>
        </div>
      )
    }


    return (
      <Dimmer active inverted>
        <Loader />
      </Dimmer>
    )
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
                {this.renderContent()}
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
