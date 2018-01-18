import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

import RichTextEditor from 'react-rte';
import axios from 'axios';

export default class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
      value: RichTextEditor.createEmptyValue(),
      post: '',
    };
    this.writePost = this.writePost.bind(this);
  }

  writePost(value) {
    this.setState({ value });
    this.setState({ post: value.toString('html') });
  }

  authenticateUser() {
    axios.get('/api/controlpanel', null).then(response => {
      console.log(response.data);
      if (response.data === true) {
        this.setState({ authenticated: true });
      }
    });
  }

  componentWillMount() {
    this.authenticateUser();
  }

  render() {
    if (this.state.authenticated === true) {
      return (
        <div className="cpanel">
          <Topbar />
          <Sidebar />
          <div className="cpanel__main">
            <h1 className="cpanel__title">New Post</h1>
            <form className="post-form">
              <RichTextEditor
                value={this.state.value}
                onChange={this.writePost}
                className="cpanel__editor"
              />
              <input type="text" placeholder="Add Related Skills" className="post-form__skills"/>
            </form>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>You are not authorized to view this page</h1>
        </div>
      );
    }
  }
}
