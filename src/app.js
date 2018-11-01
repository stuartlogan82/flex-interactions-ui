import React from 'react';
import ReactDOM from 'react-dom';
import CustomerTimeline from './components/InteractionTimeLine';
import CustomerInteractions from './components/CustomerInteractions';
import 'react-vertical-timeline-component/style.min.css';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

ReactDOM.render(<CustomerInteractions />, document.getElementById('app'));
