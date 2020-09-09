// react
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import 'react-app-polyfill/ie11';

// redux
import store from './app/slices/index';
import { Provider } from 'react-redux';

// app
import './index.scss';
import 'typeface-montserrat';
import '@fortawesome/fontawesome-free/js/all';
import { createBrowserHistory } from 'history';
import App from './app/App';

// history
const history = createBrowserHistory();

ReactDOM.render(
	<Router history={history}>
		<Provider store={store}>
			<App />
		</Provider>
	</Router>,
	document.getElementById('root')
);
