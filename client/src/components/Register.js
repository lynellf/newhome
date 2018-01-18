import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorMsg: '',
      name: '',
      email: '',
      password: '',
      confirm: '',
    };
    this.dataCheckandSubmit = this.dataCheckandSubmit.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updateConfirm = this.updateConfirm.bind(this);
  }

  updateName = event => this.setState({ name: event.target.value });
  updateEmail = event => this.setState({ email: event.target.value });
  updatePassword = event => this.setState({ password: event.target.value });
  updateConfirm = event => this.setState({ confirm: event.target.value });

  dataCheckandSubmit = (event, userObject) => {
    console.log(userObject);
    // Validate password
    if (
      userObject.password === userObject.confirm &&
      userObject.password.length !== 0 &&
      userObject.password.length >= 8
    ) {
      this.registerUser(userObject);
      event.preventDefault();
    } else if (userObject.password.length < 8) {
      this.setState({
        error: true,
        errorMsg: 'Password must be greater than 8 characters.',
        userData: userObject,
      });

      event.preventDefault();
    } else if (userObject.password.length === 0) {
      this.setState({
        error: true,
        errorMsg: 'Please enter a password to continue registration.',
        userData: userObject,
      });

      event.preventDefault();
    } else {
      this.setState({
        error: true,
        errorMsg: 'Passwords do not match.',
        userData: userObject,
      });

      event.preventDefault();
    }
  };

  registerUser(userData) {
    console.log(userData);
    axios
      .post(`/api/register`, userData)
      .then(response => {
        if (response.data === true) {
          this.setState({
            error: false,
          });
          this.props.history.push('/login');
        } else {
          this.setState({
            error: true,
            errorMsg: response.data.errmsg || 'You broke the app dude.',
          });
        }
      })
      .catch(error => console.log(error));
  }

  render() {
    const userData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirm: this.state.confirm
    }
    return (
      <div className="register">
        <form
          className="register__form"
          onSubmit={event => this.dataCheckandSubmit(event, userData)}
        >
          {this.state.error ? (
            <div className="error">{this.state.errorMsg}</div>
          ) : null}
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={this.state.name}
            onChange={event => this.updateName(event)}
          />
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            value={this.state.email}
            onChange={event => this.updateEmail(event)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={this.state.password}
            onChange={event => this.updatePassword(event)}
          />
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input
            type="password"
            id="passwordConfirm"
            placeholder="Confirm Password"
            value={this.state.confirm}
            onChange={event => this.updateConfirm(event)}
          />
          <input type="submit" value="Register Account" />
        </form>
      </div>
    );
  }
}
export default withRouter(Register);
