import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Segment, Grid, Header, Button, Divider, Card } from 'semantic-ui-react';
import NavBar from '../../common-components/navbar';

export default class Technical extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Container textAlign='center'>
          <Segment basic>
            <Divider hidden />
            <Header size='huge'>TECHNICAL SKILLS</Header>
            <Divider hidden />
            <Header size='big'>Choose a Category</Header>
            <Divider hidden />
            <Grid columns={2} stackable relaxed>
              <Grid.Row>
                <Grid.Column>

                  <Link to='/technical/domain'>
                    <Card fluid>
                      <Card.Content>
                        <Card.Header>
                          Domain
                        </Card.Header>
                        <Card.Description>
                          Browse courses by domain
                        </Card.Description>
                      </Card.Content>
                    </Card>
                  </Link>
                </Grid.Column>

                <Grid.Column>
                  <Link to='/technical/language'>
                    <Card fluid>
                      <Card.Content>
                        <Card.Header>
                          Language
                        </Card.Header>
                        <Card.Description>
                          Browse courses by language
                        </Card.Description>
                      </Card.Content>
                    </Card>
                  </Link>
                </Grid.Column>
              </Grid.Row>


            </Grid>
          </Segment>
        </Container>
      </div>
    )
  }
}
