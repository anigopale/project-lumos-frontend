import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Modal, Responsive, Icon, Popup, Button, Dimmer, Loader, Segment, Container, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { fetchCourses, fetchMoreCourses, deleteCourses } from './actions';
import CourseItem from '../course-item';

class SearchBar extends Component {
  state = { term: "", openModal: false };

  componentWillReceiveProps(nextProps) {
    // if url params changes, close the modal
    let { urlParams } = this.props;
    if(urlParams !== nextProps.urlParams) {
      this.handleCloseModal();
    }
  }

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

  renderTags(tags) {
    return tags.map(tag => {
      return (
        <Label
          as={Link}
          to={tag.url}
          >
          {tag.name}
        </Label>
      )
    })
  }

  renderTagResults(title, tags) {
    if(tags.length) {
      return (
        <div>
          {title}<br />
          {this.renderTags(tags)}
          <br />
        </div>
      )
    }
  }

  renderAllTags() {
    let { domain_tags, language_tags, softskill_tags } = this.props.searchResults;
    return (
      <div>
        {this.renderTagResults('suggested domains:', domain_tags)}
        {this.renderTagResults('suggested languages:', language_tags)}
        {this.renderTagResults('suggested soft skills:', softskill_tags)}
      </div>
    )
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
        return <CourseItem course={course.data} courseType={course.course_type} fromCourses={false} />
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
          <Segment basic>
            <Popup
              trigger={<Icon name='search' />}
              on='click'
              content={
                <Form onSubmit={this.handleSearch}>
                  <Input icon='search' onChange={(event) => {this.setState({ term: event.target.value })}} />
                </Form>
              }
              />
          </Segment>
        </Responsive>

        <Modal
          open={this.state.openModal}
          onClose={this.handleCloseModal}
          >
          <Modal.Header>
            Results for "{this.state.term}":
          </Modal.Header>
          <Modal.Content scrolling>
            <Container text>
              {this.renderSearchResults()}
              {this.renderAllTags()}
            </Container>
            <Segment basic textAlign='center'>
              {this.renderShowMoreButton()}
            </Segment>
          </Modal.Content>
          <Modal.Actions>
           <Button color='blue' onClick={this.handleCloseModal}>
             Close
           </Button>
         </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps({ searchResults }) {
  return { searchResults };
}

export default connect(mapStateToProps, { fetchCourses, fetchMoreCourses, deleteCourses })(SearchBar);
