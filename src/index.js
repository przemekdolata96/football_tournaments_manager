import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/roboto-fontface/css/roboto/sass/roboto-fontface.scss';
import '../node_modules/material-design-lite/material.min.css';
import '../node_modules/material-design-lite/material.min.js';
import '../node_modules/material-design-icons/iconfont/material-icons.css';



// Render the main component into the dom
ReactDOM.render( < App / > , document.getElementById('app'));