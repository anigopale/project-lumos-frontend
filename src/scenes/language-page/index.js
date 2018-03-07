import React, { Component } from 'react';
import { Breadcrumb, Container, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import NavBar from '../../common-components/navbar';
import Languages from '../../navigation/languages';

export default class LanguagePage extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Container>
          <Divider hidden />
          <Breadcrumb>
            <Breadcrumb.Section as={Link} to='/'>Home</Breadcrumb.Section>
            <Breadcrumb.Divider icon='right angle' />
            <Breadcrumb.Section as={Link} to='/technical'>Technical Skills</Breadcrumb.Section>
            <Breadcrumb.Divider icon='right angle' />
            <Breadcrumb.Section as={Link} to='/technical/knowledge-base'>Knowledge Base</Breadcrumb.Section>
            <Breadcrumb.Divider icon='right angle' />
            <Breadcrumb.Section active>Languages</Breadcrumb.Section>
          </Breadcrumb>
        </Container>
        <Languages />
      </div>
    )
  }
}
