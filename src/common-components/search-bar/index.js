import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Modal, Responsive, Icon, Popup } from 'semantic-ui-react';
import { fetchCourses } from './actions';
import CourseItem from '../course-item';

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

  renderSearchResults() {
    if(this.props.searchResults.results.length) {
      return this.props.searchResults.results.map(course => {
        let { course_type } = this.props.searchResults;
        return <CourseItem course={course} courseType={course_type} />
      })
    }
  }

  render() {
    console.log(this.props.searchResults);
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
            {this.renderSearchResults()}
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps({ searchResults }) {
  console.log(searchResults);
  return { searchResults };
}

export default connect(mapStateToProps, { fetchCourses })(SearchBar);
