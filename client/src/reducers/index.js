import { combineReducers } from 'redux';

import { default as parserReducer } from './parser';
import { default as parsedDataReducer } from './parsedData';

const reducer = combineReducers({
  selectedParser: parserReducer,
  parsedData: parsedDataReducer
});

export default reducer;
