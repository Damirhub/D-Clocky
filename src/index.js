import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import Calculator from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Calculator />, document.getElementById('app'));
registerServiceWorker();


