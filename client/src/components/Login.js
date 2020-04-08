import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import "../styles/Login.css"

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $username: String!) {
    signup(email: $email, password: $password, username: $username) {
      path
      message
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      path
      message
    }
  }
`

class Login extends Component {
  state = {
    login: true, // switch between Login and SignUp
    email: '',
    password: '',
    username: '',
    error: '',
  }

  
  render() {
    const { login, email, password, username } = this.state
    return (
      <div>
        <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
        <div className="flex flex-column">
          <div id="error_box"></div>
          <input
            value={username}
            onChange={e => this.setState({ username: e.target.value })}
            type="text"
            placeholder="Your username"
          />
          {!login && (
            <input
              value={email}
              onChange={e => this.setState({ email: e.target.value })}
              type="text"
              placeholder="Your email address"
            />
          )}
          <input
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Choose a safe password"
          />
        </div>
        <div className="flex mt3">
        <Mutation
    mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
    variables={{ email, password, username }}
    onCompleted={login ? data => this._handleLogIn(data) : data => this._handleSignUp(data)}
    onError={error => this.setState({error: "Error"})}
    >
    {mutation => (
      <div className="pointer mr2 button" onClick={mutation}>
        {login ? 'login' : 'create account'}
      </div>
    )}
  </Mutation>
  <div
    className="pointer button"
    onClick={() => this.setState({ login: !login })}
  >
    {login ? 'need to create an account?' : 'already have an account?'}
  </div>
        </div>
      </div>
    )
  }

  _handleLogIn = async data => {
    console.log(data);
    if(!data.login) {
      //TEMPORARY SOLUTION, NEED TO CHANGE ONCE SESSISONS ARE INTRODUCED
      localStorage.setItem('currentUser', this.state.username);
      this.props.history.push(`/`)
    }
    else {
      let errorMessage = data.login[0].message;
      let error_box = document.getElementById('error_box')
      error_box.innerHTML = errorMessage

    }

  }

  _handleSignUp = async data => {
    console.log(data);
    if(!data.signup) {
      //TEMPORARY SOLUTION, NEED TO CHANGE ONCE SESSISONS ARE INTRODUCED
      localStorage.setItem('currentUser', this.state.username);
      this.props.history.push(`/`)
    }
    else {
      let errorMessage = data.signup[0].message;
      let error_box = document.getElementById('error_box')
      error_box.innerHTML = errorMessage

    }

  }


  _confirm = async data => {
    // const { token } = this.state.login ? data.login : data.signup
    // this._saveUserData(token)
    this.props.history.push(`/`)
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}

export default Login