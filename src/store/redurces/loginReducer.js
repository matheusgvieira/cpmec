const initialState = {
  email: '',
  password: '',
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_EMAIL':
      return {
        ...state,
        email: action.payload,
      };

    case 'CHANGE_PASSWORD':
      return {
        ...state,
        password: action.payload,
      };

    default:
      return state;
  }
}
