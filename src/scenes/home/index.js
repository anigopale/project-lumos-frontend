import React, { Component } from 'react';
import Nav from '../../common-components/navbar';
import { Link } from 'react-router-dom';
import { Card, Container, Header, Segment, Grid, Button, Divider } from 'semantic-ui-react';

export default class Home extends Component {
  componentWillMount() {
    window.location = 'https://www.projectlumos.pw';
  }

  render() {
    return (
      <div></div>
    )
  }
}
// <div>
//   <Nav />
//   <Segment basic inverted color='teal'>
//     <Grid
//       textAlign='center'
//       verticalAlign='middle'
//       style={{ height: '30em' }}
//       >
//       <Grid.Column color='teal'>
//         <Segment basic size='massive'>
//           <Header textAlign='center' size='small' inverted>
//             Welcome to
//           </Header>
//           <Header textAlign='center' size='huge' inverted>
//             Project Lumos
//           </Header>
//         </Segment>
//       </Grid.Column>
//     </Grid>
//   </Segment>
//
//
//   <Container>
//     <Divider hidden />
//     <Header as='h1'>
//       Choose a path
//     </Header>
//     <Divider hidden />
//     <Grid columns={2} stackable>
//       <Grid.Column>
//
//         <Link to ='/technical'>
//           <Card fluid>
//             <Card.Content>
//               <Card.Header as='h1'>
//                 Technical Skills
//               </Card.Header>
//               <Card.Description>
//                 Description:
//                 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
//               </Card.Description>
//
//             </Card.Content>
//           </Card>
//         </Link>
//
//       </Grid.Column>
//
//       <Grid.Column>
//
//         <Link to ='/soft-skills'>
//           <Card fluid>
//             <Card.Content>
//               <Card.Header as='h1'>
//                 Soft Skills
//               </Card.Header>
//               <Card.Description>
//                 Description:
//                 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
//               </Card.Description>
//             </Card.Content>
//           </Card>
//         </Link>
//
//       </Grid.Column>
//
//     </Grid>
//
//
//   </Container>
// </div>
