import React, { Component } from 'react';
import { Grid, Form, Segment, Menu, Button } from 'semantic-ui-react';

export default class Signin extends Component {
  state = { login: true };

  selectLogin = () => {
    this.setState({ login: true })
  }
  selectSignup = () => {
    this.setState({ login: false })
  }


  renderForm() {
    if(this.state.login) {
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
      <Segment basic inverted color='teal'>
        <Grid
          textAlign='center'
          verticalAlign='middle'
          style={{ height: '100vh' }}
          >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form size='large'>
              <Segment raised style={{ minHeight: 400 }}>
                <Menu fluid widths={2} secondary pointing>
                  <Menu.Item
                    onClick={this.selectLogin}
                    active={this.state.login}
                    >
                    Log in
                  </Menu.Item>
                  <Menu.Item
                    onClick={this.selectSignup}
                    active={!this.state.login}
                    >
                    Sign up
                  </Menu.Item>
                </Menu>
                {this.renderForm()}
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}
