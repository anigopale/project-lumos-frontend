import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Segment, Grid, Header, Button, Divider, Card, Breadcrumb } from 'semantic-ui-react';
import NavBar from '../../common-components/navbar';
import styled from 'styled-components';

const StyledTechnical = styled.div`

  .technical-card {
    transition: .2s ease;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    img {
      height: 250px;
      object-fit: cover;
    }

    &:hover {
      transition: .2s ease;
      box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
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
            <Divider hidden />
            <Header size='huge'>TECHNICAL SKILLS</Header>
            <Divider hidden />
            <Header size='big'>Choose a Category</Header>
            <Divider hidden />
            <Grid columns={3} stackable relaxed>
              <Grid.Row>
                <Grid.Column>

                  <Link to='/technical/domains'>
                    <Card fluid className='technical-card'>
                      <img src='http://techcity.com/wp-content/uploads/2015/09/tech-support_tech-city-new-york-services2.jpg' />
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
                  <Link to='/technical/languages'>
                    <Card fluid className='technical-card'>
                      <img src='https://az616578.vo.msecnd.net/files/2016/10/31/636135297934836257-753844635_cs.jpg' />
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

                <Grid.Column>
                  <Link to='/technical/misc/'>
                    <Card fluid className='technical-card'>
                      <img src='https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2016/04/Computer_Science_2-796x401.jpg' />
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
      </StyledTechnical>
    )
  }
}
