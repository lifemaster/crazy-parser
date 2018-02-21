export const SET_PARSED_DATA = 'SET_PARSED_DATA';

export function setParsedData(data) {
  return dispatch => {
    dispatch({
      type: SET_PARSED_DATA,
      parsedData: data
    })
  }
}
