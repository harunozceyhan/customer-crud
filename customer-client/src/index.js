import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';

/*
* Show success and error toast messages in both redux-thunk middleware requests and container's requests
* */
import ReduxToastr from 'react-redux-toastr'

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import './index.css';

ReactDOM.render(<Provider store={store}>
    <App />
    <ReduxToastr
        timeOut={5000}
        newestOnTop={false}
        preventDuplicates
        position="bottom-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar/>
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
