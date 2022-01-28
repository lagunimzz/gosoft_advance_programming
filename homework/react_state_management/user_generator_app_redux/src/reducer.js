const initState = {
  user: {},
};

export default function rootReducer(state = initState, action) {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
