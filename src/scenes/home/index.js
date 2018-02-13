import React, { Component } from 'react';
import Nav from '../../common-components/navbar';
import { Card, Container, Header, Segment, Grid, Button } from 'semantic-ui-react';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Segment basic inverted color='teal'>
          <Grid
            textAlign='center'
            verticalAlign='middle'
            style={{ height: '100vh' }}
            >
            <Grid.Column color='teal'>
              <Segment basic size='massive'>
                <Header textAlign='center' size='huge' inverted>
                  Welcome to Project Lumos
                </Header>
              </Segment>
            </Grid.Column>
          </Grid>
        </Segment>


        <Container>
          <Grid columns={2}>

            <Grid.Column>

              <Card fluid>
                <Card.Content>
                  <Card.Header as='h1'>
                    Technical Skills
                  </Card.Header>
                  <Card.Description>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </Card.Description>
                  <Card.Content extra>
                    <div>
                      <Button floated='right' basic color='teal'>Select</Button>
                    </div>
                  </Card.Content>
                </Card.Content>
              </Card>

            </Grid.Column>

            <Grid.Column>

              <Card fluid>
                <Card.Content>
                  <Card.Header as='h1'>
                    Soft Skills
                  </Card.Header>
                  <Card.Description>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </Card.Description>
                  <Card.Content extra>
                    <div>
                      <Button floated='right' basic color='teal'>Select</Button>
                    </div>
                  </Card.Content>
                </Card.Content>
              </Card>

            </Grid.Column>

          </Grid>


        </Container>
      </div>
    )
  }
}
