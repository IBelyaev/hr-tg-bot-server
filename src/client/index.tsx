import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Root from './root';

const RootWithRouter = (
  <BrowserRouter>
    <Root />
  </BrowserRouter>
);

ReactDOM.hydrate(
  RootWithRouter,
  document.getElementById('react-container')
);

if (typeof(module.hot) !== 'undefined') {
    module.hot.accept();
};
