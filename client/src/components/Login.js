import React, { Component } from 'react';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="login">
        <form className="login__form" action="/api/login">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" placeholder="Email Address" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Password" />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}
