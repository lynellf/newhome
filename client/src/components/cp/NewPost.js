import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

import Dropzone from 'react-dropzone';
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
      files: [],
      fileNames: [],
    };
    this.writePost = this.writePost.bind(this);
    this.uploadImages = this.uploadImages.bind(this);
  }

  uploadImages(event) {
      event.nativeEvent.stopImmediatePropagation();
      event.preventDefault();
      
    const images = this.state.files,
      formData = new FormData();
    images.forEach((image, index) => {
      formData.append('image', image);
    });
    axios
      .post('/api/imageupload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    //   .then(response => {
    //       return response;
    //       event.nativeEvent.stopImmediatePropagation();
    //       event.preventDefault();
    //       return response;
    //     this.setState({
    //       files: [],
    //     });
    //   });
    event.nativeEvent.stopImmediatePropagation();
    event.preventDefault();
    return false;
  }

  onDrop(files) {
    const fileNames = files.map(
      file => `localhost:3000/public/img/${file.name}`
    );
    this.setState({
      files,
      fileNames: fileNames,
    });
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
            <div className="post-form">
              <RichTextEditor
                value={this.state.value}
                onChange={this.writePost}
                className="cpanel__editor"
              />
              <input
                type="text"
                placeholder="Add Related Skills"
                className="post-form__skills"
              />
              <Dropzone onDrop={this.onDrop.bind(this)}>
                <p>
                  Try dropping some files here, or click to select files to
                  upload.
                </p>
              </Dropzone>
              <aside>
                <h2>Dropped files</h2>
                <ul>
                  {this.state.files.map(f => (
                    <li key={f.name}>
                      {f.name} - {f.size} bytes
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
            <span
              onClick={event => {
                event.nativeEvent.stopImmediatePropagation();
                this.uploadImages(event);
              }}
            >
              Upload Images
            </span>
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
