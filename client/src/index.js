import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, browserHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import './styles/App.scss'

import App from './containers/App';
import store from './store';

render(
  <Provider store={store}>
    <Router>
      <App store={store} />
    </Router>
  </Provider>, 
  document.getElementById('root')
);

if(module.hot) {
	module.hot.accept();
}

