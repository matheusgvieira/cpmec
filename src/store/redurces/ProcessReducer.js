const initialState = {
  listProcess: [],
};

export default function ProcessReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_LIST_PROCESS':
      return {
        ...state,
        listProcess: action.payload,
      };

    default:
      return state;
  }
}
