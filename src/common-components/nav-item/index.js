import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';

export default class NavItem extends Component {
  render() {
    return (
      
        <Card
          as={Link}
          to={this.props.coursesPageUrl}
          fluid
          >
          <Image src={this.props.data.icon} alt='' />
          <Card.Content extra>
            {this.props.data.name}
          </Card.Content>
        </Card>

    )
  }
}
