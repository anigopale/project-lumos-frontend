import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Segment, Grid, Header, Button, Divider, Card, Breadcrumb } from 'semantic-ui-react';
import NavBar from '../../common-components/navbar';
import styled from 'styled-components';

const StyledTechnical = styled.div`

  .technical-card {
    transition: .2s ease;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    img {
      height: 250px;
      object-fit: cover;
    }

    &:hover {
      transition: .2s ease;
      box-shadow: 4px 6px 12px rgba(0, 0, 0, 0.2);
      transform: translate(0, -1%);
    }
  }
`;

export default class Technical extends Component {
  render() {
    return (
      <StyledTechnical>
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
            <Header size='huge'>TECHNICAL SKILLS</Header>
            <Divider hidden />
            <Divider hidden />
            <Grid columns={3} stackable relaxed>
              <Grid.Row>
                <Grid.Column>

                  <Link to='/technical/domains'>
                    <Card fluid className='technical-card'>
                      <img src='https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?w=940&h=650&auto=compress&cs=tinysrgb' />
                      <Card.Content>
                        <Card.Header>
                          Domains
                        </Card.Header>
                      </Card.Content>
                    </Card>
                  </Link>
                </Grid.Column>

                <Grid.Column>
                  <Link to='/technical/languages'>
                    <Card fluid className='technical-card'>
                      <img src='https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e5a31d03ddee66863a599421f792e07b&w=1000&q=80' />
                      <Card.Content>
                        <Card.Header>
                          Languages
                        </Card.Header>
                      </Card.Content>
                    </Card>
                  </Link>
                </Grid.Column>

                <Grid.Column>
                  <Link to='/technical/misc/'>
                    <Card fluid className='technical-card'>
                      <img src='https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?w=940&h=650&auto=compress&cs=tinysrgb' />
                      <Card.Content>
                        <Card.Header>
                          Miscellaneous
                        </Card.Header>
                      </Card.Content>
                    </Card>
                  </Link>
                </Grid.Column>
              </Grid.Row>


            </Grid>
          </Segment>
        </Container>
      </StyledTechnical>
    )
  }
}
