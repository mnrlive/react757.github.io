import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Router from "./components/Router";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Router />, document.getElementById('root'));
registerServiceWorker();
