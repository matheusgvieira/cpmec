const initialState = {
  inputSendAddress: false,
};

export default function addressNotifiedReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_ADD':
      return {
        ...state,
        inputSendAddress: action.payload,
      };

    default:
      return state;
  }
}
