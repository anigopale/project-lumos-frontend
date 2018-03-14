import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledCard = styled.div`
  .my-card {
    border: 5px solid white;
    transition: .2s ease;
    box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.2);
    height: 200px;
    width: 100%;
    text-align: center;
    word-wrap: break-word;
    overflow: hidden;
    color: black;



    img {
      transition: 1s ease;
      object-fit: cover;
      height: 100%;
      opacity: 0.5;
    }
    .nav-name {
      font-weight: 300;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }


    &:hover {
      box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.2);
      transition: .2s ease;
      transform: translate(0% ,-2%);
      img {
        transform: scale(1.15);
        transition: 1s ease;
      }
    }
  }

  @media only screen and (max-width: 600px) {
    .my-card {
      height: 100px;

      .nav-name {
        transition: .5s ease;
        font-weight: 300;
        position: absolute;
        top: 25%;
        left: 50%;
        transform: translate(-%, -50%);
        font-size: 1em;
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
            <h2 className='nav-name'>
              {this.props.data.name}
            </h2>
          </Card>
          </Link>
      </StyledCard>

    )
  }
}
