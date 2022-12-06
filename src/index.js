import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

import {disableReactDevTools} from '@fvilers/disable-react-devtools';

if (ProcessingInstruction.env.NODE_ENV === 'production') disableReactDevTools();


ReactDOM.render(<App />, document.getElementById('root'));
