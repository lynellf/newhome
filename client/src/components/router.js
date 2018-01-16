import React from 'react';
import { BrowserRouter, Route } from 'react-browser-router';

import Index from './Index';
import Register from './Register';
import Login from './Login';
import Traffic from './cp/Traffic';
import Posts from './cp/Posts';

export const routes = () => {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" render={() => <Index />} />
        <Route exact path="/register" render={() => <Register />} />
        <Route exact path="/login" render={() => <Login />} />
        <Route exact path="/controlpanel" render={() => <Traffic />} />
        <Route exact path="/controlpanel/posts" render={() => <Posts />} />
      </div>
    </BrowserRouter>
  );
};
