import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Modal, Responsive, Icon, Popup, Button, Dimmer, Loader, Segment, Container } from 'semantic-ui-react';
import { fetchCourses, fetchMoreCourses, deleteCourses } from './actions';
import CourseItem from '../course-item';

class SearchBar extends Component {
  state = { term: "", openModal: false };

  handleSearch = () => {
    if(this.state.term) {
      this.setState({ openModal: true });
      this.props.deleteCourses();
      this.props.fetchCourses(this.state.term);
    }
  }

  handleCloseModal = () => {
    this.setState({ openModal: false, term: "" });
    this.props.deleteCourses();
  }

  handleClick = () => {
    let { next, course_type } = this.props.searchResults;
    this.props.fetchMoreCourses(next, course_type);
  }

  renderShowMoreButton() {
    if(this.props.searchResults.next) {
      if(this.props.searchResults.loading) {
        return (
          <Segment basic>
            <Dimmer active inverted>
              <Loader />
            </Dimmer>
          </Segment>
        )
      }
      return (
        <Button
          onClick={this.handleClick}
          >
          show more
        </Button>
      )
    }
  }

  renderSearchResults() {
    if(this.props.searchResults.course_type === 'none') {
      return (
        <Dimmer active inverted>
          <Loader >Please Wait</Loader>
        </Dimmer>
      )
    }
    if(this.props.searchResults.results.length) {
      return this.props.searchResults.results.map(course => {
        let { course_type } = this.props.searchResults;
        return <CourseItem course={course} courseType={course_type} fromCourses={false} />
      })
    }
    return (
      <div>no results found</div>
    )
  }

  render() {
    return (
      <div>
        <Responsive minWidth='480'>
          <Form onSubmit={this.handleSearch}>
            <Input
              value={this.state.term}
              icon='search'
              onChange={(event) => {this.setState({ term: event.target.value })}}
              />
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
            <Container text>
              {this.renderSearchResults()}
            </Container>
            <Segment basic textAlign='center'>
              {this.renderShowMoreButton()}
            </Segment>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps({ searchResults }) {
  return { searchResults };
}

export default connect(mapStateToProps, { fetchCourses, fetchMoreCourses, deleteCourses })(SearchBar);
