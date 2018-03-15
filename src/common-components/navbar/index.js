import React, { Component } from 'react';
import { Menu, Header, Segment, Container, Icon, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import SearchBar from '../search-bar';
import styled from 'styled-components';

const StyledHamburger = styled.div`
  .hamburger {
    display: none !important;
  }
@media only screen and (max-width: 600px) {
  .hamburger {
    display: block !important;
  }
}
`;

export default class NavBar extends Component {
  state = { sidebar: false };

  toggleSideBar = () => {
    this.props.getSideBar(!this.state.sidebar);
    this.setState({ sidebar: !this.state.sidebar });
    if(!this.state.sidebar)
      document.body.style = 'overflow-y: hidden';
    else
      document.body.style = 'overflow-y: auto';
  }

  renderHamburgerButton() {
    let iconName = 'sidebar';
    if(this.props.hamburger) {
      if(this.state.sidebar)
        iconName = 'left arrow'
      return (
        <Menu.Item
          className='hamburger'
          onClick={this.toggleSideBar}
          >
          <Icon name={iconName} />
        </Menu.Item>
      )
    }
  }

  render() {
    return (
      <StyledHamburger>
        <Segment>
          <Menu fixed='top' secondary inverted color='teal'>
            <Container>
              {this.renderHamburgerButton()}
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
      </StyledHamburger>
    )
  }
}
