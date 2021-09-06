import React from 'react';
import ReactDOM from 'react-dom';

import Root from './root';

ReactDOM.render (
    <Root />,
  document.getElementById('react-container')
)

if (typeof(module.hot) !== 'undefined') {
    module.hot.accept();
}
