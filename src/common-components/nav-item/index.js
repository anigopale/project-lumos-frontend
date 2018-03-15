import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledCard = styled.div`
  .my-card {
    border: 5px solid white;
    transition: .2s ease;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    height: 300px;
    width: 100%;
    text-align: center;
    word-wrap: break-word;
    overflow: hidden;
    color: black;



    img {
      transition: 1s ease;
      object-fit: cover;
      height: 80%;
    }
    .nav-name {
      font-weight: 300;
      background-color: white;

    }


    &:hover {
      box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
      transition: .2s ease;
      transform: translate(0% ,0%);
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
            <Image src={this.props.data.icon} alt='' />
            <Card.Content className='nav-name'>
              {this.props.data.name}
            </Card.Content>
          </Card>
          </Link>
      </StyledCard>

    )
  }
}
