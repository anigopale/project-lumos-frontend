import React, { Component } from 'react';
import { Menu, Header, Segment, Container, Icon, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import SearchBar from '../search-bar';
import styled from 'styled-components';
import { SITE_PRIMARY, NAVBAR_COLOR_2 } from '../../common-services/color-palette';

const StyledHamburger = styled.div`
  .styled-menu {
    background: linear-gradient(135deg, ${SITE_PRIMARY} 0%, ${NAVBAR_COLOR_2} 100%) !important;
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
              href='https://par010.github.io/project-lumos/'
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
