import React, { Component } from 'react';
import { Menu, Header, Segment, Container, Icon, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import SearchBar from '../search-bar';
import styled from 'styled-components';

const StyledHamburger = styled.div`
  .styled-menu {
    background: linear-gradient(135deg, #00AA8D 0%, #009194 100%) !important;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2) !important;
  }

  .hamburger {
    display: none !important;
  }
  @media only screen and (max-width: 768px) {
    .hamburger {
      display: block !important;
    }
}
`;

export default class NavBar extends Component {

  toggleSideBar = () => {
    this.props.getSideBar(true);
    document.body.style = 'overflow-y: hidden';
  }

  renderHamburgerButton() {
    if(this.props.hamburger) {
      return (
        <Menu.Item
          className='hamburger'
          onClick={this.toggleSideBar}
          >
          <Icon name='sidebar' />
        </Menu.Item>
      )
    }

  }

  render() {
    return (
      <StyledHamburger>
        <Segment>
          <Menu fixed='top' secondary inverted className='styled-menu'>
            {this.renderHamburgerButton()}
            <Menu.Item
              as='a'
              href='https://www.projectlumos.pw'
              >
              <Header as='h3' inverted>
                PROJECT LUMOS
              </Header>
            </Menu.Item>
            <Menu.Item
              position='right'
              >
              <SearchBar urlParams={this.props.urlParams} />
            </Menu.Item>
          </Menu>
        </Segment>
        <Divider hidden />
      </StyledHamburger>
    )
  }
}
