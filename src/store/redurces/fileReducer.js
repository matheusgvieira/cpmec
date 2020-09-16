const INITIAL_STATE = {
  files: [],
};

export default function fileReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_ARRAY_FILES':
      return {
        ...state,
        files: [...state.files, action.payload],
      };
    case 'SET_ALL_ARRAY_FILES':
      return {
        ...state,
        files: action.payload,
      };

    default:
      return state;
  }
}
