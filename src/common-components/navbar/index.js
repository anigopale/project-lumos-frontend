import React, { Component } from 'react';
import { Menu, Header, Segment, Container, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import SearchBar from '../search-bar';

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <Segment>
          <Menu fixed='top' size='large' secondary inverted color='teal'>
            <Container>
              <Menu.Item
                as={Link}
                to='/'
                >
                <Header as='h2' inverted>
                  Project Lumos
                </Header>
              </Menu.Item>
              <Menu.Item
                position='right'
                >
                <SearchBar />
              </Menu.Item>
            </Container>
          </Menu>
        </Segment>
        <Divider hidden />
      </div>
    )
  }
}
