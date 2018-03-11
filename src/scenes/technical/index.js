import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Segment, Grid, Header, Button, Divider, Card, Breadcrumb } from 'semantic-ui-react';
import NavBar from '../../common-components/navbar';

export default class Technical extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Container>
          <Divider hidden />
          <Breadcrumb>
            <Breadcrumb.Section as={Link} to='/'>Home</Breadcrumb.Section>
            <Breadcrumb.Divider icon='right angle' />
            <Breadcrumb.Section active>Technical Skills</Breadcrumb.Section>
          </Breadcrumb>
        </Container>
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

                  <Link to='/technical/knowledge-base'>
                    <Card fluid>
                      <Card.Content>
                        <Card.Header>
                          Knowledge Base
                        </Card.Header>
                        <Card.Description>
                          Description
                        </Card.Description>
                      </Card.Content>
                    </Card>
                  </Link>
                </Grid.Column>

                <Grid.Column>
                  <Link to='/technical/misc/1/'>
                    <Card fluid>
                      <Card.Content>
                        <Card.Header>
                          Miscellaneous
                        </Card.Header>
                        <Card.Description>
                          Description
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
