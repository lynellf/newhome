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
      tags: [],
      preview: '',
      projectUrl: '',
      gitHubUrl: '',
      title: ''
    };
    this.writePost = this.writePost.bind(this);
    // this.uploadImages = this.uploadImages.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateProjectUrl = this.updateProjectUrl.bind(this);
    this.updategitHubtUrl = this.updategitHubtUrl.bind(this);
    this.updateTags = this.updateTags.bind(this);
    this.submitNewPost = this.submitNewPost.bind(this);
  }

  updateTitle = event => this.setState({ title: event.target.value });
  updateProjectUrl = event => this.setState({ projectUrl: event.target.value });
  updategitHubtUrl = event => this.setState({ gitHubUrl: event.target.value });
  updateTags = event => { const arr = event.target.value.split((',')); this.setState({ tags: arr }) }

  submitNewPost() {
    const post = {
      title: this.state.title,
      body: this.state.value.toString('html'),
      images: this.state.files,
      tags: this.state.tags,
      preview: this.state.preview,
      projectUrl: this.state.projectUrl,
      gitHub: this.state.gitHubUrl
    };
    console.log(post);
    axios.post('/api/newpost', post )
    .then(response => {
      if(response.data === true) {
        // this.props.history.push('/controlpanel/posts');
      }
    })
  }

  // uploadImages(event) {
  //     event.nativeEvent.stopImmediatePropagation();
  //     event.preventDefault();
      
  //   const images = this.state.files,
  //     formData = new FormData();
  //   images.forEach((image, index) => {
  //     formData.append('image', image);
  //   });
  //   axios
  //     .post('/api/imageupload', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     })
    //   .then(response => {
    //       return response;
    //       event.nativeEvent.stopImmediatePropagation();
    //       event.preventDefault();
    //       return response;
    //     this.setState({
    //       files: [],
    //     });
    //   });
  //   event.nativeEvent.stopImmediatePropagation();
  //   event.preventDefault();
  //   return false;
  // }

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
    const rawString = value.toString('html'),
      closingValue = rawString.indexOf('</p>') + 4,
      noMarkup = rawString.replace(/<(?:.|\n)*?>/gm, ''),
      preview = noMarkup.substr(0, closingValue);
    this.setState({ value, preview });
    this.setState({ post: value });
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
            <input type="text" placeholder="title" className="post-form__input"
            onChange={event => this.updateTitle(event)}
            />
              <RichTextEditor
                value={this.state.value}
                onChange={this.writePost}
                className="cpanel__editor"
              />
              <input
                type="text"
                placeholder="Add Related Skills"
                className="post-form__input"
                onChange={event => this.updateTags(event)}
              />
              <input type="text" placeholder="Github Repo Link"
              onChange={event => this.updategitHubtUrl(event)}
               />
              <input type="text" placeholder="Project Link"
              onChange={event => this.updateProjectUrl(event)}
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
                this.submitNewPost();
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
