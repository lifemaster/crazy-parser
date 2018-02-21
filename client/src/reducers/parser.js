import { SET_PARSER } from '../actions/parser';

export default function reducer(state = '', action) {
  switch(action.type) {
    case SET_PARSER:
      return action.selectedParser;
    default:
      return state;
  }
}
