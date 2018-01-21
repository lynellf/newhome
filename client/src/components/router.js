import React from 'react';
import { BrowserRouter as Router, Route } from 'react-browser-router';

import Index from './Index';
import Register from './Register';
import Login from './Login';
import Traffic from './cp/Traffic';
import Posts from './cp/Posts';
import NewPost from './cp/NewPost';
import EditPost from './cp/EditPost';

export const routes = () => {
  return <Router>
      <div>
        <Route exact path="/" render={() => <Index />} />
        <Route exact path="/register" render={() => <Register />} />
        <Route exact path="/login" render={() => <Login />} />
        <Route exact path="/controlpanel" render={() => <Traffic />} />
        <Route exact path="/controlpanel/posts" render={() => <Posts />} />
        <Route exact path="/controlpanel/newpost" render={() => <NewPost />} />
        <Route exact path="/controlpanel/edit/:id" render={() => <EditPost />} />
      </div>
    </Router>;
};
