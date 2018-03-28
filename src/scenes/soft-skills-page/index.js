import React, { Component } from 'react';
import { Breadcrumb, Container, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import NavBar from '../../common-components/navbar';
import SoftSkills from '../../navigation/soft-skills';
import FeedbackForm from '../../common-components/feedback-form';

export default class SoftSkillsPage extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Container>
          <Divider hidden />
          <Breadcrumb>
            <Breadcrumb.Section as={Link} to='/'>Home</Breadcrumb.Section>
            <Breadcrumb.Divider icon='right angle' />
            <Breadcrumb.Section active>Soft Skills</Breadcrumb.Section>
          </Breadcrumb>
        </Container>
        <SoftSkills {...this.props} />
        <FeedbackForm />
      </div>
    )
  }
}
