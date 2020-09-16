const initialState = {
  changePlan: true,
  visible: false,
  visibleContato: false,
  dataTextSign: ['', ''],
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_PLAN':
      return {
        ...state,
        changePlan: action.payload,
      };
    case 'TOGGLE_VISIBLE':
      return {
        ...state,
        visible: action.payload,
      };
    case 'TOGGLE_VISIBLE_CONTATO':
      return {
        ...state,
        visibleContato: action.payload,
      };
    case 'SET_TEXT_SIGN':
      return {
        ...state,
        dataTextSign: action.payload,
      };

    default:
      return state;
  }
}
