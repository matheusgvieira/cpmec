export function setChangePlan(newState) {
  return {
    type: 'TOGGLE_PLAN',
    payload: newState,
  };
}

export function setVisibleModal(newState) {
  return {
    type: 'TOGGLE_VISIBLE',
    payload: newState,
  };
}

export function setVisibleModalContato(newState) {
  return {
    type: 'TOGGLE_VISIBLE_CONTATO',
    payload: newState,
  };
}

export function setTextSign(newState) {
  return {
    type: 'SET_TEXT_SIGN',
    payload: newState,
  };
}
