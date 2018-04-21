import React, { Component } from 'react';
import { Breadcrumb, Container, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import NavBar from '../../common-components/navbar';
import Domains from '../../navigation/domains';
import FeedbackForm from '../../common-components/feedback-form';

export default class DomainPage extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Container>
          <Divider hidden />
          <Breadcrumb>
            <Breadcrumb.Section as='a' href='https://www.projectlumos.pw'>Home</Breadcrumb.Section>
            <Breadcrumb.Divider icon='right angle' />
            <Breadcrumb.Section as={Link} to='/technical'>Technical Skills</Breadcrumb.Section>
            <Breadcrumb.Divider icon='right angle' />
            <Breadcrumb.Section active>Domains</Breadcrumb.Section>
          </Breadcrumb>
        </Container>
        <Domains {...this.props} />
        <FeedbackForm />
      </div>
    )
  }
}
