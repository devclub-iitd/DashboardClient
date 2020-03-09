const initState = {
  items: [],
};

export default function (state = initState, action) {
  switch (action.type) {
    case 'FETCH_TASKS':
      return {
        ...state,
        items: action.payload,
      };
      // case NEW_POST:
      //     return {
      //         ...state,
      //         item: action.payload
      //     }
    default:
      return state;
  }
}
