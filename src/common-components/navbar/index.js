import React, { Component } from 'react';
import { Menu, Header, Input, Segment, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
  render() {
    return (
      <Segment basic inverted color='teal'>
        <Menu fixed='top' size='large' secondary inverted color='teal'>
          <Container>
            <Menu.Item
              >
              <Header as='h2' inverted>
                Project Lumos
              </Header>
            </Menu.Item>
            <Menu.Item
              onClick={()=>{}}
              as={Link}
              to='/'
              >
              Home
            </Menu.Item>
            <Menu.Item
              >
              <Input icon='search' />
            </Menu.Item>
            <Menu.Item
              onClick={()=>{}}
              position='right'
              as={Link}
              to='/signin'
              >
              Sign in
            </Menu.Item>
          </Container>
        </Menu>
      </Segment>
    )
  }
}
