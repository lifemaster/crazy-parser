import { SET_PARSED_DATA } from '../actions/parsedData';

export default function reducer(state = {}, action) {
  switch(action.type) {
    case SET_PARSED_DATA:
      return action.parsedData;
    default:
      return state;
  }
}
