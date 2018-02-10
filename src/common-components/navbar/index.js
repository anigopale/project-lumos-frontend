import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
  render() {
    return (
      <Menu secondary>
        <Menu.Item
          onClick={()=>{}}
          >
          <Link to='/'>
            Home
          </Link>
        </Menu.Item>
        <Menu.Item
          position='right'
          onClick={()=>{}}
          >
          <Link to='/signin'>
            Sign in
          </Link>
        </Menu.Item>
      </Menu>
    )
  }
}
