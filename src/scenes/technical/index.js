import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Segment, Grid, Header, Button, Divider } from 'semantic-ui-react';
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
            <Grid columns={2} stackable>
              <Grid.Row>
                <Grid.Column>
                  <Segment size='huge' raised>
                  <Header>Domain</Header>
                  <p>..meta.. description</p>
                    <Link to='/technical/domain'>
                      <Button basic fluid color='teal'>
                        Select
                      </Button>
                    </Link>
                    </Segment>
                </Grid.Column>

                <Grid.Column>
                  <Segment size='huge' raised>
                  <Header>Language</Header>
                  <p>..meta.. description</p>
                    <Link to='/technical/language'>
                      <Button basic fluid color='teal'>
                        Select
                      </Button>
                    </Link>
                    </Segment>
                </Grid.Column>
              </Grid.Row>


            </Grid>
          </Segment>
        </Container>
      </div>
    )
  }
}
