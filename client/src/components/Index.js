import React, { Component } from 'react';
import Jumbotron from './Jumbotron';
import Navbar from './Navbar';
import Body from './Body';
import Footer from './Footer';


export default class Index extends Component {
  render() {
    return (
      <div className="main-site">
        <Navbar />
        <Jumbotron />
        <Body />
        <Footer />
      </div>
    );
  }
}
