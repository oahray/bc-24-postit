import React from 'react';
import 'jquery/dist/jquery.min';
import { render } from 'react-dom';
import { BrowserRouter as Router, browserHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.css';
import './styles/App.scss'

import App from './containers/App';
import store from './store';

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <App store={store} />
    </Router>
  </Provider>, 
  document.getElementById('root')
);

if(module.hot) {
	module.hot.accept();
}

