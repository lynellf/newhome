import React, { Component } from 'react';
import { Link } from 'react-browser-router';

import chart from '../../icons/Graph.png';
import news from '../../icons/news.png';
import file from '../../icons/File.png';

export default class Sidebar extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="cpanel__side">
          <Link to="/controlpanel">
            <img src={chart} className="cpanel__side__traffic" alt="traffic" />
          </Link>
          <Link to="/controlpanel/posts">
            <img src={news} className="cpanel__side__news" alt="news" />
          </Link>
          <Link to="/controlpanel">
          <img src={file} className="cpanel__side__files" alt="resume" />
          </Link>

      </div>
    );
  }
}
