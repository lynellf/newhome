import React, { Component } from 'react';

import Topbar from './Topbar';
import Sidebar from './Sidebar';

import posts from '../../posts.json';

export default class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: posts['posts'],
      postClasses: [],
      sortedPosts: [],
    };
    this.selectPage = this.selectPage.bind(this);
  }

  grouper(array) {
    let groups = [],
      group = [];
    // We want to push 10 posts into the group array
    for (let i = 0; i < array.length; i++) {
      group.push(array[i]);
      // When the group array length is equal to ten, we want to push it to the groups array and start over
      if (group.length === 10) {
        groups.push(group);
        group = [];
      }
    }
    // Whatever remains in the group array shall get pushed into the groups array and return the array
    groups.push(group);
    return groups;
  }

  filterPosts(postArray, classArray) {
    let classNames = classArray;
    if (postArray[0].length >= 10) {
      for (let i = 1; i < postArray.length; i++) {
        classNames[i].forEach((className, index) => {
          classNames[i][index] = 'cpanel__posts__post--inactive';
        });
      }
    } else if (postArray[0].length > 0) {
      classNames[0].forEach((className, index) => {
        classNames[0][index] = 'cpanel__posts__post--inactive';
      });

      for (let i = 0; i < postArray.length; i++) {
        classNames[i].forEach((className, index) => {
          classNames[i][index] = 'cpanel__posts__post--active';
        });
      }
    } else {
      classNames[0].forEach((className, index) => {
        classNames[0][index] = 'cpanel__posts__post--inactive';
      });
    }
    this.setState({
      postClasses: classNames,
    });
  }

  selectPage(index, array) {
    let initialClasses = array;

        initialClasses.forEach((list) => {
            list.forEach((item, index) => {
                list[index] = 'cpanel__posts__post--inactive';
            });
        });


        initialClasses[index].forEach((className, i) => {
            initialClasses[index][i] = 'cpanel__posts__post--active';
        });

        this.setState({
            postClasses: initialClasses
        });

  }

  componentDidMount() {
    let posts = this.grouper(this.state.posts),
      postClasses = [];
    for (let i = 0; i < this.state.posts.length; i++) {
      postClasses.push('cpanel__posts__post--active');
    }

    postClasses = this.grouper(postClasses);
    this.setState({
      sortedPosts: posts,
      postClasses: postClasses,
    });
    this.filterPosts(posts, postClasses);
  }

  render() {
    const posts = this.state.sortedPosts,
      classNames = this.state.postClasses,
      clipString = (string) => {
          const maxLength = 19;
          if (string.length > maxLength) {
              const words = string;
              let newString = `${words.slice(0, maxLength)}...`;
            return newString;
          } else {
              return string;
          }
      },
      pagination = posts.map((post, index) => 
            <li key={index} className="cpanel__posts__item" onClick={event => this.selectPage(index, classNames)}>{index +1}</li>
        )
      ,
    post = (entries, classNames) => {
      const sortedEntries = [];
      for (let i = 0; i < entries.length; i++) {
        sortedEntries.push(
          entries[i].map((post, j) => (
            <tr className={classNames[i][j]} key={post._id}>
              <td>{clipString(post.title)}</td>
              <td>{post.date}</td>
              <td>
                <div className="cpanel__posts__buttons">
                  <button>Edit</button>
                  <button>Delete</button>
                </div>
              </td>
            </tr>
          ))
        );
      }
      return sortedEntries;
    };
    return (
      <div className="cpanel">
        <Topbar />
        <Sidebar />
        <div className="cpanel__main">
        <h1 className="cpanel__title">Projects</h1>
          <table className="cpanel__posts">
            <thead className="cpanel__posts__thead">
              <tr>
                <th>Name</th>
                <th>Date Created</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>{post(posts, classNames)}</tbody>
          </table>
          <ul className="cpanel__posts__nav">
              { pagination }
          </ul>
        </div>
      </div>
    );
  }
}
