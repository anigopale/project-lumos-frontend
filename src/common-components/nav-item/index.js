import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledCard = styled.div`
  .my-card {
    transition: .2s ease;
    box-shadow: 4px 6px 12px rgba(0, 0, 0, 0.2);

    width: 100%;
    text-align: center;
    word-wrap: break-word;
    overflow: hidden;
    color: black;
    padding: 50px;

    img {
      transition: 1s ease;
      object-fit: cover;
      height: 80%;
    }
    .nav-name {
    }


    &:hover {
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
      transition: .2s ease;
      transform: translate(0, 2%);
      img {
        transition: 1s ease;
      }
    }
  }

  @media only screen and (max-width: 600px) {
    .my-card {
      height: 250px;
      font-size: 10px;

      .nav-name {
        background-color: white;
      }
    }
  }
`;

export default class NavItem extends Component {


  render() {
    return (
      <StyledCard>
        <Link to={this.props.coursesPageUrl}>
          <Card
            className='my-card'
            fluid
            >
            <Card.Content className='nav-name'>
              {this.props.data.name}
            </Card.Content>
          </Card>
          </Link>
      </StyledCard>

    )
  }
}
