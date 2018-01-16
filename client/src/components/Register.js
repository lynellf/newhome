import React, { Component } from 'react';

export default class Register extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="register">
        <form className="register__form" action="/api/register">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Name" />
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" placeholder="Email Address" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Password" />
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input
            type="password"
            id="passwordConfirm"
            placeholder="Confirm Password"
          />
          <input type="submit" value="Register Account" />
        </form>
      </div>
    );
  }
}
