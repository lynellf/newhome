import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

import Dropzone from 'react-dropzone';
import RichTextEditor from 'react-rte';
import axios from 'axios';

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      loading: true,
      value: RichTextEditor.createValueFromString('', 'html'),
      post: '',
      files: [],
      images: [],
      tags: [],
      preview: '',
      projectUrl: '',
      gitHubUrl: '',
      title: '',
      draft: false,
      draftClass: 'post-form__draft--false',
      error: false,
      errorMsg: '',
    };
    this.writePost = this.writePost.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateProjectUrl = this.updateProjectUrl.bind(this);
    this.updategitHubtUrl = this.updategitHubtUrl.bind(this);
    this.updateTags = this.updateTags.bind(this);
    this.submitNewPost = this.submitNewPost.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.toggleDraftMode = this.toggleDraftMode.bind(this);
  }

  updateTitle = event => this.setState({ title: event.target.value });
  updateProjectUrl = event => this.setState({ projectUrl: event.target.value });
  updategitHubtUrl = event => this.setState({ gitHubUrl: event.target.value });
  updateTags = event => {
    const arr = event.target.value.split(',');
    this.setState({ tags: arr });
  };

  toggleDraftMode() {
    if (this.state.draft === false) {
      this.setState({
        draft: true,
        draftClass: 'post-form__draft--true',
      });
    } else {
      this.setState({
        draft: false,
        draftClass: 'post-form__draft--false',
      });
    }
  }

  removeImage(index) {
    const files = this.state.files,
      images = this.state.images;

    files.splice(index, 1);
    images.splice(index, 1);

    this.setState({ files, images });
  }

  submitNewPost() {
    const post = {
      title: this.state.title,
      body: this.state.value.toString('html'),
      images: this.state.images,
      tags: this.state.tags,
      preview: this.state.preview,
      projectUrl: this.state.projectUrl,
      gitHub: this.state.gitHubUrl,
      draft: this.state.draft,
    };
    if (post.title.length === 0) {
      this.setState({ error: true, errorMsg: 'Title field is empty.' });
    } else if (post.body.length < 12) {
      this.setState({ error: true, errorMsg: 'Post body is emtpy.' });
    } else {
      axios
        .post(`/api/update/${this.props.match.params.id}`, post)
        .then(response => {
          if (response.data === true) {
            this.props.history.push('/controlpanel/posts');
          } else {
            this.setState({ error: true, errorMsg: response.data });
          }
        })
        .catch(error =>
          this.setState({ error: true, errorMsg: error.message })
        );
    }
  }

  onDrop(files) {
    const baseArray = [];

    function getBase64(input) {
      var reader = new FileReader();
      reader.readAsDataURL(input);
      reader.onload = function() {
        // console.log(reader.result);
        baseArray.push(reader.result);
      };
      reader.onerror = function(error) {
        console.log('Error: ', error);
      };
    }

    files.forEach(file => getBase64(file));
    setTimeout(() => {
      this.setState({ files, images: baseArray });
    }, 100);
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
      if (response.data === true) {
        this.setState({ authenticated: true });
      }
    });
  }

  getPostData() {
    axios
      .get(`/api/post/${this.props.match.params.id}`)
      .then(response => {
        console.log(response.data);
        const image = new Image(),
          imageArray = [];
        response.data.post.images.forEach(file => {
          image.src = file;
          imageArray.push(image);
        });
        this.setState({
          title: response.data.post.title,
          value: RichTextEditor.createValueFromString(
            response.data.post.body,
            'html'
          ),
          files: imageArray,
          images: response.data.post.images,
          tags: response.data.post.tags,
          preview: response.data.post.preview,
          projectUrl: response.data.post.projectUrl,
          gitHubUrl: response.data.post.gitHub,
          draft: response.data.post.draft,
        });
      })
      .catch(error => this.setState({ error: true, errorMsg: error.message }));
  }

  componentWillMount() {
    this.authenticateUser();
    this.getPostData();
  }

  render() {
    if (this.state.authenticated === true) {
      return (
        <div className="cpanel">
          <Topbar />
          <Sidebar />
          <div className="cpanel__main">
            <div className="post-form">
              <div className="post-form__body">
                <h1 className="post-form__title">Edit Post</h1>
                {this.state.error ? (
                  <div className="error">{this.state.errorMsg}</div>
                ) : null}
                <input
                  type="text"
                  placeholder="Project Title"
                  className="post-form__input"
                  value={this.state.title}
                  onChange={event => this.updateTitle(event)}
                />
                <RichTextEditor
                  value={this.state.value}
                  onChange={this.writePost}
                  className="post-form__editor"
                />
                <span
                  className="post-form__submit"
                  onClick={event => {
                    this.submitNewPost();
                  }}
                >
                  Update Post
                </span>
              </div>
              <div className="post-form__extra">
                <h3 className="post-form__title">Additonal Details</h3>
                <span
                  className={this.state.draftClass}
                  onClick={event => this.toggleDraftMode()}
                >
                  Toggle Draft Mode (Unlisted Post)
                </span>
                <input
                  type="text"
                  placeholder="Add Related Skills"
                  className="post-form__input"
                  value={this.state.tags}
                  onChange={event => this.updateTags(event)}
                />
                <input
                  type="text"
                  placeholder="Github Repo Link"
                  className="post-form__input"
                  value={this.state.gitHubUrl}
                  onChange={event => this.updategitHubtUrl(event)}
                />
                <input
                  type="text"
                  placeholder="Project Link"
                  className="post-form__input"
                  value={this.state.projectUrl}
                  onChange={event => this.updateProjectUrl(event)}
                />
                <div className="post-form__image-upload">
                  <h3 className="post-form__title">Image Upload</h3>
                  <Dropzone
                    onDrop={this.onDrop.bind(this)}
                    className="post-form__dropzone"
                  >
                    <p>
                      Try dropping some files here, or click to select files to
                      upload.
                    </p>
                  </Dropzone>
                  <div className="post-form__images">
                    <h3 className="post-form__title">
                      Images Selected (Click Thumbnail to Remove)
                    </h3>
                    <ul className="post-form__image-list">
                      {this.state.files.map((f, i) => (
                        <li
                          key={f.name}
                          className="post-form__item"
                          onClick={event => this.removeImage(i)}
                        >
                          <img
                            src={this.state.images[i]}
                            alt={f.name}
                            className="post-form__image"
                          />
                          <span className="post-form__image-details">
                            {Math.floor(f.size / 1000) || 'Unknown'} Kb
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="unauth">
          <h1>You are not authorized to view this page</h1>
        </div>
      );
    }
  }
}

export default withRouter(EditPost);
