import React, { Component } from 'react';
import { Segment, Grid, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class NotFoundPage extends Component {
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
                    404
                  </Header>
                </Header>
                PAGE NOT FOUND
              </p>
              <Button basic inverted as={Link} to='/'>Back to Home</Button>
            </div>
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}
