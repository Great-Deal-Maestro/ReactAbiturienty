import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import MainPanel from './js/mainPanel';
import registerServiceWorker from './js/registerServiceWorker';

ReactDOM.render(
    <div>
        <MainPanel />
        <div id="Alerts"></div>
    </div>, 
    document.getElementById('root')
)

registerServiceWorker();