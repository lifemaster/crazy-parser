import {createStore, applyMiddleware} from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducer from '../reducers';

const store = {};

export default createStore(reducer, store, applyMiddleware(promise, thunk, logger));
