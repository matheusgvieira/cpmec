export function setArrayFiles(newState) {
  return {
    type: 'SET_ARRAY_FILES',
    payload: newState,
  };
}

export function setAllArrayFiles(newState) {
  return {
    type: 'SET_ALL_ARRAY_FILES',
    payload: newState,
  };
}
