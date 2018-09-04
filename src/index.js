import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import RenderDiv from './renderdiv'

// const hiddenParagraph = document.getElementById("hidden");


ReactDOM.render(<RenderDiv  />, document.getElementById('hidden2'))


registerServiceWorker();
