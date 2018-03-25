import React, { Component } from 'react';
import { Segment, Grid, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledBadRequest = styled.div`
  color: #00AA8D;

  .header {
    color: #00AA8D !important;
  }
  a {
    color: #F5F5F5 !important;
    background-color: #00AA8D !important;
    border: 1px solid #00AA8D !important;


    &:hover {
      border: 1px solid #00AA8D !important;
      color: #00AA8D !important;
      background-color: #F5F5F5 !important;
    }
  }
`;

export default class BadRequestPage extends Component {
  render() {
    return (
      <StyledBadRequest>
        <Segment textAlign='center' basic>
          <Grid
            columns={1}
            textAlign='center'
            verticalAlign='middle'
            style={{ height: '100vh' }}
            >
            <Grid.Column>
              <div>
                <p>
                  <Header inverted>
                    <Header style={{ fontSize: '10em' }} sub>
                      400
                    </Header>
                    <Header style={{ fontSize: '2em' }} sub>
                      BAD REQUEST
                    </Header>
                    <br />
                    <Header sub>Your request resulted in an error</Header>
                  </Header>
                </p>
                <Button as='a' href='http://www.projectlumos.pw'>Back to Home</Button>
              </div>
            </Grid.Column>
          </Grid>
        </Segment>
      </StyledBadRequest>
    )
  }
}
