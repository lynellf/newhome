import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-browser-router';

import Index from './Index';
import Register from './Register';
import Login from './Login';
import Traffic from './cp/Traffic';
import Posts from './cp/Posts';
import NewPost from './cp/NewPost';
import EditPost from './cp/EditPost';
import Notfound from './Notfound';

export const routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Index />} />
        <Route exact path="/register" render={() => <Register />} />
        <Route exact path="/login" render={() => <Login />} />
        <Route exact path="/controlpanel" render={() => <Traffic />} />
        <Route exact path="/controlpanel/posts" render={() => <Posts />} />
        <Route exact path="/controlpanel/newpost" render={() => <NewPost />} />
        <Route
          exact
          path="/controlpanel/edit/:id"
          render={() => <EditPost />}
        />
        <Route component={Notfound}/>
      </Switch>
    </Router>
  );
};
