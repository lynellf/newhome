import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: false,
      errorMsg: '',
    };
  }

  updateEmail = event => this.setState({ email: event.target.value });
  updatePassword = event => this.setState({ password: event.target.value });

  dataCheckandSubmit = (event, userObject) => {
    if (userObject.password.length > 0 && userObject.email.length > 0) {
      this.loginUser(userObject);
      event.preventDefault();
    } else {
      this.setState({
        error: true,
        errorMsg:
          'One of the fields is empty. Please ensure you have provided both an email and password.',
      });
      event.preventDefault();
    }
  };

  loginUser(userData) {
    axios
      .post('/api/login', userData)
      .then(response => {
        if (response.data === true) {
          this.setState({
            error: false,
          });
          this.props.history.push('/controlpanel');
        } else {
          this.setState({
            error: true,
            errorMsg:
              response.data.errmsg ||
              'Wrong email / password combination? Maybe?',
          });
        }
      })
      .catch(error => this.setState({ error: true, errorMsg: error.message }));
  }

  render() {
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    return (
      <div
        className="login"
        onSubmit={event => this.dataCheckandSubmit(event, userData)}
      >
        <form className="login__form" action="/api/login">
          {this.state.error ? (
            <div className="error">{this.state.errorMsg}</div>
          ) : null}
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            onChange={event => this.updateEmail(event)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={event => this.updatePassword(event)}
          />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}
export default withRouter(Login);
