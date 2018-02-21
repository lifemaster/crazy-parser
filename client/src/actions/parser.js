export const SET_PARSER = 'SET_PARSER';

export function setParser(parser) {
  return dispatch => {
    return dispatch({
      type: SET_PARSER,
      selectedParser: parser
    })
  }
}
