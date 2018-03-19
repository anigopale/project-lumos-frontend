import React, { Component } from 'react';
import { Segment, Grid, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class BadRequestPage extends Component {
  render() {
    return (
      <Segment basic textAlign='center' color='teal' inverted>
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
                  <p>Your request resulted in an error</p>
                </Header>
              </p>
              <Button basic inverted as={Link} to='/'>Back to Home</Button>
            </div>
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}
