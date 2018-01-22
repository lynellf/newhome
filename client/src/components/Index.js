import React, { Component } from 'react';
import Jumbotron from './Jumbotron';
import Navbar from './Navbar';
import Body from './Body';
import Footer from './Footer';
import loading from '../icons/loading.svg';
import axios from 'axios';

export default class Index extends Component {
  constructor() {
    super();
    this.state = {
      entries: [],
      isLoading: true,
    };
  }
  componentWillMount() {
    axios.get('/api/projects').then(response => {
      this.setState({
        entries: response.data.posts,
        isLoading: false,
      });
    });
  }

  render() {
    if (this.state.isLoading === true) {
      return (
        <span>
          <img src={loading} alt="loading icon" className="loading"/>
        </span>
      );
    } else {
      return (
        <div className="main-site">
          <Navbar />
          <Jumbotron posts={this.state.entries} />
          <Body posts={this.state.entries} />
          <Footer />
        </div>
      );
    }
  }
}
