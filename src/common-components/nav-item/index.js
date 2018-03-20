import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledCard = styled.div`
  .nav-card {
    transition: .2s ease;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    height: 200px;
    width: 100%;
    text-align: center;
    word-wrap: break-word;
    overflow: hidden;
    font-size: 2em;
    line-height: 1;

    .nav-name {
    }

    .nav-card-head {
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      height: 100%;
      {
        span {
          position: relative;
          top: 40%;
          font-weight: 300;
        }
      }
    }

    &:hover {
      box-shadow: 4px 6px 12px rgba(0, 0, 0, 0.2);
      transition: .2s ease;
      transform: translate(0, -1%);
    }
  }

  @media only screen and (max-width: 480px) {
    .nav-card {
      font-size: 1em;
      height: 100px;
    }
  }
`;

export default class NavItem extends Component {


  render() {
    return (
      <StyledCard>
        <Link to={this.props.coursesPageUrl}>
          <Card
            className='nav-card'
            fluid
            >
            <div className='nav-card-head'>
              <span>
                {this.props.data.name}
              </span>
            </div>

          </Card>
          </Link>
      </StyledCard>

    )
  }
}


// <Card.Content className='nav-name'>
//   {this.props.data.description}
// </Card.Content>
