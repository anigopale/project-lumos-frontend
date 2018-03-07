import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Segment, Grid, Header, Button, Divider, Card, Breadcrumb } from 'semantic-ui-react';
import NavBar from '../../common-components/navbar';

export default class KnowledgeBase extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Container>
          <Divider hidden />
          <Breadcrumb>
            <Breadcrumb.Section as={Link} to='/'>Home</Breadcrumb.Section>
            <Breadcrumb.Divider icon='right angle' />
            <Breadcrumb.Section as={Link} to='/technical'>Technical Skills</Breadcrumb.Section>
            <Breadcrumb.Divider icon='right angle' />
            <Breadcrumb.Section active>Knowledge Base</Breadcrumb.Section>
          </Breadcrumb>
        </Container>

        <Container textAlign='center'>
          <Segment basic>
            <Divider hidden />
            <Header size='huge'>KNOWLEDGE BASE</Header>
            <Divider hidden />
            <Header size='big'>Choose a Category</Header>
            <Divider hidden />
            <Grid columns={2} stackable relaxed>
              <Grid.Row>
                <Grid.Column>

                  <Link to='/technical/knowledge-base/domains'>
                    <Card fluid>
                      <Card.Content>
                        <Card.Header>
                          Domains
                        </Card.Header>
                        <Card.Description>
                          Browse courses by domain
                        </Card.Description>
                      </Card.Content>
                    </Card>
                  </Link>
                </Grid.Column>

                <Grid.Column>
                  <Link to='/technical/knowledge-base/languages'>
                    <Card fluid>
                      <Card.Content>
                        <Card.Header>
                          Languages
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
