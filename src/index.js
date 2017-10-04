import React from 'react';
import ReactDom from 'react-dom';
import App from './components/core/App';

ReactDom.render(
  <App initialContests={window.initialData.contests} />,
  document.getElementById('root')
);
