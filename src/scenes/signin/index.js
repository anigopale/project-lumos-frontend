import React, { Component } from 'react';
import { Grid, Form, Segment, Menu, Button } from 'semantic-ui-react';

export default class Signin extends Component {
  state={ selected: 'login' };

  renderForm() {
    if(this.state.selected === 'login') {
      return (
        <div>
          <Form.Input
            fluid
            icon='user'
            iconPosition='left'
            placeholder='Username'
          />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
          />
          <Button fluid>Login</Button>
        </div>
      )
    }

    return (
      <div>
        <Form.Input
          fluid
          placeholder='Username'
        />
        <Form.Input
          fluid
          placeholder='E-mail address'
        />
        <Form.Input
          fluid
          placeholder='Password'
          type='password'
        />
        <Form.Input
          fluid
          placeholder='Confirm password'
          type='password'
        />
        <Button fluid>Signup</Button>
      </div>
    )

  }

  render() {
    return (
      <div>
        <Grid textAlign='center' verticalAlign='middle' style={{ height: '100vh' }}>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form size='large'>
              <Segment basic style={{ minHeight: 400 }}>
                <Menu secondary>
                  <Menu.Item onClick={()=>this.setState({ selected: 'login'})}>Log in</Menu.Item>
                  <Menu.Item onClick={()=>this.setState({ selected: 'signup'})}>Sign up</Menu.Item>
                </Menu>
                {this.renderForm()}
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
